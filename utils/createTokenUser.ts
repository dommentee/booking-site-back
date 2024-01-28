export const createTokenUser = (user: any) => {
  return {
    userId: user._id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
  };
};
