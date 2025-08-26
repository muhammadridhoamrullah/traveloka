import { ObjectId } from "mongodb";
import { GetDb } from "../config";
import { Payment, PaymentTerbaru } from "../type/payment";

type InputPayment = Pick<
  Payment,
  | "orderId"
  | "UserId"
  | "grossAmount"
  | "serviceType"
  | "serviceDetails"
  | "contactDetails"
  | "passengerDetails"
>;

type InputUpdatePayment = Omit<
  Payment,
  "_id" | "createdAt" | "updatedAt" | "deletedAt" | "UserId"
>;

type InputUpdatePaymentTerbaru = Pick<
  PaymentTerbaru,
  "orderId" | "completeData"
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
    serviceDetails: {
      flightId: new ObjectId(input.serviceDetails.flightId),
      flightNumber: input.serviceDetails.flightNumber,
      passengerCount: Number(input.serviceDetails.passengerCount),
      cabinClass: input.serviceDetails.cabinClass,
    },
    passengerDetails: input.passengerDetails.map((passenger) => ({
      passengerDetailTitle: passenger.passengerDetailTitle,
      passengerDetailFirstName: passenger.passengerDetailFirstName,
      passengerDetailLastName: passenger.passengerDetailLastName,
      passengerDetailDateOfBirth: new Date(
        passenger.passengerDetailDateOfBirth
      ),
      passengerDetailNationality: passenger.passengerDetailNationality,
    })),
    UserId: new ObjectId(input.UserId),
    grossAmount: Number(input.grossAmount),
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

export async function updatePaymentStatus(input: InputUpdatePaymentTerbaru) {
  const db = await GetDb();
  console.log("Updating payment status with input:", input);

  const findPayment = await db.collection(COLLECTION_NAME).findOne({
    orderId: input.orderId,
  });

  if (!findPayment) {
    throw new Error("Payment not found");
  }

  const updateData = {
    completeData: input.completeData,
    updatedAt: new Date(),
  };
  console.log("Update data to be applied:", updateData);

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

  // Check kembali payment setelah update
  const updatedPayment = await db.collection(COLLECTION_NAME).findOne({
    orderId: input.orderId,
  });

  console.log("Updated payment:", updatedPayment);

  // Nnati update jika settlement atau capture dan serviceType flight, update seat di flight

  return {
    message: "Payment status updated successfully",
    paymentId: findPayment._id.toString(),
  };
}

export async function getPaymentByOrderId(orderId: string) {
  const db = await GetDb();

  const agg = [
    {
      $match: {
        orderId,
      },
    },
    {
      $lookup: {
        from: "flights",
        localField: "serviceDetails.flightId",
        foreignField: "_id",
        as: "flightData",
      },
    },
    {
      $unwind: {
        path: "$flightData",
        preserveNullAndEmptyArrays: true,
      },
    },
  ];

  const findPayment = await db
    .collection(COLLECTION_NAME)
    .aggregate(agg)
    .toArray();

  if (findPayment.length === 0) {
    throw new Error("Payment not found");
  }

  const resultFindPayment = findPayment[0];

  if (!resultFindPayment.flightData) {
    throw new Error("Flight data not found for this payment");
  }

  return resultFindPayment;
}

// export async function getQrisUrl(transactionId: string) {
//   const db = await GetDb();

//   const findPayment = await db.collection(COLLECTION_NAME).findOne({
//     "completeData.transaction_id": transactionId,
//   });

//   if (!findPayment) {
//     throw new Error("Payment not found");
//   }

// }

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

// from 101 setelah if updating.modifiedCount === 0
// update seat in flight
// if (
//   findPayment.serviceType === "flight" &&
//   (input.transactionStatus === "settlement" ||
//     input.transactionStatus === "capture")
// ) {
//   const flightCollection = db.collection("flights");

//   const flightCheck = await flightCollection.findOne({
//     _id: new ObjectId(input.serviceDetails.flightId),
//     cabinClasses: {
//       $elemMatch: {
//         class: input.serviceDetails.cabinClass,
//         seatsAvailable: { $gte: Number(input.serviceDetails.passengerCount) },
//       },
//     },
//   });

//   if (!flightCheck) {
//     throw new Error(
//       `Insufficient seats available in flight ${input.serviceDetails.flightId}`
//     );
//   }

//   const updateFlight = await flightCollection.updateOne(
//     {
//       _id: new ObjectId(input.serviceDetails.flightId),
//       "cabinClasses.class": input.serviceDetails.cabinClass,
//     },
//     {
//       $inc: {
//         "cabinClasses.$.seatsAvailable": -Number(
//           input.serviceDetails.passengerCount
//         ),
//         totalSeats: -Number(input.serviceDetails.passengerCount),
//       },
//     }
//   );

//   if (updateFlight.modifiedCount === 0) {
//     throw new Error("Failed to update flight seats");
//   }
//   console.log(
//     `Flight ${input.serviceDetails.flightId} updated successfully, seats reduced by ${input.serviceDetails.passengerCount}`
//   );
// }

export async function pushTokenToPayment(orderId: string, token: string) {
  const db = await GetDb();

  const findPayment = await db.collection(COLLECTION_NAME).findOne({
    orderId: orderId,
  });

  if (!findPayment) {
    throw new Error("Payment not found");
  }

  const updating = await db.collection(COLLECTION_NAME).updateOne(
    {
      orderId,
    },
    {
      $set: {
        token,
        updatedAt: new Date(),
      },
    }
  );

  if (updating.modifiedCount === 0 || !updating.acknowledged) {
    throw new Error("Failed to update payment with token");
  }

  return {
    message: "Payment token updated successfully",
    paymentId: findPayment._id.toString(),
  };
}
