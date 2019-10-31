import React,{ useContext}  from 'react';
import { myContext } from './../../utils/Store';

export default function Count(){
    const { state, dispatch } = useContext(myContext);
    return (
      <div>
        Count: {state.count}
        <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
        <button onClick={() => dispatch({ type: "increment" })}>+</button>
        <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      </div>
    );
}