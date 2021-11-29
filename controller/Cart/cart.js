const User = require('../../model/User');
const {throwError, handleNextError} = require('../../util/throwError');
exports.getCartOfUser = async (req, res, next) => {
    const userEmail = req.userEmail;
    if(!userEmail){
        return res.status(422).json({
            message: 'user is not validation',
            code: 422
        })
    }
    try{
        const user = await User.findOne({email: userEmail}).populate('cart._id');
        if(!user){
            throwError('user is not existed', 404);
        }
        const cart = user.cart;
        res.json({
            message: 'Successfully',
            code: 200,
            cart: cart
        });
    }catch(err){
        handleNextError(err, next);
    }
}