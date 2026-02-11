import axios from 'axios';

// Smart API URL detection for all environments
const getBaseURL = () => {
    // 1. If VITE_API_URL is set (for custom configurations), use it
    if (import.meta.env.VITE_API_URL) {
        return import.meta.env.VITE_API_URL;
    }

    // 2. In production (deployed), use same origin (no port needed)
    if (import.meta.env.PROD) {
        return window.location.origin;
    }

    // 3. In development, use localhost:5001 or hostname:5001
    return `http://${window.location.hostname}:5001`;
};

const baseURL = getBaseURL();
console.log("🔌 Connected to Backend:", baseURL);

const api = axios.create({
    baseURL: baseURL,
});

export const register = (formData) => api.post('/register', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
export const getRegistrations = () => api.get('/registrations');
export const downloadExcel = () => api.get('/download-excel', { responseType: 'blob' });
export const clearData = () => api.post('/clear-data');
export const getPaymentSettings = () => api.get('/payment-settings');
export const updatePaymentSettings = (data) => api.post('/payment-settings', data);
export const uploadQR = (formData) => api.post('/upload-qr', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
export const debugStorage = () => api.get('/debug-storage');

export default api;
