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
        'straight': await yiff.furry.yiff.straight('json'),
        'gay': await yiff.furry.yiff.gay('json'),
        'lesbian': await yiff.furry.yiff.lesbian('json'),
        'gynomorph': await yiff.furry.yiff.gynomorph('json'),
        'andromorph': await yiff.furry.yiff.andromorph('json'),
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
    } catch {
        return res.status(500).json({ message: 'Fail requesting image' });
    }

    try {
        blob = await (await fetch(response[0].url)).blob();
    } catch {
        return res.status(500).json({ message: 'Fail fetching image' });
    }

    res.type(blob.type);
    blob.arrayBuffer().then(buf => res.send(Buffer.from(buf)));
});

export = router;