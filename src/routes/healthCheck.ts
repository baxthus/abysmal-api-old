import express from 'express';
const router = express.Router();

router.get('/healthcheck', (req, res) => {
    res.json({ status: 'ok' });
});

export = router;