import rateLimit from 'express-rate-limit';

export const apiLimiter = rateLimit({
    windowMs: 1000 * 60 * 15,
    max: 100,
    message: 'Too manyrequest form this IP, please try after some time'
})