const compareDates = (date1, date2) => {
  const data1 = new Date(date1);
  const data2 = new Date(date2);
  if (
    data1.getFullYear() == data2.getFullYear() &&
    data1.getMonth() == data2.getMonth() &&
    data1.getDate() == data2.getDate()
  ) {
    return true;
  } else {
    return false;
  }
};
module.exports = { compareDates };
