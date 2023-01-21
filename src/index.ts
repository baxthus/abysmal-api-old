import express from 'express';
import path from 'path';
import fs from 'node:fs';
import cors from 'cors';

const app = express();
const port = process.env.PORT ?? 5000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

const routesPath = path.join(__dirname, 'routes');
// todo: find a better way to filter the files
// ! this will break if there is a file that end with 's' and doesn't export a router.
// ! this will break if there is a folder that ends with 's'.
// * just find a way to filter files that end with '.js' and '.ts',
// * '.js' first for performance reasons.
// ? Abysmal - abysmal@vern.cc
const routesFiles = fs.readdirSync(routesPath).filter(file => file.endsWith('s'));

for (const file of routesFiles) {
    const filePath = path.join(routesPath, file);
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const route = require(filePath);

    app.use('/', route);
}

app.listen(port, () => {
    console.log(`Running at http://localhost:${port}`);
});