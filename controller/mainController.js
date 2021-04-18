const fs = require("fs");
const productosJSON = fs.readFileSync("./data/products.json", {
	encoding: "utf-8",
});
const productos = JSON.parse(productosJSON);

const mainController = {
	index: (req, res) => {
		res.render("index", { productos });
	},
};

module.exports = mainController;
