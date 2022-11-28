import { Router } from 'express';
const router = Router();

router.get('/curl', (req, res) => {
    if (
        req.headers &&
        req.headers['user-agent'] &&
        !req.headers['user-agent'].includes('curl')
    ) {
        return res.redirect('/');
    }

    res.json({ message: 'You are using curl' });
});

export = router;