import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";
import ThemeSwitch from "../components/ThemeSwitch";

export default function TestListPage() {
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);

  const handleTestClick = (testType) => {
    if (testType === "Dil ve Yazı") {
      navigate("/test/language");
    } else if (testType === "Bellek") {
      navigate("/test/memory");
    } else if (testType === "Dikkat ve Konsantrasyon") {
      navigate("/test/attention");
    } else if (testType === "Zaman Yer Yönelimi") {
      navigate("/test/orientation");
     } else if (testType === "Görsel Algısal") {
    navigate("/test/visual");
    } else {
      setToast({
        message: `${testType} testi henüz geliştirilmedi. Yakında eklenecek!`,
        type: "info"
      });
    }
  };

  const handleResultsClick = () => {
    navigate("/results");
  };

  const handleLogout = () => {
    setToast({
      message: "Çıkış yapıldı. Ana sayfaya yönlendiriliyorsunuz.",
      type: "info"
    });
    setTimeout(() => navigate("/"), 1500);
  };

  return (
    <div className="testlist-container">
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
      
      <h1>Evde Bilişsel Tarama</h1>
      <p style={{ fontSize: "1.2rem", color: "var(--text-secondary)", marginTop: 8, marginBottom: 32 }}>
        Bilişsel sağlığınızı değerlendirmeye mini testlerle başlayın.
      </p>
      <div className="test-list">
        <div className="test-item">
          <span>
            <span role="img" aria-label="saat" style={{marginRight: 12}}>🕒</span>
            Zaman Yer Yönelimi Testi
          </span>
          <button 
            className="test-btn" 
            onClick={() => handleTestClick("Zaman Yer Yönelimi")}
          >
            Başlat
          </button>
        </div>
        <div className="test-item">
          <span>
            <span role="img" aria-label="beyin" style={{marginRight: 12}}>🧠</span>
            Bellek Testi
          </span>
          <button 
            className="test-btn" 
            onClick={() => handleTestClick("Bellek")}
          >
            Başlat
          </button>
        </div>
        <div className="test-item">
          <span>
            <span role="img" aria-label="ünlem" style={{marginRight: 12}}>❗</span>
            Dikkat ve Konsantrasyon Testi
          </span>
          <button 
            className="test-btn" 
            onClick={() => handleTestClick("Dikkat ve Konsantrasyon")}
          >
            Başlat
          </button>
        </div>
        <div className="test-item">
          <span>
            <span role="img" aria-label="kalem" style={{marginRight: 12}}>✏️</span>
            Dil ve Yazı Testi
          </span>
          <button 
            className="test-btn" 
            onClick={() => handleTestClick("Dil ve Yazı")}
          >
            Başlat
          </button>
        </div>
        <div className="test-item">
          <span>
            <span role="img" aria-label="göz" style={{marginRight: 12}}>👁️</span>
            Görsel Algısal Test
          </span>
          <button 
            className="test-btn" 
            onClick={() => handleTestClick("Görsel Algısal")}
          >
            Başlat
          </button>
        </div>
      </div>
      <div className="test-item" style={{marginTop: 32}}>
        <span>
          <span role="img" aria-label="sonuçlar" style={{marginRight: 12}}>📊</span>
          Sonuçlarım
        </span>
        <button 
          className="test-btn" 
          onClick={handleResultsClick}
        >
          Göster
        </button>
      </div>
      <footer className="testlist-footer">
        © 2025 NeuroScan AI
      </footer>
      
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