import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
// import { styles }  from "./styles";

function ClothItem ({cloth}) {
    return (
        <View style={styles.container}>
         
            <View style={styles.innercontainer}>
                <Image 
                    style={styles.tinyLogo}
                    source={{
                        uri: cloth.uri !== ""? cloth.uri : 'https://reactnative.dev/img/tiny_logo.png',
                    }}
                />
            </View>

            <View style={styles.innercontainer}>
                <Text style={styles.itemTop}>
                    Top 1
                </Text>
                <Text style={styles.itemTitle}>
                    {cloth.title}
                </Text>
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
    },
});

export default ClothItem;
