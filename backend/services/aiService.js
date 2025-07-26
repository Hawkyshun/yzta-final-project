const { GoogleGenerativeAI } = require('@google/generative-ai');

class AIService {
  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'demo-key');
    this.model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
  }

  async analyzeTestResult(testData, userProfile) {
    try {
      const prompt = this.buildAnalysisPrompt(testData, userProfile);
      
      const systemPrompt = `Sen bir nöropsikologsun. Kognitif test sonuçlarını analiz ederek kullanıcılara profesyonel öneriler sunuyorsun. 
      Yanıtlarını Türkçe olarak ver ve tıbbi terminolojiyi basit dille açıkla. 
      Risk seviyesini 'düşük', 'orta' veya 'yüksek' olarak belirle.`;
      
      const fullPrompt = `${systemPrompt}\n\n${prompt}`;
      
      const result = await this.model.generateContent(fullPrompt);
      const response = await result.response;
      const analysis = response.text();

      return this.parseAnalysis(analysis);
    } catch (error) {
      console.error('AI analiz hatası:', error);
      return this.getDefaultAnalysis(testData);
    }
  }

  buildAnalysisPrompt(testData, userProfile) {
    const { testType, testName, score, maxScore, percentage, duration, answers } = testData;
    const { age, gender, educationLevel, medicalHistory } = userProfile;

    return `
    Kognitif Test Analizi İsteği:
    
    Test Bilgileri:
    - Test Türü: ${testType}
    - Test Adı: ${testName}
    - Skor: ${score}/${maxScore} (%${percentage})
    - Süre: ${duration} saniye
    - Yaş: ${age}
    - Cinsiyet: ${gender}
    - Eğitim Seviyesi: ${educationLevel}
    
    Tıbbi Geçmiş:
    - Nörolojik Durumlar: ${medicalHistory.hasNeurologicalConditions ? 'Var' : 'Yok'}
    - Ruh Sağlığı Durumları: ${medicalHistory.hasMentalHealthConditions ? 'Var' : 'Yok'}
    - İlaçlar: ${medicalHistory.medications?.length > 0 ? medicalHistory.medications.map(m => m.name).join(', ') : 'Yok'}
    
    Cevap Detayları:
    ${answers.map((answer, index) => `
    Soru ${index + 1}: ${answer.isCorrect ? 'Doğru' : 'Yanlış'} (${answer.timeSpent}s)
    `).join('')}
    
    Lütfen şu formatta analiz yap:
    1. Risk Seviyesi: [düşük/orta/yüksek]
    2. Genel Değerlendirme: [2-3 cümle]
    3. Öneriler: [madde madde]
    4. Uzman Görüşü: [1-2 cümle]
    5. Güven Seviyesi: [0.0-1.0 arası sayı]
    `;
  }

  parseAnalysis(analysis) {
    try {
      const lines = analysis.split('\n').filter(line => line.trim());
      const result = {
        riskLevel: 'düşük',
        recommendations: [],
        insights: '',
        confidence: 0.7
      };

      for (const line of lines) {
        if (line.includes('Risk Seviyesi:')) {
          const level = line.toLowerCase();
          if (level.includes('yüksek')) result.riskLevel = 'yüksek';
          else if (level.includes('orta')) result.riskLevel = 'orta';
          else result.riskLevel = 'düşük';
        }
        else if (line.includes('Genel Değerlendirme:')) {
          result.insights = line.split(':')[1]?.trim() || '';
        }
        else if (line.includes('Öneriler:')) {
          // Sonraki satırları öneri olarak al
          const startIndex = lines.indexOf(line);
          for (let i = startIndex + 1; i < lines.length; i++) {
            const nextLine = lines[i];
            if (nextLine.includes('Uzman Görüşü:') || nextLine.includes('Güven Seviyesi:')) break;
            if (nextLine.trim() && !nextLine.includes(':')) {
              result.recommendations.push(nextLine.trim().replace(/^[-*]\s*/, ''));
            }
          }
        }
        else if (line.includes('Güven Seviyesi:')) {
          const confidenceMatch = line.match(/(\d+\.?\d*)/);
          if (confidenceMatch) {
            result.confidence = Math.min(1, Math.max(0, parseFloat(confidenceMatch[1])));
          }
        }
      }

      return result;
    } catch (error) {
      console.error('AI analiz parse hatası:', error);
      return this.getDefaultAnalysis();
    }
  }

  getDefaultAnalysis(testData = null) {
    return {
      riskLevel: 'düşük',
      recommendations: [
        'Düzenli kognitif egzersizler yapın',
        'Sosyal aktivitelere katılın',
        'Sağlıklı beslenme düzenini koruyun',
        'Yeterli uyku alın'
      ],
      insights: 'Test sonuçlarınız genel olarak normal aralıkta görünüyor. Düzenli takip önerilir.',
      confidence: 0.6
    };
  }

  async generatePersonalizedRecommendations(userProfile, testHistory) {
    try {
      const prompt = `
      Kullanıcı Profili:
      - Yaş: ${userProfile.age}
      - Cinsiyet: ${userProfile.gender}
      - Eğitim: ${userProfile.educationLevel}
      - Tıbbi Geçmiş: ${userProfile.medicalHistory ? 'Var' : 'Yok'}
      
      Test Geçmişi:
      ${testHistory.map(test => `- ${test.testName}: %${test.percentage} (${test.completedAt})`).join('\n')}
      
      Bu kullanıcı için kişiselleştirilmiş 5 öneri ver:
      `;

      const systemPrompt = "Sen bir nöropsikologsun. Kullanıcıların test geçmişine göre kişiselleştirilmiş öneriler sunuyorsun.";
      const fullPrompt = `${systemPrompt}\n\n${prompt}`;
      
      const result = await this.model.generateContent(fullPrompt);
      const response = await result.response;
      const content = response.text();

      return content.split('\n').filter(line => line.trim());
    } catch (error) {
      console.error('Kişiselleştirilmiş öneri hatası:', error);
      return [
        'Düzenli kognitif egzersizler yapın',
        'Sosyal aktivitelere katılın',
        'Sağlıklı beslenme düzenini koruyun',
        'Yeterli uyku alın',
        'Stres yönetimi teknikleri öğrenin'
      ];
    }
  }

  async generateQuestion({ testType, difficulty, language }) {
    try {
      const prompt = `Aşağıda belirtilen test türü ve zorluk seviyesine uygun, Türkçe bir ${testType} sorusu üret. Eğer mümkünse çoktan seçmeli olsun ve 4 seçenek ile birlikte doğru cevabı ve kısa bir açıklama da ver. Format örneği:

Soru: ...
Seçenekler: [...]
Doğru: ...
Açıklama: ...

Test türü: ${testType}
Zorluk: ${difficulty}
Dil: ${language}`;
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      // Basit parse (daha iyi bir parse için regex veya AI'dan JSON isteyebilirsin)
      const questionMatch = text.match(/Soru:(.*)/i);
      const optionsMatch = text.match(/Seçenekler:(.*)/i);
      const correctMatch = text.match(/Doğru:(.*)/i);
      const explanationMatch = text.match(/Açıklama:(.*)/i);
      return {
        question: questionMatch ? questionMatch[1].trim() : 'AI ile üretilen soru bulunamadı.',
        options: optionsMatch ? optionsMatch[1].split(',').map(s => s.trim()) : [],
        correct: correctMatch ? correctMatch[1].trim() : '',
        explanation: explanationMatch ? explanationMatch[1].trim() : ''
      };
    } catch (error) {
      console.error('AI soru üretimi hatası:', error);
      return {
        question: 'AI ile soru üretilemedi. Yedek soru: Türkiye’nin başkenti neresidir?',
        options: ['İstanbul', 'Ankara', 'İzmir', 'Bursa'],
        correct: 'Ankara',
        explanation: 'Türkiye’nin başkenti Ankara’dır.'
      };
    }
  }

  async evaluateAnswer({ question, userAnswer, testType }) {
    try {
      const prompt = `Aşağıdaki soruya verilen cevabı değerlendir. Eğer cevap doğruysa "doğru", yanlışsa "yanlış" yaz ve kısa bir açıklama ekle. Ayrıca 0-1 arası bir puan ver. Format:

Doğru mu: ...
Açıklama: ...
Puan: ...

Soru: ${question}
Cevap: ${userAnswer}
Test türü: ${testType}`;
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      const isCorrect = /doğru/i.test(text);
      const explanationMatch = text.match(/Açıklama:(.*)/i);
      const scoreMatch = text.match(/Puan:(.*)/i);
      return {
        isCorrect,
        explanation: explanationMatch ? explanationMatch[1].trim() : '',
        score: scoreMatch ? parseFloat(scoreMatch[1]) : (isCorrect ? 1 : 0)
      };
    } catch (error) {
      console.error('AI cevap değerlendirme hatası:', error);
      return {
        isCorrect: false,
        explanation: 'AI ile değerlendirme yapılamadı. Lütfen manuel kontrol edin.',
        score: 0
      };
    }
  }
}

module.exports = new AIService(); 