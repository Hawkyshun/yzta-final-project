const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email adresi gereklidir'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Geçerli bir email adresi giriniz']
  },
  password: {
    type: String,
    required: [true, 'Şifre gereklidir'],
    minlength: [6, 'Şifre en az 6 karakter olmalıdır']
  },
  firstName: {
    type: String,
    required: [true, 'Ad gereklidir'],
    trim: true,
    maxlength: [50, 'Ad en fazla 50 karakter olabilir']
  },
  lastName: {
    type: String,
    required: [true, 'Soyad gereklidir'],
    trim: true,
    maxlength: [50, 'Soyad en fazla 50 karakter olabilir']
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Doğum tarihi gereklidir']
  },
  gender: {
    type: String,
    enum: ['erkek', 'kadın', 'diğer'],
    required: [true, 'Cinsiyet gereklidir']
  },
  educationLevel: {
    type: String,
    enum: ['ilkokul', 'ortaokul', 'lise', 'üniversite', 'yükseklisans', 'doktora'],
    required: [true, 'Eğitim seviyesi gereklidir']
  },
  medicalHistory: {
    hasNeurologicalConditions: {
      type: Boolean,
      default: false
    },
    hasMentalHealthConditions: {
      type: Boolean,
      default: false
    },
    medications: [{
      name: String,
      dosage: String,
      frequency: String
    }],
    notes: String
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date,
    default: Date.now
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date
}, {
  timestamps: true
});

// Şifre hashleme middleware
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Şifre karşılaştırma metodu
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Kullanıcı bilgilerini döndürme (şifre hariç)
userSchema.methods.toJSON = function() {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.resetPasswordToken;
  delete userObject.resetPasswordExpires;
  return userObject;
};

module.exports = mongoose.model('User', userSchema); 