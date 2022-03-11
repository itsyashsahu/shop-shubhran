const mongoose = require('mongoose');

const { findById } = require('./models/Shop-model');

const Shop = require('./models/Shop-model')
const User = require('./models/User-model')

mongoose.connect(
  'mongodb://localhost:27017/shop_aisle?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false'
).then(() => {
  console.log('Connected to database!')
}).catch(() => {
  console.log('Connection failed!')
});

const addShop = async (req, res, next) => {
  const newShop = new Shop({
    name: req.body.name,
    area: req.body.area,
    category: req.body.category,
    opening: req.body.opening,
    closing: req.body.closing,
    creator: req.body.creator
  });

  const result = await newShop.save();
  res.json(result);
};

const editShops = async (req, res, next) => {
  const updatedShop = Shop.findByIdAndUpdate(req.params.id, {
    name: req.body.name || Shop.findById(req.params.id).name,
    area: req.body.area || Shop.findById(req.params.id).area,
    category: req.body.category || Shop.findById(req.params.id).category,
    opening: req.body.opening || Shop.findById(req.params.id).opening,
    closing: req.body.closing || Shop.findById(req.params.id).closing
  })

  const result = await updatedShop;
  res.json(result);
}

const getShops = async (req, res, next) => {
  const shops = await Shop.find().exec();
  res.json(shops);
}

const deleteShops = async (req, res, next) => {
  const newArr = await Shop.findByIdAndDelete(req.params.id)
  res.json(newArr)

}

const loginCheck = async (req,res,next) => {
  try {
    const userLogin = {
      email: req.body.email,
      password: req.body.password
    }

    const result = await User.find({email:userLogin.email})

    if(result.length !== 0){
      if(userLogin.password === result[0].password ){
        res.json("logged-in")
      }
      else{
        res.status(400)
        res.json("Password doesn't match")
      }
    }

    else{
      res.status(400)
      res.json("No user with this email exists")
    }
  } catch (error) {
    res.status(400)
    res.json("No user with this email exists")
  }
}
const addUser = async (req, res, next) => {
  try {
    const newUser =   new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    const result = await newUser.save(function (err) {
      if (err)
      {
        console.log(err)
        res.status(420)
        res.json("Error occured in sign up")
      }
      else{
        res.json('hello user')
      }
    });


  } catch (err) {
    console.log(err)
    res.json("Error occured in adding user")

  }
 
};

exports.addShop = addShop;
exports.getShops = getShops;
exports.deleteShops = deleteShops;
exports.addUser = addUser;
exports.editShops = editShops;
exports.loginCheck = loginCheck;