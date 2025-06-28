export const validatePassword = (password) => {
  // Check if password contains at least one letter
  const hasLetter = /[a-zA-Z]/.test(password);
  
  // Check if password contains at least one number or symbol
  const hasNumberOrSymbol = /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(password);
  
  return hasLetter && hasNumberOrSymbol;
};