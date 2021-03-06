module.exports = function() {

    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server")();
    var User = mongoose.model("User", UserSchema);

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findFacebookUser: findFacebookUser
    };
    return api;

    function findFacebookUser(id) {
        return User.findOne({"facebook.id" : id});
    }

    function createUser(user) {
        return User.create(user);
    }

    function findUserById(userId) {
        return User.findById(userId);
    }

    function findUserByCredentials(username, password) {
        return User.findOne({username: username, password: password});
    }

    function findUserByUsername(username) {
        return User.findOne({username: username});
    }

    function updateUser(userId, user) {
        return User
            .update({_id: userId},{
                $set: {
                    reputationPoints: user.reputationPoints
                }
            });
    }

    function deleteUser(userId) {
        return User.remove({_id: userId});
    }
};