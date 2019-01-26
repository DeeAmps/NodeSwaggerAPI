import express from 'express';
import query from "../helpers/queries";
import { connect, releaseConnection } from "../db/index";
import { formatResults } from "../helpers/index";

const locationsRouter = express.Router();

locationsRouter.get('/getAllLocations', async (req, res) => {
    let connection = await connect();
    let result = await connection.execute(query.GET_LOCATIONS);
    let fResults = formatResults(result)
    await releaseConnection(connection);
    return res.status(200).json(fResults);                 
})

export default locationsRouter
