class greet {
    constructor(name) {
        this.name = name;
        this.greeting = "greeting";
    }
    sayHello() {
        console.log(`Hello,${this.name}`);
    }
}
const g = new greet("Alice");
g.sayHello();
//# sourceMappingURL=decoration.js.map