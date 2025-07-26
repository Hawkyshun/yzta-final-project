const express = require('express');
const auth = require('../middleware/auth');
const aiService = require('../services/aiService');
const TestResult = require('../models/TestResult');

const router = express.Router();

// AI analizi isteği
router.post('/analyze', auth, async (req, res) => {
  try {
    const { testData } = req.body;

    if (!testData) {
      return res.status(400).json({
        error: 'Eksik veri',
        message: 'Test verisi gereklidir'
      });
    }

    // Kullanıcı profili hazırlama
    const userProfile = {
      age: req.user.age || 30,
      gender: req.user.gender,
      educationLevel: req.user.educationLevel,
      medicalHistory: req.user.medicalHistory || {}
    };

    // AI analizi
    const analysis = await aiService.analyzeTestResult(testData, userProfile);

    res.json({
      analysis,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('AI analiz hatası:', error);
    res.status(500).json({
      error: 'AI analiz hatası',
      message: 'Analiz sırasında bir hata oluştu'
    });
  }
});

// Kişiselleştirilmiş öneriler
router.get('/recommendations', auth, async (req, res) => {
  try {
    // Kullanıcının son test sonuçlarını al
    const recentTests = await TestResult.find({ userId: req.user._id })
      .sort({ completedAt: -1 })
      .limit(10);

    // Kullanıcı profili
    const userProfile = {
      age: req.user.age || 30,
      gender: req.user.gender,
      educationLevel: req.user.educationLevel,
      medicalHistory: req.user.medicalHistory || {}
    };

    // Kişiselleştirilmiş öneriler
    const recommendations = await aiService.generatePersonalizedRecommendations(
      userProfile,
      recentTests
    );

    res.json({
      recommendations,
      basedOn: {
        totalTests: recentTests.length,
        lastTestDate: recentTests[0]?.completedAt || null
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Öneri oluşturma hatası:', error);
    res.status(500).json({
      error: 'Öneri hatası',
      message: 'Kişiselleştirilmiş öneriler oluşturulurken bir hata oluştu'
    });
  }
});

// Test sonucu karşılaştırması
router.post('/compare', auth, async (req, res) => {
  try {
    const { testResultId1, testResultId2 } = req.body;

    if (!testResultId1 || !testResultId2) {
      return res.status(400).json({
        error: 'Eksik veri',
        message: 'İki test sonucu ID\'si gereklidir'
      });
    }

    // Test sonuçlarını getir
    const test1 = await TestResult.findOne({
      _id: testResultId1,
      userId: req.user._id
    });

    const test2 = await TestResult.findOne({
      _id: testResultId2,
      userId: req.user._id
    });

    if (!test1 || !test2) {
      return res.status(404).json({
        error: 'Test sonucu bulunamadı',
        message: 'Belirtilen test sonuçları mevcut değil'
      });
    }

    // Karşılaştırma analizi
    const comparison = {
      test1: {
        id: test1._id,
        testName: test1.testName,
        score: test1.score,
        maxScore: test1.maxScore,
        percentage: test1.percentage,
        performanceLevel: test1.getPerformanceLevel(),
        completedAt: test1.completedAt
      },
      test2: {
        id: test2._id,
        testName: test2.testName,
        score: test2.score,
        maxScore: test2.maxScore,
        percentage: test2.percentage,
        performanceLevel: test2.getPerformanceLevel(),
        completedAt: test2.completedAt
      },
      comparison: {
        scoreDifference: test1.percentage - test2.percentage,
        improvement: test1.percentage > test2.percentage,
        timeDifference: Math.abs(test1.completedAt - test2.completedAt) / (1000 * 60 * 60 * 24), // gün
        trend: test1.percentage > test2.percentage ? 'iyileşme' : 'düşüş'
      }
    };

    res.json({
      comparison,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Karşılaştırma hatası:', error);
    res.status(500).json({
      error: 'Karşılaştırma hatası',
      message: 'Test sonuçları karşılaştırılırken bir hata oluştu'
    });
  }
});

// AI sağlık durumu özeti
router.get('/health-summary', auth, async (req, res) => {
  try {
    // Kullanıcının tüm test sonuçlarını al
    const allTests = await TestResult.find({ userId: req.user._id })
      .sort({ completedAt: -1 });

    if (allTests.length === 0) {
      return res.json({
        summary: {
          message: 'Henüz test sonucunuz bulunmuyor. İlk testinizi tamamlayarak başlayın.',
          riskLevel: 'belirsiz',
          recommendations: [
            'İlk kognitif testinizi tamamlayın',
            'Düzenli test yapma alışkanlığı edinin',
            'Sağlıklı yaşam tarzı benimseyin'
          ]
        }
      });
    }

    // Genel istatistikler
    const totalTests = allTests.length;
    const averageScore = allTests.reduce((sum, test) => sum + test.percentage, 0) / totalTests;
    const recentTests = allTests.slice(0, 5);
    const recentAverage = recentTests.reduce((sum, test) => sum + test.percentage, 0) / recentTests.length;

    // Risk seviyesi hesaplama
    let riskLevel = 'düşük';
    if (averageScore < 50) riskLevel = 'yüksek';
    else if (averageScore < 70) riskLevel = 'orta';

    // Trend analizi
    const trend = recentAverage > averageScore ? 'iyileşme' : 
                  recentAverage < averageScore ? 'düşüş' : 'stabil';

    const summary = {
      totalTests,
      averageScore: Math.round(averageScore * 10) / 10,
      recentAverage: Math.round(recentAverage * 10) / 10,
      riskLevel,
      trend,
      lastTestDate: allTests[0].completedAt,
      testFrequency: totalTests > 1 ? 
        Math.round((allTests[0].completedAt - allTests[allTests.length - 1].completedAt) / (1000 * 60 * 60 * 24) / (totalTests - 1)) : 0,
      recommendations: [
        'Düzenli kognitif egzersizler yapın',
        'Sosyal aktivitelere katılın',
        'Sağlıklı beslenme düzenini koruyun',
        'Yeterli uyku alın'
      ]
    };

    res.json({
      summary,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Sağlık özeti hatası:', error);
    res.status(500).json({
      error: 'Özet hatası',
      message: 'Sağlık durumu özeti oluşturulurken bir hata oluştu'
    });
  }
});

// AI ile dinamik soru üretimi
router.post('/generate-question', auth, async (req, res) => {
  try {
    const { testType, difficulty = 'orta', language = 'tr' } = req.body;
    if (!testType) {
      return res.status(400).json({ error: 'testType zorunlu' });
    }
    const questionObj = await aiService.generateQuestion({ testType, difficulty, language });
    res.json(questionObj);
  } catch (error) {
    console.error('AI soru üretimi hatası:', error);
    res.status(500).json({ error: 'AI soru üretimi hatası' });
  }
});

// AI ile açık uçlu cevap değerlendirme
router.post('/evaluate-answer', auth, async (req, res) => {
  try {
    const { question, userAnswer, testType } = req.body;
    if (!question || !userAnswer) {
      return res.status(400).json({ error: 'question ve userAnswer zorunlu' });
    }
    const evaluation = await aiService.evaluateAnswer({ question, userAnswer, testType });
    res.json(evaluation);
  } catch (error) {
    console.error('AI cevap değerlendirme hatası:', error);
    res.status(500).json({ error: 'AI cevap değerlendirme hatası' });
  }
});

module.exports = router; 