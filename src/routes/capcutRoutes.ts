import { Router } from "express";
import { getTemplate, searchTemplate } from "../controllers/capcutController";

const capcutRouter = Router()

capcutRouter.get("/capcut", async (req, res) => {
    try {
        const query = req.query.query as string | undefined
        const cursor = req.query.cursor as string | undefined
        if (query) {
            const result = await searchTemplate(query, cursor)
            res.json(result);
            return
        }
        const result = await getTemplate(cursor);
        res.json(result);
    } catch (error) {
        // console.error(error)
        res.sendStatus(500)
    }
})

export default capcutRouter