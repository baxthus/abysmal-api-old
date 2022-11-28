import { Router } from 'express';
const router = Router();

let count = 0;

router.get('/count', (req, res) => res.json({ count }));

router.post('/count', (req, res) => {
    ++count;
    res.json({ count });
});

module.exports = router;