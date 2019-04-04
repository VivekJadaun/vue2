<template>
    <div class="container col-md-6 col-md-offset-3 col-lg-6 col-lg-offset-3">
        <transition name="flip" mode="out-in">
            <question mode="in-out" :question="question" :options="options" v-if="showQuestion"></question>
            <answer mode="in-out" v-else></answer>
        </transition>
    </div>
</template>

<script>
import Question from "./components/Question.vue";
import Answer from "./components/Answer.vue";
import { eventBus } from './main';

export default {
    data() {
        return {
            showQuestion: true,
            operators: ['-', '+'],
            minOperand: -10,
            maxOperand: 100,
            question: '',
            options: []
        };
    },
    components: {
        question: Question,
        answer: Answer
    },
    methods: {
        evaluate(expression) {
            return new Function('return ' + expression)();
        },

        getRandomOperand() {
            return Math.trunc(Math.random() * (this.maxOperand - this.minOperand + 1)) + this.minOperand;
        },

        prepareQuestion() {
            let index = Math.trunc(Math.random() * this.operators.length);  
            index = (index < this.operators.length) ? index : 0;
            let operator = this.operators[index];
            let firstOperand = this.getRandomOperand();
            let secondOperand = this.getRandomOperand();
            this.question = `${firstOperand} ${operator} ${secondOperand}`;
            this.prepareOptions();
            this.showQuestion = true;
        },

        prepareOptions() {
            this.options.splice(0,this.options.length);
            let answer = this.evaluate(this.question);
            for(let i in [1,2,3]) {
                this.options.push(this.getRandomOperand());
            }
            this.options.splice(Math.trunc(Math.random() * this.options.length), 0, answer);
        }
    },

    created() {
        this.prepareQuestion();

        eventBus.$on('answered', (value) => {
            if (value == this.evaluate(this.question)) {
                this.showQuestion = false;
            } else {
                window.alert('Wrong answer! Try again.');
            }
        });

        eventBus.$on('nextQuestion', () => {
            this.prepareQuestion();
        });
    },
}
</script>

<style>
    .flip-enter {
        /*transform: rotateY(0deg);*/
    }

    .flip-enter-active {
        animation: flip-in  0.5s ease-out forwards;
    }

    .flip-leave {
        /*transform: rotateY(0deg);*/
    }

    .flip-leave-active {
        animation: flip-out 0.5s ease-out forwards;
    }

    @keyframes flip-out {
        from {
            transform: rotateY(0deg);
        }
        to {
            transform: rotateY(90deg);
        }
    }

    @keyframes flip-in {
        from {
            transform: rotateY(90deg);
        }
        to {
            transform: rotateY(0deg);
        }
    }
</style>
