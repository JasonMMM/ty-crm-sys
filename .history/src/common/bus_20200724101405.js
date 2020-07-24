import Vue from 'vue';

// 使用 Event Bus
function date() {
    return "bus";
}
const bus = new Vue();


export default {bus, test};