const { Schema, model } = require("mongoose");

// const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const userSchema = new Schema(
  {
    user_id: {
      type: String,
    },
    surname: {
      type: String,
      trim: true,
    },
    othernames: {
      type: String,
      trim: true,
    },
    email: {
        type: String,
        trim:true
    },
    phone_number:{
        type :String
    },
    password_hash:{
      type:String
    },
    password_salt:{
      type:String
    }
  },
  { timestamps: true }
);

const Users = model("Users", userSchema)

module.exports = Users;