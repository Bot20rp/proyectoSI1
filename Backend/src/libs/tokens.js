import jwt from 'jsonwebtoken'

export function createAccesToken(payload){

    return new Promise((resolve,reject) => {
        jwt.sign(
            payload,
            process.env.JWT_SECRETO,
            {
                 expiresIn:"1d",
            },
            (err,token) => {
                if(err) reject(err)
                resolve(token)
            }
        );
    });
}