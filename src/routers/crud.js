import express from "express";
import home from "../controller/homepage"
let router = express.Router();
router.post('/createUser', home.createUser);
router.get('/displayUser', home.displayUser);
router.get('/getEditView', home.getEditView);
router.post('/updateUser', home.updateUser);
router.post('/deleteUser', home.deleteUser);
router.get('/', home.crud);

module.exports = router;