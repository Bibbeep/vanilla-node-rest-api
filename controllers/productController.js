const Product = require('../models/productModel');
const { getPostData } = require('../utils');

async function getAllProducts(req, res) {
    try {
        const products = await Product.findAll();

        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify(products));
    } catch (error) {
        console.log(error);
    }
}

async function getProductById(req, res, id) {
    try {
        const product = await Product.findById(id);

        if (!product) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({
                message: 'Product Not Found'
            }));
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify(product));
    } catch (error) {
        console.log(error);
    }
}

async function createProduct(req, res) {
    try {
        const body = await getPostData(req);
        const product = JSON.parse(body);
        const newProduct = await Product.create(product);
    
        res.writeHead(201, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify(newProduct));
    } catch (error) {
        console.log(error);
    }
}

async function updateProductById(req, res, id) {
    try {
        const product = await Product.findById(id);

        if (!product) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({
                message: 'Product Not Found'
            }));
        }

        const body = await getPostData(req);
        const productData = JSON.parse(body);
        const updatedProduct = await Product.update(id, productData);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify(updatedProduct));
    } catch (error) {
        console.log(error);
    }
}

async function deleteProductById(req, res, id) {
    try {
        const product = await Product.findById(id);

        if (!product) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({
                message: 'Product Not Found'
            }));
        }

        await Product.remove(id);
        res.writeHead(200, { 'Content-Type': 'application/json'});
        return res.end(JSON.stringify({ message: `Product ${id} Removed` }));
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProductById,
    deleteProductById
};