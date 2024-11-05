export const validatePassword = (password) => {
  const isLength = password.length >= 8;
  const hasUppercase = password
    .split("")
    .some((char) => char === char.toUpperCase() && char !== char.toLowerCase());
  const hasLowerCase = password
    .split("")
    .some((char) => char === char.toLowerCase() && char !== char.toUpperCase());
  const hasDigit = password
    .split("")
    .some((char) => !isNaN(parseInt(char, 10)));
  return isLength && hasUppercase && hasLowerCase && hasDigit;
};

export const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};
