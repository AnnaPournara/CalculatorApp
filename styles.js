import { StyleSheet, Dimensions } from 'react-native';

const {height,width} = Dimensions.get('window')

const styles = StyleSheet.create({

    container:{
        flex: 1,
        backgroundColor: 'black'
    },

    tabButton:{
        width: width/2,
        borderColor:'black',
        borderWidth: 1,
        backgroundColor: '#3E0034',
        height: height/15,
        justifyContent: 'center'
    },

    tabButtonText:{
        fontFamily: 'serif',
        fontSize: 16,
        color: 'white',
        alignSelf:'center'
    },

    inputTextArea: {
        height: '50%',
        width: width-width/10,
        borderBottomWidth:0.5,
        borderColor:'grey',
        marginBottom: 10,
        alignSelf: 'center',
        justifyContent:'flex-end',
        overflow: 'hidden'
    }, 

    buttonArea: {
        flex:1,
        width: width-width/10,
        alignSelf: 'center'
    },

    rowStyle:{
        flexDirection: 'row',
        height: '20%',
        justifyContent: 'space-around'
    },

    button:{
        flex:1, 
        borderWidth: 0.5, 
        borderColor:'grey',
        justifyContent: 'center',
        margin: 10,
        borderRadius: 5
    },

    symbol:{
        alignSelf: 'center',
        fontFamily: 'serif',
        color: 'white',
        fontSize: 20
    },

    backSpaceSymbol: {
        width:20, 
        height:20, 
        alignSelf:'center', 
        opacity:0.7
    },

    inputText: {
        alignSelf:'flex-end', 
        marginBottom:10, 
        fontSize:45,
        color: 'white'
    },

    resultText:{
        alignSelf:'flex-end', 
        marginBottom:5, 
        fontSize:35,
        opacity: 0.5,
        color: 'white'
    },

    lastOperationText:{
        alignSelf:'flex-end', 
        marginBottom:5, 
        fontSize:25,
        opacity: 0.5,
        color: 'white'
    },

    conversionArea:{
        height: '50%',
        width: width-width/5,
        alignSelf:'center',
        justifyContent:'space-evenly'
    },

    currencyArea:{
        flexDirection:'row', 
        justifyContent:'space-between'
    },

    currency:{
        fontFamily:'serif',
        fontSize:20,
        alignSelf:'flex-end',
        color:'white'
    }

})


export default styles;