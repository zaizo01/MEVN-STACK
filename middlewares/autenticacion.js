const jwt = require('jsonwebtoken');

const verificarAuth = (req, res, next) => {

    let token = req.get('token');
    jwt.verify(token, 'secret', (err, decoded) => {
        if (err) {
            return res.status(401).json({
                message: 'Usuario Invalido'
            })
        }

        req.usuario = decoded.data;

        next();

    });
}

const verificarAdmin = (req, res, next) => {

    const rol = req.usuario.role;

    if (rol === 'ADMIN') {
        next();
    } else {
        return res.status(401).json({
            message: 'Usuario Invalido'
        })
    }
}

module.exports = {verificarAuth, verificarAdmin};