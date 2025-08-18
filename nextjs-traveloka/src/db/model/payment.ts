import { ObjectId } from "mongodb";
import { GetDb } from "../config";
import { Payment } from "../type/payment";
import { fr, tr } from "zod/locales";

type InputPayment = Pick<Payment, "orderId" | "UserId" | "grossAmount">;

type InputUpdatePayment = Omit<
  Payment,
  "_id" | "createdAt" | "updatedAt" | "deletedAt" | "UserId"
>;
const COLLECTION_NAME = "payments";

export async function createPayment(input: InputPayment) {
  const db = await GetDb();

  const checkPayment = await db.collection(COLLECTION_NAME).findOne({
    orderId: input.orderId,
  });

  if (checkPayment) {
    throw new Error("Payment with this Order Id already exists");
  }

  const payment = {
    ...input,
    UserId: new ObjectId(input.UserId),
    grossAmount: Number(input.grossAmount),
    transactionStatus: "pending",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const result = await db.collection(COLLECTION_NAME).insertOne(payment);
  if (!result.acknowledged) {
    throw new Error("Failed to create payment");
  }
  return {
    message: "Payment created successfully",
    paymentId: result.insertedId.toString(),
  };
}

export async function updatePaymentStatus(input: InputUpdatePayment) {
  const db = await GetDb();

  const findPayment = await db.collection(COLLECTION_NAME).findOne({
    orderId: input.orderId,
  });

  if (!findPayment) {
    throw new Error("Payment not found");
  }

  const updateData = {
    transactionStatus: input.transactionStatus,
    paymentType: input.paymentType,
    fraudStatus: input.fraudStatus,
    transactionId: input.transactionId,
    transactionTime: new Date(input.transactionTime),
    updatedAt: new Date(),
  };

  const updating = await db.collection(COLLECTION_NAME).updateOne(
    {
      orderId: input.orderId,
    },
    {
      $set: updateData,
    }
  );

  if (updating.modifiedCount === 0 || !updating.acknowledged) {
    throw new Error("Failed to update payment status");
  }

  return {
    message: "Payment status updated successfully",
    paymentId: findPayment._id.toString(),
  };
}

// _id
// 68a34699b03d090162c184bd
// orderId
// "TVLKFLTSJ182202508182574"
// UserId
// 6878ad465f1297aa559b872f
// grossAmount
// 1960000
// transactionStatus
// "pending"
// createdAt
// 2025-08-18T15:28:25.104+00:00
// updatedAt
// 2025-08-18T15:28:25.104+00:00
