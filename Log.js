export default class Log {
    constructor() {
        this.logs = [];
    }
    push(message) {
        this.logs.push(message);
    }
    clear(){
        this.logs.splice(0, this.logs.length);
    }
}