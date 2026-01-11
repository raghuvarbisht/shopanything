import mongoose from "mongoose";

const categorySchema =  new mongoose.Schema({
    name: {
        type: String,
        required:[true, 'category name is required'],
        trim: true,
        unique: true,        
        maxlength:[100, 'catgeory name length should be 100']
    },
    slug: {
      type: String,
      unique: true
    },

    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null
    },
    isActive :{
        type: Boolean,
        default: true
    }

},{ timestamps: true});


const categoryModel = mongoose.model('Category', categorySchema);
//get active product

export default categoryModel;