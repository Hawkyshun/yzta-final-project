import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";
import ThemeSwitch from "../components/ThemeSwitch";

const orientationQuestions = [
  // Zaman yönelimi
  {
    id: 1,
    type: "select",
    question: "Bugün hangi gün?",
    options: ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"],
    correct: new Date().toLocaleDateString('tr-TR', { weekday: 'long' }),
  },
  {
    id: 2,
    type: "input",
    question: "Bugünün tarihi nedir? (GG/AA/YYYY)",
    correct: new Date().toLocaleDateString('tr-TR'),
  },
  {
    id: 3,
    type: "select",
    question: "Şu an hangi aydayız?",
    options: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"],
    correct: new Date().toLocaleDateString('tr-TR', { month: 'long' }),
  },
  {
    id: 4,
    type: "input",
    question: "Hangi yıldayız?",
    correct: new Date().getFullYear().toString(),
  },
  {
    id: 5,
    type: "select",
    question: "Şu an hangi mevsimdeyiz?",
    options: ["İlkbahar", "Yaz", "Sonbahar", "Kış"],
    correct: (() => {
      const m = new Date().getMonth() + 1;
      if (m >= 3 && m <= 5) return "İlkbahar";
      if (m >= 6 && m <= 8) return "Yaz";
      if (m >= 9 && m <= 11) return "Sonbahar";
      return "Kış";
    })(),
  },
  // Yer yönelimi
  {
    id: 6,
    type: "input",
    question: "Hangi ülkedesiniz?",
    correct: "Türkiye",
  },
  {
    id: 7,
    type: "input",
    question: "Hangi şehirde bulunuyorsunuz?",
    correct: "",
  },
  {
    id: 8,
    type: "input",
    question: "Hangi ilçedesiniz?",
    correct: "",
  },
  {
    id: 9,
    type: "input",
    question: "Şu an hangi binadasınız? (ör: ev, hastane, okul)",
    correct: "",
  },
  {
    id: 10,
    type: "input",
    question: "Bulunduğunuz oda/kat nedir? (ör: salon, 2. kat)",
    correct: "",
  },
];

export default function OrientationTest() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [testCompleted, setTestCompleted] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isOptionDisabled, setIsOptionDisabled] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    setSelectedOption(null);
    setIsOptionDisabled(false);
  }, [currentQuestion]);

  const handleOptionClick = (option) => {
    if (isOptionDisabled) return;
    setSelectedOption(option);
    setIsOptionDisabled(true);
    handleAnswer(option);
  };

  const handleInputChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleInputSubmit = () => {
    if (!selectedOption || selectedOption.trim() === "") {
      setToast({ message: "Lütfen bir cevap girin!", type: "warning" });
      return;
    }
    setIsOptionDisabled(true);
    handleAnswer(selectedOption);
  };

  const handleAnswer = (answer) => {
    setUserAnswers((prev) => ({ ...prev, [currentQuestion]: answer }));
    // Skor hesapla (case-insensitive, gün/ay için Türkçe uyumlu)
    const q = orientationQuestions[currentQuestion];
    let isCorrect = false;
    if (q.type === "select") {
      isCorrect = answer.toLocaleLowerCase("tr-TR") === q.correct.toLocaleLowerCase("tr-TR");
    } else if (q.type === "input" && q.correct) {
      isCorrect = answer.trim().toLocaleLowerCase("tr-TR") === q.correct.trim().toLocaleLowerCase("tr-TR");
    } else if (q.type === "input" && !q.correct) {
      // Şehir, ilçe, bina, oda gibi sorularda doğru/yanlış yok, kullanıcıya puan verilmiyor
      isCorrect = null;
    }
    if (isCorrect) setScore((s) => s + 1);
    setTimeout(() => {
      if (currentQuestion < orientationQuestions.length - 1) {
        setCurrentQuestion((q) => q + 1);
      } else {
        setTestCompleted(true);
      }
    }, 1200);
  };

  const handleLogout = () => {
    setToast({ message: "Çıkış yapıldı. Ana sayfaya yönlendiriliyorsunuz.", type: "info" });
    setTimeout(() => navigate("/"), 1500);
  };

  if (testCompleted) {
    return (
      <div className="test-container">
        <div style={{ position: 'absolute', top: 20, right: 20, display: 'flex', gap: 10, alignItems: 'center' }}>
          <ThemeSwitch />
          <button onClick={handleLogout} style={{ background: '#dc2626', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 16px', fontSize: '0.9rem', cursor: 'pointer', transition: 'background 0.2s' }} onMouseOver={e => e.target.style.background = '#b91c1c'} onMouseOut={e => e.target.style.background = '#dc2626'}>🚪 Çıkış Yap</button>
        </div>
        <div className="test-header">
          <h1>🕒 Zaman Yer Yönelimi Testi - Sonuçlar</h1>
          <div className="score-display">
            <h2>Puanınız: {score} / 6</h2>
            <h3>Başarı: {score >= 5 ? "Mükemmel" : score >= 4 ? "İyi" : score >= 3 ? "Orta" : "Düşük"}</h3>
          </div>
        </div>
        <div className="results-section">
          <h3>Cevaplarınız:</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {orientationQuestions.map((q, i) => (
              <li key={q.id} style={{ marginBottom: 10 }}>
                <strong>{q.question}</strong><br />
                <span style={{ color: userAnswers[i] && q.correct && userAnswers[i].toLocaleLowerCase("tr-TR") === q.correct.toLocaleLowerCase("tr-TR") ? '#16a34a' : '#dc2626' }}>
                  {userAnswers[i] || <em>Boş</em>}
                </span>
                {q.correct && (
                  <span style={{ color: '#64748b', marginLeft: 8, fontSize: '0.95em' }}>
                    (Doğru: {q.correct})
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="test-actions">
          <button onClick={() => navigate("/tests")} className="btn-primary">Test Listesine Dön</button>
          <button onClick={() => window.location.reload()} className="btn-secondary">Testi Tekrarla</button>
        </div>
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </div>
    );
  }

  const q = orientationQuestions[currentQuestion];

  return (
    <div className="test-container">
      <div style={{ position: 'absolute', top: 20, right: 20, display: 'flex', gap: 10, alignItems: 'center' }}>
        <ThemeSwitch />
        <button onClick={handleLogout} style={{ background: '#dc2626', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 16px', fontSize: '0.9rem', cursor: 'pointer', transition: 'background 0.2s' }} onMouseOver={e => e.target.style.background = '#b91c1c'} onMouseOut={e => e.target.style.background = '#dc2626'}>🚪 Çıkış Yap</button>
      </div>
      <div className="test-header">
        <h1>🕒 Zaman Yer Yönelimi Testi</h1>
        <div className="test-info">
          <span>Soru {currentQuestion + 1}/{orientationQuestions.length}</span>
          <span>Puan: {score}</span>
        </div>
      </div>
      <div className="question-container">
        <h3>{q.question}</h3>
        {q.type === "select" && (
          <div className="options-container">
            {q.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleOptionClick(option)}
                className={`option-btn${selectedOption === option ? ' selected' : ''}`}
                disabled={isOptionDisabled}
              >
                {option}
              </button>
            ))}
          </div>
        )}
        {q.type === "input" && (
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginTop: 20 }}>
            <input
              type="text"
              value={selectedOption || ""}
              onChange={handleInputChange}
              className="option-btn"
              style={{ flex: 1, minWidth: 0 }}
              disabled={isOptionDisabled}
              placeholder="Cevabınızı yazın"
              onKeyDown={e => e.key === 'Enter' && handleInputSubmit()}
            />
            <button onClick={handleInputSubmit} className="btn-primary" disabled={isOptionDisabled}>Gönder</button>
          </div>
        )}
      </div>
      <div className="test-progress">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${((currentQuestion + 1) / orientationQuestions.length) * 100}%` }}></div>
        </div>
      </div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
} 