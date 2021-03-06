import { gql } from "@apollo/client"

const BOOK_DETAILS = gql` 
fragment BookDetails on Book {
    title
    published
    author {
        name
        }
    genres
    id
}

`
export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            name
            born
            bookCount
            id
        }
    }
`

export const ALL_BOOKS = gql`
    query {
        allBooks {
            title
            published
            author {
                name
            }
            genres
            id
        }
    }
`

export const CREATE_BOOK = gql`
    mutation createBook($title: String!, $published: Int!, $author: String!, $genres: [String!]) {
        addBook(
            title: $title,
            published: $published,
            name: $author,
            genres: $genres
        ) {
            title
            published
            author {
                name
            }
            genres
            
        }
    }
`
export const UPDATE_AUTHOR_BIRTHYEAR = gql`
    mutation updateAuthor($name: String!, $born: Int! ) {
        editAuthor(
            name: $name,
            setBornTo: $born
        ) {
            name
            born
            bookCount
            id
        }
    }
`

export const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        login(
            username: $username,
            password: $password
        ) {
            value
        }
    }
`

export const USER = gql`
    query {
        me {
            username
            favoriteGenre
        }
    }
`

export const ALL_BOOKS_WITH = gql`
query ($author: String, $genre: String!) {
    allBooksWith (author: $author, genre: $genre) {
        title
        published
        author {
            name
        }
    }
}
`

export const BOOK_ADDED = gql`
subscription {
    bookAdded {
        ...BookDetails
    }
}

${BOOK_DETAILS}
`
