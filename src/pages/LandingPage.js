import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="main-container">
      <img
        src="https://img.icons8.com/ios-filled/100/brain.png"
        alt="Logo"
        className="logo"
      />
      <h1>NeuroScan AI</h1>
      <p>
        Kullanıcıların ev ortamında kognitif işlevlerini değerlendirebileceği
        yapay zeka destekli bir tarama aracıdır. Temel nöropsikolojik
        semptomlara yönelik hızlı bir ön değerlendirme sunar. Amaç erken
        dönem bilişsel gerilemenin fark edilmesi ve bir doktora yönlendirmeyi
        desteklemektir.
      </p>
      <button onClick={() => navigate("/auth")}>
        Hadi Başlayalım
      </button>
    </div>
  );
}