export const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api' : 'https://notex.urboifox.dev/api';
export const PER_PAGE = 12;

export const PUBLIC_ROUTES = ['/login', '/register'];

export const AZKAR = [
    'اللهم صلي على محمد',
    'سبحان الله',
    'الحمد لله',
    'الله أكبر',
    'أستغفر الله'
]

export const ARABIC_PRAYER_NAMES = {
    Fajr: 'الفجر',
    Sunrise: 'الصبح',
    Dhuhr: 'الظهر',
    Asr: 'العصر',
    Maghrib: 'المغرب',
    // Sunset: 'الغروب',
    Isha: 'العشاء',
}