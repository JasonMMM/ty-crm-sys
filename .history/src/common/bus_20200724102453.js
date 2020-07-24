import Vue from 'vue';

// 使用 Event Bus
function getDateData() {
    var dateData = Object();
    var myDate = new Date();
    dateData.getYear = myDate.getYear();        //获取当前年份(2位)
    dateData.getFullYear = myDate.getFullYear();    //获取完整的年份(4位,1970-????)
    dateData.getMonth = myDate.getMonth() + 1;       //获取当前月份(0-11,0代表1月)
    dateData.getDate = myDate.getDate();        //获取当前日(1-31)
    dateData.getDay = myDate.getDay();         //获取当前星期X(0-6,0代表星期天)
    dateData.getTime = myDate.getTime();        //获取当前时间(从1970.1.1开始的毫秒数)
    dateData.getHours = myDate.getHours();       //获取当前小时数(0-23)
    dateData.getMinutes = myDate.getMinutes();     //获取当前分钟数(0-59)
    dateData.getSeconds = myDate.getSeconds();     //获取当前秒数(0-59)
    dateData.getMilliseconds = myDate.getMilliseconds();    //获取当前毫秒数(0-999)
    dateData.toLocaleDateString = myDate.toLocaleDateString();     //获取当前日期
    dateData.mytime = myDate.toLocaleTimeString();     //获取当前时间
    dateData.toLocaleString = myDate.toLocaleString();        //获取日期与时间
    return dateData;
}
const bus = new Vue();

export default {bus, getDateData};