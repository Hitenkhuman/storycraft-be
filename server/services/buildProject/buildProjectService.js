const mongoose = require('mongoose');
const Project = require('../../models/project.model');
const Story = require('../../models/story.model');
const ChatGPT = require('../../util/chatgpt');
const Validator = require('../../util/validation');
const GeneralError = require('../../util/GeneralError');
const CONSTANTS = require('../../util/constants');
/**
 * Class represents services for building project.
 */
class BuildProjectService {
    /**
   * @desc This function is being used to building new project.
   * @param {Object} req Request
   */
    static async buildProject(req, locale) {
        const { id } = req.body;
        const validator = new Validator(locale);
        validator.id(id);
        const project = await Project.findOne({ _id: new mongoose.Types.ObjectId(id) });

        if (!project) {
            throw new GeneralError(locale('PROJECT_NOT_FOUND'), 400);
        }

        const isProcessing = await Project.findOne({ status: CONSTANTS.PROJECT_STATUS.PROCESSING, isDeleted: false });

        if (isProcessing) {
            throw new GeneralError(locale('PROJECT_IN_PROCESS'), 400);
        }

        await Project.updateOne(
            { _id: id },
            { status: CONSTANTS.PROJECT_STATUS.PROCESSING }
        );
        BuildProjectService.processAndGenerateUserStories(project, locale);
    }

    static async processAndGenerateUserStories(project, locale) {
        const {
            _id,
            projectName,
            systemActorDesc,
            actionMapDesc,
            mindMapDesc,
            infoArchitectureDesc,
            userStory,
            description
        } = project;
        const result = [];
        const resultPrompts = [];
        const systemActor = systemActorDesc ? `The system actor information from diagram is' ${systemActorDesc},` : '';
        const actionMap = actionMapDesc ? `The action map description is: ${actionMapDesc},` : '';
        const mindMap = mindMapDesc ? `The mind map description is: ${mindMapDesc},` : '';
        const infoArchitecture = infoArchitectureDesc ? `The information architecture description is: ${infoArchitectureDesc},` : '';
        try {
            const promptOne = `Understand the system and product from requirements, i will give you the task to write user stories later, ${description} ${systemActor} ${actionMap} ${mindMap} ${infoArchitecture} for your reference we have added few high level stories are: ${userStory} give me string of array of object like [{feature,stories:[...]}]`;
            const context = await ChatGPT.prompt(promptOne.trim());
            const features = JSON.parse(context.text);

            for (const { feature, stories } of features) {
                for (const story of stories) {
                    const storyPrompt = `I want the detailed story description for ${feature},
                    acceptance criteria in minimum 10 words with ">" start format, 
                    minimum 10 to max possible positive and negative test cases with numerical numbering
                    e.g 1. testcase 1,2. testcase 2,3. testcase 3,...
                    for ${story}.
                    Don't generate duplicate story,
                    Give me in at least 1000 words,
                    Title should start with "As a [role] , format",
                    Description should be of the feature description,
                    Give me output format in JSON object with keys 
                    { title,description,edgeCases[],acceptanceCriteria:[],positiveTestCase:[], negativeTestCase:[]},
                    Please don't add any other text apart from this JSON object so i can parse it.`;
                    resultPrompts.push(storyPrompt.trim());
                }
            }
            let i = 0;
            while (i < resultPrompts.length) {
                CONSOLE_LOGGER.info(
                    'Processing',
                    i + 1,
                    ' story out of',
                    resultPrompts.length
                );
                try {
                    const outputStory = (await ChatGPT.prompt(resultPrompts[i])).text;
                    const story = JSON.parse(outputStory);
                    const prefix = `${projectName.substring(0, 2).toUpperCase()}-${i + 1}`;
                    if (story?.title && story?.acceptanceCriteria) {
                        result.push({
                            index: i + 1,
                            key: prefix,
                            projectId: _id,
                            title: story.title,
                            description: story.description,
                            acceptanceCriteria: _.isArray(story.acceptanceCriteria)
                                ? story.acceptanceCriteria.join('\n')
                                : story.acceptanceCriteria,
                            edgeCases: _.isArray(story.edgeCases)
                                ? story.edgeCases.join('\n')
                                : story.edgeCases,
                            positiveTestCase: _.isArray(story.positiveTestCase)
                                ? story.positiveTestCase.join('\n')
                                : story.positiveTestCase,
                            negativeTestCase: _.isArray(story.negativeTestCase)
                                ? story.negativeTestCase.join('\n')
                                : story.negativeTestCase
                        });
                        i++;
                    }
                } catch (e) {
                    CONSOLE_LOGGER.info('Error in story generation:', e.message);
                    if (e.message === 'Request failed with status code 400') {
                        if (i < 10) {
                            throw new GeneralError(locale('PROJECT_BUILD_FAILED'), 400);
                        }
                        break;
                    }
                }
            }
            await Story.insertMany(result);
            await Project.updateOne(
                { _id },
                { status: CONSTANTS.PROJECT_STATUS.COMPLETED }
            );
            CONSOLE_LOGGER.info('Project build completed');
        } catch (error) {
            CONSOLE_LOGGER.info(error.message);
            await Project.updateOne(
                { _id },
                { status: CONSTANTS.PROJECT_STATUS.FAILED }
            );
        }
    }
}

module.exports = BuildProjectService;
