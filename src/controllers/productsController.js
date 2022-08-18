const {loadProducts} = require("../data/db_module");

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		const products = loadProducts();
		return res.render("products",{
			products,
			toThousand
		})
	},
	detail: (req, res) => {
		const products = loadProducts();
		const product = products.find(product => product.id === +req.params.id)
		return res.render("detail",{
			product,
			toThousand
		})
	},
	create: (req, res) => {
		const products = loadProducts();
		return res.render("product-create-form",{
			products,
		})
	},
	store: (req, res) => {
		// Do the magic
		
	},
	edit: (req, res) => {
		// Do the magic
	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
	}
};

module.exports = controller;