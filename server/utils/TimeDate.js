// add report currentTime and date
const newDate = new Date();
const currentTime = newDate.getTime();
const year = newDate.getFullYear();
const month = newDate.getMonth() + 1;
const day = newDate.getDate();
let hour = newDate.getHours();
const minute = newDate.getMinutes();
const second = newDate.getSeconds();
let suffix = "";
if (hour > 12) {
  suffix = "PM";
  hour = hour % 12;
} else {
  suffix = "AM";
}
const today = `${day}-${month}-${year}`;

module.exports= {today,currentTime}