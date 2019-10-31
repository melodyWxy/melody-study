import React, { useReducer } from "react";
import reducer from './../reducer';

const myContext = React.createContext();


const Provider = props => {
  const [state, dispatch] = useReducer(reducer, {
    count:0
  });
  return (
    <myContext.Provider value={{ state, dispatch }}>
      {props.children}
    </myContext.Provider>
  );
};
export { myContext, Provider, reducer }