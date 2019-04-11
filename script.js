import Player from './Player.js';
import Log from './Log.js';
import { gameplayOptions } from "./gameplay_constants.js";

let log = new Log;
let hero = new Player('hero', gameplayOptions.heroHP);
let monster = new Player('monster', gameplayOptions.monsterHP);

let vue = new Vue({
    el: '[data-behaviour=container]',
    data: {
        ...gameplayOptions,
        begin: false,
        hero: hero,
        monster: monster,
        log: log,
    },
    computed: {
        renderHeroHP() {
            return {
                width: `${this.heroHP * 100 / this.hero.base}%`
            };
        },

        renderMonsterHP() {
            return {
                width: `${this.monsterHP * 100 / this.monster.base}%`
            }
        }
    },
    watch: {
        heroHP() {
            if (this.heroHP < 1) {
                this.stop('Game Over! You Lose');
            }
        },
        
        monsterHP() {
            if (this.monsterHP < 1) {
                this.stop('Game Over! You Win');
            }
        }
    },
    methods: {
        normal() {
            let heroAttack = Math.round(Math.random() * this.attackPower);
            let monsterAttack = Math.round(Math.random() * this.attackPower);
            this.attack(heroAttack, monsterAttack);
        },
        
        special() {
            let heroAttack = Math.round(Math.random() * this.attackPower + this.specialAmp);
            let monsterAttack = Math.round(Math.random() * this.attackPower + this.specialAmp);
            this.attack(heroAttack, monsterAttack);
        },
        
        attack(heroAttack, monsterAttack) {
            this.monsterHP = this.monster.hurt(heroAttack);
            this.log.push(`Hero attacked Monster for ${heroAttack}`);
            this.heroHP = this.hero.hurt(monsterAttack);
            this.log.push(`Monster attacked Hero for ${monsterAttack}`);
        },

        heal() {
            let heroHeal = Math.round(Math.random() * this.attackPower + this.specialAmp);
            let monsterAttack = Math.round(Math.random() * this.attackPower);
            this.heroHP = this.hero.heal(heroHeal);
            this.log.push(`Hero healed for ${heroHeal}`);
            this.heroHP = this.hero.hurt(monsterAttack);
            this.log.push(`Monster attacked Hero for ${monsterAttack}`);
        },

        surrender() {
            this.begin = false;
            this.heroHP = this.hero.revive();
            this.monsterHP = this.monster.revive();
            this.log.clear();
        },

        stop(message) {
            alert(message);
            window.location.reload();
        }
    }
});