import { Router } from 'express';
const router = Router();

router.get('/healthcheck', (req, res) => res.json({ status: 'ok' }));

export = router;