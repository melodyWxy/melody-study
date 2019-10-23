class App extends React.Component{
    state={
        a:1
    }
    render(){
        return (
            <div>
                {this.state.a}
            </div>
        )
    }
}