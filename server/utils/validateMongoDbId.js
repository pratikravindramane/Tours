const { default: mongoose } = require("mongoose");

const validateMongoDbId = async (id) => {
  const valid = mongoose.Types.ObjectId.isValid(id);
  if (!valid) throw new Error("Not a Valid ID");
};
module.exports = validateMongoDbId;
