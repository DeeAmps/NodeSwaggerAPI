import express from 'express';
import query from "../helpers/queries";
import { connect, releaseConnection } from "../db/index";
import { formatResults } from "../helpers/index";

const employeesRouter = express.Router();

employeesRouter.get('/getAllEmployees', async (req, res) => {
    let connection = await connect();
    let result = await connection.execute(query.GET_EMPLOYEES);
    let fResults = formatResults(result)
    await releaseConnection(connection);
    return res.status(200).json(fResults);
                    
})

employeesRouter.get('/getSingleEmployee/:employeeId', async (req, res) => {
    let employeeId = parseInt(req.params.employeeId);
    let connection = await connect();
    let qury = `${query.GET_EMPLOYEE} ${employeeId}`;
    let result = await connection.execute(qury);
    if(result.rows.length == 0){
        return res.status(404).json({message: `No Employee exists in databse with Id ${countryId}`});
    }
    let fResults = formatResults(result);
    await releaseConnection(connection);
    return res.status(200).json(fResults[0]);
})

export default employeesRouter
