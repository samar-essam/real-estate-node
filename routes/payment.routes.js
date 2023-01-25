const Payment = require("../app/controller/payment.controller");
const paymentModel = require("../db/models/payment.model");
const { auth, allowedRoles } = require("../app/middleware/auth.middleware");
const router = require("express").Router();

router.post("/sellUnit/:projectId/:id", auth, Payment.sellUnit);
router.delete("/cancelPayment/:projectId/:unitId", auth, Payment.deletePayment);
router.post("/addInvoice/:unitId", auth, Payment.newInvoice);
router.post("/createPdf/:id", auth, Payment.createPdf);

module.exports = router;
