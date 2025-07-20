import { useNavigate } from "react-router-dom";
import ThemeSwitch from "../components/ThemeSwitch";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="main-container">
      {/* Header Navigation */}
      <header style={{
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 40px',
        zIndex: 100
      }}>
                  <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <img
              src="https://img.icons8.com/ios-filled/100/brain.png"
              alt="Logo"
              style={{ width: '40px', height: '40px' }}
            />
            <span style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #2563eb, #1e40af)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              NeuroScan
            </span>
          </div>
        
        <div style={{
          display: 'flex',
          gap: '20px',
          alignItems: 'center'
        }}>
          <span style={{
            color: 'var(--text-secondary)',
            fontSize: '0.9rem',
            fontWeight: '400'
          }}>
          </span>
          <ThemeSwitch position="header" />
        </div>
      </header>

      {/* Hero Section */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '0 20px',
        position: 'relative'
      }}>
        {/* Background Elements */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(37, 99, 235, 0.1) 0%, rgba(37, 99, 235, 0.05) 50%, transparent 100%)',
          borderRadius: '50%',
          zIndex: -1
        }} />
        
        <div style={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(34, 197, 94, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          zIndex: -1
        }} />

        {/* Main Content */}
        <div style={{
          textAlign: 'center',
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          {/* Logo and Title */}
          <div style={{
            marginBottom: '40px',
            position: 'relative'
          }}>
            <div style={{
              width: '120px',
              height: '120px',
              background: 'linear-gradient(135deg, #2563eb, #1e40af)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px auto',
              boxShadow: '0 8px 32px rgba(37, 99, 235, 0.3)',
              position: 'relative'
            }}>
              <img
                src="https://img.icons8.com/ios-filled/100/brain.png"
                alt="Brain Logo"
                style={{ width: '60px', height: '60px', filter: 'brightness(0) invert(1)' }}
              />
            </div>
            
            <h1 style={{
              fontSize: '4.5rem',
              fontWeight: '800',
              margin: '0',
              background: 'linear-gradient(135deg, #1e293b, #334155)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.02em'
            }}>
              NeuroScan AI
            </h1>
            
            <p style={{
              fontSize: '1.5rem',
              color: 'var(--text-secondary)',
              margin: '20px 0 0 0',
              fontWeight: '400'
            }}>
              Yapay Zeka Destekli Kognitif Tarama Platformu
            </p>
          </div>

          {/* Description */}
          <div style={{
            maxWidth: '800px',
            margin: '0 auto 60px auto'
          }}>
            <p style={{
              fontSize: '1.4rem',
              color: '#475569',
              lineHeight: '1.7',
              marginBottom: '30px',
              fontWeight: '400'
            }}>
              Ev ortamınızda kognitif işlevlerinizi değerlendirin. 
              <strong style={{ color: '#1e40af' }}> Yapay zeka destekli</strong> tarama aracımız ile 
              bilişsel sağlığınızı takip edin ve erken uyarı alın.
            </p>
            
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '40px',
              marginTop: '40px',
              flexWrap: 'wrap'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#64748b',
                fontSize: '1rem'
              }}>
                <span style={{ fontSize: '1.2rem' }}>✅</span>
                Güvenli ve Gizli
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#64748b',
                fontSize: '1rem'
              }}>
                <span style={{ fontSize: '1.2rem' }}>⚡</span>
                Hızlı Sonuç
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#64748b',
                fontSize: '1rem'
              }}>
                <span style={{ fontSize: '1.2rem' }}>🤖</span>
                AI Analiz
              </div>
            </div>
          </div>

          {/* Feature Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '30px',
            marginBottom: '60px',
            maxWidth: '900px',
            margin: '0 auto 60px auto'
          }}>
            <div style={{
              background: 'var(--card-bg)',
              backdropFilter: 'blur(10px)',
              padding: '30px',
              borderRadius: '20px',
              border: '1px solid var(--border-color)',
              boxShadow: '0 8px 32px var(--shadow-color)',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-5px)';
              e.target.style.boxShadow = '0 12px 40px var(--shadow-color)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 8px 32px var(--shadow-color)';
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px'
              }}>
                <span style={{ fontSize: '2rem' }}>🏠</span>
              </div>
              <h3 style={{
                color: 'var(--text-primary)',
                marginBottom: '12px',
                fontSize: '1.3rem',
                fontWeight: '600'
              }}>
                Ev Ortamında Test
              </h3>
              <p style={{
                fontSize: '1rem',
                color: 'var(--text-secondary)',
                lineHeight: '1.6',
                margin: '0'
              }}>
                Rahat ev ortamınızda, kendi hızınızda kognitif testlerinizi tamamlayın.
              </p>
            </div>
            
            <div style={{
              background: 'var(--card-bg)',
              backdropFilter: 'blur(10px)',
              padding: '30px',
              borderRadius: '20px',
              border: '1px solid var(--border-color)',
              boxShadow: '0 8px 32px var(--shadow-color)',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-5px)';
              e.target.style.boxShadow = '0 12px 40px var(--shadow-color)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 8px 32px var(--shadow-color)';
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px'
              }}>
                <span style={{ fontSize: '2rem' }}>🤖</span>
              </div>
              <h3 style={{
                color: 'var(--text-primary)',
                marginBottom: '12px',
                fontSize: '1.3rem',
                fontWeight: '600'
              }}>
                AI Destekli Analiz
              </h3>
              <p style={{
                fontSize: '1rem',
                color: 'var(--text-secondary)',
                lineHeight: '1.6',
                margin: '0'
              }}>
                Gelişmiş yapay zeka algoritmaları ile sonuçlarınızı analiz edin.
              </p>
            </div>
            
            <div style={{
              background: 'var(--card-bg)',
              backdropFilter: 'blur(10px)',
              padding: '30px',
              borderRadius: '20px',
              border: '1px solid var(--border-color)',
              boxShadow: '0 8px 32px var(--shadow-color)',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-5px)';
              e.target.style.boxShadow = '0 12px 40px var(--shadow-color)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 8px 32px var(--shadow-color)';
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px'
              }}>
                <span style={{ fontSize: '2rem' }}>📊</span>
              </div>
              <h3 style={{
                color: 'var(--text-primary)',
                marginBottom: '12px',
                fontSize: '1.3rem',
                fontWeight: '600'
              }}>
                Detaylı Raporlar
              </h3>
              <p style={{
                fontSize: '1rem',
                color: 'var(--text-secondary)',
                lineHeight: '1.6',
                margin: '0'
              }}>
                Kapsamlı raporlar ve gelişim takibi ile sağlığınızı izleyin.
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div style={{
            position: 'relative',
            zIndex: 10
          }}>
            <button 
              onClick={() => navigate("/auth")}
              style={{
                background: 'linear-gradient(135deg, #2563eb, #1e40af)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '16px',
                padding: '20px 40px',
                fontSize: '1.2rem',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 8px 32px rgba(37, 99, 235, 0.3)',
                transform: 'translateY(0)',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-3px)';
                e.target.style.boxShadow = '0 12px 40px rgba(37, 99, 235, 0.4)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 8px 32px rgba(37, 99, 235, 0.3)';
              }}
            >
              <span style={{ position: 'relative', zIndex: 2 }}>
                🚀 Hemen Başlayın
              </span>
            </button>
            
            <p style={{
              fontSize: '0.9rem',
              color: 'var(--text-secondary)',
              marginTop: '16px',
              fontWeight: '400'
            }}>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}