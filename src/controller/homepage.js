
import db from "../models/index";

import crudService from "../services/crudService"

let crud = (req, res) => {
    return res.render('crud/crud.ejs');
}
let createUser = async (req, res) => {
    let dataUser = req.body
    let message = await crudService.createUser(dataUser);
    return res.send(message);
}
let displayUser = async (req, res) => {
    let dataUser = await crudService.displayUser();
    // console.log(dataUser);
    return res.render('crud/displayUser.ejs', { dataUser: JSON.stringify(dataUser) });
}
let getEditView = async (req, res) => {
    let id = req.query.id;

    let user = await crudService.getEditView(id);

    return res.render('crud/getEditview.ejs', { dataUser: JSON.stringify(user) })
}
let updateUser = async (req, res) => {
    let updateData = req.body;
    console.log(updateData);
    let status = await crudService.updateUser(updateData);
    return res.send(status);
}
let deleteUser = async (req, res) => {
    let status = await crudService.deleteUser(req.body.id)
    return res.send(status);
}

let gethomepage = async (req, res) => {
    try {

        let data = await db.User.findAll();

        return res.render('homepage.ejs', { data: JSON.stringify(data) });
    } catch (error) {

        console.log(error);
    }
}
module.exports = {
    gethomepage: gethomepage,
    crud: crud,
    createUser: createUser,
    displayUser: displayUser,
    getEditView: getEditView,
    updateUser: updateUser,
    deleteUser: deleteUser,
};