import express from 'express';
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Import models
import User from '../models/user';

router.post('/', async(req, res) => {

    const body = req.body;

    try {

        const usuarioDB = await User.findOne({email: body.email}) 

        if (!usuarioDB) {
            return res.status(400).json({
                message: 'Email no encontrado',
            })
        }

        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                message: 'Password incorrecta',
            })
        }

        const token = jwt.sign({
            data: usuarioDB}, 'secret', {expiresIn: 60 * 60 * 24 * 30});

        res.json({
            usuarioDB,
            token
        })
    } catch (error) {
        return res.status(400).json({
            message: 'Ha ocurrido un problema',
            error
        })
    }
})

module.exports = router;