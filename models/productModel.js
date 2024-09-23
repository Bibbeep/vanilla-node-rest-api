const products = require('../data/products');

async function findAll() {
    return new Promise((resolve, reject) => {
        resolve(products);
    });
}

module.exports = {
    findAll,
};