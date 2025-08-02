import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";
import ThemeSwitch from "../components/ThemeSwitch";

const visualQuestions = [
  {
    id: 1,
    type: "shape-matching",
    question: "Aşağıdaki şekillerden hangisi diğerleriyle aynı türdendir?",
    options: ["🔺", "🔻", "🔺", "🔵"],
    correct: 2, // Üçüncü üçgen
    explanation: "İki üçgen aynı türdendir."
  },
  {
    id: 2,
    type: "visual-difference",
    question: "Aşağıdaki şekillerden hangisi diğerlerinden farklıdır?",
    options: ["🔴", "🔵", "🔴", "🔴"],
    correct: 1, // Mavi daire
    explanation: "Mavi daire diğer kırmızı dairelerden farklıdır."
  },
  {
    id: 3,
    type: "pattern-completion",
    question: "Aşağıdaki desende eksik olan şekil hangisidir?",
    pattern: "🔺🔻🔺🔻🔺❓",
    options: ["🔺", "🔻", "🔵", "🔴"],
    correct: 1, // 🔻
    explanation: "Desen üçgen-yıldız şeklinde tekrarlanıyor."
  },
  {
    id: 4,
    type: "visual-sequence",
    question: "Aşağıdaki sırada bir sonraki şekil ne olmalıdır?",
    sequence: "🔴🔵🔴🔵🔴❓",
    options: ["🔴", "🔵", "🟡", "🟢"],
    correct: 1, // 🔵
    explanation: "Sıra kırmızı-mavi şeklinde tekrarlanıyor."
  },
  {
    id: 5,
    type: "color-perception",
    question: "Aşağıdaki renklerden hangisi diğerleriyle uyumlu değildir?",
    options: ["🔴", "🟠", "🟡", "🔵"],
    correct: 3, // 🔵 (mavi)
    explanation: "Mavi, sıcak renkler (kırmızı, turuncu, sarı) arasında soğuk bir renktir."
  },
  {
    id: 6,
    type: "visual-memory",
    question: "Aşağıdaki şekilleri 5 saniye ezberleyin, sonra hatırlayın:",
    memoryItems: ["🔺", "🔵", "🔴", "⭐"],
    options: ["🔺🔵🔴⭐", "🔺🔵⭐🔴", "🔵🔺🔴⭐", "⭐🔴🔵🔺"],
    correct: 0, // İlk sıra
    explanation: "Ezberlediğiniz sıra: üçgen, daire, kırmızı daire, yıldız"
  },
  {
    id: 7,
    type: "shape-counting",
    question: "Aşağıdaki desende kaç tane üçgen var?",
    pattern: "🔺🔻🔺🔺🔻🔺🔻🔺🔺🔻",
    options: ["5", "6", "7", "8"],
    correct: 1, // 6
    explanation: "Desende 6 tane üçgen bulunuyor."
  },
  {
    id: 8,
    type: "visual-rotation",
    question: "Aşağıdaki şekillerden hangisi diğerinin döndürülmüş hali değildir?",
    options: ["◀️", "▶️", "🔺", "🔻"],
    correct: 2, // 🔺
    explanation: "Üçgen, ok işaretlerinin döndürülmüş hali değildir."
  },
  {
    id: 9,
    type: "visual-grouping",
    question: "Aşağıdaki şekilleri mantıklı şekilde gruplandırın:",
    shapes: ["🔴", "🔵", "🔴", "🔵", "🔴", "🔵"],
    options: ["🔴🔴🔴🔵🔵🔵", "🔴🔵🔴🔵🔴🔵", "🔵🔵🔵🔴🔴🔴", "🔵🔴🔵🔴🔵🔴"],
    correct: 0, // Kırmızılar bir arada, maviler bir arada
    explanation: "Benzer renkler bir arada gruplandırılmalı."
  },
  {
    id: 10,
    type: "visual-symmetry",
    question: "Aşağıdaki şekillerden hangisi simetrik değildir?",
    options: ["🔺", "🔵", "⭐", "💎"],
    correct: 2, // ⭐ (yıldız)
    explanation: "Yıldız şekli simetrik değildir."
  }
];

export default function VisualTest() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [testCompleted, setTestCompleted] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isOptionDisabled, setIsOptionDisabled] = useState(false);
  const [toast, setToast] = useState(null);
  const [showMemoryItems, setShowMemoryItems] = useState(false);

  useEffect(() => {
    setSelectedOption(null);
    setIsOptionDisabled(false);
    setShowMemoryItems(false);
  }, [currentQuestion]);

  // Görsel hafıza sorusu için özel timer
  useEffect(() => {
    const currentQ = visualQuestions[currentQuestion];
    if (currentQ && currentQ.type === "visual-memory") {
      setShowMemoryItems(true);
      const timer = setTimeout(() => {
        setShowMemoryItems(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [currentQuestion]);

  const handleOptionClick = (optionIndex) => {
    if (isOptionDisabled) return;
    setSelectedOption(optionIndex);
    setIsOptionDisabled(true);
    handleAnswer(optionIndex);
  };

  const handleAnswer = (answer) => {
    setUserAnswers((prev) => ({ ...prev, [currentQuestion]: answer }));
    
    const currentQ = visualQuestions[currentQuestion];
    if (answer === currentQ.correct) {
      setScore((s) => s + 1);
    }

    setTimeout(() => {
      if (currentQuestion < visualQuestions.length - 1) {
        setCurrentQuestion((q) => q + 1);
      } else {
        setTestCompleted(true);
      }
    }, 1500);
  };

  const handleLogout = () => {
    setToast({
      message: "Çıkış yapıldı. Ana sayfaya yönlendiriliyorsunuz.",
      type: "info"
    });
    setTimeout(() => navigate("/"), 1500);
  };

  const getScoreLevel = () => {
    const percentage = Math.round((score / visualQuestions.length) * 100);
    if (percentage >= 90) return "Mükemmel";
    if (percentage >= 80) return "Çok İyi";
    if (percentage >= 70) return "İyi";
    if (percentage >= 60) return "Orta";
    if (percentage >= 50) return "Zayıf";
    return "Çok Zayıf";
  };

  if (testCompleted) {
    return (
      <div className="test-container">
        <div style={{ position: 'absolute', top: 20, right: 20, display: 'flex', gap: 10, alignItems: 'center' }}>
          <ThemeSwitch />
          <button onClick={handleLogout} style={{ background: '#dc2626', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 16px', fontSize: '0.9rem', cursor: 'pointer', transition: 'background 0.2s' }} onMouseOver={e => e.target.style.background = '#b91c1c'} onMouseOut={e => e.target.style.background = '#dc2626'}>🚪 Çıkış Yap</button>
        </div>
        <div className="test-header">
          <h1>👁️ Görsel Algısal Test - Sonuçlar</h1>
          <div className="score-display">
            <h2>Puanınız: {score} / {visualQuestions.length}</h2>
            <h3>Yüzde: %{Math.round((score / visualQuestions.length) * 100)}</h3>
            <h4>Seviye: {getScoreLevel()}</h4>
          </div>
        </div>
        <div className="results-section">
          <h3>Test Özeti:</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '15px', marginTop: '20px' }}>
            <div style={{ backgroundColor: '#f8fafc', padding: '15px', borderRadius: '8px' }}>
              <h4 style={{ color: '#1e40af', marginBottom: '10px' }}>Şekil Algısı</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li>{userAnswers[0] === visualQuestions[0].correct ? "✅" : "❌"} Şekil eşleştirme</li>
                <li>{userAnswers[1] === visualQuestions[1].correct ? "✅" : "❌"} Görsel farklılık</li>
                <li>{userAnswers[2] === visualQuestions[2].correct ? "✅" : "❌"} Desen tamamlama</li>
              </ul>
            </div>

            <div style={{ backgroundColor: '#f8fafc', padding: '15px', borderRadius: '8px' }}>
              <h4 style={{ color: '#1e40af', marginBottom: '10px' }}>Sıralama ve Gruplama</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li>{userAnswers[3] === visualQuestions[3].correct ? "✅" : "❌"} Görsel sıralama</li>
                <li>{userAnswers[4] === visualQuestions[4].correct ? "✅" : "❌"} Renk algısı</li>
                <li>{userAnswers[8] === visualQuestions[8].correct ? "✅" : "❌"} Görsel gruplama</li>
              </ul>
            </div>

            <div style={{ backgroundColor: '#f8fafc', padding: '15px', borderRadius: '8px' }}>
              <h4 style={{ color: '#1e40af', marginBottom: '10px' }}>Hafıza ve Detay</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li>{userAnswers[5] === visualQuestions[5].correct ? "✅" : "❌"} Görsel hafıza</li>
                <li>{userAnswers[6] === visualQuestions[6].correct ? "✅" : "❌"} Şekil sayma</li>
                <li>{userAnswers[9] === visualQuestions[9].correct ? "✅" : "❌"} Simetri algısı</li>
              </ul>
            </div>
          </div>

        </div>
        <div className="test-actions">
          <button onClick={() => navigate("/tests")} className="btn-primary">Test Listesine Dön</button>
          <button onClick={() => window.location.reload()} className="btn-secondary">Testi Tekrarla</button>
        </div>
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </div>
    );
  }

  const currentQ = visualQuestions[currentQuestion];

  return (
    <div className="test-container">
      <div style={{ position: 'absolute', top: 20, right: 20, display: 'flex', gap: 10, alignItems: 'center' }}>
        <ThemeSwitch />
        <button onClick={handleLogout} style={{ background: '#dc2626', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 16px', fontSize: '0.9rem', cursor: 'pointer', transition: 'background 0.2s' }} onMouseOver={e => e.target.style.background = '#b91c1c'} onMouseOut={e => e.target.style.background = '#dc2626'}>🚪 Çıkış Yap</button>
      </div>
      <div className="test-header">
        <h1>👁️ Görsel Algısal Test</h1>
        <div className="test-info">
          <span>Soru {currentQuestion + 1} / {visualQuestions.length}</span>
          <span>Puan: {score}</span>
        </div>
      </div>
      <div className="question-container">
        <h3>{currentQ.question}</h3>
        
        {/* Görsel hafıza sorusu için özel gösterim */}
        {currentQ.type === "visual-memory" && showMemoryItems && (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '20px', 
            margin: '20px 0',
            fontSize: '2rem',
            padding: '20px',
            backgroundColor: '#f0f9ff',
            borderRadius: '12px',
            border: '2px solid #0ea5e9'
          }}>
            {currentQ.memoryItems.map((item, index) => (
              <span key={index}>{item}</span>
            ))}
          </div>
        )}

        {/* Desen gösterimi */}
        {currentQ.pattern && (
          <div style={{ 
            textAlign: 'center', 
            fontSize: '1.5rem', 
            margin: '20px 0',
            padding: '15px',
            backgroundColor: '#f8fafc',
            borderRadius: '8px'
          }}>
            {currentQ.pattern}
          </div>
        )}

        {/* Sıra gösterimi */}
        {currentQ.sequence && (
          <div style={{ 
            textAlign: 'center', 
            fontSize: '1.5rem', 
            margin: '20px 0',
            padding: '15px',
            backgroundColor: '#f8fafc',
            borderRadius: '8px'
          }}>
            {currentQ.sequence}
          </div>
        )}

        {/* Şekil grubu gösterimi */}
        {currentQ.shapes && (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '15px', 
            margin: '20px 0',
            fontSize: '1.5rem',
            padding: '15px',
            backgroundColor: '#f8fafc',
            borderRadius: '8px'
          }}>
            {currentQ.shapes.map((shape, index) => (
              <span key={index}>{shape}</span>
            ))}
          </div>
        )}

        <div className="options-container">
          {currentQ.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(index)}
              className={`option-btn${selectedOption === index ? ' selected' : ''}`}
              disabled={isOptionDisabled}
              style={{ fontSize: '1.2rem', padding: '15px 20px' }}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <div className="test-progress">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${((currentQuestion + 1) / visualQuestions.length) * 100}%` }}></div>
        </div>
      </div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
} 