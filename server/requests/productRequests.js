const Product = require("../Models/product");
const { auth } = require("../Middlewares/auth");

module.exports = function (app) {
  ///POST///

  app.post("/api/product/add", auth, (req, res) => {
    const product = new Product({
      ...req.body,
      owner: req.user._id,
    });
    product.save((err, product) => {
      if (err || !product) return res.status(400).json({ err, added: false });

      return res.status(200).json({ added: true, product });
    });
  });

  app.post("/api/product/review", auth, (req, res) => {
    let id = req.query.id;
    Product.find({ _id: id }, (err, products) => {
      if (err) return res.status(200).json({ reviewAdded: false, err });
      let product = products[0];
      if (!product)
        return res
          .status(200)
          .json({ reviewAdded: false, errorMessage: "Product not found" });

      product.addOrUpdateReview(req.body, req.user, (err, product) => {
        if (err) return res.status(400).json({ reviewAdded: false, err });

        product.save((err, product) => {
          if (err) return res.status(400).json({ reviewAdded: false, err });
          return res.status(200).json({ reviewAdded: true, product });
        });
      });
    });
  });

  app.post("/api/product/reviewUpdateLikes", auth, (req, res) => {
    let id = req.query.id;
    Product.find({ _id: id }, (err, products) => {
      if (err) return res.status(200).json({ updateLikes: false, err });
      let product = products[0];

      product.updateLikes(req.body, req.user._id.toString(), (err, product) => {
        if (err) return res.status(200).json({ updateLikes: false, err });
        return res.status(200).json({ updateLikes: true, product });
      });
    });
  });

  app.post("/api/product/product-list", (req, res) => {
    Product.searchFilter(req.body, (err, products) => {
      if (err) return res.status(400).json({ list: false });

      const list = products.length === 0 ? false : true;

      return res.status(200).json({
        list,
        products,
      });
    });
  });

  app.post("/api/product/delete", auth, (req, res) => {
    let removeIds = [...req.body.idsToRemove];

    Product.deleteMany({ _id: { $in: [...removeIds] } }, (err) => {
      if (err) return res.status(200).json({ deleted: false });
      return res.status(200).json({ deleted: true });
    });
  });

  ///GET///

  app.get("/api/product/all", (req, res) => {
    Product.find({}, (err, products) => {
      if (err) {
        return res.status(400).json({ list: false, err });
      }
      if (products.length === 0)
        return res
          .status(200)
          .json({ list: false, errorMessage: "No products to display" });
      return res.status(200).json({ list: true, products });
    });
  });

  app.get("/api/product/user-product-list", auth, (req, res) => {
    Product.find({ owner: req.user._id }, (err, products) => {
      if (err) return res.status(400).json({ list: false, err });
      return res.status(200).json({ list: true, products });
    });
  });

  app.get("/api/product", (req, res) => {
    let id = req.query.id;

    Product.find({ _id: id }, (err, products) => {
      if (err) return res.status(200).json({ found: false, err });
      let product = products[0];

      if (!product)
        return res
          .status(200)
          .json({ found: false, errorMessage: "Product not found" });
      return res.status(200).json({ found: true, product });
    });
  });

  ///UPDATE///

  app.post("/api/product/edit", auth, (req, res) => {
    let id = req.query.id;

    Product.findOneAndUpdate(
      { _id: id },
      req.body,
      { new: true },
      (err, product) => {
        if (err) return res.status(400).send(err);

        if (!product)
          return res
            .status(200)
            .json({ edited: false, errorMessage: "Product not found" });
        return res.status(200).json({ edited: true, product });
      }
    );
  });

  ///DELETE

  app.delete("/api/product/deleteReview", auth, (req, res) => {
    let id = req.query.id;
    Product.find({ _id: id }, (err, products) => {
      if (err) return res.status(200).send({ deleted: false, err });
      let product = products[0];

      product.deleteReview(req.user._id, (err, product) => {
        if (err) return res.status(200).send({ deleted: false, err });
        return res.status(200).send({ deleted: true, product });
      });
    });
  });
};
