import React, { useReducer } from 'react'
import "./App.css"
import AppReducer from './context/AppReducer'
import { ACTIONS } from './context/Actions'
import DigitButton from "./components/DigitButton"
import OperatorButton from "./components/OperatorButton"

const NumberFormat = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0
})

const operandFormat = operand => {
  if(operand == null) return
  const [integer, decimal] = operand.split(".")
  if(decimal == null) return NumberFormat.format(integer)
  return `${NumberFormat.format(integer)}.${decimal}`
}

const App = () => {
  const [{currentOperand, previousOperand, operation}, dispatch] = useReducer(AppReducer, {})

  return (
    <div className="calculator-wrapper">
      <div className="output">
        <div className="previous-output">{operandFormat(previousOperand)} {operation}</div>
        {currentOperand ? 
          <div className="current-output">{operandFormat(currentOperand)}</div> : 
          <div className="current-output">0</div>
        }
      </div>
      <button className="span-two"
        onClick={() => dispatch({type: ACTIONS.CLEAR})}
      >AC</button>
      <button onClick={() => dispatch({type: ACTIONS.DELETE_DIGIT})}>DEL</button>
      <OperatorButton operation="÷" dispatch={dispatch} />
      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />
      <OperatorButton operation="*" dispatch={dispatch} />
      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />
      <OperatorButton operation="+" dispatch={dispatch} />
      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />
      <OperatorButton operation="-" dispatch={dispatch} />
      <button onClick={() => dispatch({type: ACTIONS.NEGATIVE})}>+/-</button>
      <DigitButton digit="0" dispatch={dispatch} />
      <DigitButton digit="." dispatch={dispatch} />
      <button onClick={() => dispatch({type: ACTIONS.CALCULATE})}>=</button>
    </div>
  )
}

export default App
