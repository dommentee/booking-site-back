export const createTokenUser = (user: any) => {
    return {userId: user._id, firstName: user.firstName, lastName: user.lastName, role: user.role };

}