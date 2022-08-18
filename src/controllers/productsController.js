const {loadProducts, storeProducts, actId} = require("../data/db_module");

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
		const products = loadProducts();
		const {name, price, discount, category, description} = req.body;
		const id = products[products.length - 1].id;

		const newProduct ={
			...req.body,
			id: id+1,
			name: name.trim(),
			price: +price,
			discount: +discount,
		}
		const productsNew = [...products, newProduct];
		storeProducts(productsNew);
		return res.redirect("/");
	},
	edit: (req, res) => {
		const products = loadProducts();
		const productToEdit = products.find(product => product.id === +req.params.id)
		return res.render("product-edit-form",{
			productToEdit,
		})
	},
	update: (req, res) => {
		const products = loadProducts();
		const {id} = req.params;
		const {name, price, discount, category, description} = req.body;
		const productsModify = products.map(product =>{
			if (product.id === +id) {
				return {
					...product,
					name: name.trim(),
					price: +price,
					discount: +discount,
					category,
					description,
				};
			};
			return product;
		});
		storeProducts(productsModify);
		return res.redirect("/products/edit/" + req.params.id);
	},
	destroy : (req, res) => {
		const products = loadProducts();

		const productsModify = products.filter(product => product.id !== +req.params.id)
		actId(productsModify);
		storeProducts(productsModify);

		return res.redirect("/products");
	}
};

module.exports = controller;