const Blog = require("../../model/Blog");
const { handleNextError } = require("../../util/throwError");
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
