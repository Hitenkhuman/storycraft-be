/**
 * This file is used to project API's routes.
 * @name projectRoutes
 */
const router = require('express').Router();
const upload = require('../middleware/multerMiddleware');
const DescribeImageController = require('../services/describeImage/describeImageController');
const UploadMiddleWare = require('../middleware/upload');
const ProjectController = require('../services/project/projectController');
const AddProjectController = require('../services/addProject/addProjectController');
const BuildProjectController = require('../services/buildProject/buildProjectController');

// Project routes
router.get('/', ProjectController.listProject);
router.get('/details', ProjectController.viewProject);
router.put('/', ProjectController.editProject);
router.delete('/', ProjectController.deleteProject);
router.post(
    '/',
    UploadMiddleWare.fields([
        { name: 'infoArchitecture', maxCount: 1 },
        { name: 'actionMap', maxCount: 1 },
        { name: 'mindMap', maxCount: 1 },
        { name: 'systemActor', maxCount: 1 }
    ]),
    AddProjectController.addProject
);

// Describe Image routes
router.post('/action-map', upload.single('image'), DescribeImageController.describeActionMap);
router.post('/mind-map', upload.single('image'), DescribeImageController.describeMindMap);
router.post('/system-actor', upload.single('image'), DescribeImageController.describeSystemActor);
router.post('/info-arch', upload.single('image'), DescribeImageController.describeInfoArch);

// Story routes
router.post('/build', BuildProjectController.buildProject);

module.exports = router;
