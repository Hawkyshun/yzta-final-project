import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ThemeSwitch from "../components/ThemeSwitch";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError("E-posta adresi gereklidir");
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Geçerli bir e-posta adresi girin");
      return;
    }
    
    setLoading(true);
    setError("");
    
    // Simüle edilmiş şifre sıfırlama işlemi
    setTimeout(() => {
      setSuccess(true);
      setLoading(false);
    }, 2000);
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
      
      <div style={{ 
        position: 'absolute', 
        top: '20px', 
        left: '20px'
      }}>
        <button 
          onClick={() => navigate("/auth")}
          style={{
            background: 'transparent',
            color: '#2563eb',
            border: '1px solid #2563eb',
            borderRadius: '8px',
            padding: '8px 16px',
            fontSize: '0.9rem',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => {
            e.target.style.background = '#2563eb';
            e.target.style.color = '#fff';
          }}
          onMouseOut={(e) => {
            e.target.style.background = 'transparent';
            e.target.style.color = '#2563eb';
          }}
        >
          ← Geri Dön
        </button>
      </div>

      <img
        src="https://img.icons8.com/ios-filled/100/brain.png"
        alt="Logo"
        className="auth-logo"
      />
      <h1>NeuroScan AI</h1>
      <h2>Şifremi Unuttum</h2>
      
      {!success ? (
        <>
          <p style={{color: '#666', marginBottom: '20px', fontSize: '1rem'}}>
            E-posta adresinizi girin, şifre sıfırlama linki göndereceğiz.
          </p>
          
          <form className="auth-form" onSubmit={handleSubmit}>
            <div>
              <input 
                type="email" 
                placeholder="E-posta adresinizi girin" 
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                className={error ? "error-input" : ""}
                required 
              />
              {error && <span className="error-message">{error}</span>}
            </div>
            
            <button 
              type="submit" 
              className="auth-btn"
              disabled={loading}
            >
              {loading ? "Gönderiliyor..." : "Şifre Sıfırlama Linki Gönder"}
            </button>
          </form>
        </>
      ) : (
        <div style={{
          backgroundColor: '#f0fdf4',
          border: '1px solid #22c55e',
          borderRadius: '12px',
          padding: '20px',
          textAlign: 'center',
          maxWidth: '400px',
          margin: '20px auto'
        }}>
          <div style={{fontSize: '3rem', marginBottom: '15px'}}>✅</div>
          <h3 style={{color: '#166534', marginBottom: '10px'}}>E-posta Gönderildi!</h3>
          <p style={{color: '#166534', marginBottom: '20px'}}>
            Şifre sıfırlama linki <strong>{email}</strong> adresine gönderildi.
          </p>
          <button 
            onClick={() => navigate("/auth")}
            className="auth-btn"
          >
            Giriş Sayfasına Dön
          </button>
        </div>
      )}
      
      <div className="auth-info">
        <p>Hesabınızı hatırladınız mı? <a href="/auth" className="forgot-link">Giriş Yap</a></p>
      </div>
    </div>
  );
}