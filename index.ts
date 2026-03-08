import express, { Request } from 'express';

const app = express();
const port: number = 3000;

app.get('/', (req: Request, res: any) => {
    res.send('API working');
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});