import mongoose from 'mongoose';
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const roles = {
    values: ['ADMIN', 'USER'],
    message: '{role} rol no es valido'
}

const userSchema = new Schema({
    name: {type: String, required: [true, 'El nombre es necesario']},
    email: {type: String, required: [true, 'El email es necesario'], unique: true},
    password: {type: String, required: [true, 'El password is required necesario']},
    date: {type: Date, default: Date.now},
    role: {type: String, default: 'USER', enum: roles},
    active: {type: Boolean, default: true},
});

userSchema.plugin(uniqueValidator, {message: 'El {PATH} debe de ser unico'});

userSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
}

const User = mongoose.model('User', userSchema);
export default User;