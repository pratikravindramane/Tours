const convertDate = (date) => {
  const newDate = new Date(date);
  const options = {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  };
  return newDate.toLocaleString("en-US", options);
};
module.exports = { convertDate };
