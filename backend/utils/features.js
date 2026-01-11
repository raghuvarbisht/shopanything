import DataURIParser from 'datauri/parser.js'
import path from 'path'
// for file upload
export const  getDataUri = (file) => {
    const parser = new DataURIParser();
    const extName = path.extname(file.originalname).toString();
    return parser.format(extName, file.buffer);
};


export const sendSuccess = (res,statusCode, message, data = {}) => {
    res.status(statusCode).send({
        success: true,
        message,
        ...data
    })
}

export const sendError = (res,statusCode, message, error = {}) => {
    res.status(statusCode).send({
        success: false,
        message,
       error
    })
}