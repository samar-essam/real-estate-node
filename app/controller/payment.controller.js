const paymentModel = require("../../db/models/payment.model");
const userModel = require("../../db/models/user.model");
const { createInvoice } = require("../../app/services/creatPdf");
const buyProjectModel = require("../../db/models/buyProjects.model");
const myHelper = require("../../app/helper");
const { ObjectId } = require("mongodb");
const MyHelper = require("../../app/helper");

class Payment {
  static sellUnit = async (req, res) => {
    try {
      const { projectId } = req.params;
      const { customer, paymentMethod, invoiceValue, noOfYears } = req.body;
      const getUnit = await buyProjectModel.aggregate([
        {
          $match: {
            "area.buildings.floors.units._id": new ObjectId(req.params.id),
          },
        },
        {
          $unwind: "$area",
        },
        {
          $unwind: "$area.buildings",
        },
        {
          $unwind: "$area.buildings.floors",
        },
        {
          $unwind: "$area.buildings.floors.units",
        },
        {
          $match: {
            "area.buildings.floors.units._id": new ObjectId(req.params.id),
          },
        },
        {
          $group: {
            _id: "$_id",
            data: {
              $push: "$area.buildings.floors.units",
            },
          },
        },
      ]);

      const unitStatus = getUnit[0].data[0].status;
      if (unitStatus == "bought") {
        myHelper.resHandler(res, 400, true, "unit is already bought");
        return;
      } else {
        const newData = await buyProjectModel.findByIdAndUpdate(
          { _id: projectId },
          {
            $set: {
              "area.$[].buildings.$[].floors.$[].units.$[x].status": "bought",
            },
          },
          { new: true, arrayFilters: [{ "x._id": req.params.id }] }
        );
        //   console.log(newData);
        const units = newData.area[0].buildings[0].floors[0].units.find(
          (e) => e._id == req.params.id
        );
        const totalInvoices = units.price / invoiceValue - 1;
        const newPayment = new paymentModel({
          employee: req.user.fName + " " + req.user.lName,
          customer: customer,
          paymentMethod: paymentMethod,
          totalPaid: invoiceValue,
          invoiceValue: invoiceValue,
          noOfYears: noOfYears,
          totalInvoices: totalInvoices,
          noOfPaidInvoices: 0,
          unitId: req.params.id,
        });
        await newPayment.save();
        this.addInvoice(res, newPayment);
      }
    } catch (e) {
      myHelper.resHandler(res, 500, false, e, e.message);
    }
  };

  static createPdf = (payment) => {
    createInvoice("invoice.pdf", payment);
  };

  static addInvoice = async (res, payment) => {
    console.log(payment);
    try {
      const invoice = await paymentModel.findById(payment._id);
      invoice.invoices.push(new Date(payment.updatedAt).getTime());
      await invoice.save();
      this.createPdf(invoice);
      myHelper.resHandler(res, 200, true, invoice, "unit payment successfully");
    } catch (e) {
      myHelper.resHandler(res, 401, false, e, e.message);
    }
  };
  static newInvoice = async (req, res) => {
    const payment = await paymentModel.findOne({ unitId: req.params.unitId });
    if (payment.totalInvoices !== 0) {
      const newInvoice = await paymentModel.findOneAndUpdate(
        { unitId: req.params.unitId },
        {
          $set: {
            totalInvoices: payment.totalInvoices - 1,
            noOfPaidInvoices: payment.noOfPaidInvoices + 1,
            totalPaid: (payment?.totalPaid || 0) + payment.invoiceValue,
          },
        },
        { new: true }
      );
      await newInvoice.save();
      this.addInvoice(res, payment);
    } else {
      myHelper.resHandler(res, 401, true, "No invoices to pay");
    }
  };

  static deletePayment = async (req, res) => {
    try {
      const { projectId, unitId } = req.params;
      await paymentModel.deleteOne({
        unitId: req.params.unitId,
      });

      const updateUnit = await buyProjectModel.findByIdAndUpdate(
        { _id: projectId },
        {
          $set: {
            "area.$[].buildings.$[].floors.$[].units.$[x].status": "free",
          },
        },
        { new: true, arrayFilters: [{ "x._id": unitId }] }
      );
      const units = updateUnit.area[0].buildings[0].floors[0].units.find(
        (e) => e._id == unitId
      );
      myHelper.resHandler(res, 200, true, units, "Deleted successfully");
    } catch (error) {
      myHelper.resHandler(res, 401, false, error, error.message);
    }
  };
}

module.exports = Payment;
