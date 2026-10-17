export interface ContactData { name: string; email: string; message: string }
// TODO: replace with Formspree, EmailJS, or an API integration when a contact service is selected.
export async function submitContact(data: ContactData) { return data; }
