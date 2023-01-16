import { Router } from 'express';
import catboys from 'catboys';
const router = Router();
const catboy = new catboys();

let blob: Blob;

router.get('/catboy', async (req, res) => {
    try {
        await catboy.image().then(async response => {
            blob = await (await fetch(response.url)).blob();
        });
    } catch {
        return res.status(500).json({ message: 'Fail fetching image' });
    }

    res.type(blob.type);
    blob.arrayBuffer().then(buf => res.send(Buffer.from(buf)));
});

export = router;