import jwt from 'jsonwebtoken'; 


export const createJwt = (payload: any) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET as string,
        { expiresIn: process.env.JWT_LIFETIME
    })
    return token;
}

export const isTokenValid = (token: any) => jwt.verify(token, process.env.JWT_SECRET as string);
