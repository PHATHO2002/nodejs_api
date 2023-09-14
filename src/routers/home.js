import express from "express";
import home from "../controller/homepage"
let router = express.Router();

router.get('/', home.gethomepage);

module.exports = router;