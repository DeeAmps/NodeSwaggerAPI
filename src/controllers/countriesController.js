import express from 'express';
import query from "../helpers/queries"
import { connect, releaseConnection } from "../db/index";
import { formatResults } from "../helpers/index"

const countriesRouter = express.Router();

countriesRouter.get('/getAllCountries', async (req, res) => {
    let connection = await connect();
    let result = await connection.execute(query.GET_COUNTRIES);
    let fResults = formatResults(result)
    await releaseConnection(connection);
    return res.status(200).json(fResults);
                    
})

countriesRouter.get('/getSingleCountry/:countryId', async (req, res) => {
    let countryId = req.params.countryId;
    let connection = await connect();
    let qury = `${query.GET_COUNTRY} '${countryId}'`;
    let result = await connection.execute(qury);
    if(result.rows.length == 0){
        return res.status(404).json({message: `No country exists in databse with Id ${countryId}`});
    }
    let fResults = formatResults(result);
    await releaseConnection(connection);
    return res.status(200).json(fResults[0]);
})

export default countriesRouter