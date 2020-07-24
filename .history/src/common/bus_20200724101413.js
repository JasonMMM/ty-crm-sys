import Vue from 'vue';

// 使用 Event Bus
function getDateData() {
    return "bus";
}
const bus = new Vue();


export default {bus, test};