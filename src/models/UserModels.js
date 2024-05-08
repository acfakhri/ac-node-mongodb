const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Middleware untuk melakukan hashing kata sandi sebelum disimpan ke database
userSchema.pre('save', async function(next) {
  try {
    // Hanya melakukan hashing jika kata sandi telah diubah atau pengguna baru
    if (!this.isModified('password')) {
      return next();
    }
    
    // Generate salt
    const salt = await bcrypt.genSalt(10);
    
    // Hash password dengan salt
    const hashedPassword = await bcrypt.hash(this.password, salt);
    
    // Simpan kata sandi yang telah di-hash
    this.password = hashedPassword;
    
    next();
  } catch (error) {
    next(error);
  }
});

// Method untuk memeriksa apakah kata sandi yang diberikan cocok dengan kata sandi yang tersimpan
userSchema.methods.isValidPassword = async function(password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};

const User = mongoose.model('User', userSchema);

module.exports = User;
