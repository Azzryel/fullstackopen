const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const mongoose = require("mongoose")
require("dotenv").config()

const Author = require("./models/author")
const Book = require("./models/book")
const User = require("./models/user")

const jwt = require("jsonwebtoken")

const JWT_SECRET = process.env.SECRET_KEY


const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()


const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
    type User {
      username: String!
      favoriteGenre: String!
      id: ID!
    }

    type Token {
      value: String!
    }

    type Book {
        title: String!
        published: Int!
        author: Author!
        id: ID!
        genres: [String!]!
    }

    type Author {
        name: String!
        born: Int
        bookCount: Int
        id: ID!
    }

    type Mutation {
        addBook(
          title: String!
          name: String!
          born: Int
          published: Int!
          genres: [String]
        ): Book

        editAuthor(
          name: String!
          setBornTo: Int!
        ): Author

        createUser(
          username: String!
          favoriteGenre: String!
        ): User

        login(
          username: String!
          password: String!
        ): Token

      }

  type Query {
      bookCount: Int!
      authorCount: Int!
      allBooksWith(author: String, genre: String!): [Book!]!
      allBooks: [Book]
      allAuthors: [Author] 
      me: User
  }

  type Subscription {
    bookAdded: Book
  }   
`
/*
The following things do not have to work just yet

     allBooksWith the parameter author
*/
const resolvers = {
    Author: {
        bookCount: async (root) => {

            const bookCount = await Book.collection.countDocuments({ author: root._id })

            return bookCount
        }
    },

    Book: {
      author: async (root) => {

        const author = await Author.findById( root.author )

        return author
      }
    },

    Query: {
        bookCount: () => Book.collection.countDocuments(),
        authorCount: () => Author.collection.countDocuments(),
        allBooks: () => Book.find({}),
        allBooksWith: async (root, args) => {
            if(!args.author) {
              const booksByGenre = await Book.find( { genres: { $in: [ args.genre ] } } )
              return booksByGenre
            }
            return ( (book.author === args.author) && (book.genres.includes(args.genre)) )
            },
        allAuthors: () => Author.find({}),
        me: (root, args, context) => {
          return context.currentUser
        }
    },

    Mutation: {
        addBook: async (root, args, context) => {

          let author = await Author.findOne({ name: args.name })
          const currentUser = context.currentUser

          if (!currentUser) {
            throw new AuthenticationError("Not authenticated")
          }

          if(!author) {

            const  newAuthor = new Author ({ name: args.name, born: args.born  })
            try {
            author = await newAuthor.save()
            } catch (error) {
            throw new UserInputError(error.message, {
              invalidArgs: args,
            })
            }
          }
            const book = new Book ({ ...args })
            book.author = author._id
          try{
             await book.save()
          } catch (error) {
            throw new UserInputError(error.message, {
              invalidArgs: args,
            })
          }
          pubsub.publish('BOOK_ADDED', { bookAdded: book })
          return book
        },

        editAuthor: async (root, args, context) => {

            const currentUser = context.currentUser

            if (!currentUser) {
              throw new AuthenticationError("Not authenticated")
            }

            const author = await Author.findOne({ name: args.name })

            if(!author) {
              return null
            }

            author.born = args.setBornTo

            return author.save()
          },

          createUser: (root, args) => {
            const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

            return user.save()
                      .catch(error => {
                        throw new UserInputError(error.message, {
                          invalidArgs: args,
                        })
                      })

          },

          login: async (root, args) => {
            const user = await User.findOne({ username: args.username })

            if (!user || args.password !== "12345") {
              throw new UserInputError("Wrong credentials.")
            }

            const userForToken = {
              username: user.username,
              id: user._id
            }

            return { value: jwt.sign(userForToken, JWT_SECRET) }
          },
    },

    Subscription: {
      bookAdded: {
        subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
      }
    }

}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    
    if (auth && auth.toLocaleLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )

      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  },
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})