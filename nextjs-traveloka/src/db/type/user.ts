export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  role: "User" | "Admin";
  phoneNumber: string;
  dateOfBirth: Date;
  address: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  profilePicture?: string;
  isEmailVerified: boolean;
  lastLoginAt?: Date;
  loginHistory?: {
    ipAddress: string;
    userAgent: string;
    loginAt: Date;
  }[];
}
