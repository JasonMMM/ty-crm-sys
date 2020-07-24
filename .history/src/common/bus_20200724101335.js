import Vue from 'vue';

// 使用 Event Bus
export function test() {
    return "bus";
}
const bus = new Vue();


export default {bus, test};