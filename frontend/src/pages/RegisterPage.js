import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";
import ThemeSwitch from "../components/ThemeSwitch";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Hata mesajını temizle
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ""
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Ad soyad gereklidir";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "E-posta gereklidir";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Geçerli bir e-posta adresi girin";
    }
    
    if (!formData.password) {
      newErrors.password = "Şifre gereklidir";
    } else if (formData.password.length < 6) {
      newErrors.password = "Şifre en az 6 karakter olmalıdır";
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Şifreler eşleşmiyor";
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      // Simüle edilmiş kayıt işlemi
      setTimeout(() => {
        setToast({
          message: "Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz.",
          type: "success"
        });
        setTimeout(() => navigate("/auth"), 1500);
        setLoading(false);
      }, 1500);
    } else {
      setErrors(newErrors);
    }
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
      <h2>Kayıt Ol</h2>
      
      <form className="auth-form" onSubmit={handleSubmit}>
        <div>
          <input 
            type="text" 
            name="fullName"
            placeholder="Ad Soyad" 
            value={formData.fullName}
            onChange={handleChange}
            className={errors.fullName ? "error-input" : ""}
            required 
          />
          {errors.fullName && <span className="error-message">{errors.fullName}</span>}
        </div>
        
        <div>
          <input 
            type="email" 
            name="email"
            placeholder="E-posta" 
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? "error-input" : ""}
            required 
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>
        
        <div>
          <input 
            type="password" 
            name="password"
            placeholder="Şifre (en az 6 karakter)" 
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? "error-input" : ""}
            required 
          />
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>
        
        <div>
          <input 
            type="password" 
            name="confirmPassword"
            placeholder="Şifre Tekrar" 
            value={formData.confirmPassword}
            onChange={handleChange}
            className={errors.confirmPassword ? "error-input" : ""}
            required 
          />
          {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
        </div>
        
        <button 
          type="submit" 
          className="auth-btn"
          disabled={loading}
        >
          {loading ? "Kayıt Olunuyor..." : "Kayıt Ol"}
        </button>
      </form>
      
      <div className="auth-info">
        <p>Zaten hesabınız var mı? <a href="/auth" className="forgot-link">Giriş Yap</a></p>
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