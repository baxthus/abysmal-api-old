import { Router } from 'express';
const router = Router();

const webhook = process.env.CONTACT_WEBHOOK ?? '';

type Contact = {
    originURL: string
    inputName: string
    inputEmail: string
    inputMessage: string
}

type Embed = {
    title: string
    description: string
    color: number
    fields: Array<{
        name: string
        value: string
    }>
}

type Body = {
    username: string
    avatar_url: string
    embeds: Array<Embed>
}

router.post('/contact', async (req, res) => {
    if (!req.body.originURL ||
        !req.body.inputName ||
        !req.body.inputEmail ||
        !req.body.inputMessage
    ) {
        return res.json({ success: false });
    }

    const content: Contact = req.body;

    const embed: Embed = {
        title: 'Contact Form',
        description: `From ${content.originURL} at <t:${Date.now()}:f>`,
        color: 13346551,
        fields: [
            {
                name: ':bust_in_silhouette: **Name**',
                value: `\`${content.inputName}\``,
            },
            {
                name: ':envelope: **Email**',
                value: `\`${content.inputEmail}\``,
            },
            {
                name: ':page_facing_up: **Message**',
                value: `\`\`\`\n${content.inputMessage}\n\`\`\``,
            },
        ],
    };

    const body: Body = {
        username: 'Contact Form',
        avatar_url: 'https://abysmal.eu.org/avatar.png',
        embeds: [embed],
    };

    try {
        await fetch(webhook, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
    } catch {
        return res.json({ success: false });
    }

    res.json({ success: true });
});

export = router;