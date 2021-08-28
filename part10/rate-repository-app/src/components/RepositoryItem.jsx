import React from 'react';
import { View, Text } from 'react-native';

const RepositoryItem = ({ item }) => {

    return(
        <View >
            <Text >Full name: {item.fullName}</Text>
            <Text >Description: {item.desciption}</Text>
            <Text >Language: {item.language}</Text>
            <Text >Stars: {item.startgazersCount}</Text>
            <Text >Forks: {item.forksCount}</Text>
            <Text >Reviews: {item.reviewCount}</Text>
            <Text >Rating: {item.ratingAverage}</Text>
        </View>
    )
}

export default RepositoryItem;