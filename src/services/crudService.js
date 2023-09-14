import bcrypt from 'bcrypt';
import db from '../models/index'
const saltRounds = 10;
let createUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender === '1' ? true : false,
                RoleId: data.RoleId

            });

            resolve('ok create new user succeed');
        } catch (error) {
            reject(error);
        }
    })

}
let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const salt = await bcrypt.genSaltSync(saltRounds);
            const hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (error) {
            reject(error);
        }
    })
}
let displayUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const users = await db.User.findAll({ raw: true });
            resolve(users);
        } catch (e) {
            reject(e);
        }
    })
}
let getEditView = (userID) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({ raw: true, where: { id: userID } });
            resolve(user);
        } catch (error) {
            reject(error);
        }
    })
}
let updateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id }
            })

            user.email = data.email;
            user.firstName = data.firstName;
            user.lastName = data.lastName;
            user.address = data.address;
            user.phoneNumber = data.phoneNumber;
            user.gender = data.gender;
            await user.save();
            resolve('ok update succes');

        } catch (error) {
            reject(error);
        }
    })
}
let deleteUser = (idUser) => {
    return new Promise(async (resolve, reject) => {
        try {
            let User = await db.User.findOne({
                where: {
                    id: idUser
                }
            })
            await User.destroy();
            resolve('delete User succes')
        } catch (error) {
            reject(error);
        }

    })
}
module.exports = {
    createUser: createUser, displayUser: displayUser, getEditView: getEditView, updateUser: updateUser,
    deleteUser: deleteUser,
}