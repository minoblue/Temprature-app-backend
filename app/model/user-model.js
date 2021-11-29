const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const Scheme = mongoose.Schema

mongoose.set('useCreateIndex', true);

const userSchema = new Scheme({
   name: {
       type: String,
       required: [true, 'Name is required'],
       maxlength: 1000
   },
   email: {
       type: String,
       required: [true, 'Email is required'],
       unique: [true, 'Email is already exsist'],
       maxlength: 1000
   },
   password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 6
    },
   reset_token: {
       type: String,
       default: null
   },
   reset_token_expire: {
       type: Date,
       default: null
   },
   createdAt: {
       type: Date,
       default: Date.now
   }
});

// Encrypt password
userSchema.pre('save', async function(next) {
   if (!this.isModified('password')) {
       next();
   }
   const salt = await bcrypt.genSalt(10);
   this.password = await bcrypt.hash(this.password, salt);
});

// Check if email is taken
userSchema.statics.isEmailTaken = async function (email) {
    const user = await this.findOne({ email });
    return !!user;
};

// Set JWT token
userSchema.methods.generateToken = (email) => {
   return jwt.sign({ email }, process.env.JWT_SECRET,{ expiresIn: process.env.TOKEN_EXPIRE });
}

// Match password
userSchema.methods.matchPassword = async function(enteredPassword) {
   return await bcrypt.compare(enteredPassword, this.password);
}

module.exports = mongoose.model('Users', userSchema);
