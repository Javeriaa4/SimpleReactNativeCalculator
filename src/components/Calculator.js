// src/components/Calculator.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from 'react-native';

const { width } = Dimensions.get('window');

/**
 * Main Calculator Component
 * Handles all calculator operations and UI
 */
const Calculator = () => {
  // State variables using useState hook
  const [displayValue, setDisplayValue] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  /**
   * Handles number button presses
   * @param {number} num - The number pressed (0-9)
   */
  const handleNumberPress = (num) => {
    if (waitingForNewValue) {
      setDisplayValue(String(num));
      setWaitingForNewValue(false);
    } else {
      setDisplayValue(displayValue === '0' ? String(num) : displayValue + num);
    }
  };

  /**
   * Handles decimal point input
   */
  const handleDecimalPress = () => {
    if (waitingForNewValue) {
      setDisplayValue('0.');
      setWaitingForNewValue(false);
    } else if (displayValue.indexOf('.') === -1) {
      setDisplayValue(displayValue + '.');
    }
  };

  /**
   * Handles basic operations (+, -, ×, ÷)
   * @param {string} nextOperation - The operation symbol
   */
  const handleOperationPress = (nextOperation) => {
    const inputValue = parseFloat(displayValue);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const result = performCalculation();
      setDisplayValue(String(result));
      setPreviousValue(result);
    }

    setWaitingForNewValue(true);
    setOperation(nextOperation);
  };

  /**
   * Performs the actual calculation based on current operation
   * @returns {number} Calculation result
   */
  const performCalculation = () => {
    const currentValue = parseFloat(displayValue);
    const prevValue = previousValue || 0;

    switch (operation) {
      case '+': return prevValue + currentValue;
      case '-': return prevValue - currentValue;
      case '×': return prevValue * currentValue;
      case '÷': return currentValue !== 0 ? prevValue / currentValue : 'Error';
      case '^': return Math.pow(prevValue, currentValue);
      default: return currentValue;
    }
  };

  /**
   * Handles equals button press
   * Performs calculation and displays result
   */
  const handleEqualsPress = () => {
    if (operation && previousValue !== null) {
      const result = performCalculation();
      setDisplayValue(String(result));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
    }
  };

  /**
   * Handles advanced mathematical operations
   * @param {string} op - Advanced operation type
   */
  const handleAdvancedOperation = (op) => {
    const currentValue = parseFloat(displayValue);
    let result;

    switch (op) {
      case 'sqrt':
        result = currentValue >= 0 ? Math.sqrt(currentValue) : 'Error';
        break;
      case 'percent':
        result = currentValue / 100;
        break;
      case 'square':
        result = Math.pow(currentValue, 2);
        break;
      case 'plusMinus':
        result = currentValue * -1;
        break;
      default:
        result = currentValue;
    }

    setDisplayValue(String(result));
  };

  /**
   * Clears all calculator state (AC button)
   */
  const clearAll = () => {
    setDisplayValue('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  /**
   * Clears only the current display (C button)
   */
  const clearDisplay = () => {
    setDisplayValue('0');
  };

  return (
    <View style={styles.container}>
      {/* Display Section - Shows expression and result */}
      <View style={styles.displayContainer}>
        <Text style={styles.expressionText}>
          {previousValue} {operation}
        </Text>
        <Text style={styles.resultText} numberOfLines={1}>
          {displayValue}
        </Text>
      </View>

      {/* Buttons Grid */}
      <View style={styles.buttonsContainer}>
        {/* Row 1: Advanced Operations */}
        <View style={styles.row}>
          <CalculatorButton
            title="√"
            onPress={() => handleAdvancedOperation('sqrt')}
            style={styles.advancedButton}
          />
          <CalculatorButton
            title="x²"
            onPress={() => handleAdvancedOperation('square')}
            style={styles.advancedButton}
          />
          <CalculatorButton
            title="%"
            onPress={() => handleAdvancedOperation('percent')}
            style={styles.advancedButton}
          />
          <CalculatorButton
            title="AC"
            onPress={clearAll}
            style={styles.clearButton}
          />
        </View>

        {/* Row 2: Numbers 7,8,9 and Division */}
        <View style={styles.row}>
          <CalculatorButton title="7" onPress={() => handleNumberPress(7)} />
          <CalculatorButton title="8" onPress={() => handleNumberPress(8)} />
          <CalculatorButton title="9" onPress={() => handleNumberPress(9)} />
          <CalculatorButton
            title="÷"
            onPress={() => handleOperationPress('÷')}
            style={styles.operationButton}
          />
        </View>

        {/* Row 3: Numbers 4,5,6 and Multiplication */}
        <View style={styles.row}>
          <CalculatorButton title="4" onPress={() => handleNumberPress(4)} />
          <CalculatorButton title="5" onPress={() => handleNumberPress(5)} />
          <CalculatorButton title="6" onPress={() => handleNumberPress(6)} />
          <CalculatorButton
            title="×"
            onPress={() => handleOperationPress('×')}
            style={styles.operationButton}
          />
        </View>

        {/* Row 4: Numbers 1,2,3 and Subtraction */}
        <View style={styles.row}>
          <CalculatorButton title="1" onPress={() => handleNumberPress(1)} />
          <CalculatorButton title="2" onPress={() => handleNumberPress(2)} />
          <CalculatorButton title="3" onPress={() => handleNumberPress(3)} />
          <CalculatorButton
            title="-"
            onPress={() => handleOperationPress('-')}
            style={styles.operationButton}
          />
        </View>

        {/* Row 5: 0, Decimal, Equals and Addition */}
        <View style={styles.row}>
          <CalculatorButton
            title="0"
            onPress={() => handleNumberPress(0)}
            style={styles.zeroButton}
          />
          <CalculatorButton title="." onPress={handleDecimalPress} />
          <CalculatorButton
            title="="
            onPress={handleEqualsPress}
            style={styles.equalsButton}
          />
          <CalculatorButton
            title="+"
            onPress={() => handleOperationPress('+')}
            style={styles.operationButton}
          />
        </View>
      </View>
    </View>
  );
};

/**
 * Reusable Calculator Button Component
 * @param {string} title - Button text
 * @param {function} onPress - Press handler function
 * @param {object} style - Additional styles
 */
const CalculatorButton = ({ title, onPress, style = {} }) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
    >
      <Text style={[
        styles.buttonText,
        style === styles.operationButton || style === styles.equalsButton
          ? styles.operationButtonText
          : {}
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

// Styles for the calculator
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  displayContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 20,
    backgroundColor: '#000',
  },
  expressionText: {
    fontSize: 24,
    color: '#666',
    marginBottom: 10,
  },
  resultText: {
    fontSize: 48,
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flex: 2,
    padding: 10,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 50,
    backgroundColor: '#333',
    minHeight: 70,
  },
  zeroButton: {
    flex: 2,
  },
  buttonText: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
  },
  operationButton: {
    backgroundColor: '#ff9500',
  },
  operationButtonText: {
    color: '#fff',
  },
  advancedButton: {
    backgroundColor: '#a6a6a6',
  },
  clearButton: {
    backgroundColor: '#a6a6a6',
  },
  equalsButton: {
    backgroundColor: '#ff9500',
  },
});

export default Calculator;