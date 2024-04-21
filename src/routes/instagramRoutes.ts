import axios from "axios";
import { Router } from "express";
import path from 'path'
import fs from 'fs'
import os from 'os'
import { uploadInstagram } from "../controllers/instagramController";
import { io } from "../server";

const instagramRouter = Router()
const tmpDir = os.tmpdir()
var job: { id: string }[] = []

instagramRouter.post('/instagram', async (req, res) => {
    const id: string | undefined = req.body.id
    const url: string | undefined = req.body.url
    const caption: string | undefined = req.body.caption
    if (!id) return res.sendStatus(400)
    if (!url) return res.sendStatus(400)

    job.push({ id: id })
    io.emit('message', job)

    try {
        const buffer = (await axios.get(url, { responseType: 'arraybuffer' })).data
        const dest = path.join(tmpDir, './' + id + '.mp4')
        fs.writeFileSync(dest, buffer)
        const result = await uploadInstagram(dest, caption)

        return res.json(result)
    } catch (error) {
        console.error(error)
        res.sendStatus(500)
    } finally {
        job = job.filter(f => f.id != id)
        io.emit('message', job)
    }
})

instagramRouter.get('/instagram', (req, res) => {
    res.json(job)
})

export default instagramRouter