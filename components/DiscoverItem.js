import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
} from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMugSaucer } from '@fortawesome/free-solid-svg-icons/faMugSaucer'
import { useNavigation } from "@react-navigation/native";
import { addLikesToDB } from '../Firebase/firestore';
import { addDislikesToDB } from '../Firebase/firestore';

function DiscoverItem({ cloth }) {
    const cur = cloth;
    console.log(cur.key)
    console.log(cur)
    const navigation = useNavigation();

    return (
        <View style={styles.card}>
            <View style={styles.cardHearder}>
                <View style = {styles.headerLeft}>
                    <Image style = {styles.userImage}
                    source = {{uri:cloth.uri}}
                    />
                    <Text>Poster'name</Text>
                </View>
                <View style = {styles.headerRight}>
                    <FontAwesomeIcon icon={ faMugSaucer }/>
                </View>
            </View>

            <Image 
                style={styles.tinyLogo}
                source={{
                    uri: cloth.photoUri !== ""? cloth.photoUri : 'https://reactnative.dev/img/tiny_logo.png',
                }}
            />

            <View style = {styles.cardFooter}>
                <View style = {styles.cardFooterLeft}>
                    <View style = {{flexDirection: "row",}}>
    
                        <Button title="Like"  onPress={async ()=>{
                            await addLikesToDB(cloth);
                            }}/>

                        <Button title="DisLike" async onPress={async ()=>{
                            await addDislikesToDB(cloth);
                            confirm.log(cloth.dislikes)
                            }}/>
                        <Button title="Add reviews" onPress={()=>{
                            navigation.navigate("AddReview",{cloth});
                            }}/>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: '#e9eeef',
        // margin:15,
        // marginHorizontal:25,
    },
    cardHearder: {
        flex: 1,
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginHorizontal: 20,
    },
    headerLeft:{
        alignItems:'flex-start',
        width:100,
        height:20
    },
    headerRight:{
        alignItems:'flex-end',
        width:100,
        height:20
    },
    userImage: {

        width: 20,
        height: 20,
    },

    cardFooter:{
        flex:1,
    },
    cardFooterLeft:{
        flexDirection: "row",
    },
    itemTitle: {
        fontSize: 16,
        fontWeight:'bold',
    },
    tinyLogo: {
        flex: 8,
        width: 250,
        height: 250,
    },
});
export default DiscoverItem;
