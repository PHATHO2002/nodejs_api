import bcrypt from 'bcrypt';
import { raw } from 'body-parser';
import db from '../models/index';
const saltRounds = 10;
let handlerUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};

            let isExist = await checkUserEmail(email);

            if (isExist) {
                let user = await db.User.findOne({
                    where: { email: email }, attributes: ['email', 'roleId', 'password'],
                    raw: true

                })

                let check = await bcrypt.compare(password, user.password);

                if (check) {

                    userData.errCode = 0;
                    userData.errMessage = `login sucsess`;
                    delete user.password;
                    userData.user = user;
                    resolve(userData);
                } else {
                    userData.errCode = 3;
                    userData.errMessage = `password are wrong`;
                    resolve(userData);
                }
            } else {
                userData.errCode = 2;
                userData.errMessage = `your email is fucking shit. do fucking it again!`;

                resolve(userData);
            }
        } catch (error) {
            reject(error)
        }
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({ where: { email: userEmail } });

            if (user) {
                resolve(true);
            } else { resolve(false) };
        } catch (error) {
            reject(error);
        }
    })
}
let handlerCreateUser = (email, password, repassword) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            if (password === repassword) {
                let hashPasswordFromBcrypt = await hashUserPassword(password);
                await db.User.create({
                    email: email,
                    password: hashPasswordFromBcrypt
                });
                userData.errCode = 0;
                userData.errMessage = `create user success`;
                resolve(userData);
            } else {
                userData.errCode = 2;
                userData.errMessage = `password and repeat password not macth together`;
                userData.user = '';
                resolve(userData);
            }
        } catch (error) {
            reject(error);
        }
    })
}
let handlerCreateUser2 = (newUser) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            if (newUser.email && newUser.password) {
                let res = await db.User.findOne({

                    where: { email: newUser.email }

                })
                if (res) {
                    userData.errCode = 2;
                    userData.errMessage = ` alredy exits email`;
                    userData.user = '';
                    resolve(userData);
                } else {
                    let hashPasswordFromBcrypt = await hashUserPassword(newUser.password);
                    await db.User.create({
                        email: newUser.email,
                        password: hashPasswordFromBcrypt,
                        firstName: newUser.firstName,
                        lastName: newUser.lastName,
                        address: newUser.address

                    });
                    userData.errCode = 0;
                    userData.errMessage = ` create user succses`;
                    userData.user = newUser;
                    resolve(userData);
                }
            } else {
                userData.errCode = 1;
                userData.errMessage = ` missing input email or password`;
                userData.user = newUser;
                resolve(userData);
            }
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
let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {

            let users = '';
            if (userId === 'ALL') {
                users = await db.User.findAll({

                    attributes: {
                        exclude: ['password']
                    }
                });
            } else {
                users = await db.User.findOne({


                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    }
                });
            }

            resolve(users);
        } catch (error) {
            reject(error)
        }
    })
}
let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    id: userId
                },
            });
            if (user) {
                let userCopy = { ...user }
                await user.destroy();
                resolve(userCopy);
            }
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
            resolve(user);

        } catch (error) {
            reject(error);
        }
    })
}
module.exports = {
    handlerUserLogin: handlerUserLogin,
    getAllUsers: getAllUsers,
    handlerCreateUser: handlerCreateUser,
    deleteUser: deleteUser,
    updateUser: updateUser,
    handlerCreateUser2: handlerCreateUser2
}