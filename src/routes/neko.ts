import express from 'express';
import nekos from 'nekos.life';
const router = express.Router();
const neko = new nekos();

let blob;

router.get('/neko', async (req, res) => {
    try {
        // this sucks
        blob = await (await fetch((await neko.neko()).url)).blob();
    } catch {
        return res.status(500).json({ message: 'Fail fetching image' });
    }

    res.type(blob.type);
    blob.arrayBuffer().then((buf) => {
        res.send(Buffer.from(buf));
    });
});

export = router;