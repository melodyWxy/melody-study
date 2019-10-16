// function lg(...props){
//     var a = 0;
//    return  console.log(...props,a++)


// }

// function fn(){}

// const obj = new fn(); 

// lg( obj.__proto__ === fn  )  //false


// lg(obj.__proto__===fn.prototype)//true
// lg(fn.prototype.constructor=obj)//false   fn

// // lg(fn instanceof obj )//error


// lg(obj instanceof fn)//true


// lg(obj instanceof Function) //false

// lg( fn instanceof Object) //true
    class Component {
        constructor(props){
            this.componentWillRender();
            this.render();
            this.componentDidRender();
        }
        state=1;
        componentWillRender=()=>{
            console.log('componentWillRender')
        }
        render=()=>{
            console.log('render');
        }
        componentDidRender=()=>{
            console.log('componentDidRender')
        }
    }
    new Component();
    class Child extends Component{
        constructor(){
            super();
            this.num = 10;
        }
        state =2;
        componentDidRender=()=>{
            console.log('可以改写方法')
        }
    }
    new Child();