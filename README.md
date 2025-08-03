# NeuroScan - Kognitif Değerlendirme Platformu

## Grup Üyeleri (Grup 58)
- Sinem Karatepe
- İmran Kaçan
- Sezin Yavuz
- Furkan Erdoğan



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
| Sprint 3 | ✅ Tamamlandı | Backend geliştirme, AI entegrasyonu, PDF rapor, Optimizasyon |


### Daily Scrum Toplantıları
Toplantılar Whatsapp üzerinden yapıldı. Screenshotlar [Daily Scrum klasöründe](./Daily%20Scrum/) bulunmaktadır.


# Sprint Geçmişi ve Notlar

## Sprint 1
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
<img width="1280" height="764" alt="Ekran Resmi 2025-08-02 19 26 16" src="https://github.com/user-attachments/assets/eb35dbca-2a69-441b-9a91-ba92c1c5b8a4" />
<img width="1280" height="762" alt="Ekran Resmi 2025-08-02 19 26 32" src="https://github.com/user-attachments/assets/9e2babe5-6631-4843-a870-de3adcc5b31b" />
<img width="1280" height="763" alt="Ekran Resmi 2025-08-02 19 27 41" src="https://github.com/user-attachments/assets/304038e2-5bf7-4c85-8c05-56cfcc5f1c97" />
<img width="1280" height="757" alt="Ekran Resmi 2025-08-02 19 27 52" src="https://github.com/user-attachments/assets/d2e728c9-11d7-43a3-83a4-03f1c76985f8" />
<img width="1280" height="771" alt="Ekran Resmi 2025-08-02 19 28 39" src="https://github.com/user-attachments/assets/8acfdcf1-8c04-4b09-a983-ed51d12842e1" />
<img width="1280" height="632" alt="Ekran Resmi 2025-08-02 19 31 35" src="https://github.com/user-attachments/assets/37bb6afb-3935-4b9c-8af7-b4a4af277596" />
<img width="1280" height="481" alt="Ekran Resmi 2025-08-02 19 32 06" src="https://github.com/user-attachments/assets/b8cdad5f-1561-401e-8003-7dcb975f2b46" />
<img width="1280" height="593" alt="Ekran Resmi 2025-08-02 19 32 27" src="https://github.com/user-attachments/assets/913fde65-2865-4047-99fc-c6e987770256" />
<img width="1280" height="596" alt="Ekran Resmi 2025-08-02 19 34 50" src="https://github.com/user-attachments/assets/19af549f-0153-464d-9ac3-4bdbbfd44234" />
<img width="1280" height="729" alt="Ekran Resmi 2025-08-02 19 36 27" src="https://github.com/user-attachments/assets/db15d47b-1f49-4526-b316-beec3bc6f11f" />
<img width="1280" height="734" alt="Ekran Resmi 2025-08-02 19 36 53" src="https://github.com/user-attachments/assets/862de4a1-14c9-44a9-b076-691cd03efd8a" />
<img width="1280" height="734" alt="Ekran Resmi 2025-08-02 19 37 05" src="https://github.com/user-attachments/assets/6ed236ad-54d7-4c6e-9afb-9f893b8f7889" />
<img width="1280" height="736" alt="Ekran Resmi 2025-08-02 19 37 27" src="https://github.com/user-attachments/assets/b1090c86-8316-441c-bea2-2decfa231a5b" />
<img width="1280" height="687" alt="Ekran Resmi 2025-08-02 19 37 45" src="https://github.com/user-attachments/assets/7d4af650-fd22-47cc-831c-9722eecf0073" />



<img width="1280" height="711" alt="image" src="https://github.com/user-attachments/assets/3d250e1f-b16b-437f-bcf9-37f32011fcc6" />
<img width="1280" height="714" alt="image" src="https://github.com/user-attachments/assets/f54336a1-c554-45e1-99ae-a8397d4d8f8c" />
<img width="1280" height="717" alt="image" src="https://github.com/user-attachments/assets/6c4d321a-307b-4ac7-8dcf-49bca5f5a343" />
<img width="1280" height="712" alt="image" src="https://github.com/user-attachments/assets/90772084-cfe3-4c2c-881c-d72b98987786" />
<img width="1280" height="1000" alt="image" src="https://github.com/user-attachments/assets/456a1250-b416-4352-875c-e259f2ccacc1" />
<img width="1280" height="761" alt="Ekran Resmi 2025-08-02 19 41 18" src="https://github.com/user-attachments/assets/0d310b48-141c-4c0c-acc7-7430d0567dc3" />
<img width="1280" height="773" alt="Ekran Resmi 2025-08-02 19 41 32" src="https://github.com/user-attachments/assets/bbf56d05-91af-4834-8872-be2461965ce1" />
<img width="1280" height="770" alt="Ekran Resmi 2025-08-02 19 42 01" src="https://github.com/user-attachments/assets/31a25b8f-a08e-4412-8903-3630b483ee3e" />

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
**Durum:** ✅ Tamamlandı

### Planlanan Özellikler
- Backend geliştirme 
- AI entegrasyonu (Google Gemini) entegrasyonu
- PDF rapor sistemi 
- Test skorlama mekanizması 
- Kullanıcı sonuçları ve geçmiş takibi 
- Test ve optimizasyon
- Dokümantasyon tamamlama
- Deployment hazırlıkları
- Final testler ve hata düzeltmeleri


## Product Backlog URL
[Sprint 3 Backlog](https://miro.com/welcomeonboard/SXR4MmVFRUxiaXN3U013bFZDcFB0SldZNzZvLzdVUnJDaVloQUR4dWN2RStxOGRjbGwyWUlXdmRtWGNIY1JxcUFsRnRqbWJjMWJIRG9hTnB6T3FwVU05dnFoWU9tRlFHWTJkMy9Qb0dZNTFzV2ZMVHVXYmk3akZxSEFGd3AxeDl3VHhHVHd5UWtSM1BidUtUYmxycDRnPT0hdjE=?share_link_id=924650838172) 

### Sprint Notları
User Storyler Product Backlogların içerisine yazılmıştır. Roller uygun olan backloga göre boyanmıştır. Açıklamalara tıklandığında puanlar görülmektedir.

### Puan Mantığı
Sprint 3'de en çok iş yapılması hedeflenecek şekilde puan hedefi olan 300 puan tamamlanmıştır.

### Daily Scrum
Toplantılar whatsapp üzerinden yapılmıştır. Sprint 3 ekran görüntüleri için [Daily Scrum klasörüne](./Daily%20Scrum/) bakınız.

### Sprint Board Update
[Sprint Board Update](https://imgur.com/a/q7ncMuQ)

### Ekran Görüntüleri
[Ekran Görüntüleri](https://imgur.com/a/rdB06Y7)

### Sprint Review
- Backend tarafında önemli ilerlemeler kaydedildi ve performans iyileştirmeleri yapıldı.
- Sonuçların veritabanına kaydedilmesi, geçmiş sonuçların sorgulanması ve skorlama algoritması gibi kritik işler bu sprintte yapıldı.
- Frontend backend entegrasyonu sorunsuz tamamlandı. Test ekranları stabil bir şekilde çaşülışmakta.
- Sprint boyunca hedeflediğimiz tüm işler zamanında tamamlandı ve sunuma hazır hale getirildi.

### Sprint Retrospective
- Ekip içi iletişim önceki sprintlere kıyasla çok daha güçlüydü.
- Görevler zamanında yerine getirildi ve herkes sorumluluk bilinciyle hareket etti.
- İş bölümü daha netti ekip içi destek sayesinde işler hızlıca ilerledi.
- Toplantılar verimli geçti, planlamaya sadık kalındı.


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

