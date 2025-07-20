import React from "react";

export default function TestListPage() {
  return (
    <div className="testlist-container">
      <h1>Evde Bilişsel Tarama</h1>
      <p style={{ fontSize: "1.2rem", color: "#444", marginTop: 8, marginBottom: 32 }}>
        Bilişsel sağlığınızı değerlendirmeye mini testlerle başlayın.
      </p>
      <div className="test-list">
        <div className="test-item">
          <span>
            <span role="img" aria-label="saat" style={{marginRight: 12}}>🕒</span>
            Zaman Yer Yönelimi Testi
          </span>
          <button className="test-btn">Başlat</button>
        </div>
        <div className="test-item">
          <span>
            <span role="img" aria-label="beyin" style={{marginRight: 12}}>🧠</span>
            Bellek Testi
          </span>
          <button className="test-btn">Başlat</button>
        </div>
        <div className="test-item">
          <span>
            <span role="img" aria-label="ünlem" style={{marginRight: 12}}>❗</span>
            Dikkat ve Konsantrasyon Testi
          </span>
          <button className="test-btn">Başlat</button>
        </div>
        <div className="test-item">
          <span>
            <span role="img" aria-label="kalem" style={{marginRight: 12}}>✏️</span>
            Dil ve Yazı Testi
          </span>
          <button className="test-btn">Başlat</button>
        </div>
        <div className="test-item">
          <span>
            <span role="img" aria-label="göz" style={{marginRight: 12}}>👁️</span>
            Görsel Algısal Test
          </span>
          <button className="test-btn">Başlat</button>
        </div>
      </div>
      <div className="test-item" style={{marginTop: 32}}>
        <span>
          <span role="img" aria-label="sonuçlar" style={{marginRight: 12}}>📊</span>
          Sonuçlarım
        </span>
        <button className="test-btn">Göster</button>
      </div>
      <footer className="testlist-footer">
        © 2025 NeuroScan AI
      </footer>
    </div>
  );
}