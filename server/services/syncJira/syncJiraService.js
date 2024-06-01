const Project = require('../../models/project.model');
const Story = require('../../models/story.model');
const mongoose = require('mongoose');
const GeneralError = require('../../util/GeneralError');
const axios = require('axios');
const CONSTANTS = require('../../util/constants');
const jiraInstance = process.env.JIRA_INSTANCE;
const JIRA_API_PROJECT_URL = `${jiraInstance}/rest/api/3/project`;
const JIRA_API_STORY_URL = `${jiraInstance}/rest/api/2/issue`;
/**
 * Class represents services for authenticate Jira.
 */
class SyncJiraService {

    /**
     * @desc This function is being used to sync prject to jira
     * @param {Object} req Request
     * @param {Object} res Response
     */
    static async verifyJira(req, locale) {
        const { email, apiToken, id, leadAccountId } = req.body;
        const { projectName } = await Project.findById(id);
        const stories = await Story.find({ projectId: new mongoose.Types.ObjectId(id) });
        const authString = Buffer.from(`${email}:${apiToken}`).toString('base64');
        const authHeader = `Basic ${authString}`;
        const config = {
            headers: {
                Authorization: authHeader,
                'Content-Type': 'application/json'
            }
        };
        const projectKey = projectName
            .trim()
            .toUpperCase();

        const truncatedKey = projectKey.slice(0, 2);
        const projectData = {
            leadAccountId,
            key: truncatedKey,
            name: projectName,
            assigneeType: CONSTANTS.JIRA.ASSIGNEE_TYPE,
            description: CONSTANTS.JIRA.DESCRIPTION,
            projectTemplateKey: CONSTANTS.JIRA.PROJECT_TEMPLATE_KEY,
            projectTypeKey: CONSTANTS.JIRA.PROJECT_TYPE_KEY
        };
        try {
            await axios.post(JIRA_API_PROJECT_URL, projectData, config);
            CONSOLE_LOGGER.info('JIRA PROJECT CREATED : ', projectName);
            for (const story of stories) {
                await SyncJiraService.createStoryInJira(story, truncatedKey, authHeader);
            }
        } catch (error) {
            CONSOLE_LOGGER.info('Error creating project:', error);
            throw new GeneralError(locale('JIRA_SYNC_FAILED'), 400);
        }
    }


    /**
     * @desc This function is being used to create story on jira
     * @param {Object} req Request
     * @param {Object} res Response
     */
    static async createStoryInJira(story, projectKey, authHeader) {
        const description = `${story.description ?? ''}\n\n` +
            `*Acceptance Criteria*:\n${story.acceptanceCriteria}\n\n` +
            `*Edge Cases*:\n${story.edgeCases ?? '-'}\n\n` +
            `*Positive Test Cases*:\n${story.positiveTestCase ?? '-'}\n\n` +
            `*Negative Test Cases*:\n${story.negativeTestCase ?? '-'}`;

        const issueData = {
            fields: {
                description,
                project: {
                    key: projectKey
                },
                summary: story.title,
                issuetype: {
                    name: CONSTANTS.JIRA.STORY
                }
            }
        };
        try {
            await axios.post(JIRA_API_STORY_URL, JSON.stringify(issueData), {
                headers: {
                    Authorization: authHeader,
                    'Content-Type': 'application/json'
                }
            });
            CONSOLE_LOGGER.info('Story created in Jira for :', story.key);
        } catch (error) {
            CONSOLE_LOGGER.info('Error creating story in Jira:', error);
        }
    }
}

module.exports = SyncJiraService;
