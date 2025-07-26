const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');
const { validate, authSchemas } = require('../middleware/validation');

const router = express.Router();

// Kullanıcı kaydı
router.post('/register', validate(authSchemas.register), async (req, res) => {
  try {
    const { email, password, firstName, lastName, dateOfBirth, gender, educationLevel } = req.body;

    // Email kontrolü
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        error: 'Kayıt hatası',
        message: 'Bu email adresi zaten kullanılıyor'
      });
    }

    // Yaş hesaplama
    const age = Math.floor((new Date() - new Date(dateOfBirth)) / (365.25 * 24 * 60 * 60 * 1000));

    // Kullanıcı oluşturma
    const user = new User({
      email,
      password,
      firstName,
      lastName,
      dateOfBirth,
      gender,
      educationLevel,
      age
    });

    await user.save();

    // JWT token oluşturma
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.status(201).json({
      message: 'Kullanıcı başarıyla oluşturuldu',
      token,
      user: user.toJSON()
    });
  } catch (error) {
    console.error('Kayıt hatası:', error);
    res.status(500).json({
      error: 'Sunucu hatası',
      message: 'Kayıt işlemi sırasında bir hata oluştu'
    });
  }
});

// Kullanıcı girişi
router.post('/login', validate(authSchemas.login), async (req, res) => {
  try {
    const { email, password } = req.body;

    // Kullanıcı kontrolü
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        error: 'Giriş hatası',
        message: 'Geçersiz email veya şifre'
      });
    }

    // Şifre kontrolü
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        error: 'Giriş hatası',
        message: 'Geçersiz email veya şifre'
      });
    }

    // Hesap aktiflik kontrolü
    if (!user.isActive) {
      return res.status(401).json({
        error: 'Hesap devre dışı',
        message: 'Hesabınız devre dışı bırakılmış'
      });
    }

    // Son giriş tarihini güncelle
    user.lastLogin = new Date();
    await user.save();

    // JWT token oluşturma
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.json({
      message: 'Giriş başarılı',
      token,
      user: user.toJSON()
    });
  } catch (error) {
    console.error('Giriş hatası:', error);
    res.status(500).json({
      error: 'Sunucu hatası',
      message: 'Giriş işlemi sırasında bir hata oluştu'
    });
  }
});

// Kullanıcı profili getirme
router.get('/profile', auth, async (req, res) => {
  try {
    res.json({
      user: req.user
    });
  } catch (error) {
    console.error('Profil getirme hatası:', error);
    res.status(500).json({
      error: 'Sunucu hatası',
      message: 'Profil bilgileri alınırken bir hata oluştu'
    });
  }
});

// Profil güncelleme
router.put('/profile', auth, async (req, res) => {
  try {
    const { firstName, lastName, medicalHistory } = req.body;
    const updates = {};

    if (firstName) updates.firstName = firstName;
    if (lastName) updates.lastName = lastName;
    if (medicalHistory) updates.medicalHistory = medicalHistory;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updates,
      { new: true, runValidators: true }
    ).select('-password');

    res.json({
      message: 'Profil başarıyla güncellendi',
      user
    });
  } catch (error) {
    console.error('Profil güncelleme hatası:', error);
    res.status(500).json({
      error: 'Sunucu hatası',
      message: 'Profil güncellenirken bir hata oluştu'
    });
  }
});

// Şifre sıfırlama isteği
router.post('/forgot-password', validate(authSchemas.forgotPassword), async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      // Güvenlik için kullanıcı bulunamasa da başarılı mesajı döndür
      return res.json({
        message: 'Şifre sıfırlama bağlantısı email adresinize gönderildi'
      });
    }

    // Reset token oluşturma
    const resetToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 saat
    await user.save();

    // Email gönderme işlemi burada yapılacak
    // Şimdilik sadece token'ı döndürüyoruz
    res.json({
      message: 'Şifre sıfırlama bağlantısı email adresinize gönderildi',
      resetToken // Gerçek uygulamada bu kaldırılacak
    });
  } catch (error) {
    console.error('Şifre sıfırlama hatası:', error);
    res.status(500).json({
      error: 'Sunucu hatası',
      message: 'Şifre sıfırlama işlemi sırasında bir hata oluştu'
    });
  }
});

// Şifre sıfırlama
router.post('/reset-password', validate(authSchemas.resetPassword), async (req, res) => {
  try {
    const { token, password } = req.body;

    // Token doğrulama
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user || user.resetPasswordToken !== token || user.resetPasswordExpires < Date.now()) {
      return res.status(400).json({
        error: 'Geçersiz token',
        message: 'Şifre sıfırlama bağlantısı geçersiz veya süresi dolmuş'
      });
    }

    // Yeni şifre ayarlama
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({
      message: 'Şifreniz başarıyla güncellendi'
    });
  } catch (error) {
    console.error('Şifre sıfırlama hatası:', error);
    res.status(500).json({
      error: 'Sunucu hatası',
      message: 'Şifre sıfırlama işlemi sırasında bir hata oluştu'
    });
  }
});

module.exports = router; 