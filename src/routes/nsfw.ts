import { Router } from 'express';
const router = Router();

const waifuURL = 'https://api.waifu.pics/nsfw/';

let blob: Blob;

router.get('/nsfw', (req, res) => res.redirect('/'));

router.get('/nsfw/:category', async (req, res) => {
    const category = req.params.category.toLowerCase();

    if (!['waifu', 'neko', 'trap', 'blowjob'].includes(category)) {
        return res.redirect('/');
    }

    try {
        await (await fetch(waifuURL + category)).json().then(async response => {
            blob = await (await fetch(response.url)).blob();
        });
    } catch {
        return res.status(500).json({ message: 'Fail fetching image' });
    }

    res.type(blob.type);
    blob.arrayBuffer().then(buf => res.send(Buffer.from(buf)));
});

export = router;