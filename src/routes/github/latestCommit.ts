import { Request, Response } from 'express';

type RequestContent = {
    user: string
    repo: string
    branch: string
}

type GithubResponse = {
    ref: string
    node_id: string
    url: string
    object: {
        sha: string
        type: string
        url: string
    }
}

const latestCommit = async (req: Request, res: Response) => {
    if (!req.body.repo) return res.status(400).json({ success: false });

    const content: RequestContent = req.body;

    if (!req.body.user) content.user = 'abysmal26';
    if (!req.body.branch) content.branch = 'main';

    const response = await fetch(`https://api.github.com/repos/${content.user}/${content.repo}/git/refs/heads/${content.branch}`);

    if (response.status !== 200) return res.status(500).json({ success: false });

    const GhContent: GithubResponse = await response.json();

    const hash = GhContent.object.sha.slice(0, 7);

    return res.json({ success: true, hash });
};

export default latestCommit;