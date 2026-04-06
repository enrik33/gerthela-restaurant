let _pw = '';
export const setAdminPassword = (pw: string) => { _pw = pw; };
export const clearAdminPassword = () => { _pw = ''; };
export const getAdminPassword = () => _pw;
