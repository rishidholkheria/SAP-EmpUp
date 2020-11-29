module.exports = function getDate() {
  var d = new Date();
  var month = d.getMonth() + 1;
  // var mins = d.getMinutes() > 9 ? d.getMinutes() : '0' + d.getMinutes();
  // var hours = d.getHours() > 9 ? d.getHours() : '0' + d.getHours();
  // var date = hours + ':' + mins + ' ' + d.getDate() + '-' + month  + '-' + d.getFullYear();
  var date = d.getDate() + "-" + month + "-" + d.getFullYear();
  return date;
};
