import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";


export default function App() {
  const [display, setDisplay] = useState('');
  const [result, setResult] = useState('');

  const handleOp = (op) => {
    if (op === 'C') {
      setDisplay('')
      setResult('')
    }
    else if (op === '=') {
      setDisplay(result)
      setResult('')
    }
    else {
      const novoDisplay = display + op
      let novoResult = result
      try {
        let fixedOperation = novoDisplay.split('x').join('*')
        fixedOperation = fixedOperation.split('÷').join('/')
        fixedOperation = fixedOperation.split(',').join('.')
        novoResult = String(eval(fixedOperation)).toString()
      } catch (e) {}
      setResult(novoResult)
      setDisplay(novoDisplay)
    }
  }

  const col1Buttons = [
    ['7', '8', '9'],
    ['4', '5', '6'],
    ['1', '2', '3'],
    [',', '0', '=']
  ]

  const col2Buttons = ['C', '÷', 'x', '-', '+']

  return (
    <View style={styles.container} >
      <Text style={styles.display}>{display}</Text>
      <Text style={styles.result}>{result}</Text>
      <View style={styles.buttons}>
        <View style={styles.col1}>
          { col1Buttons.map((line, index) =>
            <View key={index} style={styles.line}>
            { line.map(op =>
              <TouchableOpacity key={op} style={styles.btn} onPress={() => handleOp(op)}>
                <Text style={styles.btnText}>{op}</Text>
              </TouchableOpacity>
              )}
            </View>
          )}
        </View>
        <View style={styles.col2}>
        { col2Buttons.map((op) =>
          <TouchableOpacity key={op} style={styles.btn} onPress={() => handleOp(op)}>
            <Text style={styles.btnText}>{op}</Text>
          </TouchableOpacity>
        )}
        </View>
      </View>
    </View>
  );
}

const styles= StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  display: {
    flex: 1,
    backgroundColor: '#EFEFEF',
    fontSize: 80,
    textAlign: 'right',
    paddingTop: 30,
    paddingRight: 10,
  },
  result: {
    flex: 0.4,
    backgroundColor: '#EFEFEF',
    fontSize: 40,
    textAlign: 'right',
    paddingRight: 10,
    paddingBottom: 10
  },
  buttons: {
    flex: 5,
    flexDirection: 'row'
  },
  col1: {
    flex: 3,
    backgroundColor: '#000000'
  },
  col2: {
    flex: 1,
    backgroundColor: '#0a0a0a'
  },
  line: {
    flex: 1,
    flexDirection: 'row'
  },
  btn: {
    flex: 1,
    justifyContent: 'center'
  },
  btnText: {
    textAlign: 'center',
    fontSize: 50,
    color: 'white'
  }
})

