import { Router } from 'express';
import latestCommit from './github/latestCommit';
const router = Router();

router.get('/github/latestCommit', (req, res) => latestCommit(req, res));

export = router;