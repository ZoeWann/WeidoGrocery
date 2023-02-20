/**
 * 
 * @param target 被装饰的对象
 * @param propertyKey 被装饰的属性名称
 * @param descriptor 该属性的描述
 * @returns 
 */
function smile(target: Greeter, propertyKey: string, descriptor: PropertyDescriptor) {
    return {
        ...descriptor,
        value: function (name: string) {
            console.log('smile');
            //调用被装饰的方法
            return descriptor.value(name);
        }
    }
}


class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }

    @smile
    greet(name: string): string {
        console.log(`Welcome,${name}`);
        return "Hello"
    }
}

const g = new Greeter("msg");
g.greet("Alice");