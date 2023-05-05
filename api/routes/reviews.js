const {Router} = require('express')
const {review} = require('../db')

const rutaReviews = Router()

rutaReviews.get('/', async (req , res ) => {
    try{
        let todas_las_reviews = await review.findAll()
        res.status(200).send(todas_las_reviews)
    }catch(err) {
        res.status(400).send('mal')
    }
})

rutaReviews.post('/', async (req , res ) => {
    const {estrellas, comentario, usuario} = req.body
    try{
        let creo_review = await review.create({
            estrellas,
            comentario,
            usuario
        })
        res.status(200).send(creo_review)
    }catch(err) {
        res.status(400).send('mal')
    }
})

module.exports = rutaReviews