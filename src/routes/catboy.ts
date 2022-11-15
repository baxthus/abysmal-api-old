import express from 'express';
import catboys from 'catboys';
const router = express.Router();
const catboy = new catboys();

let blob;

router.get('/catboy', async (req, res) => {
    try {
        // this sucks
        blob = await (await fetch((await catboy.image()).url)).blob();
    } catch {
        return res.status(500).json({ message: 'Fail fetching image' });
    }

    res.type(blob.type);
    blob.arrayBuffer().then((buf) => {
        res.send(Buffer.from(buf));
    });
});

export = router;