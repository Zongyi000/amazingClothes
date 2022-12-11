import {  StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    addNew: {
        backgroundColor: "#e5e5e5",
        borderRadius:15,
        margin: 30,
    },
    addNewTitle: {
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
        padding: 20,
        fontSize: 18,
    },
    addNewContent: {
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
        padding: 20,
    },
    addNewImage: {
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
        padding: 20,
    },
    addNewSubmit: {
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
        padding: 20,
    },
    addNewPlaceholder: {
        color: '#C0C0C0',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    addNewLocation: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        padding: 20,
    },
    blueButton: {
        color: '#007AFF',
        borderBottomWidth: StyleSheet.hairlineWidth,
        padding: 20,
        fontSize: 18,
        textAlign: 'center',
    }, 
    profileContainer: {
        flex: 1,
        padding: 20,
        justifyContent: 'center', 
        alignItems: 'center'
    },
    userImg: {
        height: 75,
        width: 75,
        borderRadius: 75,
        marginTop: 25,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
    }, 
    authContent: {
        padding: 16,
        flex: 1,
        justifyContent: "center",
    },
    authInputContainer: {
        width: '80%'
    },
    authLabel: {
        marginBottom: 4,
    },
    authInput: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    authButton: {
        marginTop: 5,
    },
    map: {
        height: "80%",
    },  
    clothContainer: {
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

export default styles;