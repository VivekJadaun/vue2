export default class Player {
    constructor(name, hp = 100){
        this.name = name;
        this.hp = hp;
        this.base = hp;
    }
    hurt(damage) {
        this.hp -= damage;
        return this.hp;
    }
    heal(restore) {
        if (this.hp < this.base) {
            this.hp = (this.hp + restore) > this.base ? this.base : (this.hp + restore) ;
        }
        return this.hp;
    }
    revive(){
        this.hp = this.base;
        return this.hp;
    }
}