import { GetDb } from "../config";
import { hashPassword } from "../helpers/bcrypt";
import { signToken } from "../helpers/jwt";
import { sendVerificationEmail } from "../service/emailService";
import { User } from "../type/user";

const COLLECTION_NAME = "users";

type InputCreateUser = Omit<
  User,
  | "_id"
  | "createdAt"
  | "updatedAt"
  | "deletedAt"
  | "profilePicture"
  | "lastLoginAt"
  | "loginHistory"
  | "role"
  | "isEmailVerified"
>;

export async function createUser(input: InputCreateUser) {
  const db = await GetDb();

  //   Check username uniqueness
  const checkUsername = await db.collection(COLLECTION_NAME).findOne({
    username: input.username,
  });

  if (checkUsername) {
    throw new Error("Username already exists");
  }

  //   Check email uniqueness
  const checkEmail = await db.collection(COLLECTION_NAME).findOne({
    email: input.email,
  });

  if (checkEmail) {
    throw new Error("Email already exists");
  }

  //   Check phone number uniqueness
  const checkPhoneNumber = await db.collection(COLLECTION_NAME).findOne({
    phoneNumber: input.phoneNumber,
  });

  if (checkPhoneNumber) {
    throw new Error("Phone number already exists");
  }

  //   Create user
  const user = {
    ...input,
    password: hashPassword(input.password),
    role: "User",
    isEmailVerified: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const result = await db.collection(COLLECTION_NAME).insertOne(user);

  if (!result.acknowledged) {
    throw new Error("Failed to create user");
  }

  //   Create token for email verification
  const token = signToken({
    _id: result.insertedId.toString(),
  });

  //   Panggil email service untuk mengirim email verifikasi

  await sendVerificationEmail(user.email, token);

  return result;
}
