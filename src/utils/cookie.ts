import { Cookies } from 'react-cookie';

const cookie = new Cookies();
export function getToken(): string {
  return cookie.get('access_token') || '';
}
export function removeToken(): void {
  cookie.remove('access_token');
  cookie.remove('token');
  cookie.remove('connect.sid');
}
export function saveToken(token: string): void {
  cookie.set('access_token', token);
}
