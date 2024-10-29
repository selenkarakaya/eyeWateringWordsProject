const validatePassword = (password) => {
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

const result = validatePassword("selen1234");
const result1 = validatePassword("Selen1234");
const result2 = validatePassword("SELEN");
console.log(result);
console.log(result1);
console.log(result2);
