import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";
import ThemeSwitch from "../components/ThemeSwitch";

export default function MemoryTest() {
  const navigate = useNavigate();
  const [currentPhase, setCurrentPhase] = useState('instructions'); // instructions, memorization, recall, results
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300); // 5 dakika
  const [userAnswers, setUserAnswers] = useState({});
  const [testCompleted, setTestCompleted] = useState(false);
  const [toast, setToast] = useState(null);
  const [memorizationTime, setMemorizationTime] = useState(20); // 20 saniye ezberleme süresi

  // Bellek testi soruları
  const memoryItems = [
    { id: 1, item: "Elma", category: "Meyve" },
    { id: 2, item: "Kedi", category: "Hayvan" },
    { id: 3, item: "Masa", category: "Eşya" },
    { id: 4, item: "Mavi", category: "Renk" },
    { id: 5, item: "Kitap", category: "Eşya" },
    { id: 6, item: "Portakal", category: "Meyve" },
    { id: 7, item: "Köpek", category: "Hayvan" },
    { id: 8, item: "Kırmızı", category: "Renk" }
  ];

  const recallQuestions = [
    {
      id: 1,
      question: "Hangi meyveleri hatırlıyorsunuz?",
      type: "free-recall",
      category: "Meyve",
      correct: ["Elma", "Portakal"]
    },
    {
      id: 2,
      question: "Hangi hayvanları hatırlıyorsunuz?",
      type: "free-recall",
      category: "Hayvan",
      correct: ["Kedi", "Köpek"]
    },
    {
      id: 3,
      question: "Hangi renkleri hatırlıyorsunuz?",
      type: "free-recall",
      category: "Renk",
      correct: ["Mavi", "Kırmızı"]
    },
    {
      id: 4,
      question: "Hangi eşyaları hatırlıyorsunuz?",
      type: "free-recall",
      category: "Eşya",
      correct: ["Masa", "Kitap"]
    },
    {
      id: 5,
      question: "Elma hangi kategorideydi?",
      type: "recognition",
      options: ["Meyve", "Hayvan", "Eşya", "Renk"],
      correct: 0
    },
    {
      id: 6,
      question: "Kedi hangi kategorideydi?",
      type: "recognition",
      options: ["Meyve", "Hayvan", "Eşya", "Renk"],
      correct: 1
    },
    {
      id: 7,
      question: "Masa hangi kategorideydi?",
      type: "recognition",
      options: ["Meyve", "Hayvan", "Eşya", "Renk"],
      correct: 2
    },
    {
      id: 8,
      question: "Mavi hangi kategorideydi?",
      type: "recognition",
      options: ["Meyve", "Hayvan", "Eşya", "Renk"],
      correct: 3
    }
  ];

  useEffect(() => {
    if (currentPhase === 'memorization' && memorizationTime > 0) {
      const timer = setTimeout(() => {
        setMemorizationTime(memorizationTime - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (memorizationTime === 0 && currentPhase === 'memorization') {
      setCurrentPhase('recall');
    }
  }, [memorizationTime, currentPhase]);

  useEffect(() => {
    if (currentPhase === 'recall' && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && currentPhase === 'recall') {
      finishTest();
    }
  }, [timeLeft, currentPhase]);

  const startTest = () => {
    setCurrentPhase('memorization');
  };

  const handleFreeRecall = (answer) => {
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestion]: answer
    }));
    handleAutoNext();
  };

  const handleRecognition = (selectedOption) => {
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestion]: selectedOption
    }));
    handleAutoNext();
  };

  const nextQuestion = () => {
    if (currentQuestion < recallQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      finishTest();
    }
  };

  const handleAutoNext = () => {
    // Otomatik ilerleme - 1.5 saniye sonra
    setTimeout(() => {
      if (currentQuestion < recallQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        finishTest();
      }
    }, 1500);
  };

  const finishTest = () => {
    // Skor hesaplama
    let totalScore = 0;
    let maxScore = 0;

    recallQuestions.forEach((question, index) => {
      const userAnswer = userAnswers[index];
      
      if (question.type === 'free-recall') {
        const correctItems = question.correct;
        const userItems = userAnswer ? userAnswer.split(',').map(item => item.trim()) : [];
        const correctCount = correctItems.filter(item => 
          userItems.some(userItem => 
            userItem.toLowerCase().includes(item.toLowerCase()) || 
            item.toLowerCase().includes(userItem.toLowerCase())
          )
        ).length;
        totalScore += correctCount;
        maxScore += correctItems.length;
      } else if (question.type === 'recognition') {
        if (userAnswer === question.correct) {
          totalScore += 1;
        }
        maxScore += 1;
      }
    });

    setScore(totalScore);
    setTestCompleted(true);
    setCurrentPhase('results');
    
    // 5 saniye sonra ana sayfaya yönlendir
    setTimeout(() => {
      navigate("/test-list");
    }, 5000);
  };

  const handleLogout = () => {
    setToast({
      message: "Çıkış yapıldı. Ana sayfaya yönlendiriliyorsunuz.",
      type: "info"
    });
    setTimeout(() => navigate("/"), 1500);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getScorePercentage = () => {
    const maxScore = 12; // 4 free-recall (8 puan) + 4 recognition (4 puan)
    return Math.round((score / maxScore) * 100);
  };

  const getScoreLevel = () => {
    const percentage = getScorePercentage();
    if (percentage >= 90) return 'Mükemmel';
    if (percentage >= 80) return 'Çok İyi';
    if (percentage >= 70) return 'İyi';
    if (percentage >= 60) return 'Orta';
    if (percentage >= 50) return 'Zayıf';
    return 'Çok Zayıf';
  };

  const renderInstructions = () => (
    <div className="test-instructions">
      <h2>Bellek Testi</h2>
      <p>Bu test kısa süreli bellek performansınızı ölçer.</p>
      
      <div className="instruction-steps">
        <h3>Test Aşamaları:</h3>
        <ol>
          <li><strong>Ezberleme Aşaması:</strong> 20 saniye boyunca size gösterilen kelimeleri ezberleyin.</li>
          <li><strong>Hatırlama Aşaması:</strong> Ezberlediğiniz kelimeleri hatırlamaya çalışın.</li>
        </ol>
      </div>

      <div className="test-info">
        <p><strong>Süre:</strong> 5 dakika</p>
        <p><strong>Soru Sayısı:</strong> 8 soru</p>
        <p><strong>Test Türü:</strong> Bellek ve Hatırlama</p>
      </div>

      <button className="start-btn" onClick={startTest}>
        Testi Başlat
      </button>
    </div>
  );

  const renderMemorization = () => (
    <div className="memorization-phase">
      <div className="timer">
        <h3>Ezberleme Süresi: {formatTime(memorizationTime)}</h3>
      </div>
      
      <div className="memory-items">
        <h3>Aşağıdaki kelimeleri ezberleyin:</h3>
        <div className="items-grid">
          {memoryItems.map((item, index) => (
            <div key={item.id} className="memory-item">
              <span className="item-text">{item.item}</span>
              <span className="item-category">({item.category})</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderRecall = () => {
    const currentQ = recallQuestions[currentQuestion];
    
    return (
      <div className="recall-phase">
        <div className="test-header">
          <div className="timer">
            <span>Kalan Süre: {formatTime(timeLeft)}</span>
          </div>
          <div className="progress">
            <span>Soru {currentQuestion + 1} / {recallQuestions.length}</span>
          </div>
        </div>

        <div className="question-container">
          <h3>{currentQ.question}</h3>
          
          {currentQ.type === 'free-recall' ? (
            <div className="free-recall">
              <textarea
                placeholder="Hatırladığınız kelimeleri virgülle ayırarak yazın..."
                value={userAnswers[currentQuestion] || ''}
                onChange={(e) => handleFreeRecall(e.target.value)}
                rows={4}
                className="recall-textarea"
              />
            </div>
          ) : (
            <div className="recognition">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  className={`option-btn ${userAnswers[currentQuestion] === index ? 'selected' : ''}`}
                  onClick={() => handleRecognition(index)}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="navigation">
          <button 
            className="nav-btn"
            onClick={nextQuestion}
            disabled={!userAnswers[currentQuestion]}
          >
            {currentQuestion === recallQuestions.length - 1 ? 'Testi Bitir' : 'Sonraki Soru'}
          </button>
        </div>
      </div>
    );
  };

  const renderResults = () => (
    <div className="test-results">
      <h2>Bellek Testi Sonuçları</h2>
      
      <div className="score-summary">
        <div className="score-item">
          <span className="score-label">Toplam Skor:</span>
          <span className="score-value">{score} / 12</span>
        </div>
        <div className="score-item">
          <span className="score-label">Yüzde:</span>
          <span className="score-value">%{getScorePercentage()}</span>
        </div>
        <div className="score-item">
          <span className="score-label">Performans:</span>
          <span className="score-value">{getScoreLevel()}</span>
        </div>
      </div>

      <div className="results-actions">
        <button 
          className="action-btn primary"
          onClick={() => navigate('/tests')}
        >
          Test Listesine Dön
        </button>
        <button 
          className="action-btn secondary"
          onClick={() => window.location.reload()}
        >
          Testi Tekrarla
        </button>
      </div>
    </div>
  );

  return (
    <div className="memory-test-container">
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

      {currentPhase === 'instructions' && renderInstructions()}
      {currentPhase === 'memorization' && renderMemorization()}
      {currentPhase === 'recall' && renderRecall()}
      {currentPhase === 'results' && renderResults()}
      
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