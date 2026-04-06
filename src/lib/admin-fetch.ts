import { getAdminPassword } from './admin-session';

export function adminHeaders(): Record<string, string> {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getAdminPassword()}`,
  };
}
