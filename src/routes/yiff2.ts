import { Router } from 'express';
import { E6 } from 'furry-wrapper';
const router = Router();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let response: any;
let blob;

router.get('/yiff2', (req, res) => res.redirect(301, '/'));

router.get('/yiff2/:tags', async (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tags: any = req.params.tags;

    try {
        response = await E6.nsfw(tags);
        blob = await (await fetch(response.file.url)).blob();
    } catch {
        return res.status(500).json({ message: 'Fail fetching image' });
    }

    res.type(blob.type);
    blob.arrayBuffer().then(buf => res.send(Buffer.from(buf)));
});

export = router;