import {Text, View, TouchableOpacity, Image} from 'react-native'
import styles from './styles'
import {useState} from 'react'


const CalculatorTab = () => {

    //input operations 
    const [input, setInput] = useState('0')
    //save last operation performed
    const [lastOperation, setLastOperation] = useState('')


    //function called when user presses a digit button
    const handleInputNum = (num) => {
        //if input is zero (no digit is previously pressed,result is zero or input is cleared), replace zero with input digit
        if(input == '0')
            setInput(num.toString())
        //if result of previous operation is Error (0/0) or Infinity (+-Num/0) and user presses a digit, replace it with input digit
        else if (input == 'Error' || input == '+∞' || input == '-∞') {
            setInput(num.toString())
        }
        //otherwise add input digit to the operation string
        else 
            setInput(input + num.toString())
    }


    //function called when user presses an operator button (+,-,*,/,^)
    const handleInputOperator = (op) => {
        //if result of previous operation is Error or Infinity and user presses an operator, replace it with a zero followed by the operator
        if (input == 'Error' || input == '+∞' || input == '-∞'){
            setInput('0' + op)
        }
        //if the last element of the operation string is a number, add the operator to the string 
        else if(!isNaN(input[input.length-1]))
            setInput(input + op)
        //if the last element of the operation string is an operator, replace it with the new operator pressed by user
        else {
            let i = input.slice(0,-1)
            setInput(i + op)
        }
    }


    //function called when user presses the dot button (add decimal part)
    const handleDot = () => {
        //if result of previous operation is Error or Infinity and user presses the dot, replace it with a zero followed by a dot
        if (input == 'Error' || input == '+∞' || input == '-∞'){
            setInput('0.')
        }
        //if the last element of the operation string is an operator (neither a number nor a dot), add a zero followed by a dot to the string
        else if (isNaN(input[input.length-1]) && input[input.length-1]!='.'){
                setInput(input + '0.')
        }
        //otherwise, add the dot to the operation string, after checking first that the last input number hasn't already a dot
        else {
            //find the last operator pressed, split the string at that index and extract the number after
            let x = input.split(/[^0-9.](?![\s\S]*[^0-9.])/g)
            let y = x[x.length-1]
            //check if it has already a decimal part
            if(!y.includes('.')){
                setInput(input + '.')
            }
        }
    }


    //function called when user presses the clear button
    const handleClear = () => {
        //set operation string to zero
        setInput('0')
        //delete last operation performed
        setLastOperation('')
    }


    //function called when user presses the backspace button
    const handleDelete = () => {
        //if length of operation string is 1, or result of previous operation is Error or Infinity and user presses the backspace button, 
        //set operation string to zero and delete last operation performed
        if (input.length == 1 || input == 'Error' || input == '+∞' || input == '-∞'){
            setInput('0')
            setLastOperation('')
        }
        //otherwise, just delete last element added to the string
        else {
            let i = input.slice(0,-1)
            setInput(i)
        }  
    }


    //function called when user presses the equal button
    const handleEqual = () => {
        //save the operation string to the last operation string (operation string will be replaced by the result)
        setLastOperation(input)

        //replace operators with their respective programming symbols (the operators used in the UI are more user-friendly) so that the 
        //function that calculates the result of the operation string can execute with no errors)
        var inp = input
        if (inp.includes('×')){
            inp = inp.replace(/×/g, '*')
            
        }
        if (inp.includes('÷')){
            inp = inp.replace(/÷/g, '/')
        }
        if (inp.includes('^')){
            inp = inp.replace(/\^/g, '**')
        }

        //if result of previous operation is Error or Infinity and user presses the equal button again,
        //set operation string to zero and delete last operation performed
        if(inp == 'Error' || inp == '+∞' || inp == '-∞'){
            inp = '0'
            setInput('0')
            setLastOperation('')
        }
        //if the last element of the operation string is not a number, delete it
        if (isNaN(inp[inp.length-1])){
            inp = inp.slice(0,-1)
            //in case of the power operator (**), delete both the two last elements
            if(isNaN(inp[inp.length-1])) 
                inp = inp.slice(0,-1)
        }
        //if result of previous operation is negative and user presses the power button (^), add a zero before the - operator,
        //since the function that calculates the result, throws an error
        if(inp[0]== '-' && inp.includes('**')){
            inp = '0' + inp
        }

        //calculate result of operation string using the eval function
        //this function takes into account the priority of operations
        let res = eval(inp)
        //if result is not a number, set result to Error
        if(isNaN(res)){
            setInput('Error')
        }
        //if result is Infinity, set result with the respective symbol
        else if(res == 'Infinity'){
            setInput('+∞')
        }
        else if (res == '-Infinity'){
            setInput('-∞')
        }
        //otherwise, display the result
        else {
            //if result is decimal, display up to 8 decimal digits
            if (res % 1 != 0){
                let [integer, decimal] = res.toString().split('.')
                if(decimal.length>8){
                    setInput(res.toFixed(8).toString())
                }
                else {
                    setInput(res.toString())
                }
            }
            else{
                setInput(res.toString())
            }             
        }    
    }


    return (
        <View style={{flex:1}}>
            <View style={styles.inputTextArea}>
                {/* show last operation only if it's not null and input isn't zero */}
                {(lastOperation!= '' && input!='0') && <Text style={styles.lastOperationText}>{lastOperation}</Text>}
                {/* show input */}
                <Text style={styles.inputText}>{input}</Text>
            </View>

            <View style={styles.buttonArea}>
                {/* first row of buttons (clear, backspace, power, division) */}
                <View style={styles.rowStyle}>
                    <TouchableOpacity activeOpacity={1} style={[styles.button, {borderColor:'#3E0034', borderWidth:1}]} onPress={()=>handleClear()}>
                        <Text style={styles.symbol}>C</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} style={[styles.button, {borderColor:'#3E0034', borderWidth:1}]} onPress={()=>handleDelete()}>
                        <Image source={require("./icons/backspace.png")} style={styles.backSpaceSymbol}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} style={[styles.button, {borderColor:'#3E0034', borderWidth:1}]} onPress={()=>handleInputOperator('^')}>
                        <Text style={styles.symbol}>^</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} style={[styles.button, {borderColor:'#3E0034', borderWidth:1}]} onPress={()=>handleInputOperator('÷')}>
                        <Text style={styles.symbol}>÷</Text>
                    </TouchableOpacity>
                </View>
                {/* second row of buttons (7, 8, 9, multiplication) */}
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
                    <TouchableOpacity activeOpacity={1} style={[styles.button, {borderColor:'#3E0034', borderWidth:1}]} onPress={()=>handleInputOperator('×')}>
                        <Text style={styles.symbol}>×</Text>
                    </TouchableOpacity>
                </View>
                {/* third row of buttons (4, 5, 6, subtraction) */}
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
                    <TouchableOpacity activeOpacity={1} style={[styles.button, {borderColor:'#3E0034', borderWidth:1}]} onPress={()=>handleInputOperator('-')}>
                        <Text style={styles.symbol}>-</Text>
                    </TouchableOpacity>
                </View>
                {/* fourth row of buttons (1, 2, 3, addition) */}
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
                    <TouchableOpacity activeOpacity={1} style={[styles.button, {borderColor:'#3E0034', borderWidth:1}]} onPress={()=>handleInputOperator('+')}>
                        <Text style={styles.symbol}>+</Text>
                    </TouchableOpacity>
                </View>
                {/* fifth row of buttons (dot, 0, equal) */}
                <View style={styles.rowStyle}>
                    <TouchableOpacity activeOpacity={1} style={styles.button} onPress={() => handleDot()}>
                        <Text style={styles.symbol}>.</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} style={styles.button} onPress={() => handleInputNum(0)}>
                        <Text style={styles.symbol}>0</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} style={[styles.button, {backgroundColor: '#3E0034'}]} onPress={() => handleEqual()}>
                        <Text style={styles.symbol}>=</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        
    )
}


export default CalculatorTab;