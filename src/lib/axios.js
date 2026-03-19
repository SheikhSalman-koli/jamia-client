import axios from 'axios';

const baseUrl = axios.create({
  // আপনার এক্সপ্রেস ব্যাকএন্ডের ইউআরএল এখানে দিন
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default baseUrl;