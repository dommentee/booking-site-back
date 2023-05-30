//looks for user making the request, AND looks for the user being requested
//if user role is admin, find user requested
//if user is role is not admin, look for requested user, if id !== requested user id reject

export const checkPermissions = (requestUser: any, resourceUserId: any ) => {
    if(requestUser.payload.user.role === 'admin') return;
    if(requestUser.payload.user.userId === resourceUserId.toString()) return;
    throw new Error('permission denied');    
}