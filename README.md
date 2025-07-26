# NeuroScan - Kognitif Değerlendirme Platformu

## Grup Üyeleri (Grup 58)
- Furkan Erdoğan
- Sezin Yavuz
- İmran Kaçan
- Sinem Karatepe

---

## Proje Tanıtımı

**NeuroScan**, ev ortamında kullanıcıların kognitif (bilişsel) işlevlerini değerlendirebileceği, yapay zeka destekli bir tarama platformudur. Temel nöropsikolojik semptomlara yönelik hızlı bir ön değerlendirme sunar. Amaç, erken dönem bilişsel gerilemenin fark edilmesi ve bir doktora yönlendirmeyi desteklemektir.

- **Kullanıcılar:** Herkes (özellikle yaşlılar, riskli gruplar, sağlık çalışanları)
- **Senaryo:** Kayıt ol → Test seç → Testi çöz → AI analizi al → Sonuçları ve önerileri gör

---

## Proje Klasör Yapısı

```
yzta-final-project/
├── frontend/          # React.js tabanlı kullanıcı arayüzü
│   ├── src/
│   │   ├── components/   # Ortak React bileşenleri
│   │   ├── pages/        # Test ve sonuç sayfaları
│   │   ├── services/     # API servisleri
│   │   └── context/      # Tema ve kullanıcı context'leri
│   ├── public/           # Statik dosyalar
│   └── package.json      # Frontend bağımlılıkları
├── backend/           # Node.js/Express.js tabanlı API
│   ├── routes/        # API route'ları
│   ├── models/        # MongoDB modelleri
│   ├── middleware/    # JWT, validasyon, güvenlik
│   ├── services/      # AI servisleri, iş mantığı
│   ├── utils/         # Yardımcı fonksiyonlar
│   └── package.json   # Backend bağımlılıkları
├── Daily Scrum/       # Scrum toplantı kayıtları
└── README.md          # Ana dokümantasyon
```

---

## Hızlı Başlangıç (TL;DR)

1. **Gereksinimler:** Node.js (v16+), MongoDB, Google Gemini API Key (ücretsiz)
2. **Backend'i kur:**
   ```bash
   cd backend
   npm install
   cp config.env.example .env
   # .env dosyasını düzenle (aşağıya bak)
   npm run dev
   ```
3. **Frontend'i kur:**
   ```bash
   cd frontend
   npm install
   npm start
   ```
4. **Tarayıcıda aç:** http://localhost:3000

---

## Detaylı Kurulum ve Çalıştırma

### 1. Gereksinimler
- **Node.js:** [İndir](https://nodejs.org/)
- **MongoDB:** [Kurulum rehberi](https://www.mongodb.com/docs/manual/installation/)
- **Google Gemini API Key:** [Google AI Studio](https://makersuite.google.com/app/apikey) üzerinden ücretsiz alınabilir.

### 2. Backend Kurulumu

```bash
cd backend
npm install
cp config.env.example .env
```

`.env` dosyasını açıp aşağıdaki gibi doldurun:

```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/neuroscan
JWT_SECRET=neuroscan-super-secret-jwt-key-2025-change-in-production
GEMINI_API_KEY=buraya-kendi-gemini-api-keyinizi-yapistirin
FRONTEND_URL=http://localhost:3000
```

> **Not:**
> - MongoDB'yi başlatmak için: `brew services start mongodb/brew/mongodb-community` (Mac)
> - Port 5001 başka bir uygulama tarafından kullanılıyorsa `.env` dosyasındaki PORT'u değiştirin.

Backend'i başlat:
```bash
npm run dev
# veya
node server.js
```

### 3. Frontend Kurulumu

```bash
cd frontend
npm install
npm start
```

Frontend otomatik olarak http://localhost:3000 adresinde açılır.

---

## Testler ve Kullanıcı Akışı

### 1. Kayıt Ol & Giriş Yap
- E-posta ve şifre ile kayıt olabilirsiniz.
- JWT ile güvenli oturum yönetimi.

### 2. Test Seçimi
- **Dil ve Yazı Testi:** Kelime bilgisi, dil bilgisi, okuma anlama.
- **Bellek Testi:** Kısa süreli bellek ve hatırlama.
- **Dikkat ve Konsantrasyon Testi:** Dikkat, hız, mantık, görsel ayırt etme.

### 3. Test Çözümü
- Her testte süre ve otomatik ilerleme vardır.
- Cevaplarınızı verdikçe bir sonraki soruya otomatik geçilir.
- Test bitince sonuçlar ve AI analizi ekranda gösterilir.

### 4. Sonuçlar ve AI Analizi
- Test puanınız, yüzdelik başarı ve seviye.
- Google Gemini AI ile risk analizi ve kişisel öneriler.
- Sonuçları PDF olarak indirebilir veya silebilirsiniz.

---

## AI Entegrasyonu (Google Gemini)

- **Gemini API Key** almak için: [Google AI Studio](https://makersuite.google.com/app/apikey)
- `.env` dosyasına anahtarınızı ekleyin: `GEMINI_API_KEY=...`
- AI, test sonuçlarınızı analiz eder ve kişiselleştirilmiş öneriler sunar.
- API anahtarınızı kimseyle paylaşmayın!

---

## Sıkça Sorulan Sorular (SSS)

**S: API anahtarı neden gerekli?**
C: AI analizleri için Google Gemini servisi kullanılıyor. Ücretsizdir, Google hesabınızla alabilirsiniz.

**S: MongoDB çalışmıyor, ne yapmalıyım?**
C: Kurulu değilse [buradan](https://www.mongodb.com/docs/manual/installation/) kurun. Mac'te `brew services start mongodb/brew/mongodb-community` ile başlatın.

**S: Port çakışması olursa?**
C: `.env` dosyasındaki PORT değerini değiştirin (ör: 5002).

**S: Testler neden otomatik ilerliyor?**
C: Kullanıcı deneyimini hızlandırmak için cevap sonrası otomatik geçiş var.

**S: Sonuçlarım kaybolursa?**
C: Test sonuçlarınız backend'de saklanır. Giriş yaptıysanız tekrar görebilirsiniz.

---

## API Kısa Dökümantasyon

### Auth
- `POST /api/auth/register` → Kayıt
- `POST /api/auth/login` → Giriş
- `GET /api/auth/profile` → Profil bilgisi (JWT gerekli)

### Testler
- `GET /api/tests/types` → Test türleri
- `POST /api/tests/submit` → Test sonucu gönder
- `GET /api/tests/results` → Kullanıcı test sonuçları

### AI
- `POST /api/ai/analyze` → AI ile analiz
- `POST /api/ai/recommendations` → Kişisel öneriler

### Sonuçlar
- `GET /api/results` → Tüm sonuçlar
- `GET /api/results/:id/pdf` → PDF indir
- `DELETE /api/results/:id` → Sonucu sil

> Daha fazla detay için backend/routes klasörüne bakabilirsiniz.

---

## Geliştirici Notları & Katkı

- Kod standartları için ESLint kullanılır. Uyarıları dikkate alın.
- Her yeni özellik için test ekleyin.
- Katkı sağlamak için fork'layıp PR açabilirsiniz.
- Sorun bildirimi ve iletişim için: [github issues](https://github.com/Hawkyshun/yzta-final-project/issues)

---

## Lisans
MIT

---

## Ekran Görüntüleri

> Tüm sprint ve ekran görüntüleri için [Daily Scrum klasörüne](./Daily%20Scrum/) ve aşağıdaki sprint bölümlerine bakınız.

---

# Sprint Geçmişi ve Notlar

## Sprint 1
- Proje seçimi, planlama, teknoloji kararları
- User story'ler ve toplantı notları

## Sprint 2
- Frontend geliştirme, UI/UX, temel testler
- Kullanıcı akışı ve tema desteği

## Sprint 3
- Backend, AI entegrasyonu, yeni testler, PDF rapor

## Sprint 4
- Planlanıyor
