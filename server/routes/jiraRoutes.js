/**
 * This file is used to jira API's routes.
 * @name jiraRoutes
 */
const router = require('express').Router();
const JiraController = require('../services/syncJira/syncJiraController');


router.post('/', JiraController.verifyJira);

module.exports = router;
