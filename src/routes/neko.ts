import { Router } from 'express';
import nekos from 'nekos.life';
const router = Router();
const neko = new nekos();

let response;
let blob;

router.get('/neko', async (req, res) => {
    try {
        response = (await neko.neko()).url;
        blob = await (await fetch(response)).blob();
    } catch {
        return res.status(500).json({ message: 'Fail fetching image' });
    }

    res.type(blob.type);
    blob.arrayBuffer().then(buf => res.send(Buffer.from(buf)));
});

export = router;