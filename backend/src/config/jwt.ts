import jwt, { Secret, SignOptions, JwtPayload } from "jsonwebtoken";

export interface AuthTokenPayload extends JwtPayload {
  id: string;
  email: string;
  role: string;
}

const JWT_SECRET: Secret = process.env.JWT_SECRET || "your-secret-key";

const JWT_EXPIRES_IN: SignOptions["expiresIn"] =
  (process.env.JWT_EXPIRES_IN as SignOptions["expiresIn"]) ?? "7d";

export const generateToken = (payload: AuthTokenPayload): string => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

export const verifyToken = (token: string): AuthTokenPayload | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (typeof decoded === "string") {
      return null;
    }

    return decoded as AuthTokenPayload;
  } catch {
    return null;
  }
};
