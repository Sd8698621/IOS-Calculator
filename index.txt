import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, StatusBar, Dimensions, Animated, Easing, Vibration } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();
const { width } = Dimensions.get('window');

export default function Home() {
  const [input, setInput] = useState<string>('0');
  const [operator, setOperator] = useState<string | null>(null);
  const [firstNumber, setFirstNumber] = useState<string | null>(null);
  const [activeButton, setActiveButton] = useState<string | null>(null);

  const animateButton = (key: string) => {
    setActiveButton(key);
    Vibration.vibrate(10);  // Short vibration for haptic feedback
    setTimeout(() => setActiveButton(null), 150);
  };

  const handlePress = (value: string) => {
    animateButton(value);

    if (['+', '-', '*', '/'].includes(value)) {
      setOperator(value);
      setFirstNumber(input);
      setInput('0');
    } else if (value === '=') {
      if (operator && firstNumber) {
        const first = parseFloat(firstNumber);
        const second = parseFloat(input);
        let result;

        switch (operator) {
          case '+':
            result = first + second;
            break;
          case '-':
            result = first - second;
            break;
          case '*':
            result = first * second;
            break;
          case '/':
            result = first / second;
            break;
          default:
            return;
        }
        setInput(result.toString());
        setOperator(null);
        setFirstNumber(null);
      }
    } else if (value === 'AC') {
      setInput('0');
      setOperator(null);
      setFirstNumber(null);
    } else if (value === 'C') {
      setInput('0');
    } else if (value === '⌫') {
      setInput(input.length > 1 ? input.slice(0, -1) : '0');
    } else if (value === '±') {
      setInput((parseFloat(input) * -1).toString());
    } else if (value === '%') {
      if (firstNumber && operator) {
        const base = parseFloat(firstNumber);
        const percentageValue = (base * parseFloat(input)) / 100;
        setInput(percentageValue.toString());
      } else {
        setInput((parseFloat(input) / 100).toString());
      }
    } else {
      setInput(input === '0' ? value : input + value);
    }
  };

  return (
    <SafeAreaView style={styles.container} onLayout={() => SplashScreen.hideAsync()}>
      <StatusBar barStyle="light-content" />
      <View style={styles.display}>
        <Text style={styles.displayText}>{input}</Text>
      </View>
      <View style={styles.buttons}>
        {[
          ['C', '⌫', '%', '/'],
          ['7', '8', '9', '*'],
          ['4', '5', '6', '-'],
          ['1', '2', '3', '+'],
          ['0', '.', '=']
        ].map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((item, itemIndex) => (
              <TouchableOpacity
                key={`${rowIndex}-${itemIndex}`}
                style={[
                  styles.button,
                  item === '=' && styles.equalsButton,
                  ['+', '-', '*', '/'].includes(item) && styles.operatorButton,
                  item === '0' && styles.zeroButton,
                  activeButton === item && styles.activeButton
                ]}
                onPress={() => handlePress(item)}
              >
                <Text style={styles.buttonText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'flex-end',
  },
  display: {
    padding: 20,
    alignItems: 'flex-end',
  },
  displayText: {
    color: '#fff',
    fontSize: 80,
    fontWeight: '300',
  },
  buttons: {
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#333',
    borderRadius: 50,
    width: width * 0.2,
    height: width * 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  zeroButton: {
    width: width * 0.44,
    alignItems: 'flex-start',
    paddingLeft: 30,
  },
  equalsButton: {
    backgroundColor: '#FF9500',
  },
  operatorButton: {
    backgroundColor: '#FF9500',
  },
  activeButton: {
    transform: [{ scale: 0.9 }],
    opacity: 0.8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '500',
  },
});
