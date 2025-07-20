import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";
import ThemeSwitch from "../components/ThemeSwitch";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    
    if (!email.trim() || !password.trim()) {
      setError("Lütfen e-posta ve şifre alanlarını doldurun!");
      return;
    }
    
    setLoading(true);
    
    // Simüle edilmiş giriş işlemi
    setTimeout(() => {
      // Test kullanıcısı kontrolü
      if (email === "test@test" && password === "test123") {
        // Test kullanıcısı girişi başarılı
        setToast({
          message: "Giriş başarılı! Test sayfasına yönlendiriliyorsunuz.",
          type: "success"
        });
        setTimeout(() => navigate("/tests"), 1500);
      } else if (email && password) {
        // Diğer kullanıcılar için basit kontrol
        setToast({
          message: "Giriş başarılı! Test sayfasına yönlendiriliyorsunuz.",
          type: "success"
        });
        setTimeout(() => navigate("/tests"), 1500);
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="auth-container">
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '20px'
      }}>
        <ThemeSwitch />
      </div>
      
      <img
        src="https://img.icons8.com/ios-filled/100/brain.png"
        alt="Logo"
        className="auth-logo"
      />
      <h1>NeuroScan AI</h1>
      <h2>Giriş Yap / Kayıt Ol</h2>
      {error && (
        <div style={{
          backgroundColor: '#fef2f2',
          border: '1px solid #f87171',
          borderRadius: '8px',
          padding: '12px',
          marginBottom: '16px',
          color: '#dc2626',
          fontSize: '0.9rem',
          textAlign: 'center'
        }}>
          {error}
        </div>
      )}
      
      <form className="auth-form" onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="E-posta" 
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          required 
        />
        <input 
          type="password" 
          placeholder="Şifre" 
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
          required 
        />
        <div className="auth-options">
          <label>
            <input type="checkbox" /> Beni hatırla
          </label>
          <a href="/forgot-password" className="forgot-link">Şifremi unuttum?</a>
        </div>
        <button 
          type="submit" 
          className="auth-btn"
          disabled={loading}
        >
          {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
        </button>
      </form>
      <div className="auth-divider">veya</div>
      <a href="/register" className="register-btn">Kayıt Ol – İlk kez mi buradasınız?</a>
      <div className="auth-info">
        <p><b>Neden giriş yapmalıyım?</b></p>
        <ul>
          <li>✔ Test sonuçlarınızı kaydedin</li>
          <li>✔ Gelişiminizi takip edin</li>
          <li>✔ Yönlendirmeler alın</li>
        </ul>
        <div style={{marginTop: '15px', padding: '10px', backgroundColor: '#f0f9ff', borderRadius: '8px', border: '1px solid #0ea5e9'}}>
          <p style={{margin: '0', fontSize: '0.9rem', color: '#0369a1'}}>
            <b>Test Kullanıcısı:</b><br/>
            E-posta: <code>test@test</code><br/>
            Şifre: <code>test123</code>
          </p>
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