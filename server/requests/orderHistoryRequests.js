const OrderHistory = require("../Models/orderHistory");
const Cart = require("../Models/cart");
const { auth } = require("../Middlewares/auth");

module.exports = function (app) {
  ///POST///

  app.post("/api/orderHistory/add", auth, (req, res) => {
    OrderHistory.find({ owner: req.user._id }, (err, histories) => {
      let history = histories[0];
      const { paymentID, orderID } = req.body;

      if (err) {
        return res.status(200).json({ historyAdded: false, err });
      }

      Cart.find({ _id: req.user._id }, (err, carts) => {
        let cart = carts[0];
        if (err) {
          return res.status(200).json({ historyAdded: false, err });
        }
        let items = [];
        cart.products.forEach((item) => {
          items.push({
            quantity: item.quantity,
            totalPrice: item.totalPrice,
            product: { ...item.prdouct },
          });
        });

        history.entries.unshift({
          items: [...items],
          paymentID,
          orderID,
        });

        cart.products = [];
        cart.save((err, cart) => {
          if (err) {
            return res.status(200).json({ historyAdded: false, err });
          }
          history.save((err, newHistory) => {
            if (err) {
              return res.status(200).json({ historyAdded: false, err });
            }
            return res.status(200).json({ historyAdded: true, newHistory });
          });
        });
      });
    });

    ///GET///

    app.get("/api/orderHistory/history", (req, res) => {
      let id = req.query.id;
      OrderHistory.findOne({ ownerId: id }, (err, order) => {
        if (err || !order)
          return res.status(400).json({ orderHistory: false, err });
        res.status(200).json({ orderHistory: true, history: order.entries });
      });
    });
  });
};
