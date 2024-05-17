export const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api' : 'https://notex.urboifox.dev/api';
export const PER_PAGE = 12;

export const PRIVATE_ROUTES = ['/diary', '/todos', '/notes'];
export const PUBLIC_ROUTES = ['/login', '/register'];