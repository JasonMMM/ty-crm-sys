import Vue from 'vue';

// 使用 Event Bus
const bus = new Vue();
export function test() {
    console.log('bus')
}

export default bus;