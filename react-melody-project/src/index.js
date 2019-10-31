
import React from 'react';
import ReactDOM from 'react-dom';

const arr = ['西瓜','苹果','冬瓜'] 
class App extends  React.Component{

    state={
        a:1,
        b:2
    }

    render(){
        return(
            <div style={{
                color:'#f0f'
            }}>
                App
               <List  arr= {arr} />
            </div>
        )
    }
}

class List extends React.Component{

    renderList = ()=>this.props.arr.map((item,index)=>(
        <div key={index}>{item},{index}</div>
    ))


    render(){
        console.log(this)
        const list  =this.renderList();
        return (
            <div>
                {list}
            </div>
        )
    }
}
//FlUX

const root = document.getElementById('root');
ReactDOM.render(<App />,root);