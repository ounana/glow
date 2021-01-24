/**
 * 日期格式化
 * 返回当前时间并转换为指定格式： new Date().format('yyyy-MM-dd HH:mm:ss')
 * 连接符可自定义： new Date().format('yyyy/MM/dd HH:mm:ss')
 * 格式化长度可自定义： new Date().format('yyyy-MM-dd') 或 new Date().format('HH:mm')
 */
const format = function (date,fmt) {
  let d=new Date(date)
  let o = {
    "M+": d.getMonth() + 1, //月份
    "d+": d.getDate(), //日
    "h+": d.getHours() % 12 === 0 ? 12 : d.getHours() % 12, //小时
    "H+": d.getHours(), //小时
    "m+": d.getMinutes(), //分
    "s+": d.getSeconds(), //秒
    "q+": Math.floor((d.getMonth() + 3) / 3), //季度
    "S": d.getMilliseconds() //毫秒
  };
  let week = {
    "0": "/u65e5", "1": "/u4e00", "2": "/u4e8c", "3": "/u4e09", "4": "/u56db", "5": "/u4e94", "6": "/u516d"
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[this.getDay() + ""]);
  }
  for (let k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt
}
export default format