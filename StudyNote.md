# 学习笔记

## 编辑器知识

### 小知识点：

- 改预制件目录下的脚本 因为 复制了1份 改脚本目录的没用
- 匿名函数在栈中是追踪不到的

#### 摄像机相关

- 设定弹簧臂角度，即摄像机相对弹簧臂挂点角度，在游戏中拖动屏幕转动视角就相当于动态调整此属性，因此该属性仅在摄像机朝向模式为固定朝向和跟随朝向时生效，用于制作俯视角游戏；摄像机变换-相对旋转相比于此属性不同的是仅改变摄像机角度，不改变弹簧臂角度

#### Tween 

#### 状态机 

## 一些编程语法与思想

- 何时使用null?

当使用完一个比较大的对象时，需要对其进行释放内存时，设置为 null。

- 垃圾回收站:它是专门释放对象内存的一个程序。
  - （1）在底层，后台伴随当前程序同时运行；引擎会定时自动调用垃圾回收期；
  -  （2）总有一个对象不再被任何变量引用时，才释放。
- 声明提升：函数声明和变量声明总是会被解释器悄悄地被"提升"到方法体的最顶部。但只有声明的变量会提升，初始化的不会。
- eval() 函数
  - 会将传入的字符串当做 JavaScript 代码进行执行，如果传入的字符串是表达式则返回表达式求值结果，否则返回 undefined 。
- JS所有数据都是以64位浮点型数据（float）来存储。
- 在 JavaScript 中，分号是可选的 。由于 return 是一个完整的语句，所以 JavaScript 将关闭 return 语句。
- 元组：存储的元素数据类型不同，元组中允许存储不同类型的元素，元组可以作为参数传递给函数。

### 异步编程

#### 什么是异步编程

- 异步就是从主线程发射一个子线程来完成任务。

- 我们常常用子线程来完成一些可能消耗时间足够长以至于被用户察觉的事情，比如读取一个大文件或者发出一个网络请求。因为子线程独立于主线程，所以即使出现阻塞也不会影响主线程的运行。但是子线程有一个局限：一旦发射了以后就会与主线程失去同步，我们无法确定它的结束，如果结束之后需要处理一些事情，比如处理来自服务器的信息，我们是无法将它合并到主线程中去的。

  为了解决这个问题，**JavaScript** **中的异步操作函数往往通过回调函数来实现异步任务的结果处理。**

### 回调函数

回调函数就是一个被作为参数传递的函数。

### Promise

#### Promise简介

promise 对象代表一个异步操作，有三种状态：Pending（进行中）、Resolved（已完成，又称 Fulfilled）和 Rejected（已失败）。

通过回调里的 resolve(data) 将这个 promise 标记为 resolverd，然后进行下一步 ，resolve 里的参数就是你要传入 then 的数据。

```javascript
then((data)=>{//do something})
```



- Promise类有 .then() .catch() 和 .finally() 三个方法，这三个方法的参数都是一个函数
  - then()可以将参数中的函数添加到当前Promise 的正常执行序列
  - catch()则是设定 Promise 的异常处理序列
  - finally()是在 Promise 执行的最后一定会执行的序列
  - then() 传入的函数会按顺序依次执行，有任何异常都会直接跳到 catch 序列
- resolve()中可以放置一个参数用于向下一个then 传递一个值
-  then中的函数也可以返回一个值传递给then。
-  但是，如果 then 中返回的是一个 Promise 对象，**那么下一个 then 将相当于对这个返回的Promise 进行操作**
- 注意：
  -  resolve和 reject 的作用域只有起始函数，不包括then 以及其他序列；
  - resolve和 reject 并不能够使起始函数停止运行，别忘了return。

```javascript
new Promise(
//此为起始函数，两个参数 传了then和catch的两个函数对象
function (resolve, reject) {
    var a = 0;
    var b = 1;
    if (b == 0) reject("Divide zero");
    else resolve(a / b);
}).then(
function (value) {
    console.log("a / b = " + value);
}
).catch(
function (err) {
//Promise 对象的错误具有"冒泡"性质，会一直向后传递，直到被捕获为止。
//也就是说，错误总是会被下一个 catch 语句捕获。
    console.log(err);
}
).finally(
//最后一定会执行的序列
function () {
    console.log("End");
}
);
```

#### 异步函数

```javascript
//例1
/**
异步函数 async function 中可以使用 await 指令
await 指令后必须跟着一个 Promise，
异步函数会在这个 Promise 运行中暂停，直到其运行结束再继续运行。
*/
async function asyncFunc() {
    await print(1000, "First");
    await print(4000, "Second");
    await print(3000, "Third");
}
asyncFunc();

// 异常处理 使用try-catch
async function asyncFunc() {
    try {
        await new Promise(function (resolve, reject) {
            throw "Some error"; // 或者 reject("Some error")
        });
    } catch (err) {
        console.log(err);
        // 会输出 Some error
    }
}
asyncFunc();

// 如果 Promise 有一个正常的返回值，await 语句也会返回它
async function asyncFunc() {
    let value = await new Promise(
        function (resolve, reject) {
            resolve("Return value");
        }
    );
    console.log(value);
}
asyncFunc();
```

####优缺点

- 优点：有了 Promise 对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。此外，Promise 对象提供统一的接口，使得控制异步操作更加容易。
- 缺点：首先，无法取消 Promise，一旦新建它就会立即执行，无法中途取消。其次，如果不设置回调函数，Promise 内部抛出的错误，不会反应到外部。第三，当处于 Pending 状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

#### Promise.All方法：

Promise.all 方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。

```javascript
var p = Promise.all([p1,p2,p3]);
```

上面代码中，Promise.all 方法接受一个数组作为参数，p1、p2、p3 都是 Promise 对象的实例。（Promise.all 方法的参数不一定是数组，但是必须具有iterator 接口，且返回的每个成员都是 Promise 实例。）

p 的状态由 p1、p2、p3 决定，分成两种情况。

- （1）只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。
- （2）只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。

#### Promise.race 方法

同样是将多个 Promise 实例，包装成一个新的 Promise 实例。

```javascript
var p = Promise.race([p1,p2,p3]);
```

上面代码中，只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的Promise实例的返回值，就传递给p的返回值。

如果Promise.all方法和Promise.race方法的参数，不是Promise实例，就会先调用Promise.resolve方法，将参数转为Promise实例，再进一步处理。

### 闭包

闭包是一种保护私有变量的机制，在函数执行时形成私有的作用域，保护里面的私有变量不受外界干扰。直观的说就是形成一个不销毁的栈环境。

 

 

 