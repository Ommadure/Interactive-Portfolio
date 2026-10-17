export const currentYear = () => new Date().getFullYear();
export const sectionIds = ['top', 'about', 'skills', 'experience', 'projects', 'contact'];
export const getInitials = (name: string) => name.split(/\s+/).map(part => part[0] ?? '').join('');
