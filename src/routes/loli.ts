import { Router } from 'express';
const router = Router();

const booruURL = 'https://lolibooru.moe/post/index.json?tags=nude&limit=';

let json: IBooru;
let blob: Blob;

type IBooru = IBooru2[];
interface IBooru2 {
    id: number
    tags: string
    created_at: number
    creator_id: number
    author: string
    change: number
    source: string
    score: string
    md5: string
    file_size: number
    file_url: string
    is_shown_in_index: boolean
    preview_url: string
    preview_width: number
    preview_height: number
    actual_preview_width: number
    actual_preview_height: number
    sample_url: string
    sample_width: number
    sample_height: number
    sample_file_size: number
    jpeg_url: string
    jpeg_width: number
    jpeg_height: number
    jpeg_file_size: number
    rating: string
    has_children: boolean
    parent_id: unknown
    status: string
    width: number
    height: number
    is_held: boolean
    frames_pending_string: string
    frames_pending: unknown[]
    frames_string: string
    frames: unknown[]
}


router.get('/loli', async (req, res) => {
    // Returns a random integer from 0 to 100
    const value = Math.floor(Math.random() * 101);

    try {
        await (await fetch(booruURL + value)).json().then(async response => {
            json = response;
            blob = await (await fetch(json[value - 1].file_url)).blob();
        });
    } catch {
        return res.status(500).json({ message: 'Fail fetching image' });
    }

    res.type(blob.type);
    res.set({
        'author': json[value - 1].author,
        'source': json[value - 1].source,
    });
    blob.arrayBuffer().then(buf => res.send(Buffer.from(buf)));
});

export = router;