let products = require('../data/products.json');
const { writeDataToFile } = require('../utils');
const { v4: uuidv4 } = require('uuid');

async function findAll() {
    return new Promise((resolve, reject) => {
        resolve(products);
    });
}

async function findById(id) {
    return new Promise((resolve, reject) => {
        const index = products.findIndex((item) => item.id === id);
        resolve(products[index]);
    });
}

async function create(product) {
    return new Promise((resolve, reject) => {
        const newProduct = { id: uuidv4(), ...product };
        products.push(newProduct);
        writeDataToFile('./data/products.json', products);
        resolve(newProduct);
    });
}

async function update(id, product) {
    return new Promise((resolve, reject) => {
        const index = products.findIndex((item) => item.id === id);
        products[index] = { ...products[index], ...product };
        writeDataToFile('./data/products.json', products);
        resolve(products[index]);
    });
}

async function remove(id) {
    return new Promise((resolve, reject) => {
        products = products.filter((item) => item.id !== id);
        writeDataToFile('./data/products.json', products);
        resolve();
    });
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
};