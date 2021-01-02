const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const saltRounds = 10
const someOtherPlaintextPassword = 'not_bacon'
const decryptJWT = require('../utils/decryptJWT')
const user = require('../models/user')
const { get } = require('mongoose')
const validator = require('validator')


exports.getUser = async (req, res, next) => {
    try {
        const getAll = await User.find()
        res.json(getAll)
    } catch (error) {
        console.log(error)
    }
}

exports.deleteImg = async (req , res , next ) => {
    var fs = require('fs');
    var filePath = `${__basedir}/public/img/profile`; 
   
    fs.readdir(filePath, (err, files) => {
        files.forEach(file => {
          if (file != null) {
              console.log(filePath+'/'+file);
      fs.unlinkSync(filePath+'/'+file);
          }
        });
      });

}

exports.getOne = async (req, res, next) => {
    try {
        const getOne = await User.find({
            _id: req.params.id,
        })
        res.json(getOne)
    } catch (error) {
        console.log(error)
    }
}


exports.signUp = async (req, res, next) => {
  const username = req.body.username
  const password = req.body.password
  const getUsername = await User.findOne({
      username,
  })
  const getUserpass = await User.findOne({
      password,
  })
  try {
      if(getUsername){
          getJson
          res.json(
              "มีชื่อผู้ใช้นี้แล้ว"
          )
      } else {
          if (password !== getUserpass){
            res.json('passworss ไม่ตรง')
          }else {
              userPass()
          }
      }
  } catch (error) {
    console.log(error);
  }

  function userPass(){
      if(getUserpass){
        res.json(
            "มีรหัสผ่านนี้แล้ว"
        )
      } else {
          console.log("else upass");
        const userPassword =  bcrypt.hash(
            password,saltRounds)
            console.log(userPassword);
      }
  }
  
}

exports.login = async (req, res, next) => {
    try {
        // console.log(req.body.password)
        const username = req.body.username
        const password = req.body.password
        const getUser = await User.findOne({
            username,
        })
        // console.log(username, getUser)
        if (getUser) {
            const bcryptJWT = await bcrypt.compare(
                password,
                getUser.password,
                async (err, result) => {
                    if (result) {
                        await decryptJWT(getUser)
                        res.json('Login Success')
                    } else {
                        res.json('Username or Password are required')
                    }
                }
            )
        } else {
            console.log('error')
        }
    } catch (error) {
        console.log(error)
    }
}

exports.update = async (req, res, next) => {
    try {
        console.log(req.params.id)
        const updateUser = await User.findOneAndUpdate(req.params.id, req.body)

        res.json('updated success')
    } catch (error) {
        console.log(error)
    }
}

exports.delete = async (req, res, next) => {
    try {
        console.log(req.params.id)
        const deleteUser = await User.findOneAndDelete(req.params.id)

        res.json('delete success')
    } catch (error) {
        console.log(error)
    }
}

exports.search = async (req, res, next) => {
    try {
        let search = {}
        console.log(search)
        if (req.body.search) {
            search = req.body.search
            console.log(search)
            const searchUser = await User.find(search)
            res.json(searchUser)
        }
    } catch (error) {
        console.log(error)
    }
}
