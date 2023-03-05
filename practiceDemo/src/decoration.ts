


/**
 * 方法装饰器
 * @param target 被装饰的对象原型
 * @param propertyKey 被装饰的属性名称
 * @param descriptor 该属性的描述
 * @returns 
 */
console.log(`===================================方法装饰器`);
function smile(target: Greeter, propertyKey: string, descriptor: PropertyDescriptor) {
    return {
        ...descriptor,
        value: function (name: string) {
            console.log(`smile`);
            //调用被装饰的方法
            return descriptor.value(name);
        }
    }
}

// =========相当于又裹了一层
function smileWithParams(times: number) {
    return function (
        target: Greeter,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        return {
            ...descriptor,
            value: function (name: string) {
                for (let i = 0; i < times; i++) {
                    console.log('smile');
                }
                return descriptor.value(name);
            }
        }

    }
}

function test(target: Greeter) {
}

class Greeter {
    static active = false;
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }

    @smileWithParams(3)
    greet(name: string): string {
        console.log(`Welcome,${name}`);
        return "Hello"
    }
}

const g = new Greeter("msg");
g.greet("Alice");

console.log(Greeter.active);

/**
 * 在TypeScript 当多个装饰器应用在一个声明上时会进行如下步骤的操作:
 * 1.由上至下依次对装饰器表达式求值
 * 2.求值的结果会被当作函数，由下至上依次调用
 */

console.log(`===================================类装饰器`);

function classDecorator<T extends { new(...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
        newProperty = "new property";
        hello = "override";
    }
}

@classDecorator
class Greeter2 {
    property = "property";
    hello: string;
    constructor(m: string) {
        this.hello = m;
    }
}
console.log(new Greeter2("world"));





