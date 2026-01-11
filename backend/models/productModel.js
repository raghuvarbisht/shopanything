import mongoose from 'mongoose';
import {PRODUCT_MESSAGES} from '../constants/message.js';

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true, PRODUCT_MESSAGES.NAME_REQUIRED],
        trim: true,
        maxlength:[200, PRODUCT_MESSAGES.NAME_TOO_LONG],
    },
    slug:{
        type: String,
        required: [true, PRODUCT_MESSAGES.SLUG_REQUIRED],
        unique:true
    },
    description:{
        type: String,
        required:[true, PRODUCT_MESSAGES.PRODUCT_DESC_REQUIRED],
        maxlength:[1000, PRODUCT_MESSAGES.PRODUCT_DESC_LENGTH]
    },
    discountPrice: {        
        type: Number 
    },
    price: {
        type: Number,
        required:[true, PRODUCT_MESSAGES.PRICE_REQUIRED]
    },
    stock:{
        type: Number,
        required:[true,  PRODUCT_MESSAGES.STOCK_REQUIRED] 
    },
    brand: {
      type: String,
      required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:[true, PRODUCT_MESSAGES.CATEGORY_REQUIRED]
    },
    ratings: {
        type: Number,
        default: 0,
        min: [0, PRODUCT_MESSAGES.MIN_RATING],
        max: [5, PRODUCT_MESSAGES.MAX_RATING]
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    images:[{
        public_id: {
         type: String,
        },
        url: {
         type: String
        }
    }],
    isActive: {
        type: Boolean,
        default: true
    }

},{timestamps: true})


const productModel= mongoose.model('Products',productSchema);
export default productModel;