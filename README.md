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

## Teknolojiler

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Veritabanı**: MongoDB
- **Yapay Zeka**: Google Gemini AI
- **Kimlik Doğrulama**: JWT
- **PDF Raporlama**: jsPDF

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

## Proje Yönetimi ve İletişim

### Product Backlog URL'leri
- **Sprint 1 Product Backlog:** [Miro Board](https://miro.com/app/board/uXjVIhWZIAU=/?share_link_id=937694695242)
- **Sprint 2 Product Backlog:** [Miro Board](https://miro.com/welcomeonboard/bGgxQlhIVTNNdkxXM1lTcjNCdWVZOWplMGFOVmJmTzBCQ3ZvY2J2anRRb3hyMGlKREdRRDhjOFBLU1Q5dldkTkludEpJVFRuQStLNkhxYzBUTlkwK005dnFoWU9tRlFHWTJkMy9Qb0dZNTI3MVgvSkVVakdZNUNNUlFxcXIzemtnbHpza3F6REdEcmNpNEFOMmJXWXBBPT0hdjE=?share_link_id=88465932035)

### Sprint Takip Tablosu

| Sprint | Durum | Ana Özellikler |
|--------|-------|----------------|
| Sprint 1 | ✅ Tamamlandı | Proje seçimi, planlama, teknoloji kararları |
| Sprint 2 | ✅ Tamamlandı | Frontend geliştirme, UI/UX tasarımı |
| Sprint 3 | ... | Backend geliştirme, AI entegrasyonu, PDF rapor, Optimizasyon |


### Daily Scrum Toplantıları
Toplantılar Whatsapp üzerinden yapıldı. Screenshotlar [Daily Scrum klasöründe](./Daily%20Scrum/) bulunmaktadır.


# Sprint Geçmişi ve Notlar

## Sprint 1
**Tarih:** 1-2 Hafta  
**Durum:** ✅ Tamamlandı

## Product Backlog URL
[Sprint 1 Product Backlog](https://miro.com/app/board/uXjVIhWZIAU=/?share_link_id=937694695242)

### Sprint Notları 
User story'ler product backlogların içine yazılmıştır.

### Daily Scrum
Toplantılar Whatsapp üzerinden yapıldı. Screenshotlar [Daily Scrum klasöründe](./Daily%20Scrum/) bulunmaktadır.

### Sprint Board Update
![Sprint 1 Board](https://github.com/user-attachments/assets/47414154-e6f8-42f2-bac3-e7e248a6d6a6)

### Ekran Görüntüleri
![Sprint 1 Screenshot 1](https://github.com/user-attachments/assets/9e75a06a-f053-471e-be02-38fd145514a3)
![Sprint 1 Screenshot 2](https://github.com/user-attachments/assets/abfe703d-842a-4a2d-938e-908f545aa022)

### Sprint Review
- Proje oy birliğiyle seçildi.
- Herkes kendisine ait görevlerle ilgili fikrini belirtti.
- Projenin devamı için yeni fikirler sunuldu.
- Potansiyel riskler tartışıldı.

### Sprint Retrospective
- Toplantı günleri ve saatleri belirlendi.
- Takımın iletişim sıklığı ve toplantı verimliliği değerlendirildi.
- Görevler arası önceliklendirme yapılacak.
- Sprint boyunca karşılaşılan zorluklar tartışıldı.

---

## Sprint 2
**Tarih:** 3-4 Hafta  
**Durum:** ✅ Tamamlandı

### Sprint Notları 
User Storyler product backlog içine yazılmıştır. Tıklandığında açıklamaları okunabilmektedir.

### Planlanan Özellikler
- Kullanıcı kaydı ve girişi (React + Node.js + JWT)
- Kognitif testler (ör. Stroop Testi, N-back Testi, Hafıza Oyunları)
- Test sonuçlarının görselleştirilmesi (grafikler, geçmiş karşılaştırması)
- Yapay zeka ile ön değerlendirme ve öneriler (Test sonuçlarından risk analizi yapan bir model)
- Sonuçların PDF olarak indirilmesi
- Kullanıcı dostu, responsive arayüz

## Product Backlog URL
[Sprint 2 Product Backlog](https://miro.com/welcomeonboard/bGgxQlhIVTNNdkxXM1lTcjNCdWVZOWplMGFOVmJmTzBCQ3ZvY2J2anRRb3hyMGlKREdRRDhjOFBLU1Q5dldkTkludEpJVFRuQStLNkhxYzBUTlkwK005dnFoWU9tRlFHWTJkMy9Qb0dZNTI3MVgvSkVVakdZNUNNUlFxcXIzemtnbHpza3F6REdEcmNpNEFOMmJXWXBBPT0hdjE=?share_link_id=88465932035)

### Daily Scrum
Toplantılar Whatsapp üzerinden yapıldı. Screenshotlar [Daily Scrum klasöründe](./Daily%20Scrum/) bulunmaktadır.

### Sprint Board Update
Sprint 2 sürecinde geliştirilen özellikler ve tamamlanan görevler board üzerinde takip edildi.

### Ekran Görüntüleri

<img width="1280" height="685" alt="image" src="https://github.com/user-attachments/assets/7055ed54-d9f6-4585-aabe-380c62bb7643" />
<img width="1280" height="715" alt="image" src="https://github.com/user-attachments/assets/5e9dac15-9c3a-451a-944c-b18ca704a449" />
<img width="1280" height="714" alt="image" src="https://github.com/user-attachments/assets/9bf92642-d0ff-4faf-8c60-411120ef6a60" />
<img width="1280" height="711" alt="image" src="https://github.com/user-attachments/assets/3d250e1f-b16b-437f-bcf9-37f32011fcc6" />
<img width="1280" height="714" alt="image" src="https://github.com/user-attachments/assets/f54336a1-c554-45e1-99ae-a8397d4d8f8c" />
<img width="1280" height="717" alt="image" src="https://github.com/user-attachments/assets/6c4d321a-307b-4ac7-8dcf-49bca5f5a343" />
<img width="1280" height="712" alt="image" src="https://github.com/user-attachments/assets/90772084-cfe3-4c2c-881c-d72b98987786" />
<img width="1280" height="1000" alt="image" src="https://github.com/user-attachments/assets/456a1250-b416-4352-875c-e259f2ccacc1" />
<img width="1280" height="1000" alt="Ekran Resmi 2025-07-20 23 28 45" src="https://github.com/user-attachments/assets/a540b9ad-bf25-4941-b3a3-5b5c793693e3" />
<img width="1280" height="1000" alt="Ekran Resmi 2025-07-20 23 30 01" src="https://github.com/user-attachments/assets/61f61439-ad7c-449c-b1e4-c1b80e563dd2" />
<img width="1280" height="1000" alt="Ekran Resmi 2025-07-20 23 36 42" src="https://github.com/user-attachments/assets/d89ccb1e-13e5-4d7c-b431-d30b81b4f47c" />
<img width="1280" height="1000" alt="Ekran Resmi 2025-07-20 23 36 50" src="https://github.com/user-attachments/assets/44834edb-8740-4f8d-bdbb-b75f47435eb5" />

### Sprint Review
- Landing page, kullanıcı girişi, şifre sıfırlama ve test listesi sayfası başarıyla tasarlandı.
- Testler temel işlevsellikle geliştirildi.
- Tüm testlerin tam skor mekanizması tamamlanmadı, 3. sprintte odaklanılacak.
- Kullanıcı arayüzü anlaşılabilir ve sade olacak şekilde optimize edildi.
- Geri bildirimler doğrultusunda açık-koyu tema eklendi.

### Sprint Retrospective
- Daha sık ve kısa toplantılar yapma kararı alındı, iletişimde gecikmeler yaşandı.
- Görev dağılımı önceki sprinte göre daha netti, ekip içi işbirliği arttı.
- Zaman tahminleri bazı görevlerde fazla iyimserdi, planlama daha gerçekçi yapılmalı.
- Geliştirilen bileşenlerin testleri sprint sonunda değil süreç içinde yapılmalı.
- Görsel ve tıbbi içerikler için erken geri bildirim alınması süreci hızlandırabilir.

---

## Sprint 3
**Tarih:** 5-6 Hafta  
**Durum:** ✅ Tamamlandı

### Sprint Notları
- Backend geliştirme tamamlandı
- AI entegrasyonu (Google Gemini) başarıyla entegre edildi
- PDF rapor sistemi geliştirildi
- Test skorlama mekanizması tamamlandı
- Kullanıcı sonuçları ve geçmiş takibi eklendi

### Ekran Görüntüleri
> Sprint 3 ekran görüntüleri için [Daily Scrum klasörüne](./Daily%20Scrum/) bakınız.

### Sprint Review
- Backend API başarıyla geliştirildi ve test edildi
- AI analiz sistemi entegre edildi
- PDF rapor sistemi çalışır durumda
- Kullanıcı deneyimi iyileştirildi

### Sprint Retrospective
- Backend geliştirme süreci planlandığı gibi tamamlandı
- AI entegrasyonu için ek araştırma gerekli oldu
- Test süreçleri daha sistematik yapılmalı

### Sprint 3 için Ek Planlanan Özellikler
- Test ve optimizasyon
- Dokümantasyon tamamlama
- Deployment hazırlıkları
- Final testler ve hata düzeltmeleri


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

