import productModel from '../models/productModel.js';
// GET ALL PRODUCTS
export const getAllProduct = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.status(200).send({
            success: true,
            message: 'all products fetched successfully',
            products
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'error in fetching products'
        })
    }
    
}

// GET  PRODUCT by id
export const getProductById = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id);
        // validation 
        if(!product) {
            return res.status(404).send({
                success: true,
                message: 'product not found'
            });            
        }
        res.status(200).send({
            success: true,
            message: 'product fetched successfully',
            product
        })

    } catch (error) {
        console.log(error);
        if(error.name === 'CastError') {
            return res.status(500).send({
            success: false,
            message: 'Invalid product id'            
        })

        }
        res.status(500).send({
            success: false,
            message: 'error in fetching products',
            error,
        })
    }
    
}