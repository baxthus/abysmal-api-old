import { Router } from 'express';
import { E6 } from 'furry-wrapper';
const router = Router();

let json: IYiff;
let blob: Blob;

router.get('/yiff2', (req, res) => res.redirect(301, '/'));

interface IYiff {
    id: number
    created_at: string
    updated_at: string
    file: {
        width: number
        height: number
        ext: string
        size: number
        md5: string
        url: string
    }
    preview: {
        width: number
        height: number
        url: string
    }
    sample: {
        has: boolean
        height: number
        width: number
        url: string
        // wtf is this
        alternates: { [key: string]: object }
    }
    score: { up: number, down: number, total: number }
    tags: {
        general: string[]
        species: string[]
        character: string[]
        copyright: string[]
        artist: string[]
        invalid: string[]
        lore: string[]
        meta: string[]
    }
    locked_tags: string[]
    change_seq: number
    flags: {
        pending: boolean
        flagged: boolean
        note_locked: boolean
        status_locked: boolean
        rating_locked: boolean
        comment_disabled: boolean
        deleted: boolean
    }
    rating: string
    fav_count: number
    sources: string[]
    pools: number[]
    relationships: {
        parent_id: number
        has_children: boolean
        has_active_children: boolean
        children: number[]
    }
    approver_id: number
    uploader_id: number
    description: string
    comment_count: number
    is_favorited: boolean
    has_notes: boolean
    duration: number
}

router.get('/yiff2/:tags', async (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tags: any = req.params.tags;

    try {
        await E6.nsfw(tags).then(async response => {
            // This is a terrible way of doing this,
            // but is the only way I could get it to work
            json = JSON.parse(JSON.stringify(response));
            blob = await (await fetch(json.file.url)).blob();
        });
    } catch {
        return res.status(500).json({ message: 'Fail fetching image' });
    }

    res.type(blob.type);
    res.set({
        'sources': json.sources.join(', '),
        'artist': json.tags.artist.join(', '),
    });
    blob.arrayBuffer().then(buf => res.send(Buffer.from(buf)));
});

export = router;