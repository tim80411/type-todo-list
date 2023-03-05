import mongoose from 'mongoose';
import {EmailValidator} from "../../validator/index";

export const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 10,
  },
  email: {
    type: String,
    validate: {validator: EmailValidator},
  },
})
