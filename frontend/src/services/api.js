const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Auth headers
  getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: this.getAuthHeaders(),
      ...options
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Bir hata oluştu');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Auth endpoints
  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  }

  async login(credentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
  }

  async forgotPassword(email) {
    return this.request('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email })
    });
  }

  async resetPassword(token, password) {
    return this.request('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, password })
    });
  }

  async getProfile() {
    return this.request('/auth/profile');
  }

  async updateProfile(profileData) {
    return this.request('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData)
    });
  }

  // Test endpoints
  async getTestTypes() {
    return this.request('/tests/types');
  }

  async submitTestResult(testData) {
    return this.request('/tests/submit', {
      method: 'POST',
      body: JSON.stringify(testData)
    });
  }

  async getTestResults(page = 1, limit = 10, testType = null) {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    });
    if (testType) params.append('testType', testType);
    
    return this.request(`/tests/results?${params}`);
  }

  async getTestResult(id) {
    return this.request(`/tests/results/${id}`);
  }

  async getTestStats() {
    return this.request('/tests/stats');
  }

  // AI endpoints
  async analyzeTestResult(testData) {
    return this.request('/ai/analyze', {
      method: 'POST',
      body: JSON.stringify({ testData })
    });
  }

  async getRecommendations() {
    return this.request('/ai/recommendations');
  }

  async compareTestResults(testResultId1, testResultId2) {
    return this.request('/ai/compare', {
      method: 'POST',
      body: JSON.stringify({ testResultId1, testResultId2 })
    });
  }

  async getHealthSummary() {
    return this.request('/ai/health-summary');
  }

  // AI ile dinamik soru üretimi
  async generateAIQuestion({ testType, difficulty = 'orta', language = 'tr' }) {
    return this.request('/ai/generate-question', {
      method: 'POST',
      body: JSON.stringify({ testType, difficulty, language })
    });
  }

  // AI ile açık uçlu cevap değerlendirme
  async evaluateAIAnswer({ question, userAnswer, testType }) {
    return this.request('/ai/evaluate-answer', {
      method: 'POST',
      body: JSON.stringify({ question, userAnswer, testType })
    });
  }

  // Results endpoints
  async getAllResults(page = 1, limit = 20, testType = null, sortBy = 'completedAt', sortOrder = 'desc') {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      sortBy,
      sortOrder
    });
    if (testType) params.append('testType', testType);
    
    return this.request(`/results?${params}`);
  }

  async getResult(id) {
    return this.request(`/results/${id}`);
  }

  async downloadResultPDF(id) {
    const token = localStorage.getItem('token');
    const response = await fetch(`${this.baseURL}/results/${id}/pdf`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('PDF indirme hatası');
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `test-sonucu-${id}.pdf`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

  async deleteResult(id) {
    return this.request(`/results/${id}`, {
      method: 'DELETE'
    });
  }

  async getResultsOverview() {
    return this.request('/results/stats/overview');
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }
}

export default new ApiService(); 