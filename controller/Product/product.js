const Product = require("../../model/Product");
const { handleNextError, throwError } = require("../../util/throwError");
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

exports.findProductByKeyword = async (req, res, next) => {
  const keyword = req.query.keyword || "";
  try {
    const total_documents = await Product.find({
      title: { $regex: keyword.toLowerCase(), $options: "i" },
    }).countDocuments();
    const product = await Product.find({
      title: { $regex: keyword.toLowerCase(), $options: "i" },
    }).limit(6);
    res.json({
      message: "successfully",
      code: 200,
      products: product,
      total_documents: total_documents,
    });
  } catch (err) {
    handleNextError(err, next);
  }
};

exports.removeProductById = async (req, res, next) => {
  const { id } = req.body;
  const userEmail = req.userEmail;
  if (!userEmail) {
    return res.status(403).json({
      message: "not validation",
      code: 403,
    });
  }
  if(!id){
    return res.status(422).json({
      message: 'product is not valid',
      code: 422
    })
  }
  try {
    const product = await Product.findById(id);
    if(!product){
      return throwError('product is not existed', 404);
    }
    await Product.findByIdAndRemove(id);
    res.json({
      message: "successfully",
      code: 200,
    });
  } catch (err) {
    handleNextError(err, next);
  }
};
