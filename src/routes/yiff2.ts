import { Router } from 'express';
import { E6 } from 'furry-wrapper';
const router = Router();

let blob: Blob;

router.get('/yiff2', (req, res) => res.redirect(301, '/'));

router.get('/yiff2/:tags', async (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tags: any = req.params.tags;

    try {
        await E6.nsfw(tags).then(async response => {
            // This is a terrible way of doing this,
            // but is the only way I could get it to work
            const json = JSON.parse(JSON.stringify(response));
            blob = await (await fetch(json.file.url)).blob();
        });
    } catch {
        return res.status(500).json({ message: 'Fail fetching image' });
    }

    res.type(blob.type);
    blob.arrayBuffer().then(buf => res.send(Buffer.from(buf)));
});

export = router;