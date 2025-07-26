const Joi = require('joi');

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    
    if (error) {
      const errorMessage = error.details.map(detail => detail.message).join(', ');
      return res.status(400).json({
        error: 'Validasyon hatası',
        message: errorMessage
      });
    }
    
    next();
  };
};

// Validation schemas
const authSchemas = {
  register: Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': 'Geçerli bir email adresi giriniz',
      'any.required': 'Email adresi gereklidir'
    }),
    password: Joi.string().min(6).required().messages({
      'string.min': 'Şifre en az 6 karakter olmalıdır',
      'any.required': 'Şifre gereklidir'
    }),
    firstName: Joi.string().min(2).max(50).required().messages({
      'string.min': 'Ad en az 2 karakter olmalıdır',
      'string.max': 'Ad en fazla 50 karakter olabilir',
      'any.required': 'Ad gereklidir'
    }),
    lastName: Joi.string().min(2).max(50).required().messages({
      'string.min': 'Soyad en az 2 karakter olmalıdır',
      'string.max': 'Soyad en fazla 50 karakter olabilir',
      'any.required': 'Soyad gereklidir'
    }),
    dateOfBirth: Joi.date().max('now').required().messages({
      'date.max': 'Geçerli bir doğum tarihi giriniz',
      'any.required': 'Doğum tarihi gereklidir'
    }),
    gender: Joi.string().valid('erkek', 'kadın', 'diğer').required().messages({
      'any.only': 'Geçerli bir cinsiyet seçiniz',
      'any.required': 'Cinsiyet gereklidir'
    }),
    educationLevel: Joi.string().valid('ilkokul', 'ortaokul', 'lise', 'üniversite', 'yükseklisans', 'doktora').required().messages({
      'any.only': 'Geçerli bir eğitim seviyesi seçiniz',
      'any.required': 'Eğitim seviyesi gereklidir'
    })
  }),

  login: Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': 'Geçerli bir email adresi giriniz',
      'any.required': 'Email adresi gereklidir'
    }),
    password: Joi.string().required().messages({
      'any.required': 'Şifre gereklidir'
    })
  }),

  forgotPassword: Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': 'Geçerli bir email adresi giriniz',
      'any.required': 'Email adresi gereklidir'
    })
  }),

  resetPassword: Joi.object({
    token: Joi.string().required().messages({
      'any.required': 'Token gereklidir'
    }),
    password: Joi.string().min(6).required().messages({
      'string.min': 'Şifre en az 6 karakter olmalıdır',
      'any.required': 'Şifre gereklidir'
    })
  })
};

const testSchemas = {
  submitResult: Joi.object({
    testType: Joi.string().valid('dil-yazi', 'bellek', 'dikkat-konsantrasyon', 'gorsel-algisal', 'zaman-yer-yonelim').required(),
    testName: Joi.string().required(),
    score: Joi.number().min(0).required(),
    maxScore: Joi.number().min(1).required(),
    percentage: Joi.number().min(0).max(100).required(),
    duration: Joi.number().min(1).required(),
    answers: Joi.array().items(
      Joi.object({
        questionId: Joi.number().required(),
        userAnswer: Joi.any().required(),
        correctAnswer: Joi.any().required(),
        isCorrect: Joi.boolean().required(),
        timeSpent: Joi.number().min(0).required()
      })
    ).required(),
    metadata: Joi.object({
      browser: Joi.string(),
      device: Joi.string(),
      screenResolution: Joi.string(),
      testVersion: Joi.string()
    }).optional()
  })
};

module.exports = {
  validate,
  authSchemas,
  testSchemas
}; 