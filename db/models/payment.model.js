const mongoose = require("mongoose");
const paymentSchema = mongoose.Schema(
  {
    employee: {
      type: String,
      lowercase: true,
      required: true,
    },
    customer: {
      type: String,
      lowercase: true,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    totalPaid: {
      type: Number,
      required: true,
    },
    noOfYears: {
      type: Number,
      required: true,
    },
    totalInvoices: {
      type: Number,
      required: true,
    },
    noOfPaidInvoices: {
      type: Number,
      default: 0,
    },
    invoiceValue: {
      type: Number,
    },
    invoices: [
      {
        type: String,
      },
    ],
    unitId: {
      type: String,
      // required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;
