import React from "react";

export default function AuthPage() {
  return (
    <div className="auth-container">
      <img
        src="https://img.icons8.com/ios-filled/100/brain.png"
        alt="Logo"
        className="auth-logo"
      />
      <h1>NeuroScan AI</h1>
      <h2>Giriş Yap / Kayıt Ol</h2>
      <form className="auth-form">
        <input type="email" placeholder="E-posta" required />
        <input type="password" placeholder="Şifre" required />
        <div className="auth-options">
          <label>
            <input type="checkbox" /> Beni hatırla
          </label>
          <a href="/forgot-password" className="forgot-link">Şifremi unuttum?</a>
        </div>
        <button type="submit" className="auth-btn">Giriş Yap</button>
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
      </div>
    </div>
  );
}