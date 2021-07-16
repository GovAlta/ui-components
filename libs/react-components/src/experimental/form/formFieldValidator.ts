export const requiredValidator = (val) => {
  if (!val) {
    return ["Enter your"];
  }
  return [];
};

export const passwordMatchedValidator = (val, formData) => {
  if (val !== formData.password) {
    return ["Must match password"];
  }
  return [];
};

export const emailValidator = (val) => {
  if (val && !val.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
    return ["Enter a valid"];
  }
  return [];
}

export const phoneValidator = (val) => {
  if (val.match(/^\d{3}-\d{3}-\d{4}$/i)) {
    return ["Enter a valid"];
  }
  return [];
}