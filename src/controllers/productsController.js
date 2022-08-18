const {loadProducts, storeProducts} = require("../data/db_module");

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
		const products = loadProducts();
		const {name, price, discount, category, description} = req.body;
		const id = products[products.length - 1].id;

		const newProduct ={
			...req.body,
			id: id+1,
			price: +price,
			discount: +discount,
		}
		const productsNew = [...products, newProduct];
		storeProducts(productsNew);
		return res.redirect("/");
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