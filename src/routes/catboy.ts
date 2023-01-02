import { Router } from 'express';
import catboys from 'catboys';
const router = Router();
const catboy = new catboys();

let response;
let blob;

router.get('/catboy', async (req, res) => {
    try {
        response = (await catboy.image()).url;
        blob = await (await fetch(response)).blob();
    } catch {
        return res.status(500).json({ message: 'Fail fetching image' });
    }

    res.type(blob.type);
    blob.arrayBuffer().then(buf => res.send(Buffer.from(buf)));
});

export = router;