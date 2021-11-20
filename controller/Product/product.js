const Product = require("../../model/Product");
const { handleNextError } = require("../../util/throwError");
exports.getProductByQuery = async (req, res, next) => {
  const page = +req.query.page || 1;
  const perPage = +req.query.per_page || 8;

  try {
    const countDocuments = await Product.find().countDocuments();
    const products = await Product.find()
      .skip((page - 1) * perPage)
      .limit(perPage);
    res.json({
      message: "successfully",
      code: 200,
      products: products,
      total_documents: countDocuments,
    });
  } catch (err) {
    err.code = err.code || 500;
    handleNextError(err, next);
  }
};

exports.getProductByType = async (req, res, next) => {
  const { type } = req.params;
  const page = +req.query.page || 1;
  const perPage = +req.query.per_page || 8;
  if (!type) {
    return res.status(404).json({
      message: "Cannot find params",
      code: 404,
    });
  }
  try {
    const total_documents = await Product.find({
      category: type.toLowerCase(),
    }).countDocuments();
    const products = await Product.find({ category: type.toLowerCase() })
      .sort({ _id: -1 })
      .skip((page - 1) * perPage)
      .limit(perPage);
    res.json({
      message: "successfully",
      code: 200,
      products: products,
      total_documents: total_documents,
    });
  } catch (err) {
    err.code = err.code || 500;
    handleNextError(err, next);
  }
};
