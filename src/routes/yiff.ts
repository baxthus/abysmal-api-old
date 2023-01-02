import { Router } from 'express';
import yiffy from 'yiffy';
const router = Router();
const yiff = new yiffy();

let response;
let blob;

// This is a bad way to do this
async function shitFunction(category: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const category_list: any = {
        'straight': await yiff.images.furry.yiff.straight(),
        'gay': await yiff.images.furry.yiff.gay(),
        'lesbian': await yiff.images.furry.yiff.lesbian(),
        'gynomorph': await yiff.images.furry.yiff.gynomorph(),
        'andromorph': await yiff.images.furry.yiff.andromorph(),
    };

    return category_list[category];
}

router.get('/yiff', (req, res) => res.redirect('/'));

router.get('/yiff/:category', async (req, res) => {
    const { category } = req.params;

    if (!['straight', 'gay', 'lesbian', 'gynomorph', 'andromorph'].includes(category.toLowerCase())) {
        return res.redirect('/');
    }

    try {
        response = await shitFunction(category.toLowerCase());
        blob = await (await fetch(response.url)).blob();
    } catch {
        return res.status(500).json({ message: 'Fail fetching image' });
    }

    res.type(blob.type);
    blob.arrayBuffer().then(buf => res.send(Buffer.from(buf)));
});

export = router;