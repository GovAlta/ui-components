const emailRegex = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
const phoneRegex = /^\d{3}-\d{3}-\d{4}$/i;

export const isValidEmail = (val: string): boolean => !!val.match(emailRegex)
;

export const isValidPhoneNumber = (val: string) => !!val.match(phoneRegex);
