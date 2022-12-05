import React, {useEffect, useState} from "react";
import { View, Text, StyleSheet, Image } from "react-native";
// import { styles }  from "./styles";
import {DelButton, InteractionWrapper, Interaction, InteractionText, UserImg, UserInfo, UserInfoText, UserName} from "./FeedStyles";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { auth } from "../Firebase/firebase-setup";
import DeleteButton from "./DeleteButton";

export default function ClothItem({ cloth, onDelete, showResult, indexKeyId}) {

    likeIcon = 'heart' ;
    likeIconColor = '#2e64e5';

    if (cloth.likes == 1) {
        likeText = '1 Like';
    } else if (cloth.likes > 1) {
        likeText = cloth.likes + ' Likes';
    } else {
        likeText = 'Like';
    }

    // if (cloth.comments == 1) {
    //     commentText = '1 Comment';
    //   } else if (cloth.comments > 1) {
    //     commentText = cloth.comments + ' Comments';
    //   } else {
    //     commentText = 'Comment';
    //   }

    function deletePressed() {
        onDelete(cloth.key);
    }
    const index = indexKeyId + 1;

    return (
        <View style={styles.container}>
            <View style={styles.innercontainer}>
                <Image 
                    style={styles.tinyLogo}
                    source={{
                        uri: cloth.imageUri !== ""? cloth.imageUri : 'https://reactnative.dev/img/tiny_logo.png',
                    }}
                />
            </View>

            <View style={styles.innercontainer}>
                {showResult == false? (
                <Text style={styles.itemTop}>
                    {'Top ' + index}
                </Text>
                ) : null}
                <Text style={styles.itemTitle}>
                    {cloth.title}
                </Text>
                    <UserInfo>
                    <UserImg
                    source={{
                        uri:'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
                    }}
                    />
                    <UserInfoText>
                        <UserName>Test User</UserName>
                    </UserInfoText>
                    <Interaction>
                        <Ionicons name={likeIcon} size={25} color={likeIconColor} />
                        <InteractionText>10</InteractionText>
                    </Interaction>
                    <DelButton>
                        {auth.currentUser.uid == cloth.user && showResult == true? (
                        <DeleteButton onDeletePressed={deletePressed}/>
                    ) : null}
                    </DelButton>
                </UserInfo>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#e5e5e5',
        padding:15,
        borderRadius:15,
        margin:15,
        marginHorizontal:25,
        flexDirection: "row",
    },
    innercontainer: {
        flex:1,
    },
    itemTop: {
        color: 'red',
        fontSize: 20,
        fontWeight:'bold',
    },
    itemTitle: {
        fontSize: 16,
        fontWeight:'bold',
    },
    tinyLogo: {
        width: 120,
        height: 120,
    }
});