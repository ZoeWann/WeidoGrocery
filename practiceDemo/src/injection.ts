/**
 * 依赖注入:
 * 1.收集需要共享的数据
 * 2.标记需要使用这些数据的对象
 * 3.从共享数据中挑选出该对象需要的数据交给它
 */

console.log(`===================================依赖注入展示`);
class FlowerService0 {
    strew() {
        console.log('strew flower');
    }
}

class Greeter3 {
    constructor(
        private readonly flower: FlowerService0
    ) {
    }
    greet(name: string): string {
        console.log(`welcome, ${name}!`);
        this.flower.strew();
        return "Hello";
    }
}

// 期待的操作是 const g = create(Greeter);
// 期待的操作是将FlowerService作为依赖，通过某种方式注入到Greeter实例中，而不是主动将FlowerService实例化并传入
const g3 = new Greeter3(new FlowerService0());
g3.greet('tom');

console.log(`===================================依赖注入展示2`);
// ====================简单依赖注入

import "reflect-metadata";

const providerMap = new WeakMap();

// ------ Provider -------
function provider(target: any) { //传入的是构造器
    providerMap.set(target, null);
}

@provider
class FlowerService {
    strew() {
        console.log("strew flower");
    }
}

// ----- Inject -----
function create(target: any) {
    // 获取函数的入参类型
    const paramTypes = Reflect.getOwnMetadata(
        "design:paramtypes",
        target
    ) || [];

    /**
     * map方法返回一个新的数组，数组中的元素为原始数组调用函数处理后的值。
        map()方法按照原始数组元素顺序依次处理元素。
        也就是map（）进行处理之后返回一个新的数组
     */
    const deps = paramTypes.map((type: any) => {
        const instance = providerMap.get(type);
        if (instance === null) {
            providerMap.set(type, create(type));    //递归收集依赖
        }
        return providerMap.get(type);
    });

    return new target(...deps);
}

// 必须要inject一下,ts解析出构造器的入参类型
function inject(target: any) { };

@inject
class Greeter4 {
    constructor(private readonly flower: FlowerService) { }

    greet(name: string): string {
        this.flower.strew();
        console.log(`welcome,${name}!`);
        return "Hello";
    }
}

const g4 = create(Greeter4);
g4.greet("Jack");