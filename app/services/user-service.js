const UserModel = require("../model/user-model.js");
const ErrorResponse = require("../utils/errorResponse");
const _ = require('lodash');

const createUser = async (userBody) => {
    if (await UserModel.isEmailTaken(userBody.email)) {
        throw new ErrorResponse('Email already taken!!', 401);
    }
    const user = await UserModel.create(userBody);
    return user;
}

const getUserByEmail = async (email) => {
    return UserModel.findOne({ email: email });
};

const getUserById = async (id) => {
    return UserModel.findById(id);
};

const updateUserById = async (userId, updateBody) => {
    await UserModel.findByIdAndUpdate(userId, updateBody, {new: true, runValidators: true})
    const user = await getUserById(userId);
    return user;
};

const deleteUserById = async (userId) => {
    const user = await UserModel.findByIdAndDelete(userId);
    return user;
};

module.exports = {
    createUser,
    getUserByEmail,
    getUserById,
    updateUserById,
    deleteUserById,
};
