import React, { useState, useEffect } from "react";
import './OrientationTestPage.css';
import CircularTimer from "../components/CircularTimer";

export default function OrientationTestPage() {
    const correctOrientation = {
  month: "Temmuz",
  season: "Yaz",
  weekday: "Cumartesi",
  daytime: "Öğle",
  city: "İstanbul"
};

  const [step, setStep] = useState(1);
  const [orientationAnswers, setOrientationAnswers] = useState({});
  const [memoryTimer, setMemoryTimer] = useState(180);
  const [memoryStarted, setMemoryStarted] = useState(false);
  const [recallAnswers, setRecallAnswers] = useState({});
  const memoryWords = ["elma", "masa", "çorap"];
  const [score, setScore] = useState(null);
  const [details, setDetails] = useState(null);
  const handleStartMemory = () => {
  setMemoryStarted(true); // süre başlasın
  setStep(3);              // bekleme ekranına geç
};


  // Timer effect for 3 minutes
  useEffect(() => {
  let interval;
  if (memoryStarted && memoryTimer > 0) {
    interval = setInterval(() => {
      setMemoryTimer((prev) => prev - 1);
    }, 1000);
  } else if (memoryTimer === 0) {
    setStep(4); // kelimeleri sorma adımına geç
  }
  return () => clearInterval(interval);
}, [memoryStarted, memoryTimer]);

  // Submit orientation answers
  const handleOrientationSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleRecallSubmit = (e) => {
  e.preventDefault();

  let totalScore = 0;
  const orientationResults = [];
  
  Object.entries(correctOrientation).forEach(([key, correct]) => {
    const user = (orientationAnswers[key] || "").trim().toLowerCase();
    const ok = user === correct.toLowerCase();
    if (ok) totalScore += 1;
    orientationResults.push({
      label: key,
      userAnswer: orientationAnswers[key],
      correct,
      ok
    });
  });

  const recallValues = Object.values(recallAnswers).map(v => (v || "").trim().toLowerCase());
  const memoryResults = memoryWords.map(word => {
    const ok = recallValues.includes(word);
    if (ok) totalScore += 1;
    return { word, ok };
  });

  setDetails({ orientationResults, memoryResults });
  setScore(totalScore);
  setStep(5); // final adımı yeni step
};

  return (
    <div style={{ padding: "2rem", maxWidth: 600, margin: "auto" }}>
      <h1 className="test-title">Zaman ve Yer Yönelimi Testi</h1>


      {/* Step 1: Orientation Questions */}
{step === 1 && (
  <div className="question-card">
    <form className="test-form" onSubmit={handleOrientationSubmit}>
      
      <label>
        1. Bugünün ayı nedir?
        <select
          required
          onChange={(e) =>
            setOrientationAnswers({ ...orientationAnswers, month: e.target.value })
          }
        >
          <option value="">Ay seçiniz...</option>
          <option value="Temmuz">Temmuz</option>
          <option value="Haziran">Haziran</option>
          <option value="Ağustos">Ağustos</option>
        </select>
      </label>

      <label>
        2. Şu an mevsim nedir?
        <select
          required
          onChange={(e) =>
            setOrientationAnswers({ ...orientationAnswers, season: e.target.value })
          }
        >
          <option value="">Mevsim seçiniz...</option>
          <option value="İlkbahar">İlkbahar</option>
          <option value="Yaz">Yaz</option>
          <option value="Sonbahar">Sonbahar</option>
          <option value="Kış">Kış</option>
        </select>
      </label>

      <label>
        3. Haftanın hangi günü?
        <select
          required
          onChange={(e) =>
            setOrientationAnswers({ ...orientationAnswers, weekday: e.target.value })
          }
        >
          <option value="">Gün seçiniz...</option>
          <option value="Cuma">Cuma</option>
          <option value="Cumartesi">Cumartesi</option>
          <option value="Pazar">Pazar</option>
        </select>
      </label>

      <label>
        4. Günün hangi bölümündeyiz?
        <select
          required
          onChange={(e) =>
            setOrientationAnswers({ ...orientationAnswers, daytime: e.target.value })
          }
        >
          <option value="">Bölüm seçiniz...</option>
          <option value="Sabah">Sabah</option>
          <option value="Öğle">Öğle</option>
          <option value="Akşam">Akşam</option>
        </select>
      </label>

      <label>
        5. Hangi şehirde yaşıyorsunuz?
        <input
          required
          type="text"
          placeholder="Örn. İstanbul"
          onChange={(e) =>
            setOrientationAnswers({ ...orientationAnswers, city: e.target.value })
          }
        />
      </label>

      <button type="submit">Devam Et</button>
    </form>
  </div>
)}


      {/* Step 2: Show Memory Words */}
    {step === 2 && (
    <div>
        <h2>Kısa Süreli Bellek Testi</h2>
        <p>Aşağıdaki 3 kelimeyi aklınızda tutun. 3 dakika sonra size soracağız.</p>
        <ul>
        {memoryWords.map((word, i) => (
            <li key={i} style={{ fontSize: "1.5rem", marginBottom: 8 }}>{word}</li>
        ))}
        </ul>
        <button onClick={handleStartMemory}>Hazırım, başlat</button>
    </div>
    )}

      {/* Step 3: Waiting 3 Minutes */}
        {step === 3 && (
        <div style={{ maxWidth: 400 }}>
            <h2>Bekleme Süresi</h2>
            <p style={{ lineHeight: 1.5 }}>
            Lütfen başka şeylerle aşırı meşgul olmadan bekleyin. Birazdan gördüğünüz
            3 kelimeyi sizden isteyeceğiz.
            </p>
            <CircularTimer total={180} remaining={memoryTimer} />
            <p style={{ fontSize: ".9rem", color: "#666" }}>
            Süre otomatik tamamlanınca sonraki adıma geçilecek.
            </p>
        </div>
        )}

      {/* Step 4: Ask recall questions */}
      {step === 4 && score === null && (
        <form onSubmit={handleRecallSubmit}>
          <h2>3 Kelimeyi Hatırlıyor musunuz?</h2>
          <p>Gördüğünüz 3 kelimeyi yazınız:</p>
          <input
            required
            type="text"
            placeholder="1. kelime"
            onChange={(e) => setRecallAnswers({ ...recallAnswers, w1: e.target.value })}
          />
          <input
            required
            type="text"
            placeholder="2. kelime"
            onChange={(e) => setRecallAnswers({ ...recallAnswers, w2: e.target.value })}
          />
          <input
            required
            type="text"
            placeholder="3. kelime"
            onChange={(e) => setRecallAnswers({ ...recallAnswers, w3: e.target.value })}
          />
          <br /><br />
          <button type="submit">Bitir ve Değerlendir</button>
        </form>
      )}

      {/* Final Step: Show Score */}
      {step === 5 && score !== null && details && (
  <div style={{ maxWidth: 520 }}>
    <h2>Test Tamamlandı</h2>
    <p>
      Toplam Puan: <strong>{score} / 8</strong> ({Math.round((score / 8) * 100)}%)
    </p>

    <h3 style={{ marginTop: "1.5rem" }}>Oryantasyon Sonuçları</h3>
    <ul style={{ listStyle: "none", padding: 0 }}>
      {details.orientationResults.map((r, i) => (
        <li
          key={i}
          style={{
            background: r.ok ? "#ecfdf5" : "#fef2f2",
            border: `1px solid ${r.ok ? "#10b981" : "#ef4444"}`,
            padding: "8px 12px",
            borderRadius: 6,
            marginBottom: 8,
            fontSize: ".95rem"
          }}
        >
          <strong>{i + 1}.</strong> {r.label} – Senin cevabın:{" "}
          <em>{r.userAnswer || "—"}</em> | Doğru: <strong>{r.correct}</strong>{" "}
          {r.ok ? "✅" : "❌"}
        </li>
      ))}
    </ul>

    <h3 style={{ marginTop: "1.5rem" }}>Bellek (3 kelime)</h3>
    <div style={{ display: "flex", gap: 8 }}>
      {details.memoryResults.map((m, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            textAlign: "center",
            background: m.ok ? "#ddf8ff" : "#fff7d6",
            border: `1px solid ${m.ok ? "#0ea5e9" : "#f59e0b"}`,
            padding: "10px 6px",
            borderRadius: 6,
            fontWeight: 500
          }}
        >
          {m.word} {m.ok ? "✅" : "⚠️"}
        </div>
      ))}
    </div>

    <p style={{ marginTop: "1.5rem" }}>
      {score >= 6
        ? "Bilişsel yönelim ve kısa süreli bellek performansınız genel olarak iyi görünüyor."
        : "Bazı alanlarda zorlanma var. Gözlem devam ederse bir uzmana danışmanız faydalı olabilir."}
    </p>

    <button
      onClick={() => {
        window.location.reload();
      }}
      style={{
        marginTop: "1rem",
        background: "#2563eb",
        color: "#fff",
        border: "none",
        padding: "0.7rem 1.4rem",
        borderRadius: 6,
        cursor: "pointer"
      }}
    >
      Yeniden Uygula
    </button>
  </div>
)}

    </div>
  );
}
