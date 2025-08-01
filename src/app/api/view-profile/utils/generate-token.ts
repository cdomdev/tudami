// import jwt from "jsonwebtoken";
// const SECRET_KEY = process.env.NEXT_PUBLIC_JWT_SECRET ;

// if (!SECRET_KEY) {
//   throw new Error("JWT secret key is not defined in environment variables");
// }

// /**
//  * Genera un token JWT para un usuario específico
//  */
// export function generateApprovalToken(userId: string): string {
//   const payload = { userId };
//   return jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" });
// }

// /**
//  * Verifica y decodifica un token JWT
//  */
// export function verifyApprovalToken(token: string): string | null {
//   try {
//     const decoded = jwt.verify(token, SECRET_KEY);
//     return (decoded as { userId: string }).userId || null;
//   } catch (error) {
//     console.error("Error al verificar el token:", error);
//     return null;
//   }
// }
