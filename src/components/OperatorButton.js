import React from 'react'
import { ACTIONS } from '../context/Actions'

const OperatorButton = ({operation, dispatch}) => {
  return (
    <button onClick={() => dispatch({type: ACTIONS.CHOOSE_OPERATION, payload: {operation}})}>
      {operation}
    </button>
  )
}

export default OperatorButton