const mongoose = require("mongoose");
const buyProjectsSchema = mongoose.Schema(
  {
    createdBy: {
      type: String,
      required: true,
    },
    projectName: {
      type: String,
      required: true,
    },
    projectLocation: {
      type: String,
      required: true,
    },
    area: [
      {
        numberArea: {
          type: String,
          required: true,
          unique: true
        },
        buildings: [
          {
            numberBuilding: {
              type: String,
              required: true,
              unique: true,
            },
            numberFloors: {
              type: Number,
              required: true,
            },
            price: {
                type: Number,
                // required: true,
              },
            floors: [
              {
                numberFloor: {
                  type: Number,
                  required: true,
                  unique: true,
                },

                units: [
                  {
                    address: {
                      type: String,
                      lowercase: true,
                    },
                    unitNumber: {
                      type: Number,
                      required: true,
                      unique: true,
                    },
                    unitImg: [
                      {
                        type: String,
                        trim: true,
                      },
                    ],
                    status: {
                      type: String,
                      enum : ['free','bought'],
                      default: 'free'
                    },
                    price: {
                      type: Number,
                      required: true,
                    },
                  },
                ],
              },
            ],
           
          },
        ],
      },
    ],
  },

  {
    timestamps: true,
  }
);

const BuyProjects = mongoose.model("BuyProjects", buyProjectsSchema);
module.exports = BuyProjects;
