const mongoose = require("mongoose");

var options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose.connect(
  "mongodb+srv://touretjulien:Amelie13@lefeu.ymo29.mongodb.net/notreterreproject?retryWrites=true&w=majority",
  options,
  function (err) {
    console.log(err);
  }
);
