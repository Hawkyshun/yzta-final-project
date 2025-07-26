import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";
import ThemeSwitch from "../components/ThemeSwitch";
import apiService from "../services/api";

export default function ResultsPage() {
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedTestType, setSelectedTestType] = useState('');
  const [toast, setToast] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    loadResults();
    loadStats();
  }, [currentPage, selectedTestType]);

  const loadResults = async () => {
    try {
      setLoading(true);
      const response = await apiService.getAllResults(currentPage, 10, selectedTestType);
      setResults(response.testResults);
      setTotalPages(response.pagination.totalPages);
    } catch (error) {
      setToast({
        message: "Sonuçlar yüklenirken hata oluştu",
        type: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const response = await apiService.getResultsOverview();
      setStats(response.overview);
    } catch (error) {
      console.error('İstatistik yükleme hatası:', error);
    }
  };

  const handleDownloadPDF = async (resultId) => {
    try {
      await apiService.downloadResultPDF(resultId);
      setToast({
        message: "PDF başarıyla indirildi",
        type: "success"
      });
    } catch (error) {
      setToast({
        message: "PDF indirme hatası",
        type: "error"
      });
    }
  };

  const handleDeleteResult = async (resultId) => {
    if (window.confirm('Bu test sonucunu silmek istediğinizden emin misiniz?')) {
      try {
        await apiService.deleteResult(resultId);
        setToast({
          message: "Test sonucu silindi",
          type: "success"
        });
        loadResults();
      } catch (error) {
        setToast({
          message: "Silme işlemi başarısız",
          type: "error"
        });
      }
    }
  };

  const handleLogout = () => {
    setToast({
      message: "Çıkış yapıldı. Ana sayfaya yönlendiriliyorsunuz.",
      type: "info"
    });
    setTimeout(() => navigate("/"), 1500);
  };

  const getPerformanceColor = (percentage) => {
    if (percentage >= 90) return '#10b981';
    if (percentage >= 80) return '#3b82f6';
    if (percentage >= 70) return '#f59e0b';
    if (percentage >= 60) return '#f97316';
    return '#ef4444';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const testTypeNames = {
    'dil-yazi': 'Dil ve Yazı',
    'bellek': 'Bellek',
    'dikkat-konsantrasyon': 'Dikkat ve Konsantrasyon',
    'gorsel-algisal': 'Görsel Algısal',
    'zaman-yer-yonelim': 'Zaman Yer Yönelimi'
  };

  if (loading) {
    return (
      <div className="results-container">
        <div className="loading">Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="results-container">
      <div style={{ 
        position: 'absolute', 
        top: '20px', 
        right: '20px',
        display: 'flex',
        gap: '10px',
        alignItems: 'center'
      }}>
        <ThemeSwitch />
        <button 
          onClick={handleLogout}
          style={{
            background: '#dc2626',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            padding: '8px 16px',
            fontSize: '0.9rem',
            cursor: 'pointer',
            transition: 'background 0.2s'
          }}
          onMouseOver={(e) => e.target.style.background = '#b91c1c'}
          onMouseOut={(e) => e.target.style.background = '#dc2626'}
        >
          🚪 Çıkış Yap
        </button>
      </div>

      <h1>Test Sonuçlarım</h1>

      {/* İstatistikler */}
      {stats && (
        <div className="stats-section">
          <h2>Genel İstatistikler</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <h3>Toplam Test</h3>
              <p>{stats.totalTests}</p>
            </div>
            <div className="stat-card">
              <h3>Ortalama Skor</h3>
              <p>%{Math.round(stats.averageScore)}</p>
            </div>
            <div className="stat-card">
              <h3>En İyi Skor</h3>
              <p>%{Math.round(Math.max(...stats.testTypeStats.map(s => s.bestScore)))}</p>
            </div>
          </div>
        </div>
      )}

      {/* Filtreler */}
      <div className="filters-section">
        <select 
          value={selectedTestType} 
          onChange={(e) => setSelectedTestType(e.target.value)}
          className="filter-select"
        >
          <option value="">Tüm Testler</option>
          <option value="dil-yazi">Dil ve Yazı</option>
          <option value="bellek">Bellek</option>
          <option value="dikkat-konsantrasyon">Dikkat ve Konsantrasyon</option>
          <option value="gorsel-algisal">Görsel Algısal</option>
          <option value="zaman-yer-yonelim">Zaman Yer Yönelimi</option>
        </select>
      </div>

      {/* Sonuçlar Listesi */}
      <div className="results-list">
        {results.length === 0 ? (
          <div className="no-results">
            <p>Henüz test sonucunuz bulunmuyor.</p>
            <button 
              onClick={() => navigate('/tests')}
              className="primary-btn"
            >
              Test Yapmaya Başla
            </button>
          </div>
        ) : (
          results.map((result) => (
            <div key={result._id} className="result-card">
              <div className="result-header">
                <h3>{result.testName}</h3>
                <span className="test-type">{testTypeNames[result.testType]}</span>
              </div>
              
              <div className="result-details">
                <div className="score-section">
                  <div className="score-circle" style={{ 
                    borderColor: getPerformanceColor(result.percentage) 
                  }}>
                    <span className="score-percentage">%{result.percentage}</span>
                  </div>
                  <div className="score-info">
                    <p>Skor: {result.score}/{result.maxScore}</p>
                    <p>Performans: {result.performanceLevel}</p>
                  </div>
                </div>
                
                <div className="result-meta">
                  <p>Tarih: {formatDate(result.completedAt)}</p>
                  <p>Süre: {Math.floor(result.duration / 60)}:{String(result.duration % 60).padStart(2, '0')}</p>
                  {result.aiAnalysis && (
                    <p>Risk: {result.aiAnalysis.riskLevel}</p>
                  )}
                </div>
              </div>

              <div className="result-actions">
                <button 
                  onClick={() => navigate(`/result/${result._id}`)}
                  className="action-btn primary"
                >
                  Detayları Gör
                </button>
                <button 
                  onClick={() => handleDownloadPDF(result._id)}
                  className="action-btn secondary"
                >
                  PDF İndir
                </button>
                <button 
                  onClick={() => handleDeleteResult(result._id)}
                  className="action-btn danger"
                >
                  Sil
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Sayfalama */}
      {totalPages > 1 && (
        <div className="pagination">
          <button 
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="page-btn"
          >
            Önceki
          </button>
          
          <span className="page-info">
            Sayfa {currentPage} / {totalPages}
          </span>
          
          <button 
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="page-btn"
          >
            Sonraki
          </button>
        </div>
      )}

      <div className="results-actions">
        <button 
          onClick={() => navigate('/tests')}
          className="primary-btn"
        >
          Test Listesine Dön
        </button>
      </div>
      
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
} 