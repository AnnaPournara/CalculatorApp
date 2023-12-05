import {Text, View, TouchableOpacity, Image, Alert, Dimensions} from 'react-native'
import styles from './styles'
import { useEffect, useState } from 'react'
import {Dropdown} from 'react-native-element-dropdown'


const API_KEY = 'ff2a946d96a4939a5021eb71e2960d46'
const API_URL = `http://data.fixer.io/api/latest?access_key=${API_KEY}&base=`

const CurrencyConverterTab = () => {

    const [input, setInput] = useState('0')
    const [base, setBase] = useState('EUR')
    const [target, setTarget] = useState('USD')
    const [baseSymbol, setBaseSymbol] = useState('€')
    const [targetSymbol, setTargetSymbol] = useState('$')
    const [rates,setRates] = useState(0)

    //function called every time base changes (when user selects an item in the dropdown list)
    useEffect(() => {
        //fetch data from fixer io API related to the base currency selected
        fetch(API_URL+base)
        .then(response => response.json())
        .then(data => {
            //if there is no error, store the returned rates
            if(!data.hasOwnProperty('error')){
                setRates(data.rates)
            }
            // the API is free only for converting currencies with EUR base
            // when another base is selected it returns a json with error code
            else{
                //in this case alert user and change the base back to EUR
                Alert.alert('Only EUR base is supported.'); 
                setBase('EUR'); 
                setBaseSymbol('€')
            }
            
        })
        .catch(error=> {
            //if there is no internet connection in the user's device, alert user, since all the requests to the API fail and an error is thrown
            if(error.toString()=='TypeError: Network request failed'){
                Alert.alert('No internet connection.');
                
            }
            else {
                Alert.alert('Error')
            }
        })
    
    }, [base])


    //function called when user presses a digit button
    const handleInputNum = (num) => {
        //if input is zero (no digit is previously pressed or input is cleared), replace zero with input digit
        if(input == '0')
            setInput(num.toString())
        //add input digit to the input string - only up to 12 digits is allowed
        else{
            if((input + num.toString()).length<12)
                setInput(input + num.toString())
        }
    }


    //function called when user presses the dot button (add decimal part)
    const handleDot = () => {
        //add dot to the input string, if there isn't already a dot
        if(!input.includes('.')){
                setInput(input + '.')
        }
    }


    //function called when user presses the clear button
    const handleClear = () => {
        //set input string to zero
        setInput('0')
    }


    //function called when user presses the backspace button
    const handleDelete = () => {
        //if length of input string is 1, set to zero
        if (input.length == 1){
            setInput('0')
        }
        //otherwise, just delete last element added to the string
        else {
            let i = input.slice(0,-1)
            setInput(i)
        }  
    }

    return (
        <View style={{flex:1}}>
            <View style={styles.conversionArea}>
                {/* dropdown list with the base currencies */}
                <View style={styles.currencyArea}>
                    <Dropdown 
                        style={{width:100}}
                        placeholderStyle={{fontSize:20, fontFamily:'serif', color:'white'}}
                        containerStyle={{backgroundColor:'black', borderWidth:0.2, borderColor:'grey'}}
                        iconColor='white'
                        itemTextStyle= {{color:'white', fontFamily:'serif'}}
                        itemContainerStyle={{borderWidth:0.2, borderColor:'grey'}}
                        selectedTextStyle={{fontSize:20, fontFamily:'serif', color:'white'}}
                        activeColor='grey'
                        data={[{label: 'EUR', value:'1', symbol: '€'}, {label: 'USD', value:'2', symbol: '$'}, {label: 'TRY', value:'3', symbol: '₺'}, {label: 'JPY', value:'4', symbol:'¥'}, {label: 'GBP', value:'5', symbol:'£'}]}
                        placeholder= {base}
                        value={base}
                        maxHeight={Dimensions.get('window').height/9}
                        labelField="label"
                        valueField="value"
                        onChange={item => {
                            setBase(item.label);
                            setBaseSymbol(item.symbol);
                        }}
                    />
                    {/* input string with base currency symbol */}
                    <Text style={styles.currency}>{input + baseSymbol}</Text>
                </View>
                {/* dropdown list with the target currencies */}
                <View style={styles.currencyArea}>
                <Dropdown 
                        style={{width:100}}
                        placeholderStyle={{fontSize:20, fontFamily:'serif', color:'white'}}
                        containerStyle={{backgroundColor:'black', borderWidth:0.2, borderColor:'grey'}}
                        iconColor='white'
                        itemTextStyle= {{color:'white', fontFamily:'serif'}}
                        itemContainerStyle={{borderWidth:0.2, borderColor:'grey'}}
                        selectedTextStyle={{fontSize:20, fontFamily:'serif', color:'white'}}
                        activeColor='grey'
                        data={[{label: 'EUR', value:'1', symbol: '€'}, {label: 'USD', value:'2', symbol: '$'}, {label: 'TRY', value:'3', symbol: '₺'}, {label: 'JPY', value:'4', symbol:'¥'}, {label: 'GBP', value:'5', symbol:'£'}]}
                        placeholder= {target}
                        value={target}
                        maxHeight={Dimensions.get('window').height/9}
                        labelField="label"
                        valueField="value"
                        onChange={item => {
                            setTarget(item.label);
                            setTargetSymbol(item.symbol);
                        }}
                    />
                    {/* converted value */}
                    <Text style={styles.currency}>{((!isNaN(rates[target])) ? (input*rates[target]).toFixed(2) : '0') +targetSymbol}</Text>
                </View>
            </View>

            <View style={styles.buttonArea}>
                {/* first row of buttons (clear, backspace) */}
                <View style={styles.rowStyle}>
                    <TouchableOpacity activeOpacity={1} style={[styles.button, {borderColor:'#3E0034', borderWidth:1}]} onPress={()=>handleClear()}>
                        <Text style={styles.symbol}>C</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} style={[styles.button, {borderColor:'#3E0034', borderWidth:1}]} onPress={()=>handleDelete()}>
                        <Image source={require("./icons/backspace.png")} style={styles.backSpaceSymbol}></Image>
                    </TouchableOpacity>
                </View>
                {/* second row of buttons (7, 8, 9) */}
                <View style={styles.rowStyle}>
                    <TouchableOpacity activeOpacity={1} style={styles.button} onPress={() => handleInputNum(7)}>
                        <Text style={styles.symbol}>7</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} style={styles.button} onPress={() => handleInputNum(8)}>
                        <Text style={styles.symbol}>8</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} style={styles.button} onPress={() => handleInputNum(9)}>
                        <Text style={styles.symbol}>9</Text>
                    </TouchableOpacity>
                </View>
                {/* third row of buttons (4, 5, 6) */}
                <View style={styles.rowStyle}>
                    <TouchableOpacity activeOpacity={1} style={styles.button} onPress={() => handleInputNum(4)}>
                        <Text style={styles.symbol}>4</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} style={styles.button} onPress={() => handleInputNum(5)}>
                        <Text style={styles.symbol}>5</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} style={styles.button} onPress={() => handleInputNum(6)}>
                        <Text style={styles.symbol}>6</Text>
                    </TouchableOpacity>
                </View>
                {/* fourth row of buttons (1, 2, 3) */}
                <View style={styles.rowStyle}>
                    <TouchableOpacity activeOpacity={1} style={styles.button} onPress={() => handleInputNum(1)}>
                        <Text style={styles.symbol}>1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} style={styles.button} onPress={() => handleInputNum(2)}>
                        <Text style={styles.symbol}>2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} style={styles.button} onPress={() => handleInputNum(3)}>
                        <Text style={styles.symbol}>3</Text>
                    </TouchableOpacity>
                </View>
                {/* fifth row of buttons (dot, 0) */}
                <View style={styles.rowStyle}>
                    <TouchableOpacity activeOpacity={1} style={styles.button} onPress={() => handleDot()}>
                        <Text style={styles.symbol}>.</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} style={styles.button} onPress={() => handleInputNum(0)}>
                        <Text style={styles.symbol}>0</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}


export default CurrencyConverterTab