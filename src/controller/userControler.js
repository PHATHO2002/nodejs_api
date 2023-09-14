import userService from '../services/userService';

let handlerLogin = async (req, res) => {
    //check email exits
    // compare password
    // return userInfor
    //access_token:jwt
    try {
        let email = req.body.email;
        let password = req.body.password;
        if (!email || !password) {
            return res.status(500).json({
                errorCode: 1,
                message: 'missing input data'
            })
        }
        let userData = await userService.handlerUserLogin(email, password);

        return res.status(200).json({
            errCode: userData.errCode,
            errMessage: userData.errMessage,
            user: userData.user ? userData.user : {}
        })
    } catch (error) {
        console.log(error);
    }
}
let handlerGetAllUser = async (req, res) => {
    try {
        let usersData = {};
        let id = req.params.id; //id= All or id of  one user

        if (!id) {
            usersData.errCode = 1;
            usersData.errMessage = 'misssing id';
            usersData.users = users;
            return res.status(500).json({
                usersData: usersData
            })
        }
        let users = await userService.getAllUsers(id);

        if (users) {
            usersData.errCode = 0;
            usersData.errMessage = 'ok';
            usersData.users = users;
            return res.status(200).json({
                usersData: usersData
            })
        } else {
            usersData.errCode = 2;
            usersData.errMessage = 'dell tim thay ';
            usersData.users = users;
            return res.status(500).json({
                usersData: usersData
            })
        }
    } catch (error) {
        console.log(error);
    }
}
let handlerRegister = async (req, res) => {
    try {
        let email = req.body.email;
        let password = req.body.password;
        let repassword = req.body.repassword
        if (!email || !password || !repassword) {
            return res.status(500).json({
                errorCode: 1,
                message: 'missing input data'
            })
        }
        let userData = await userService.handlerCreateUser(email, password, repassword)
        return res.status(200).json({
            userData: userData
        })
    } catch (error) {
        console.log(error);
    }
}
let deleteUser = async (req, res) => {
    try {
        let usersData = {};
        let id = req.body.id; //id= All or id of  one user
        if (!id) {
            usersData.errCode = 1;
            usersData.errMessage = 'misssing id';
            usersData.users = user;
            return res.status(500).json({
                usersData: usersData
            })
        }
        let user = await userService.deleteUser(id);
        if (user) {
            usersData.errCode = 0;
            usersData.errMessage = 'delete ok';
            usersData.users = user;

            return res.status(200).json({
                usersData: usersData
            })
        } else {
            usersData.errCode = 2;
            usersData.errMessage = 'dell tim thay ';
            usersData.users = user;

            return res.status(500).json({
                usersData: usersData
            })
        }
    } catch (error) {
        console.log(error);
    }
}
let handlerUpdateUser = async (req, res) => {
    try {
        let usersData = {};
        let data = req.body; //data= All or data of  one user
        console.log(req.body)
        if (!data) {
            usersData.errCode = 1;
            usersData.errMessage = 'misssing data';
            usersData.user = user;
            return res.status(500).json({
                usersData: usersData
            })
        }
        let user = await userService.updateUser(data);

        if (user) {
            usersData.errCode = 0;
            usersData.errMessage = 'edit ok';
            usersData.user = user;
            return res.status(200).json({
                usersData: usersData
            })
        } else {
            usersData.errCode = 2;
            usersData.errMessage = 'dell tim thay ';
            usersData.user = user;
            return res.status(500).json({
                usersData: usersData
            })
        }
    } catch (error) {
        console.log(error);
    }
}
let handlerCreateUser = async (req, res) => {
    try {

        let newUser = req.body;
        let respone = await userService.handlerCreateUser2(newUser);
        return res.status(200).json(respone)

    } catch (error) {
        console.log(error)
    }

}

module.exports = {
    handlerLogin: handlerLogin,
    handlerGetAllUser: handlerGetAllUser,
    handlerRegister: handlerRegister,
    deleteUser: deleteUser,
    handlerUpdateUser: handlerUpdateUser,
    handlerCreateUser: handlerCreateUser
}