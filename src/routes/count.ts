import express from 'express';
const router = express.Router();

let count = 0;

router.get('/count', (req, res) => {
    res.json({ count });
});

router.post('/count', (reqst, res) => {
    ++count;
    res.json({ count });
});

module.exports = router;