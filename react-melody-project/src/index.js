
import React from 'react';
import ReactDOM from 'react-dom';


class App extends  React.Component{

    state={
        a:1,
        b:2
    }

    render(){
        return(
           <App />
        )
    }
}


const root = document.getElementById('root');
ReactDOM.render(<App />,root);