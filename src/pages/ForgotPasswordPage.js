import React from "react";

export default function ForgotPasswordPage() {
  return (
    <div className="auth-container">
      <img
        src="https://img.icons8.com/ios-filled/100/brain.png"
        alt="Logo"
        className="auth-logo"
      />
      <h1>NeuroScan AI</h1>
      <h2>Şifremi Unuttum</h2>
      <form className="auth-form">
        <input type="email" placeholder="E-posta adresinizi girin" required />
        <button type="submit" className="auth-btn">
          Şifre Sıfırlama Linki Gönder
        </button>
      </form>
      <div className="auth-info">
        <p>Şifre sıfırlama linki e-posta adresinize gönderilecektir.</p>
      </div>
    </div>
  );
}