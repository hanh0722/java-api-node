const PDFDocument = require("pdfkit-table");
const path = require("path");
const { v4 } = require("uuid");
const User = require("../../model/User");
const { throwError, handleNextError, root } = require("../../util");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;

exports.checkOutGeneratePDF = async (req, res, next) => {
  const userEmail = req.userEmail;
  if (!userEmail) {
    throwError("user is not validation", 403);
  }
  try {
    const user = await User.findOne({ email: userEmail }).populate("cart._id");
    if (!user) {
      throwError("user is not existed", 404);
    }
    const cartUser = user.cart;
    if (cartUser.length === 0) {
      throwError("cart of user is emptied, cannot checkout", 400);
    }
    const doc = new PDFDocument();
    doc.registerFont("Heading", "Courier-Bold");
    doc.registerFont("Paragraph", "Courier");
    doc.pipe(fs.createWriteStream("out.pdf"));
    doc.fontSize(30).font("Heading").text("Plenty Store", 100, 100);
    doc
      .fontSize(14)
      .moveDown(1)
      .font("Paragraph")
      .text("Fresh air in your home")
      .fillColor("#cd783e");

    doc.fontSize(22).moveDown(4).font("Heading").text(`Invoice ${v4()}`, {
      align: "center",
    });
    doc
      .fontSize(15)
      .moveDown(3)
      .fillColor("black")
      .font("Paragraph")
      .text("Your items you bought", {
        align: "center",
      });
    fs.writeFile(root, doc, (err) => {
        console.log(err);
    })
    // const generateCartUser = cartUser.map((item, index) => {
    //   const { title, last_price } = item._id;
    //   return {
    //     id: index + 1,
    //     title: title,
    //     price: last_price,
    //     quantity: item.quantity,
    //     total: +(last_price * item.quantity).toFixed(2),
    //   };
    // });
    // const totalValueCartUser = generateCartUser.reduce((acc, item) => {
    //   return acc + +item.quantity * +item.total;
    // }, 0);
    // const table = {
    //   title: "Products",
    //   headers: ["ID", "Item", "Price ($)", "Quantity", "Total ($)"],
    //   rows: [
    //     ...generateCartUser.map((item) => {
    //       return Object.values(item);
    //     }),
    //   ],
    // };
    // doc
    //   .fontSize(16)
    //   .moveDown(3)
    //   .table(table, {
    //     // A4 595.28 x 841.89 (portrait) (about width sizes)
    //     width: 800,
    //     columnsSize: [30, 100, 100, 100, 100],
    //   });
    // doc.fontSize(16).moveDown(2).text(`Total: $${totalValueCartUser}`, {
    //   align: "right",
    // });
    // doc.fontSize(13).font('Heading').moveDown(2).text('Note: Your price is calculated 5% tax', {
    //     align: 'center'
    // });
    // doc.moveDown(1).fontSize(11).font('Paragraph').text('If you have any question, contact us: +1 (123) 456 789', {
    //     align: 'center'
    // });
    // doc.moveDown(1).fontSize(11).font('Paragraph').text('Thank you for choosing us!', {
    //     align: 'center'
    // });
    // fs.writeFile('documents', doc, (err, buffer) => {
    //     if(err){
    //         return res.status(500).json({
    //             message: 'cannot generate pdf',
    //             code: 500
    //         })
    //     }
    // })
    
    // doc.end();
    // res.json({
    //     message: 'successfully',
    //     code: 200
    // })
  } catch (err) {
    handleNextError(err, next);
  }
};
