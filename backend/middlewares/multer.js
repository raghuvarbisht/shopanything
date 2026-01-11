import multer from "multer";
const storage = multer.memoryStorage();

// Multer middleware for single file upload
export const singleUpload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
}).single("file");