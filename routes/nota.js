import express from 'express';
const router = express.Router();

// Import models
import Nota from '../models/nota';
const {verificarAuth, verificarAdmin} = require('../middlewares/autenticacion.js');
// POST Note
router.post('/add-note', verificarAuth, async(req, res) => {
    const body = req.body;

    body.userId = req.usuario._id;

    try {
        const notaDB = await Nota.create(body);
        res.status(200).json(notaDB)
        
    } catch (error) {
        return res.status(500).json({
            message: 'Error',
            error
        })
    }
});

// GET Note for ID
router.get('/note/:id', async(req, res) => {
    const _id = req.params.id;
    try {
        const notaDB = await Nota.findOne({_id})
        res.json(notaDB)
    } catch (error) {
        return res.status(500).json({
            message: 'Error',
            error
        })
    }
})

// GET All Note
router.get('/note-all', verificarAuth, async(req, res) => {

    const userId = req.usuario._id;

    const queryLimit  = Number(req.query.limite) || 5;
    const querySkip  = Number(req.query.skip) || 0;

    try {
        const notaDB = await Nota.find({ userId }).skip(querySkip).limit(queryLimit);
        const totalNote = await Nota.find({userId}).countDocuments();
        res.json({notaDB, totalNote});
    } catch (error) {
        return res.status(500).json({
            message: 'Error',
            error
        })
    }
})

// DELETE Note
router.delete('/note/:id', async(req, res) => {

    const _id = req.params.id;
    try {
        const notaDB = await Nota.findOneAndDelete({_id});
        if (!notaDB){
            return res.status(400).json({
                message: 'Note not exist',
                error
            })
        }
        res.json(notaDB);
    } catch (error) {
        return res.status(500).json({
            message: 'Error',
            error
        })
    }

// PUt Note 
router.put('/note/:id', async(req, res) => {
    const _id = req.params.id;
    const body = req.body;

    try {
        const notaDB = await Nota.findByIdAndUpdate(_id, body, {new: true});
        res.json(notaDB);
        
    } catch (error) {
        return res.status(400).json({
            message: 'Error',
            error
        })
    }
})



})

module.exports = router;