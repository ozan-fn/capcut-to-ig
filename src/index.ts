import express from "express";
import capcutRouter from "./routes/capcutRoutes";
import path from 'path'
import instagramRouter from "./routes/instagramRoutes";

const app = express();
const port = 3000;

app.use(express.json())

app.use('/api', capcutRouter);
app.use('/api', instagramRouter);

app.use(express.static(path.join(__dirname, '../client/dist')))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'))
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
