const express = require('express');
const PDFDocument = require('pdfkit');
const TestResult = require('../models/TestResult');
const auth = require('../middleware/auth');

const router = express.Router();

// Kullanıcının tüm sonuçlarını getirme
router.get('/', auth, async (req, res) => {
  try {
    const { page = 1, limit = 20, testType, sortBy = 'completedAt', sortOrder = 'desc' } = req.query;
    const skip = (page - 1) * limit;

    const filter = { userId: req.user._id };
    if (testType) {
      filter.testType = testType;
    }

    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const testResults = await TestResult.find(filter)
      .sort(sortOptions)
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
    console.error('Sonuçlar getirme hatası:', error);
    res.status(500).json({
      error: 'Sunucu hatası',
      message: 'Test sonuçları alınırken bir hata oluştu'
    });
  }
});

// Belirli bir sonucu getirme
router.get('/:id', auth, async (req, res) => {
  try {
    const testResult = await TestResult.findOne({
      _id: req.params.id,
      userId: req.user._id
    }).populate('userId', 'firstName lastName email');

    if (!testResult) {
      return res.status(404).json({
        error: 'Sonuç bulunamadı',
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
    console.error('Sonuç getirme hatası:', error);
    res.status(500).json({
      error: 'Sunucu hatası',
      message: 'Test sonucu alınırken bir hata oluştu'
    });
  }
});

// Sonuç PDF'i oluşturma
router.get('/:id/pdf', auth, async (req, res) => {
  try {
    const testResult = await TestResult.findOne({
      _id: req.params.id,
      userId: req.user._id
    }).populate('userId', 'firstName lastName email');

    if (!testResult) {
      return res.status(404).json({
        error: 'Sonuç bulunamadı',
        message: 'Belirtilen test sonucu mevcut değil'
      });
    }

    // PDF oluşturma
    const doc = new PDFDocument();
    
    // Response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=test-sonucu-${testResult._id}.pdf`);
    
    doc.pipe(res);

    // PDF içeriği
    doc.fontSize(24).text('NeuroScan AI - Test Sonucu', { align: 'center' });
    doc.moveDown();
    
    doc.fontSize(16).text('Kullanıcı Bilgileri');
    doc.fontSize(12).text(`Ad Soyad: ${testResult.userId.firstName} ${testResult.userId.lastName}`);
    doc.fontSize(12).text(`Email: ${testResult.userId.email}`);
    doc.moveDown();
    
    doc.fontSize(16).text('Test Bilgileri');
    doc.fontSize(12).text(`Test Adı: ${testResult.testName}`);
    doc.fontSize(12).text(`Test Türü: ${testResult.testType}`);
    doc.fontSize(12).text(`Tamamlanma Tarihi: ${new Date(testResult.completedAt).toLocaleDateString('tr-TR')}`);
    doc.fontSize(12).text(`Süre: ${Math.floor(testResult.duration / 60)} dakika ${testResult.duration % 60} saniye`);
    doc.moveDown();
    
    doc.fontSize(16).text('Sonuçlar');
    doc.fontSize(12).text(`Skor: ${testResult.score}/${testResult.maxScore}`);
    doc.fontSize(12).text(`Yüzde: %${testResult.percentage}`);
    doc.fontSize(12).text(`Performans Seviyesi: ${testResult.getPerformanceLevel()}`);
    doc.moveDown();
    
    if (testResult.aiAnalysis) {
      doc.fontSize(16).text('AI Analizi');
      doc.fontSize(12).text(`Risk Seviyesi: ${testResult.aiAnalysis.riskLevel}`);
      doc.fontSize(12).text(`Güven Seviyesi: %${Math.round(testResult.aiAnalysis.confidence * 100)}`);
      doc.moveDown();
      
      if (testResult.aiAnalysis.insights) {
        doc.fontSize(14).text('Değerlendirme');
        doc.fontSize(12).text(testResult.aiAnalysis.insights);
        doc.moveDown();
      }
      
      if (testResult.aiAnalysis.recommendations && testResult.aiAnalysis.recommendations.length > 0) {
        doc.fontSize(14).text('Öneriler');
        testResult.aiAnalysis.recommendations.forEach((rec, index) => {
          doc.fontSize(12).text(`${index + 1}. ${rec}`);
        });
        doc.moveDown();
      }
    }
    
    doc.fontSize(10).text('Bu rapor NeuroScan AI tarafından otomatik olarak oluşturulmuştur.', { align: 'center' });
    doc.fontSize(10).text('Tıbbi tanı için mutlaka bir uzmana danışınız.', { align: 'center' });
    
    doc.end();
  } catch (error) {
    console.error('PDF oluşturma hatası:', error);
    res.status(500).json({
      error: 'PDF hatası',
      message: 'PDF oluşturulurken bir hata oluştu'
    });
  }
});

// Sonuç silme
router.delete('/:id', auth, async (req, res) => {
  try {
    const testResult = await TestResult.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!testResult) {
      return res.status(404).json({
        error: 'Sonuç bulunamadı',
        message: 'Belirtilen test sonucu mevcut değil'
      });
    }

    res.json({
      message: 'Test sonucu başarıyla silindi'
    });
  } catch (error) {
    console.error('Sonuç silme hatası:', error);
    res.status(500).json({
      error: 'Sunucu hatası',
      message: 'Test sonucu silinirken bir hata oluştu'
    });
  }
});

// Toplu sonuç istatistikleri
router.get('/stats/overview', auth, async (req, res) => {
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
          worstScore: { $min: '$percentage' },
          lastTest: { $max: '$completedAt' }
        }
      }
    ]);

    // Aylık aktivite
    const monthlyActivity = await TestResult.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: { 
            year: { $year: '$completedAt' },
            month: { $month: '$completedAt' }
          },
          count: { $sum: 1 },
          avgScore: { $avg: '$percentage' }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    // Risk seviyesi dağılımı
    const riskDistribution = await TestResult.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: '$aiAnalysis.riskLevel',
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      overview: {
        totalTests,
        averageScore: averageScore[0]?.avgScore || 0,
        testTypeStats,
        monthlyActivity,
        riskDistribution
      }
    });
  } catch (error) {
    console.error('Genel istatistik hatası:', error);
    res.status(500).json({
      error: 'Sunucu hatası',
      message: 'İstatistikler alınırken bir hata oluştu'
    });
  }
});

module.exports = router; 