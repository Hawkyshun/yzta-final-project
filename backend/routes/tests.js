const express = require('express');
const TestResult = require('../models/TestResult');
const auth = require('../middleware/auth');
const { validate, testSchemas } = require('../middleware/validation');
const aiService = require('../services/aiService');

const router = express.Router();

// Test sonucu gönderme
router.post('/submit', auth, validate(testSchemas.submitResult), async (req, res) => {
  try {
    const testData = req.body;
    const userId = req.user._id;

    // Kullanıcı profili hazırlama
    const userProfile = {
      age: req.user.age || 30,
      gender: req.user.gender,
      educationLevel: req.user.educationLevel,
      medicalHistory: req.user.medicalHistory || {}
    };

    // AI analizi
    const aiAnalysis = await aiService.analyzeTestResult(testData, userProfile);

    // Test sonucu kaydetme
    const testResult = new TestResult({
      userId,
      ...testData,
      aiAnalysis
    });

    await testResult.save();

    res.status(201).json({
      message: 'Test sonucu başarıyla kaydedildi',
      testResult: {
        id: testResult._id,
        testType: testResult.testType,
        testName: testResult.testName,
        score: testResult.score,
        maxScore: testResult.maxScore,
        percentage: testResult.percentage,
        performanceLevel: testResult.getPerformanceLevel(),
        aiAnalysis: testResult.aiAnalysis,
        completedAt: testResult.completedAt
      }
    });
  } catch (error) {
    console.error('Test sonucu kaydetme hatası:', error);
    res.status(500).json({
      error: 'Sunucu hatası',
      message: 'Test sonucu kaydedilirken bir hata oluştu'
    });
  }
});

// Kullanıcının test sonuçlarını getirme
router.get('/results', auth, async (req, res) => {
  try {
    const { page = 1, limit = 10, testType } = req.query;
    const skip = (page - 1) * limit;

    const filter = { userId: req.user._id };
    if (testType) {
      filter.testType = testType;
    }

    const testResults = await TestResult.find(filter)
      .sort({ completedAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate('userId', 'firstName lastName email');

    const total = await TestResult.countDocuments(filter);

    res.json({
      testResults,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalResults: total,
        hasNext: skip + testResults.length < total,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Test sonuçları getirme hatası:', error);
    res.status(500).json({
      error: 'Sunucu hatası',
      message: 'Test sonuçları alınırken bir hata oluştu'
    });
  }
});

// Belirli bir test sonucunu getirme
router.get('/results/:id', auth, async (req, res) => {
  try {
    const testResult = await TestResult.findOne({
      _id: req.params.id,
      userId: req.user._id
    }).populate('userId', 'firstName lastName email');

    if (!testResult) {
      return res.status(404).json({
        error: 'Test sonucu bulunamadı',
        message: 'Belirtilen test sonucu mevcut değil'
      });
    }

    res.json({
      testResult: {
        ...testResult.toObject(),
        performanceLevel: testResult.getPerformanceLevel(),
        normalizedScore: testResult.getNormalizedScore()
      }
    });
  } catch (error) {
    console.error('Test sonucu getirme hatası:', error);
    res.status(500).json({
      error: 'Sunucu hatası',
      message: 'Test sonucu alınırken bir hata oluştu'
    });
  }
});

// Test istatistikleri
router.get('/stats', auth, async (req, res) => {
  try {
    const userId = req.user._id;

    // Genel istatistikler
    const totalTests = await TestResult.countDocuments({ userId });
    const averageScore = await TestResult.aggregate([
      { $match: { userId } },
      { $group: { _id: null, avgScore: { $avg: '$percentage' } } }
    ]);

    // Test türüne göre istatistikler
    const testTypeStats = await TestResult.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: '$testType',
          count: { $sum: 1 },
          avgScore: { $avg: '$percentage' },
          bestScore: { $max: '$percentage' },
          lastTest: { $max: '$completedAt' }
        }
      }
    ]);

    // Son 30 günlük aktivite
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentActivity = await TestResult.aggregate([
      {
        $match: {
          userId,
          completedAt: { $gte: thirtyDaysAgo }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$completedAt' } },
          count: { $sum: 1 },
          avgScore: { $avg: '$percentage' }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json({
      stats: {
        totalTests,
        averageScore: averageScore[0]?.avgScore || 0,
        testTypeStats,
        recentActivity
      }
    });
  } catch (error) {
    console.error('İstatistik getirme hatası:', error);
    res.status(500).json({
      error: 'Sunucu hatası',
      message: 'İstatistikler alınırken bir hata oluştu'
    });
  }
});

// Test türlerini getirme
router.get('/types', auth, async (req, res) => {
  try {
    const testTypes = [
      {
        id: 'dil-yazi',
        name: 'Dil ve Yazı Testi',
        description: 'Dil becerileri, kelime hazinesi ve yazım kuralları testi',
        estimatedDuration: 15, // dakika
        questions: 10,
        icon: '✏️'
      },
      {
        id: 'bellek',
        name: 'Bellek Testi',
        description: 'Kısa ve uzun süreli bellek performansı testi',
        estimatedDuration: 10,
        questions: 8,
        icon: '🧠'
      },
      {
        id: 'dikkat-konsantrasyon',
        name: 'Dikkat ve Konsantrasyon Testi',
        description: 'Dikkat süresi ve konsantrasyon becerisi testi',
        estimatedDuration: 12,
        questions: 12,
        icon: '❗'
      },
      {
        id: 'gorsel-algisal',
        name: 'Görsel Algısal Test',
        description: 'Görsel algı ve mekansal beceri testi',
        estimatedDuration: 8,
        questions: 6,
        icon: '👁️'
      },
      {
        id: 'zaman-yer-yonelim',
        name: 'Zaman Yer Yönelimi Testi',
        description: 'Zaman ve mekan algısı testi',
        estimatedDuration: 5,
        questions: 5,
        icon: '🕒'
      }
    ];

    res.json({ testTypes });
  } catch (error) {
    console.error('Test türleri getirme hatası:', error);
    res.status(500).json({
      error: 'Sunucu hatası',
      message: 'Test türleri alınırken bir hata oluştu'
    });
  }
});

module.exports = router; 