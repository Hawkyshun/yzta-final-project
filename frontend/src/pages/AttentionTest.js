import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";
import ThemeSwitch from "../components/ThemeSwitch";

export default function AttentionTest() {
  const navigate = useNavigate();
  const [currentPhase, setCurrentPhase] = useState('instructions');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(480); // 8 dakika
  const [userAnswers, setUserAnswers] = useState({});
  const [testCompleted, setTestCompleted] = useState(false);
  const [toast, setToast] = useState(null);

  const questions = [
    {
      id: 1,
      type: "stroop",
      question: "Aşağıdaki kelimelerin RENKLERİNİ söyleyin (kelimenin anlamına değil, yazıldığı renge bakın):",
      items: [
        { text: "KIRMIZI", color: "blue" },
        { text: "MAVİ", color: "red" },
        { text: "YEŞİL", color: "yellow" },
        { text: "SARI", color: "green" }
      ],
      correct: ["mavi", "kırmızı", "sarı", "yeşil"]
    },
    {
      id: 2,
      type: "sequence",
      question: "Aşağıdaki sayı dizisini hatırlayın ve ters sırayla yazın:",
      sequence: "7-3-9-1-5-8-2-6",
      correct: "6-2-8-5-1-9-3-7"
    },
    {
      id: 3,
      type: "pattern",
      question: "Aşağıdaki desende kaç tane üçgen var?",
      pattern: "🔺🔻🔺🔺🔻🔺🔻🔺🔺🔻",
      correct: 6
    },
    {
      id: 4,
      type: "counting",
      question: "Aşağıdaki metinde kaç tane 'A' harfi var?",
      text: "ANKARA BAŞKENTTİR VE TÜRKİYE'NİN MERKEZİNDE BULUNUR",
      correct: 8
    },
    {
      id: 5,
      type: "visual",
      question: "Aşağıdaki şekillerden hangisi diğerlerinden farklıdır?",
      shapes: ["🔴", "🔵", "🔴", "🔴", "🔵"],
      correct: 1 // İkinci şekil (mavi)
    },
    {
      id: 6,
      type: "math",
      question: "Aşağıdaki işlemleri sırayla yapın ve sonucu yazın:",
      operations: "15 + 7 - 3 × 2 + 10",
      correct: 26
    },
    {
      id: 7,
      type: "memory",
      question: "Aşağıdaki kelimeleri 10 saniye ezberleyin, sonra hatırlayın:",
      words: ["KALEM", "MASA", "KİTAP", "PENCERE", "ÇANTA"],
      correct: ["KALEM", "MASA", "KİTAP", "PENCERE", "ÇANTA"]
    },
    {
      id: 8,
      type: "focus",
      question: "Aşağıdaki cümlede kaç tane 'E' harfi var?",
      sentence: "ELEKTRONİK CİHAZLAR GÜNLÜK HAYATIMIZIN VAZGEÇİLMEZ PARÇASIDIR",
      correct: 12
    },
    {
      id: 9,
      type: "speed",
      question: "Aşağıdaki sayıları hızlıca toplayın:",
      numbers: [12, 8, 15, 23, 7, 19, 4, 31],
      correct: 119
    },
    {
      id: 10,
      type: "logic",
      question: "Aşağıdaki dizide eksik olan sayı nedir?",
      sequence: "2, 4, 8, 16, ?, 64",
      correct: 32
    },
    {
      id: 11,
      type: "detail",
      question: "Aşağıdaki resimde kaç tane daire var?",
      image: "🔴🔵🔴🔵🔴🔵🔴🔵🔴🔵🔴🔵",
      correct: 12
    },
    {
      id: 12,
      type: "concentration",
      question: "Aşağıdaki kelimelerden hangisi 'MUTLU' kelimesinin zıt anlamlısıdır?",
      options: ["Sevinçli", "Üzgün", "Neşeli", "Keyifli"],
      correct: 1
    }
  ];

  useEffect(() => {
    if (currentPhase === 'test' && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && currentPhase === 'test') {
      finishTest();
    }
  }, [timeLeft, currentPhase]);

  const startTest = () => {
    setCurrentPhase('test');
  };

  const handleAnswer = (answer) => {
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestion]: answer
    }));
    
    // Otomatik ilerleme - 1.5 saniye sonra
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        finishTest();
      }
    }, 1500);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      finishTest();
    }
  };

  const finishTest = () => {
    let totalScore = 0;
    questions.forEach((question, index) => {
      const userAnswer = userAnswers[index];
      if (userAnswer !== undefined) {
        if (Array.isArray(question.correct)) {
          // Array karşılaştırması
          if (Array.isArray(userAnswer) && userAnswer.length === question.correct.length) {
            const isCorrect = userAnswer.every((ans, i) => 
              ans.toString().toLowerCase() === question.correct[i].toString().toLowerCase()
            );
            if (isCorrect) totalScore += 1;
          }
        } else {
          // Basit karşılaştırma
          if (userAnswer.toString().toLowerCase() === question.correct.toString().toLowerCase()) {
            totalScore += 1;
          }
        }
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
    return Math.round((score / questions.length) * 100);
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
      <h2>Dikkat ve Konsantrasyon Testi</h2>
      <p>Bu test dikkat sürenizi ve konsantrasyon becerinizi ölçer.</p>
      
      <div className="instruction-steps">
        <h3>Test İçeriği:</h3>
        <ul>
          <li>Stroop Testi (renk-kelime uyumsuzluğu)</li>
          <li>Sayı dizisi hatırlama</li>
          <li>Görsel dikkat testleri</li>
          <li>Hızlı hesaplama</li>
          <li>Mantık soruları</li>
        </ul>
      </div>

      <div className="test-info">
        <p><strong>Süre:</strong> 8 dakika</p>
        <p><strong>Soru Sayısı:</strong> 12 soru</p>
        <p><strong>Test Türü:</strong> Dikkat ve Konsantrasyon</p>
      </div>

      <button className="start-btn" onClick={startTest}>
        Testi Başlat
      </button>
    </div>
  );

  const renderQuestion = () => {
    const currentQ = questions[currentQuestion];
    
    return (
      <div className="question-container">
        <div className="test-header">
          <div className="timer">
            <span>Kalan Süre: {formatTime(timeLeft)}</span>
          </div>
          <div className="progress">
            <span>Soru {currentQuestion + 1} / {questions.length}</span>
          </div>
        </div>

        <div className="question-content">
          <h3>{currentQ.question}</h3>
          
          {currentQ.type === 'stroop' && (
            <div className="stroop-test">
              {currentQ.items.map((item, index) => (
                <div key={index} className="stroop-item" style={{ color: item.color }}>
                  {item.text}
                </div>
              ))}
              <input
                type="text"
                placeholder="Renkleri virgülle ayırarak yazın..."
                value={userAnswers[currentQuestion] || ''}
                onChange={(e) => handleAnswer(e.target.value)}
                className="answer-input"
              />
            </div>
          )}

          {currentQ.type === 'sequence' && (
            <div className="sequence-test">
              <div className="sequence-display">{currentQ.sequence}</div>
              <input
                type="text"
                placeholder="Ters sırayla yazın..."
                value={userAnswers[currentQuestion] || ''}
                onChange={(e) => handleAnswer(e.target.value)}
                className="answer-input"
              />
            </div>
          )}

          {currentQ.type === 'pattern' && (
            <div className="pattern-test">
              <div className="pattern-display">{currentQ.pattern}</div>
              <input
                type="number"
                placeholder="Sayıyı girin..."
                value={userAnswers[currentQuestion] || ''}
                onChange={(e) => handleAnswer(parseInt(e.target.value))}
                className="answer-input"
              />
            </div>
          )}

          {currentQ.type === 'counting' && (
            <div className="counting-test">
              <div className="text-display">{currentQ.text}</div>
              <input
                type="number"
                placeholder="A harfi sayısını girin..."
                value={userAnswers[currentQuestion] || ''}
                onChange={(e) => handleAnswer(parseInt(e.target.value))}
                className="answer-input"
              />
            </div>
          )}

          {currentQ.type === 'visual' && (
            <div className="visual-test">
              <div className="shapes-display">
                {currentQ.shapes.map((shape, index) => (
                  <button
                    key={index}
                    className={`shape-btn ${userAnswers[currentQuestion] === index ? 'selected' : ''}`}
                    onClick={() => handleAnswer(index)}
                  >
                    {shape}
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentQ.type === 'math' && (
            <div className="math-test">
              <div className="math-display">{currentQ.operations}</div>
              <input
                type="number"
                placeholder="Sonucu girin..."
                value={userAnswers[currentQuestion] || ''}
                onChange={(e) => handleAnswer(parseInt(e.target.value))}
                className="answer-input"
              />
            </div>
          )}

          {currentQ.type === 'memory' && (
            <div className="memory-test">
              <div className="words-display">
                {currentQ.words.map((word, index) => (
                  <span key={index} className="word-item">{word}</span>
                ))}
              </div>
              <textarea
                placeholder="Hatırladığınız kelimeleri yazın..."
                value={userAnswers[currentQuestion] || ''}
                onChange={(e) => handleAnswer(e.target.value)}
                rows={3}
                className="answer-textarea"
              />
            </div>
          )}

          {currentQ.type === 'focus' && (
            <div className="focus-test">
              <div className="sentence-display">{currentQ.sentence}</div>
              <input
                type="number"
                placeholder="E harfi sayısını girin..."
                value={userAnswers[currentQuestion] || ''}
                onChange={(e) => handleAnswer(parseInt(e.target.value))}
                className="answer-input"
              />
            </div>
          )}

          {currentQ.type === 'speed' && (
            <div className="speed-test">
              <div className="numbers-display">
                {currentQ.numbers.join(' + ')}
              </div>
              <input
                type="number"
                placeholder="Toplamı girin..."
                value={userAnswers[currentQuestion] || ''}
                onChange={(e) => handleAnswer(parseInt(e.target.value))}
                className="answer-input"
              />
            </div>
          )}

          {currentQ.type === 'logic' && (
            <div className="logic-test">
              <div className="sequence-display">{currentQ.sequence}</div>
              <input
                type="number"
                placeholder="Eksik sayıyı girin..."
                value={userAnswers[currentQuestion] || ''}
                onChange={(e) => handleAnswer(parseInt(e.target.value))}
                className="answer-input"
              />
            </div>
          )}

          {currentQ.type === 'detail' && (
            <div className="detail-test">
              <div className="image-display">{currentQ.image}</div>
              <input
                type="number"
                placeholder="Daire sayısını girin..."
                value={userAnswers[currentQuestion] || ''}
                onChange={(e) => handleAnswer(parseInt(e.target.value))}
                className="answer-input"
              />
            </div>
          )}

          {currentQ.type === 'concentration' && (
            <div className="concentration-test">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  className={`option-btn ${userAnswers[currentQuestion] === index ? 'selected' : ''}`}
                  onClick={() => handleAnswer(index)}
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
            disabled={userAnswers[currentQuestion] === undefined}
          >
            {currentQuestion === questions.length - 1 ? 'Testi Bitir' : 'Sonraki Soru'}
          </button>
        </div>
      </div>
    );
  };

  const renderResults = () => (
    <div className="test-results">
      <h2>Dikkat ve Konsantrasyon Testi Sonuçları</h2>
      
      <div className="score-summary">
        <div className="score-item">
          <span className="score-label">Toplam Skor:</span>
          <span className="score-value">{score} / {questions.length}</span>
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
    <div className="attention-test-container">
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
      {currentPhase === 'test' && renderQuestion()}
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