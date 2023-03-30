class Router {
    constructor() {
        this.routers = {};
    }

    async use(command, routerFunction) {
        this.routers[command] = routerFunction;
    }

    async handle(command, input, output) {
        const routerFunction = this.routers[command];
        if (routerFunction) {
            await routerFunction(input, output);
        } else {
            console.error(`Router function not found : '${command}'`);
        }
    }
};

module.exports = Router;