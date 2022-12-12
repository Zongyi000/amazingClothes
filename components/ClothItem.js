import React, { useEffect, useState } from "react";
import { View, Text, Image, Pressable } from "react-native";
import { DelButton, Interaction, InteractionText, UserImg, UserInfo, UserInfoText, UserName } from "../styles/FeedStyles";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { auth } from "../Firebase/firebase-setup";
import DeleteButton from "./DeleteButton";
import { useNavigation } from "@react-navigation/native";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../Firebase/firebase-setup";
import styles from "../styles/styles";

export default function ClothItem({ cloth, onDelete, showResult, indexKeyId }) {
    const cur = cloth.imageUri;
    const navigation = useNavigation();

    const [imageURL, setImageURL] = useState("");
    useEffect(() => {
        const getImageURL = async () => {
            try {
                if (cur) {
                    const imageName = cur.substring(7, cur.length - 4) + "_200x200" + cur.substring(cur.length - 4, cur.length);
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

    likeIcon = 'heart';
    likeIconColor = 'red';

    if (cloth.likes == 1) {
        likeText = '1 Like';
    } else if (cloth.likes > 1) {
        likeText = cloth.likes + ' Likes';
    } else {
        likeText = 'Like';
    }

    function deletePressed() {
        onDelete(cloth.key);
    }
    const index = indexKeyId + 1;

    return (
        <Pressable onPress={() => {
            navigation.navigate("ReviewScreen", { cloth });
        }}
            android_ripple={{ color: "black", foreground: true }}
        >
            <View style={styles.clothContainer}>
                <View style={styles.innercontainer}>
                    <Image
                        style={styles.tinyLogo}
                        source={{
                            uri: imageURL !== "" ? imageURL : 'https://reactnative.dev/img/tiny_logo.png',
                        }}
                    />
                </View>

                <View style={styles.innercontainer}>
                    {showResult == false ? (
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
                                uri: 'https://gravatar.com/avatar/78a296d008e5796f3f3e2d849819e9dc?s=400&d=mp&r=x',
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
                            {auth.currentUser.uid == cloth.user && showResult == true ? (
                                <DeleteButton onDeletePressed={deletePressed} />
                            ) : null}
                        </DelButton>
                    </UserInfo>
                </View>
            </View>
        </Pressable>
    );
}