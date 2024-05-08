// routes.js
const express = require('express');
const router = express.Router();
const UserModels = require('./models/UserModels');
const multer = require("multer")

const authController = require('./controllers/authController');;
router.post('/login', authController.login);
router.post('/register', authController.register);

//CONTROLLER
const productController = require('./controllers/ProductControllers')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'images/products'); // Simpan file di folder 'uploads'
    },
    filename: function(req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Nama file yang diunggah
    }
  });
  const upload = multer({ storage: storage });
  
router.get('/products', productController.viewProducts);
router.post('/products', upload.single('image'), productController.addProducts);
router.get('/products/:id', productController.detailProducts);
router.put('/products/:id', upload.single('image'), productController.updateProducts);
router.delete('/products/:id', productController.deleteProducts);


// CREATE
router.post('/users', async (req, res) => {
    try {
        const result = await UserModels.create(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// READ
router.get('/users', async (req, res) => {
    try {
        const result = await UserModels.find();
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// UPDATE
router.put('/users/:id', async (req, res) => {
    try {
        const result = await UserModels.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE
router.delete('/users/:id', async (req, res) => {
    try {
        const id = req.params.id
        const result = await UserModels.findByIdAndDelete(id);
        res.json("Data telah dihapus dengan id", result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
