const mongoose = require("mongoose");

var options = {
	connectTimeoutMS: 5000,
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

const connection = mongoose.connect(
	"mongodb+srv://touretjulien:Amelie13@lefeu.ymo29.mongodb.net/notreterreproject?retryWrites=true&w=majority",
	options,
	function (err) {
		if (err) {
			console.log(`❌ Database is not connected ❌ --> ${err}`);
		} else {
			console.info("✅ Database connected successfully ✅");
		}
	},
);

module.exports = connection;
