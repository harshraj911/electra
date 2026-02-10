import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:5001',
});

export const register = (formData) => api.post('/register', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
export const getRegistrations = () => api.get('/registrations');
export const downloadExcel = () => api.get('/download-excel', { responseType: 'blob' });
export const clearData = () => api.post('/clear-data');
export const getPaymentSettings = () => api.get('/payment-settings');
export const updatePaymentSettings = (data) => api.post('/payment-settings', data);
export const uploadQR = (formData) => api.post('/upload-qr', formData, { headers: { 'Content-Type': 'multipart/form-data' } });

export default api;
