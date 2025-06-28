import mongoose from 'mongoose';
import { validatePassword } from '../utils/passwordValidator.js';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'UserName is missing'],
    trim: true,
    minLength: 2,
    maxLength: 30,
  },
  email: {
    type: String,
    required: [true, 'UserEmail is Missing'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'User Password is required'],
    minLength: 6,
    validate: {
      validator: validatePassword,
      message: 'Password must contain a combination of letters and numbers or symbols'
    }
  }
}, { timestamps: true }); //created or updated at XX:XX time

const User = mongoose.model('User', userSchema);

export default User;