const ProductModels = require('../models/ProductModels');

exports.addProducts = async (req, res) => {
    try {
        const product = new ProductModels({
            nama: req.body.nama,
            deskripsi: req.body.deskripsi,
            stok : req.body.stok,
            harga : req.body.harga,
            image: req.file.filename
        });
    
        const result = await ProductModels.create(product);
        res.status(200).json(result);             
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.viewProducts = async (req, res) => {
    try {
        const result = await ProductModels.find();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
        
    }
}

exports.detailProducts = async (req, res) => {
    try {
     const result = await ProductModels.findById(req.params.id);
     res.status(200).json(result);   
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

exports.updateProducts = async (req, res) => {
    try {
        const updateData = {
            nama: req.body.nama,
            deskripsi: req.body.deskripsi,
            stok : req.body.stok,
            harga : req.body.harga,
          };
          if (req.file) {
            updateData.image = req.file.filename;
          }    

          const result = await ProductModels.findByIdAndUpdate(req.params.id, updateData, { new: true });
          res.status(200).json(result);

    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

exports.deleteProducts = async (req, res) => {
    try {
        const id = req.params.id;
        const deleteProduct = await ProductModels.findByIdAndDelete(id);
        res.status(200).json(deleteProduct);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

exports.product_delete = function(req, res, next) {
    Product.findByIdAndRemove(req.params.id, function(err) {
      if (err) return next(err);
      res.status(204).send();
    });
  };

