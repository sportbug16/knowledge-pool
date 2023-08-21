const mongoose = require("mongoose");
const UserSchema = mongoose.Schema(
    {

      username: {
        type: String,
        required:[true,"Please add your username."],
      },
      email:{
        type: String,
        required:[true,"Please add your emailId."],
        unique:[true,"Email address already taken"],
      },
      password:{
        type: String,
        required:[true,"Please add your password"],

      },
       questions_visited: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Documents'  // this should be the name of your related model
       }]
    },
    { collection: "users",
      timestamps: true }
  );
  const Users=mongoose.model("Users", UserSchema);
  module.exports = Users;