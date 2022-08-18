const { loadProducts } = require("../data/db_module")

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");/* Recibe un numero y separa con punto */

const controller = {
	index: (req, res) => {
		// Do the magic
		const products = loadProducts();
		const productsVisited = products.filter(product => product.category === "visited");
		const productsInSale = products.filter(product => product.category === "in-sale");
		return res.render("index", {
			productsVisited,
			productsInSale,
			toThousand
		})
	},
	search: (req, res) => {
		const products = loadProducts();
		let result = [];
		let rest = [];
		products.forEach(product => {
			product.name.toLowerCase().includes(req.query.keywords.toLowerCase()) ? result.push(product) : rest.push(product);
		})
		return res.render("results", {
			result,
			rest,
			keywords: req.query.keywords,
			toThousand
		})	
	},
};

module.exports = controller;
