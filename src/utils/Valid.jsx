export const validData = (isSignIn, name, email, password) => {
  const isNameValid = /^[A-Za-z][A-Za-z0-9_]{7,29}$/.test(name);

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isPasswordValid =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()]).{8,20}$/.test(
      password
    );

  if (!isSignIn && !isNameValid) return "Name is Not Valid";
  if (!isEmailValid) return "Email is Not Valid";
  if (!isPasswordValid) return "Password is Not Valid";
  return null;
};
