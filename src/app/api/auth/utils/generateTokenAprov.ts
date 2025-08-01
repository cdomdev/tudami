import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET;

export function generateApprovalToken(userId: string) { 
  if (!userId || JWT_SECRET === undefined) {
    throw new Error(
      "User ID is required to generate approval token || JWT_SECRET is not defined"
    );
  }
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "1h" });
}
