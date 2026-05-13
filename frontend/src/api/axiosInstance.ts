import axios from 'axios'
import toast from 'react-hot-toast'
const API_KEY = import.meta.env.VITE_COINGECKO_API_KEY;

export const api = axios.create({
    baseURL: 'https://api.coingecko.com/api/v3',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'x-cg-demo-api-key': API_KEY,
    },
})

api.interceptors.response.use(
    (response) => response,
    (error) => {
     if (error.response?.status === 429) {
            toast.error('Przekroczono limit zapytań API (Rate Limit).');
        } else if (error.response?.status === 401) {
            toast.error('Błędny klucz API.');
        } else if (!error.response) {
            toast.error('Błąd sieci: Serwer nie odpowiada.');
        }
        return Promise.reject(error)
    }
)