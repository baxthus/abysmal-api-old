import { Router } from 'express';
import yiffy, { JSONResponse } from 'yiffy';
const router = Router();
const yiff = new yiffy();

let response: JSONResponse;
let blob: Blob;

router.get('/yiff', (req, res) => res.redirect('/'));

router.get('/yiff/:category', async (req, res) => {
    const category = req.params.category.toLowerCase();

    switch (category) {
        case 'straight':
            response = await yiff.images.furry.yiff.straight();
            break;
        case 'gay':
            response = await yiff.images.furry.yiff.gay();
            break;
        case 'lesbian':
            response = await yiff.images.furry.yiff.lesbian();
            break;
        case 'gynomorph':
            response = await yiff.images.furry.yiff.gynomorph();
            break;
        case 'andromorph':
            response = await yiff.images.furry.yiff.andromorph();
            break;
        default:
            return res.redirect('/');
    }

    try {
        blob = await (await fetch(response.url)).blob();
    } catch {
        return res.status(500).json({ message: 'Fail fetching image' });
    }

    res.type(blob.type);
    res.set({
        'sources': response.sources.join(', '),
        'artists': response.artists.join(', '),
    });
    blob.arrayBuffer().then(buf => res.send(Buffer.from(buf)));
});

export = router;