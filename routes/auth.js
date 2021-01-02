const express = require('express')
const router = express.Router()
const authController = require('../Controllers/auth.controller')
const vertifly = require('../middleware/verifly')
const {upload} = require('../middleware/upload')

router.get('/getAll', authController.getUser)
router.get('/getOne/:id', authController.getOne)
router.post('/search', authController.search)
router.post('/signUp',[upload.single("file"),vertifly.isAdmin], authController.signUp)
router.post('/login', authController.login)
router.put('/update/:id', authController.update)
router.delete('/delete/:id', authController.delete)
router.delete('/test',authController.test)


module.exports = router

