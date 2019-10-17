
// demo1 
var a = 1 ;

function fn(){
 console.log(a);
    var a = 1;
    a++;
}
fn();
 // 对上述代码预解析


// demo2 
var a = 1;
function fn(){
    a++;
    console.log(a);
    var a = 0;
    
    a++;
    console.log(a);
}
fn();
console.log(a);
// // // 对上述代码预解析


//demo3 
// var a = 1;
// function fn(){
//     a++;
//     console.log(a);
//     a=0;
//     a++;
//     function fn2(){
//         a++;
//         console.log(a);
//         a++;
//     }
//     fn2();
//     console.log(a);
//     var a = 20;
// }
// fn();
// console.log(a);
// // // 对上述代码预解析

// demo4
// var a = 1; 
// (function a(){
//     console.log(a);
//     a =2 ;
//     console.log(a);
// })()
// console.log(a);



