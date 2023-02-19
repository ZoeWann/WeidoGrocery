class greet {
    greeting: string;
    constructor(public name: string) {
        this.greeting = "greeting";
    }

    sayHello() {
        console.log(`Hello,${this.name}`);
    }
}

const g = new greet("Alice");
g.sayHello();