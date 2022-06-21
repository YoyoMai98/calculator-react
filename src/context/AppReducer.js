import { ACTIONS } from './Actions'

const calculate = ({currentOperand, previousOperand, operation}) => {
  const prev = parseFloat(previousOperand)
  const curr = parseFloat(currentOperand)
  if(isNaN(prev) || isNaN(curr)) return ""
  let computation = ""
  switch(operation){
    case "+":
      computation = prev + curr
      break
    case "-":
      computation = prev - curr
      break
    case "*":
      computation = prev * curr
      break
    case "÷":
      computation = prev / curr
      break
  }
  return computation.toString()
}

const negative = currNumber => {
  const curr = parseFloat(currNumber)
  if(isNaN(curr)) return ""
  let computation = -curr
  return computation.toString()
}

const AppReducer = (state, {type, payload}) => {
  switch(type){
    case ACTIONS.ADD_DIGIT:
      if(state.overwrite){
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false
        }
      }
      if(state.currentOperand === "0" && payload.digit === "0") return state
      if(state.currentOperand == null && payload.digit === ".") {
        return {
          ...state,
          currentOperand: `0${payload.digit}`
        }
      }
      if(payload.digit === "." && state.currentOperand.includes(".")) return state
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`
      }
    
    case ACTIONS.CHOOSE_OPERATION:
      if(state.previousOperand == null && state.currentOperand == null) return state
      if(state.currentOperand == null){
        return {
          ...state,
          operation: payload.operation
        }
      }
      if(state.previousOperand == null){
        return {
          ...state,
          previousOperand: state.currentOperand,
          operation: payload.operation,
          currentOperand: null
        }
      }
      return {
        ...state,
        previousOperand: calculate(state),
        operation: payload.operation,
        currentOperand: null
      }

    case ACTIONS.CALCULATE:
      if(state.previousOperand == null ||
        state.currentOperand == null ||
        state.operation == null  
      ){
        return state
      }
      return {
        ...state,
        previousOperand: null,
        operation: null,
        currentOperand: calculate(state),
        overwrite: true
      }

    case ACTIONS.NEGATIVE:
      return {
        ...state,
        currentOperand: negative(state.currentOperand),
      }

    case ACTIONS.DELETE_DIGIT:
      if(state.overwrite) {
        return {
          ...state,
          currentOperand: null,
          overwrite: false
        }
      }
      if(state.currentOperand == null) return state
      if(state.currentOperand.length === 1) {
        return {
          ...state,
          currentOperand: null
        }
      }
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1)
      }

    case ACTIONS.CLEAR:
      return {
        state: null
      }
  }
}

export default AppReducer