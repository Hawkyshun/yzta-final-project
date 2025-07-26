const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        error: 'Yetkilendirme hatası',
        message: 'Token bulunamadı' 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(401).json({ 
        error: 'Yetkilendirme hatası',
        message: 'Kullanıcı bulunamadı' 
      });
    }

    if (!user.isActive) {
      return res.status(401).json({ 
        error: 'Hesap devre dışı',
        message: 'Hesabınız devre dışı bırakılmış' 
      });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        error: 'Geçersiz token',
        message: 'Token geçersiz veya süresi dolmuş' 
      });
    }
    
    console.error('Auth middleware error:', error);
    res.status(500).json({ 
      error: 'Sunucu hatası',
      message: 'Yetkilendirme işlemi sırasında hata oluştu' 
    });
  }
};

module.exports = auth; 