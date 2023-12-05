import {Text, View, TouchableOpacity} from 'react-native'
import styles from './styles'
import { useState } from 'react'
import CalculatorTab from './Calculator'
import CurrencyConverterTab from './CurrencyConverter'

const App = () => {

    //by default, when app opens, the calculator tab is displayed on the screen
    const [calculatorTabIsActive, setCalculatorTabIsActive] = useState(true)
    //change opacity of the tab buttons
    const calculatorTabButtonOpacity = calculatorTabIsActive ? 1 : 0.5
    const currencyConverterTabButtonOpacity = calculatorTabIsActive ? 0.5 : 1

    return (
        <View style={styles.container}>
            {/* tabBar */}
            <View style={{flexDirection:'row'}}>
                {/* calculator tab button */}
                <TouchableOpacity style={[styles.tabButton, {opacity:calculatorTabButtonOpacity}]} onPress={() => {setCalculatorTabIsActive(true)}}>
                    <Text style={styles.tabButtonText}>Calculator</Text>
                </TouchableOpacity>
                {/* currency converter tab button */}
                <TouchableOpacity style={[styles.tabButton, {opacity:currencyConverterTabButtonOpacity}]} onPress={() => {setCalculatorTabIsActive(false)}}>
                    <Text style={styles.tabButtonText}>Currency Converter</Text>
                </TouchableOpacity>            
            </View>
            {/* show calculator tab */}
            {calculatorTabIsActive && <CalculatorTab />}
            {/* show currency converter tab*/}
            {!calculatorTabIsActive && <CurrencyConverterTab />}
        </View>
    )
}


export default App