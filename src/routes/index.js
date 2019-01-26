import express from 'express';
import countriesRouter from '../controllers/countriesController';
import employeesRouter from '../controllers/employeesController';
import departmentsController from '../controllers/departmentsController';
import jobsController from '../controllers/jobsController';
import regionsController from '../controllers/regionsController';
import locationsController from '../controllers/locationsController';

import swaggerUi  from 'swagger-ui-express';
import swaggerDocument from '../docs/swagger.json';


const router = express.Router();

router.use('/countries', countriesRouter);
router.use('/employees', employeesRouter);
router.use('/departments', departmentsController);
router.use('/jobs', jobsController);
router.use('/locations', locationsController);
router.use('/regions', regionsController);


router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument, { explorer : true }));


export default router;