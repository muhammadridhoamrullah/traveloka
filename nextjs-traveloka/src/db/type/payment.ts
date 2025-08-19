interface ServiceDetails {
  flightId: string;
  flightNumber: string;
  passengerCount: number;
  cabinClass: string;
}

export interface PaymentLengkap {
  _id: string;
  orderId: string;
  UserId: string;
  transactionStatus: string;
  grossAmount: number;
  paymentType: string;
  transactionTime: Date;
  fraudStatus: string;
  transactionId: string;
  bank?: string;
  maskedCard?: string;
  cardType?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  paymentCode?: string;
  pdfUrl?: string;
  vaNumbers?: {
    bank: string;
    vaNumber: string;
  }[];
}

export interface Payment {
  _id: string;
  orderId: string;
  UserId: string;
  grossAmount: number;
  transactionStatus: string;
  paymentType: string;
  transactionTime: Date;
  fraudStatus: string;
  transactionId: string;
  serviceType: string;
  serviceDetails: ServiceDetails;
}

// CC
// {
//     "status_code": "200",
//     "status_message": "Success, Credit Card capture transaction is successful",
//     "transaction_id": "7feff0ec-c5ef-4986-9b9b-34f8cf94e2d5",
//     "order_id": "TVLKFLTJT684202508187813",
//     "v": "1700000.00",
//     "payment_type": "credit_card",
//     "transaction_time": "2025-08-18 20:38:26",
//     "transaction_status": "capture",
//     "fraud_status": "accept",
//     "bank": "bni",
//     "masked_card": "48111111-1114",
//     "card_type": "credit",
//     "finish_redirect_url": "http://example.com?order_id=TVLKFLTJT684202508187813&status_code=200&transaction_status=capture"
// }

// Shopeepay
// {
//     "status_code": "201",
//     "status_message": "Your Transaction is being processed",
//     "transaction_id": "987a4aff-9484-46bd-a72f-a1c58bbbbb3e",
//     "order_id": "TVLKFLTJT684202508186869",
//     "gross_amount": "1700000",
//     "payment_type": "qris",
//     "transaction_time": "2025-08-18 20:40:45",
//     "transaction_status": "pending",
//     "fraud_status": "accept",
//     "finish_redirect_url": "http://example.com?order_id=TVLKFLTJT684202508186869&status_code=201&transaction_status=pending"
// }

// Gopay
// {
//     "status_code": "201",
//     "status_message": "Your Transaction is being processed",
//     "transaction_id": "e300e5af-5339-4ac8-9e51-904a4e3e6110",
//     "order_id": "TVLKFLTJT684202508182279",
//     "gross_amount": "1700000",
//     "payment_type": "qris",
//     "transaction_time": "2025-08-18 20:57:42",
//     "transaction_status": "pending",
//     "fraud_status": "accept",
//     "finish_redirect_url": "http://example.com?order_id=TVLKFLTJT684202508182279&status_code=201&transaction_status=pending"
// }

// Alfamart
// {
//     "status_code": "201",
//     "status_message": "Your Transaction is being processed",
//     "transaction_id": "a6f6518f-5bf6-4b1e-8444-1357d512aa8e",
//     "order_id": "TVLKFLTJT684202508183351",
//     "gross_amount": "1700000",
//     "payment_type": "cstore",
//     "transaction_time": "2025-08-18 20:58:46",
//     "transaction_status": "pending",
//     "fraud_status": "accept",
//     "payment_code": "3783412648426356",
//     "pdf_url": "https://app.sandbox.midtrans.com/snap/v1/transactions/717bea06-f6b0-4447-893b-65f17fefffd7/pdf",
//     "finish_redirect_url": "http://example.com?order_id=TVLKFLTJT684202508183351&status_code=201&transaction_status=pending"
// }

// Virtual Account
// {
//     "status_code": "201",
//     "status_message": "Your Transaction is being processed",
//     "transaction_id": "f728e863-d000-4cde-91e0-410fc042fb04",
//     "order_id": "TVLKFLTJT684202508186390",
//     "gross_amount": "1700000",
//     "payment_type": "bank_transfer",
//     "transaction_time": "2025-08-18 21:00:17",
//     "transaction_status": "pending",
//     "fraud_status": "accept",
//     "va_numbers": [
//         {
//             "bank": "bni",
//             "va_number": "9884042768346406"
//         }
//     ],
//     "pdf_url": "https://app.sandbox.midtrans.com/snap/v1/transactions/dc8836d5-6b42-47ed-9e57-b469476a4845/pdf",
//     "finish_redirect_url": "http://example.com?order_id=TVLKFLTJT684202508186390&status_code=201&transaction_status=pending"
// }

// Indomaret
// {
//     "status_code": "201",
//     "status_message": "Your Transaction is being processed",
//     "transaction_id": "5be9a86d-e3ef-4d01-9a4a-33ad9e64d894",
//     "order_id": "TVLKFLTJT684202508181829",
//     "gross_amount": "1700000",
//     "payment_type": "cstore",
//     "transaction_time": "2025-08-18 21:00:51",
//     "transaction_status": "pending",
//     "fraud_status": "accept",
//     "payment_code": "711234567890",
//     "pdf_url": "https://app.sandbox.midtrans.com/snap/v1/transactions/e70edb1d-b8a7-4445-93f9-e68ab340fc72/pdf",
//     "finish_redirect_url": "http://example.com?order_id=TVLKFLTJT684202508181829&status_code=201&transaction_status=pending"
// }

// Akulaku
// Langsung ke midtrans UI Akulaku

// Kredivo
// Langsung ke midtrans UI Kredivo
