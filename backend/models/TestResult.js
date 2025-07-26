const mongoose = require('mongoose');

const testResultSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  testType: {
    type: String,
    required: true,
    enum: ['dil-yazi', 'bellek', 'dikkat-konsantrasyon', 'gorsel-algisal', 'zaman-yer-yonelim']
  },
  testName: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true,
    min: 0
  },
  maxScore: {
    type: Number,
    required: true
  },
  percentage: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  duration: {
    type: Number, // saniye cinsinden
    required: true
  },
  answers: [{
    questionId: Number,
    userAnswer: mongoose.Schema.Types.Mixed,
    correctAnswer: mongoose.Schema.Types.Mixed,
    isCorrect: Boolean,
    timeSpent: Number // saniye cinsinden
  }],
  aiAnalysis: {
    riskLevel: {
      type: String,
      enum: ['düşük', 'orta', 'yüksek'],
      default: 'düşük'
    },
    recommendations: [String],
    insights: String,
    confidence: Number // 0-1 arası
  },
  metadata: {
    browser: String,
    device: String,
    screenResolution: String,
    testVersion: String
  },
  completedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Test sonucu performans seviyesi hesaplama
testResultSchema.methods.getPerformanceLevel = function() {
  if (this.percentage >= 90) return 'mükemmel';
  if (this.percentage >= 80) return 'çok iyi';
  if (this.percentage >= 70) return 'iyi';
  if (this.percentage >= 60) return 'orta';
  if (this.percentage >= 50) return 'zayıf';
  return 'çok zayıf';
};

// Yaş grubuna göre normalleştirilmiş skor
testResultSchema.methods.getNormalizedScore = function() {
  // Bu fonksiyon yaş grubuna göre normalleştirilmiş skor hesaplar
  // Gerçek uygulamada norm tabloları kullanılacak
  return this.percentage;
};

module.exports = mongoose.model('TestResult', testResultSchema); 