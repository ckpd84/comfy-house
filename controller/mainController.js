let fs = require("fs");
let productosJSON = fs.readFileSync("products.json", { encoding: "utf-8" });
let productos = JSON.parse(productosJSON);
console.log(productos);

let mainController = {
  index: (req, res) => {
    res.render("index", { productos: productos });
  },
};

module.exports = mainController;
