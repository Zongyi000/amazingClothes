import React, {useEffect, useState} from "react";
import { View, Text, StyleSheet, Image } from "react-native";
// import { styles }  from "./styles";
import {DelButton, InteractionWrapper, Interaction, InteractionText, UserImg, UserInfo, UserInfoText, UserName} from "./FeedStyles";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { auth } from "../Firebase/firebase-setup";
import DeleteButton from "./DeleteButton";
import { useNavigation } from "@react-navigation/native";
import { getStorage } from "firebase/storage";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../Firebase/firebase-setup";


export default function ClothItem({ cloth, onDelete, showResult, indexKeyId}) {
    const cur = cloth.imageUri;
    console.log(cloth.title)
    const navigation = useNavigation();

    const [imageURL, setImageURL] = useState("");
    useEffect(() => {
        const getImageURL = async () => {
          try {
            if (cur){
              const imageName = cur.substring(cur.lastIndexOf("/") + 1);
              const reference = ref(storage, `images/${imageName}`);
              await getDownloadURL(reference).then((x) => {
                setImageURL(x);
              })
            }
          } catch (err) {
            console.log("download image ", err);
          }
        };
        getImageURL();
      }, []);

    console.log(imageURL)
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
                        uri: imageURL !== ""? imageURL : 'https://reactnative.dev/img/tiny_logo.png',
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
                        <UserName>{cloth.userName == null ? ('anonymous') : cloth.userName}</UserName>
                    </UserInfoText>
                    <Interaction>
                        <Ionicons name={likeIcon} size={25} color={likeIconColor} />
                        <InteractionText>{cloth.likes - cloth.dislikes}</InteractionText>
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