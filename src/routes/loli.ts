import { Router } from 'express';
const router = Router();

const booruURL = 'https://lolibooru.moe/post/index.json?tags=nude&limit=';

let content: Booru;
let blob: Blob;

type Booru = Array<{
    author: string
    source: string
    file_url: string
}>

router.get('/loli', async (req, res) => {
    // Returns a random integer from 0 to 100
    const value = Math.floor(Math.random() * 101);

    try {
        await (await fetch(booruURL + value)).json().then(async response => {
            content = response;
            blob = await (await fetch(content[value - 1].file_url)).blob();
        });
    } catch {
        return res.status(500).json({ message: 'Fail fetching image' });
    }

    res.type(blob.type);
    res.set({
        'author': content[value - 1].author,
        'source': content[value - 1].source,
    });
    blob.arrayBuffer().then(buf => res.send(Buffer.from(buf)));
});

export = router;