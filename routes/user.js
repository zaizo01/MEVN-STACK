import express from 'express';
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const _ = require('underscore');

const {verificarAuth, verificarAdmin} = require('../middlewares/autenticacion.js');
// Import models
import User from '../models/user';

// POST User
router.post('/newUser', async(req, res) => {

    const body = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    };

    body.password = bcrypt.hashSync(req.body.password, saltRounds);

    try {
        const usuarioDB = await User.create(body);
        res.json(usuarioDB);
        res.status(200).json(usuarioDB)
    } catch (error) {
        
        return res.status(500).json({
            message: 'Ha ocurrido un problema',
            error
        })
    }
});

// PUT User
router.put('/user/:id', [verificarAuth, verificarAdmin], async(req, res) => {

    const _id = req.params.id;
    const body = _.pick(req.body, ['name','email', 'password']);
    if(body.password){
        body.password = bcrypt.hashSync(req.body.password, saltRounds);
    }
    
    try {
        const usuarioDB = await User.findByIdAndUpdate(_id, body, {new: true, runValidators: true});
        return res.json(usuarioDB);
        
    } catch (error) {
        return res.status(400).json({
            message: 'Ha ocurrido un problema',
            error
        })
    }
})

module.exports = router;