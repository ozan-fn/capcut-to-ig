import axios from "axios";
import { Router } from "express";
import path from 'path'
import fs from 'fs'
import os from 'os'
import { uploadInstagram } from "../controllers/instagramController";

const instagramRouter = Router()
const tmpDir = os.tmpdir()

instagramRouter.post('/instagram', async (req, res) => {
    try {
        const id: string | undefined = req.body.id
        const url: string | undefined = req.body.url
        const caption: string | undefined = req.body.caption
        if (!url) return res.sendStatus(400)
        const buffer = (await axios.get(url, { responseType: 'arraybuffer' })).data
        const dest = path.join(tmpDir, './' + id + '.mp4')
        fs.writeFileSync(dest, buffer)
        const result = await uploadInstagram(dest, caption)
        return res.json(result)
    } catch (error) {
        console.error(error)
        res.sendStatus(500)
    }
})

export default instagramRouter