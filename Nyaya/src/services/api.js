const API_BASE = 'http://localhost:5000/api';

async function request(endpoint, options = {}) {
  const token = localStorage.getItem('nyaya-token');
  const headers = { ...options.headers };

  if (token) headers['Authorization'] = `Bearer ${token}`;
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const res = await fetch(`${API_BASE}${endpoint}`, { ...options, headers });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || data.error || 'Something went wrong');
  }
  return data;
}

export const authAPI = {
  login: (email, password) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  register: (name, email, password, preferredLanguage) =>
    request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, preferredLanguage }),
    }),
  updateLanguage: (language) =>
    request('/auth/language', {
      method: 'PUT',
      body: JSON.stringify({ language }),
    }),
};

export const chatAPI = {
  sendMessage: (message) =>
    request('/chat/message', {
      method: 'POST',
      body: JSON.stringify({ message }),
    }),
  getHistory: () => request('/chat/history'),
};

export const documentAPI = {
  upload: (file) => {
    const formData = new FormData();
    formData.append('document', file);
    return request('/document/upload', {
      method: 'POST',
      body: formData,
    });
  },
  uploadImage: (file) => {
    const formData = new FormData();
    formData.append('image', file);
    return request('/document/upload-image', {
      method: 'POST',
      body: formData,
    });
  },
};

export const legalAPI = {
  generateComplaint: (issue) =>
    request('/legal/complaint', {
      method: 'POST',
      body: JSON.stringify({ issue }),
    }),
};
