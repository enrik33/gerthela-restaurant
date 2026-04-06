export function adminHeaders(): Record<string, string> {
  const password =
    typeof window !== 'undefined' ? sessionStorage.getItem('admin_password') ?? '' : '';
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${password}`,
  };
}
