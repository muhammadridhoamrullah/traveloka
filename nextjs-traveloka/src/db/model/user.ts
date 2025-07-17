import { ObjectId } from "mongodb";
import { GetDb } from "../config";
import { hashPassword } from "../helpers/bcrypt";
import { signToken } from "../helpers/jwt";
import { sendVerificationEmail } from "../service/emailService";
import { User } from "../type/user";
import * as jose from "jose";

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

export async function verifyEmail(token: string) {
  const db = await GetDb();

  const secret = new TextEncoder().encode(process.env.SECRET);

  const decoded = await jose.jwtVerify<{ _id: string }>(token, secret);

  const UserId = decoded.payload._id;

  const findUser = (await db.collection(COLLECTION_NAME).findOne({
    _id: new ObjectId(UserId),
  })) as unknown as User;

  if (!findUser) {
    throw new Error("User not found");
  }

  if (findUser.isEmailVerified) {
    throw new Error("Email is already verified");
  }

  const updateResult = await db.collection(COLLECTION_NAME).updateOne(
    {
      _id: new ObjectId(UserId),
    },
    {
      $set: {
        isEmailVerified: true,
        updatedAt: new Date(),
      },
    }
  );

  if (updateResult.modifiedCount === 0) {
    throw new Error("Failed to verify email");
  }

  return {
    message: "Email verified successfully",
  };
}
