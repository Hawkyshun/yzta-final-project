import React from "react";

export default function RegisterPage() {
  return (
    <div className="auth-container">
      <img
        src="https://img.icons8.com/ios-filled/100/brain.png"
        alt="Logo"
        className="auth-logo"
      />
      <h1>NeuroScan AI</h1>
      <h2>Kayıt Ol</h2>
      <form className="auth-form">
        <input type="text" placeholder="Ad Soyad" required />
        <input type="email" placeholder="E-posta" required />
        <input type="password" placeholder="Şifre" required />
        <button type="submit" className="auth-btn">Kayıt Ol</button>
      </form>
      <div className="auth-info">
        <p>Zaten hesabınız var mı? <a href="/auth" className="forgot-link">Giriş Yap</a></p>
      </div>
    </div>
  );
}