const multer = require('multer');
const path = require('path');

// Cấu hình storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Thư mục lưu ảnh
    },
    filename: function (req, file, cb) {
        // Tạo tên file ngẫu nhiên để tránh trùng lặp
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// Filter để chỉ chấp nhận file ảnh
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Not an image! Please upload only images.'), false);
    }
};

// Cấu hình upload
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // Giới hạn 5MB
        files: 10 // Giới hạn 10 ảnh
    }
});

module.exports = upload; 