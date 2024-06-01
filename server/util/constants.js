module.exports = {
    LOG_LEVEL: 'debug',
    UPLOAD_IMAGE: {
        MIN_SIZE: 5120,
        MAX_SIZE: 5242880,
        ALLOWED_TYPE: ['image/jpg', 'image/jpeg', 'image/png']
    },
    USER_DOCUMENT_FILE: {
        MIN_SIZE: 10240,
        MAX_SIZE: 5242880,
        ALLOWED_TYPE: ['image/jpg', 'image/jpeg', 'image/png', 'application/pdf']
    },
    REGEX: {
        EMAIL: /^[A-Za-z0-9](\.?[A-Za-z0-9_-]){0,}@[A-Za-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/,
        FIRSTNAME: /^[a-zA-Z0-9,'~._^ -]*$/,
        SURNAME: /^[a-zA-Z0-9,'~._^ -]*$/,
        ALPHA_ONLY: /^[a-zA-Z']*$/,
        ALPHA_SPECIAL_CHAR: /^[ A-Za-z0-9_@./#&+-]*$/,
        ALPHA_SPECIAL_CHAR_EXCEPT_NUMBER: /^[ A-Za-z_@./#&+-]*$/,
        FULL_ACCESS: /^[^<> ?//\\]+$/,
        ALPHA_NUMARIC: /^[\w@ ]+$/,
        templateName: /^[ A-Za-z0-9_@./#&+-]*$/,
        SUBJECT: /^[ A-Za-z0-9_@./#&+-]*$/,
        URL: /(http(s)?:\/\/www\.)?[-a-zA-Z0-9@:%.+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%+.~#?&//=]*)/
    },
    OTPLENGTH: 6,
    STATUS: {
        PENDING: 0,
        ACTIVE: 1
    },
    ENVIRONMENT: {
        TESTING: 'testing',
        LOCAL: 'local',
        DEV: 'dev',
        PRODUCTION: 'production'
    },
    SES_HOST: 'email-smtp.eu-west-1.amazonaws.com',
    ROLE: {
        USER: 1
    },
    DESCRIBE_IMAGE_PROMPTS: {
        PROMPT_1: 'Analyze the action map and provide details about the values, components, and relationships depicted.explain in details to understand the action map.',
        PROMPT_2: 'Detail the mind map main concepts and connections, help me to understand in detail',
        PROMPT_3: 'Provide a description of this system actor.',
        PROMPT_4: 'Provide a description of this info architecture.'
    },
    VALID_TAGS: {
        TEXT: 'text',
        DIAGRAM: 'diagram'
    },
    PROJECT_STATUS: {
        UPLOADED: 'Uploaded',
        PROCESSING: 'Processing',
        COMPLETED: 'Completed',
        FAILED: 'Failed'
    },
    JIRA: {
        ASSIGNEE_TYPE: 'PROJECT_LEAD',
        DESCRIPTION: 'Cloud migration initiative',
        PROJECT_TEMPLATE_KEY: 'com.pyxis.greenhopper.jira:gh-simplified-scrum-classic',
        PROJECT_TYPE_KEY: 'software',
        STORY: 'Story'
    },
    NO_PREVIEW_IMAGE: 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png'
};
