import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const notaSchema = new Schema({
    name: { type: String, required: [true, 'Name requerid']},
    description: String,
    userId: String,
    date: { type: Date, default: Date.now()},
    active: {type: Boolean, default: true}
})

// Convert to Model
const Nota = mongoose.model('Nota', notaSchema);

export default Nota;