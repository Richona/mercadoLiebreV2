const fs = require('fs');
const path = require('path');

const loadProducts = ()=>{
    return JSON.parse(fs.readFileSync(path.join(__dirname, "./productsDataBase.json"), "utf-8"))
};

const storeProducts = (products) => {
    fs.writeFileSync(path.join(__dirname, "./productsDataBase.json"), JSON.stringify(products, null, 3), "utf-8")/* Convertimos el objeto a JSON y lo escribimos en products.json */
};

const actId = (products) => {
    for (let x = 0; x < products.length; x++) {
        x === 0 ? products[x].id = 1 : products[x].id = x + 1;  
    }
}

module.exports = {
    loadProducts,
    storeProducts,
    actId
};