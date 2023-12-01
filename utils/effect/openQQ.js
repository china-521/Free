 
 /**
  * 打开 QQ 聊天窗口
  * @param {String} qq QQ号 
  */
 export function openQQ(qq) {
 	window.open('http://wpa.qq.com/msgrd?v=3&uin=' + qq + '&site=qq&menu=yes', '_brank');
 }