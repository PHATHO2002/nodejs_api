import express from "express";
import userControler from "../controller/userControler"
let router = express.Router();

router.post('/login', userControler.handlerLogin);
router.post('/Register', userControler.handlerRegister);
router.get('/get-all-user/:id', userControler.handlerGetAllUser);
router.post('/delete-user', userControler.deleteUser)
router.post('/update-user', userControler.handlerUpdateUser)
router.post('/create-user', userControler.handlerCreateUser)


module.exports = router;