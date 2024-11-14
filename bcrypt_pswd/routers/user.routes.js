const express = require('express')
const userRouter = express.Router()
const { getAllUsers, getUser, login, addUser, updateUser, deleteUser } = require('../controlers/controllers')



userRouter.route('/')
    .get(getAllUsers)
    .post(addUser);

    //update and delete by id
userRouter.route('/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);

    //hashpassword
userRouter.route('/login')
    .post(login);

    //create user
userRouter.route('/signup')
    .post(addUser);

module.exports = userRouter