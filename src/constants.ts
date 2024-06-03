export const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api' : 'https://notex.urboifox.dev/api';
export const PER_PAGE = 12;

export const LOGGED_OUT_ROUTES = ['/login', '/register'];
export const PUBLIC_ROUTES = ['/']

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

export const TODO_TAGS = [
    {
        name: 'General',
        color: '#70CFF8',
    },
    {
        name: 'Work',
        color: '#FFC670',
    },
    {
        name: 'Personal',
        color: '#FF9F70',
    },
    {
        name: 'Shopping',
        color: '#70FFC8',
    },
    {
        name: 'Study',
        color: '#70FF70',
    },
    {
        name: 'Travel',
        color: '#FF70C8',
    },
    {
        name: 'Gaming',
        color: '#FF7070',
    },
    {
        name: 'Other',
        color: '#70F8FF',
    }
]