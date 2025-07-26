import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";
import ThemeSwitch from "../components/ThemeSwitch";

export default function LanguageTest() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(600); // 10 dakika
  const [userAnswers, setUserAnswers] = useState({});
  const [testCompleted, setTestCompleted] = useState(false);
  const [testStarted, setTestStarted] = useState(false);
  const [toast, setToast] = useState(null);

  // Seçili cevabı state'te tut
  const [selectedOption, setSelectedOption] = useState(null);
  const [isOptionDisabled, setIsOptionDisabled] = useState(false);

  useEffect(() => {
    setSelectedOption(null);
    setIsOptionDisabled(false);
  }, [currentQuestion]);

  // Test soruları
  const questions = [
    {
      id: 1,
      type: "word-matching",
      question: "Aşağıdaki kelimelerden hangisi 'mutlu' kelimesinin zıt anlamlısıdır?",
      options: ["Sevinçli", "Üzgün", "Neşeli", "Keyifli"],
      correct: 1,
      explanation: "Üzgün, mutlu kelimesinin zıt anlamlısıdır."
    },
    {
      id: 2,
      type: "sentence-completion",
      question: "Aşağıdaki cümleyi en uygun kelime ile tamamlayın: 'Güneşli bir günde parkta ... yapmak çok güzeldir.'",
      options: ["yemek", "yürüyüş", "uyku", "çalışma"],
      correct: 1,
      explanation: "Parkta yürüyüş yapmak en uygun seçenektir."
    },
    {
      id: 3,
      type: "synonym",
      question: "'Büyük' kelimesinin eş anlamlısı hangisidir?",
      options: ["Küçük", "Geniş", "Uzun", "Kısa"],
      correct: 1,
      explanation: "Geniş, büyük kelimesinin eş anlamlısıdır."
    },
    {
      id: 4,
      type: "word-category",
      question: "Aşağıdaki meyve ve sebzelerden hangisi diğerleriyle aynı kategoride değildir?",
      options: ["Elma", "Armut", "Muz", "Havuç"],
      correct: 3,
      explanation: "Elma, Armut ve Muz meyvedir. Havuç ise sebzedir."
    },
    {
      id: 5,
      type: "grammar",
      question: "Aşağıdaki cümlelerden hangisinde yazım hatası vardır?",
      options: [
        "Yarın okula gideceğim.",
        "Kitabı masanın üstüne koydum.",
        "Türkiye'nin başkenti Ankaradır.",
        "Hava çok güzeldi."
      ],
      correct: 2,
      explanation: "'Ankaradır' kelimesi 'Ankara'dır' şeklinde yazılmalıdır."
    },
    {
      id: 6,
      type: "vocabulary",
      question: "'Mükemmel' kelimesinin anlamı nedir?",
      options: ["İyi", "Kusursuz", "Güzel", "Büyük"],
      correct: 1,
      explanation: "Mükemmel, kusursuz anlamına gelir."
    },
    {
      id: 7,
      type: "reading",
      question: "Aşağıdaki metni okuyun ve soruyu cevaplayın:\n\n'Ahmet her sabah erken kalkar, kahvaltısını yapar ve işe gider. İş yerinde çok çalışır ve akşam eve döner. Eve geldiğinde ailesiyle vakit geçirir ve kitap okur.'\n\nAhmet'in günlük rutini hakkında hangisi doğrudur?",
      options: [
        "Sadece işe gider ve eve döner",
        "Sabah erken kalkar, işe gider ve akşam kitap okur",
        "Sadece ailesiyle vakit geçirir",
        "Hiç kitap okumaz"
      ],
      correct: 1,
      explanation: "Metne göre Ahmet sabah erken kalkar, işe gider ve akşam kitap okur."
    },
    {
      id: 8,
      type: "word-formation",
      question: "'Güzel' kelimesinden türetilen isim hangisidir?",
      options: ["Güzellik", "Güzelleşmek", "Güzelleştirmek", "Güzelce"],
      correct: 0,
      explanation: "Güzellik, güzel kelimesinden türetilen isimdir."
    },
    {
      id: 9,
      type: "idiom",
      question: "'Gözü açık' deyiminin anlamı nedir?",
      options: [
        "Uyanık olmak",
        "Dikkatli ve uyanık olmak",
        "Gözü açık olmak",
        "Görme yeteneği"
      ],
      correct: 1,
      explanation: "Gözü açık, dikkatli ve uyanık olmak anlamına gelir."
    },
    {
      id: 10,
      type: "word-category",
      question: "'Elma' hangi kategoride yer alır?",
      options: ["Sebze", "Meyve", "İçecek", "Tatlı"],
      correct: 1,
      explanation: "Elma, meyve kategorisinde yer alır."
    },
    {
      id: 11,
      type: "writing",
      question: "Aşağıdaki resmi inceleyin ve bu resim hakkında en az 5 cümlelik bir paragraf yazın. Yazınızda resmin ne olduğunu, nerede çekildiğini ve size ne hissettirdiğini anlatın:",
      image: "https://img.icons8.com/ios-filled/100/000000/nature.png",
      isWriting: true,
      writingPrompt: "Bu resim bir doğa manzarasını gösteriyor. Resimde neler görüyorsunuz? Bu manzara size ne hissettiriyor? Bu tür doğa manzaralarını seviyor musunuz? Neden?"
    }
  ];

  // Zamanlayıcı
  useEffect(() => {
    if (timeLeft > 0 && !testCompleted) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !testCompleted) {
      finishTest();
    }
  }, [timeLeft, testCompleted]);

  const handleAnswer = (answer) => {
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestion]: answer
    }));

    if (questions[currentQuestion].correct === answer) {
      setScore(prev => prev + 1);
    }

    // Otomatik ilerleme - 1 saniye sonra
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
      } else {
        finishTest();
      }
    }, 1000);
  };

  const handleOptionClick = (index) => {
    if (isOptionDisabled) return;
    setSelectedOption(index);
    setIsOptionDisabled(true);
    handleAnswer(index);
  };

  const [writingText, setWritingText] = useState("");

  const handleLogout = () => {
    setToast({
      message: "Çıkış yapıldı. Ana sayfaya yönlendiriliyorsunuz.",
      type: "info"
    });
    setTimeout(() => navigate("/"), 1500);
  };

  const handleWritingSubmit = () => {
    if (writingText.trim().length < 50) {
      setToast({
        message: "Lütfen en az 50 karakter yazın!",
        type: "warning"
      });
      return;
    }
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestion]: writingText
    }));
    finishTest();
  };

  const finishTest = () => {
    setTestCompleted(true);
    
    // 5 saniye sonra ana sayfaya yönlendir
    setTimeout(() => {
      navigate("/test-list");
    }, 5000);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getScorePercentage = () => {
    return Math.round((score / (questions.length - 1)) * 100); // Son soru yazma sorusu
  };

  const getScoreLevel = () => {
    const percentage = getScorePercentage();
    if (percentage >= 80) return "Mükemmel";
    if (percentage >= 60) return "İyi";
    if (percentage >= 40) return "Orta";
    return "Geliştirilmeli";
  };

  if (!testStarted) {
    return (
      <div className="test-container">
        <div style={{ 
          position: 'absolute', 
          top: '20px', 
          right: '20px'
        }}>
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
        
        <div className="test-header">
          <h1>✏️ Dil ve Yazı Testi</h1>
          <div style={{maxWidth: '600px', margin: '0 auto', textAlign: 'center'}}>
            <p style={{fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '30px'}}>
              Bu test dil becerilerinizi, kelime haznenizi ve yazma yeteneklerinizi değerlendirir.
            </p>
            <div style={{backgroundColor: 'var(--card-bg)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-color)', marginBottom: '30px'}}>
              <h3 style={{color: 'var(--text-primary)', marginBottom: '15px'}}>Test Hakkında:</h3>
              <ul style={{textAlign: 'left', margin: 0, paddingLeft: '20px'}}>
                <li>⏱️ Süre: 10 dakika</li>
                <li>📝 Toplam: 10 soru</li>
                <li>📚 Konular: Kelime bilgisi, dil bilgisi, okuma anlama, yazma</li>
                <li>🎯 Son soru: Açık uçlu yazma görevi</li>
              </ul>
            </div>
            <button 
              onClick={() => setTestStarted(true)}
              className="btn-primary"
              style={{fontSize: '1.2rem', padding: '15px 40px'}}
            >
              Testi Başlat
            </button>
          </div>
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

  if (testCompleted) {
    return (
      <div className="test-container">
        <div style={{ 
          position: 'absolute', 
          top: '20px', 
          right: '20px'
        }}>
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
        
        <div className="test-header">
          <h1> Dil ve Yazı Testi - Sonuçlar</h1>
          <div className="score-display">
            <h2>Puanınız: {score}/{questions.length - 1}</h2>
            <h3>Yüzde: %{getScorePercentage()}</h3>
            <h4>Seviye: {getScoreLevel()}</h4>
          </div>
        </div>
        
        <div className="results-section">
          <h3>Test Özeti:</h3>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '15px', marginTop: '20px'}}>
            <div style={{backgroundColor: '#f8fafc', padding: '15px', borderRadius: '8px'}}>
              <h4 style={{color: '#1e40af', marginBottom: '10px'}}>Kelime Bilgisi</h4>
              <ul style={{listStyle: 'none', padding: 0}}>
                <li>✅ Zıt anlamlı kelimeler: {userAnswers[0] === questions[0].correct ? "Doğru" : "Yanlış"}</li>
                <li>✅ Eş anlamlı kelimeler: {userAnswers[2] === questions[2].correct ? "Doğru" : "Yanlış"}</li>
                <li>✅ Kelime anlamı: {userAnswers[5] === questions[5].correct ? "Doğru" : "Yanlış"}</li>
                <li>✅ Deyim bilgisi: {userAnswers[8] === questions[8].correct ? "Doğru" : "Yanlış"}</li>
              </ul>
            </div>
            <div style={{backgroundColor: '#f8fafc', padding: '15px', borderRadius: '8px'}}>
              <h4 style={{color: '#1e40af', marginBottom: '10px'}}>Dil Bilgisi</h4>
              <ul style={{listStyle: 'none', padding: 0}}>
                <li>✅ Cümle tamamlama: {userAnswers[1] === questions[1].correct ? "Doğru" : "Yanlış"}</li>
                <li>✅ Yazım kuralları: {userAnswers[4] === questions[4].correct ? "Doğru" : "Yanlış"}</li>
                <li>✅ Kelime türetme: {userAnswers[7] === questions[7].correct ? "Doğru" : "Yanlış"}</li>
              </ul>
            </div>
            <div style={{backgroundColor: '#f8fafc', padding: '15px', borderRadius: '8px'}}>
              <h4 style={{color: '#1e40af', marginBottom: '10px'}}>Anlama ve Yazma</h4>
              <ul style={{listStyle: 'none', padding: 0}}>
                <li>✅ Kategori ayırt etme: {userAnswers[3] === questions[3].correct ? "Doğru" : "Yanlış"}</li>
                <li>✅ Okuma anlama: {userAnswers[6] === questions[6].correct ? "Doğru" : "Yanlış"}</li>
                <li>✅ Yazma becerisi: Tamamlandı</li>
              </ul>
            </div>
          </div>
          
          <div style={{marginTop: '20px', padding: '15px', backgroundColor: '#fef3c7', borderRadius: '8px', border: '1px solid #f59e0b'}}>
            <h4 style={{color: '#92400e', marginBottom: '10px'}}>Öneriler:</h4>
            <ul style={{margin: 0, paddingLeft: '20px', color: '#92400e'}}>
              {getScorePercentage() < 60 && (
                <li>Daha fazla kitap okumaya çalışın</li>
              )}
              {getScorePercentage() < 80 && (
                <li>Kelime haznenizi geliştirmek için günlük tutun</li>
              )}
              <li>Yazım kurallarını tekrar gözden geçirin</li>
              <li>Deyim ve atasözlerini öğrenmeye devam edin</li>
            </ul>
          </div>
        </div>

        <div className="test-actions">
          <button onClick={() => navigate("/tests")} className="btn-primary">
            Test Listesine Dön
          </button>
          <button onClick={() => window.location.reload()} className="btn-secondary">
            Testi Tekrarla
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

  const currentQ = questions[currentQuestion];

  return (
    <div className="test-container">
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
      
      <div className="test-header">
        <h1>✏️ Dil ve Yazı Testi</h1>
        <div className="test-info">
          <span>Soru {currentQuestion + 1}/{questions.length}</span>
          <span>Kalan Süre: {formatTime(timeLeft)}</span>
          <span>Puan: {score}</span>
        </div>
      </div>

      <div className="question-container">
        {currentQ.isWriting ? (
          <div className="writing-question">
            <h3>{currentQ.question}</h3>
            <img src={currentQ.image} alt="Yazma için resim" style={{width: 120, height: 120, margin: '20px 0'}} />
            <div style={{marginBottom: '15px', padding: '10px', backgroundColor: '#f0f9ff', borderRadius: '8px', border: '1px solid #0ea5e9'}}>
              <p style={{margin: '0', fontSize: '0.9rem', color: '#0369a1'}}>
                <strong>Yazma İpucu:</strong> {currentQ.writingPrompt}
              </p>
            </div>
            <textarea 
              placeholder="Cevabınızı buraya yazın... (En az 50 karakter)"
              rows="8"
              value={writingText}
              onChange={(e) => setWritingText(e.target.value)}
              style={{
                width: '100%',
                padding: '15px',
                border: '2px solid #ddd',
                borderRadius: '8px',
                fontSize: '16px',
                fontFamily: 'inherit',
                resize: 'vertical'
              }}
            />
            <div style={{marginTop: '10px', fontSize: '0.9rem', color: '#666'}}>
              Karakter sayısı: {writingText.length} / Minimum: 50
            </div>
            <button 
              onClick={handleWritingSubmit}
              className="btn-primary"
              style={{marginTop: '15px'}}
              disabled={writingText.trim().length < 50}
            >
              Yazmayı Tamamla
            </button>
          </div>
        ) : (
          <>
            <h3>{currentQ.question}</h3>
            <div className="options-container">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionClick(index)}
                  className={`option-btn${selectedOption === index ? ' selected' : ''}`}
                  disabled={isOptionDisabled}
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="test-progress">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{width: `${((currentQuestion + 1) / questions.length) * 100}%`}}
          ></div>
        </div>
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