import { Router } from 'express';
const router = Router();

let response;
let blob;

router.get('/loli', async (req, res) => {
    const value = Math.floor(Math.random() * 101);

    try {
        response = await (await fetch(`https://lolibooru.moe/post/index.json?tags=nude&limit=${value}`)).json();
    } catch {
        return res.status(500).json({ message: 'Fail requesting image' });
    }

    try {
        blob = await (await fetch(response[value - 1].file_url)).blob();
    } catch {
        return res.status(500).json({ message: 'Fail fetching image' });
    }

    res.type(blob.type);
    blob.arrayBuffer().then(buf => res.send(Buffer.from(buf)));
});

export = router;