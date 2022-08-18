const {loadProducts} = require("../data/db_module");

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		// Do the magic
		const products = loadProducts();

		return res.render("products",{
			products,
			toThousand
		})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		// Do the magic
		const products = loadProducts();
		const product = products.find(product => product.id === +req.params.id)
		return res.render("detail",{
			product,
			toThousand
		})
	},

	// Create - Form to create
	create: (req, res) => {
		// Do the magic
	},
	
	// Create -  Method to store
	store: (req, res) => {
		// Do the magic
	},

	// Update - Form to edit
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