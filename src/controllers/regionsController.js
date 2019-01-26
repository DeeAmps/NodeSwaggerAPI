import express from 'express';
import query from "../helpers/queries";
import util from "util";
import { connect, releaseConnection } from "../db/index";
import { formatResults } from "../helpers/index";

const regionsRouter = express.Router();

regionsRouter.get('/getAllRegions', async (req, res) => {
    let connection = await connect();
    let result = await connection.execute(query.GET_REGIONS);
    let fResults = formatResults(result)
    await releaseConnection(connection);
    return res.status(200).json(fResults);
                    
});

regionsRouter.post('/addRegion', async (req, res) => {
    let regionName = req.body.regionName;
    if(!regionName){
        return res.status(400).json({err: "Region Name is required"})
    }
    let connection = await connect();
    let result = await connection.execute(query.GET_LAST_REGION_ID);
    let lastRegionId = parseInt(result.rows[0][0]);
    let nextRegionId = lastRegionId + 1;
    let qury = util.format(query.INSERT_NEW_REGION, nextRegionId, regionName);
    let ret = await connection.execute(qury, { autoCommit: true })
    if(ret.rowsAffected > 0){
        await releaseConnection(connection);
        return res.status(201).json({success: true});
    }
    else{
        await releaseConnection(connection);
        return res.status(400).json({success: false});
    }
});

regionsRouter.put('/updateRegion/:regionId', async (req, res) => {
    let regionId = parseInt(req.params.regionId);
    let regionName = req.body.regionName
    let connection = await connect();
    let qury = util.format(query.UPDATE_REGION, regionName, regionId);
    let ret = await connection.execute(qury, { autoCommit: true })
    console.log(ret);
    if(ret.rowsAffected > 0){
        await releaseConnection(connection);
        return res.status(200).json({success: true});
    }
    else{
        await releaseConnection(connection);
        return res.status(400).json({success: false});
    }
})

regionsRouter.delete('/removeRegion/:regionId', async (req, res) => {
    let regionId = parseInt(req.params.regionId);
    let connection = await connect();
    let qury = util.format(query.REMOVE_REGION, regionId);
    let ret = await connection.execute(qury, { autoCommit: true })
    console.log(ret);
    if(ret.rowsAffected > 0){
        await releaseConnection(connection);
        return res.status(404).json({success: true});
    }
    else{
        await releaseConnection(connection);
        return res.status(500).json({success: false});
    }
})

export default regionsRouter
