import express from 'express'

const router = express.Router();


router.get('/', (req, res) => {
    res.json({
        message: "Everything Is Working Pefectly"
    })
})

export default router;