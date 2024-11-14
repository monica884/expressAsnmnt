const express =require('express');
const usersRouter=express.Router();
const {getAllUsers,getUser,updateUser,deleteUser}=require('../controlers/controler')

usersRouter.route('/')
    .get(getAllUsers)
    .post(addUser);

usersRouter.route('/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);


module.exports = usersRouter