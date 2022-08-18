const {loadProducts} = require("../data/db_module")

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");/* Recibe un numero y separa con punto */

const controller = {
	index: (req, res) => {
		// Do the magic
		const products = loadProducts();
		const productsVisited = products.filter(product => product.category === "visited");
		const productsInSale = products.filter(product => product.category === "in-sale");
		return res.render("index",{
			productsVisited,
			productsInSale,
			toThousand
		})
	},
	search: (req, res) => {
		// Do the magic
	},
};

module.exports = controller;
