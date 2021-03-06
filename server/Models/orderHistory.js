const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
const orderHistorySchema = mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  entries: [
    {
      items: [
        {
          quantity: { type: Number },
          totalPrice: { type: Number },
          product: {},
          _id: false,
        },
      ],
      _id: false,
      createdAt: { type: Date, default: Date.now },
      paymentID: String,
      orderID: String,
      address: {},
    },
  ],
});

orderHistorySchema.pre("find", function () {
  this.populate({
    path: "owner",
  });
});

orderHistorySchema.pre("save", function (next) {
  this.populate({
    path: "owner",
  })
    .execPopulate()
    .then(function () {
      next();
    });
});

//Export the model
module.exports = mongoose.model("OrderHistory", orderHistorySchema);
