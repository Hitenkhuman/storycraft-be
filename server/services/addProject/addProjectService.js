const Project = require('../../models/project.model');
const CONSTANTS = require('../../util/constants');
const AddProjectValidator = require('./addProjectValidator');
const fs = require('fs');
const path = require('path');
/**
 * Class represents services for adding project.
 */
class AddProjectService {
    /**
     * @desc This function is being used to adding new project.
     * @param {Object} req Request
     */
    static async addProject(req, locale) {
        const { projectName, description, userStory } = req.body;

        const validator = new AddProjectValidator(locale);
        await validator.validateImagePayload(req.files);
        validator.validateProject(req.body);

        const option = {
            projectName,
            description,
            userStory,
            actionMap: CONSTANTS.NO_PREVIEW_IMAGE,
            systemActor: CONSTANTS.NO_PREVIEW_IMAGE,
            infoArchitecture: CONSTANTS.NO_PREVIEW_IMAGE,
            mindMap: CONSTANTS.NO_PREVIEW_IMAGE
        };
        if (req.files?.actionMap?.length) {
            option.actionMap = AddProjectService.uploadFile(req.files.actionMap[0], 'action-map');
            option.actionMapDesc = req.body.actionMapDesc;
        }

        if (req.files?.systemActor?.length) {
            option.systemActor = AddProjectService.uploadFile(req.files.systemActor[0], 'system-actor');
            option.systemActorDesc = req.body.systemActor;
        }
        if (req.files?.infoArchitecture?.length) {
            option.infoArchitecture = AddProjectService.uploadFile(req.files.infoArchitecture[0], 'info-arch');
            option.infoArchitectureDesc = req.body.infoArchitectureDesc;
        }

        if (req.files?.mindMap?.length) {
            option.mindMap = AddProjectService.uploadFile(req.files.mindMap[0], 'mind-map');
            option.mindMapDesc = req.body.mindMapDesc;
        }
        return await Project.create(option);
    }

    static uploadFile(file, directory) {
        const fileName = `${Date.now()}-${file.originalname}`;
        const filePath = path.join(__dirname, '../../public', directory, fileName);
        fs.writeFileSync(filePath, file.buffer);
        return fileName;
    }
}

module.exports = AddProjectService;
