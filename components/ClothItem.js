import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
// import { styles }  from "./styles";

function ClothItem ({cloth}) {
    return (
        <View style={styles.container}>
            <View style={styles.innercontainer}>
                 <View>
                    <Image 
                        style={styles.tinyLogo}
                        source={{
                            uri: cloth.uri,
                        }}
                    />
                </View>

                <View>
                    <Text style={styles.itemTitle}>
                        {cloth.title}
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#e5e5e5',
        padding:15,
        borderRadius:15,
        margin:5,
        marginHorizontal:10,
    },
    itemTitle: {
        fontSize: 18,
        fontWeight:'bold',
    },
    itemContent: {
        fontWeight: '300'
    },
    tinyLogo: {
        width: 50,
        height: 50,
    },
});

export default ClothItem;


// const styles = StyleSheet.create({
//     container: {
//       backgroundColor:'#e5e5e5',
//       padding:15,
//       borderRadius:15,
//       margin:5,
//       marginHorizontal:10,
//     },
//     innercontainer: {
//       alignItems:'center',
//       flexDirection:'column',
//     },
//     itemTitle:{
//       fontWeight:'bold', 
//     },
//     itemContent:{
//       fontWeight:'300'
//     }
//   })
  