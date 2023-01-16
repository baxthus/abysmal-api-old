import { Router } from 'express';
const router = Router();

const webhook = process.env.CONTACT_WEBHOOK ?? '';

router.post('/contact', async (req, res) => {
    if (!req.body.originURL ||
        !req.body.inputName ||
        !req.body.inputEmail ||
        !req.body.inputMessage
    ) {
        return res.json({ success: false });
    }

    const embed = {
        'title': 'Contact Form',
        'description': `From ${req.body.originURL}`,
        'color': 13346551,
        'fields': [
            {
                'name': ':bust_in_silhouette: **Name**',
                'value': '`' + req.body.inputName + '`',
            },
            {
                'name': ':envelope: **Email**',
                'value': '`' + req.body.inputEmail + '`',
            },
            {
                'name': ':page_facing_up: **Message**',
                'value': '```\n' + req.body.inputMessage + '\n```',
            },
        ],
    };

    const body = {
        'username': 'Contact Form',
        'avatar_url': 'https://abysmal.eu.org/avatar.png',
        'embeds': [embed],
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