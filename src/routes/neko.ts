import { Router } from 'express';
import nekos from 'nekos.life';
const router = Router();
const neko = new nekos();

let blob: Blob;

router.get('/neko', async (req, res) => {
    try {
        await neko.neko().then(async response => {
            blob = await (await fetch(response.url)).blob();
        });
    } catch {
        return res.status(500).json({ message: 'Fail fetching image' });
    }

    res.type(blob.type);
    blob.arrayBuffer().then(buf => res.send(Buffer.from(buf)));
});

export = router;