const Blog = require("../../model/Blog");
const { handleNextError, throwError } = require("../../util/throwError");
exports.getBlogByPage = async (req, res, next) => {
  const page = +req.query.page || 1;
  const per_page = +req.query.per_page || 8;

  try {
    const totalDocuments = await Blog.find().countDocuments();
    const blogs = await Blog.find()
      .sort({ id: -1 })
      .skip((page - 1) * per_page)
      .limit(per_page);
    res.json({
      message: "successfully",
      code: 200,
      blogs: blogs,
      total_documents: totalDocuments,
    });
  } catch (err) {
    err.code = err.code || 500;
    handleNextError(err, next);
  }
};

exports.getBlogByKeyword = async (req, res, next) => {
  const { query } = req.query;
  try {
    const blogs = await Blog.find({
      title: { $regex: query.toLowerCase(), $options: "i" },
    });
    res.json({
      code: 200,
      message: "successfully",
      blogs: blogs,
    });
  } catch (err) {
    handleNextError(err, next);
  }
};

exports.deleteBlogById = async (req, res, next) => {
  const { id } = req.body;
  const userEmail = req.userEmail;
  if (!userEmail) {
    return res.status(422).json({
      message: "not validation",
      code: 422,
    });
  }
  if (!id) {
    return res.status(422).json({
      message: "id is emptied",
      code: 422,
    });
  }
  try {
    const findBlog = await Blog.findById(id);
    if (!findBlog) {
      throwError("blog is not existed", 404);
    }
    await Blog.findOneAndRemove({ _id: id });
    res.json({
      message: "successfully",
      code: 200,
      _id: id
    });
  } catch (err) {
    handleNextError(err, next);
  }
};
