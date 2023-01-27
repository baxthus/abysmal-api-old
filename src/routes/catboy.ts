import { Router } from 'express';
import catboys from 'catboys';
const router = Router();
const catboy = new catboys();

let result: catboys.CatboyImageResults;
let blob: Blob;

router.get('/catboy', async (req, res) => {
    try {
        await catboy.image().then(async response => {
            result = response;
            blob = await (await fetch(response.url)).blob();
        });
    } catch {
        return res.status(500).json({ message: 'Fail fetching image' });
    }

    res.type(blob.type);
    res.set({
        'artist': result.artist,
        'source': result.source_url,
    });
    blob.arrayBuffer().then(buf => res.send(Buffer.from(buf)));
});

export = router;