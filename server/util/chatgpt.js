const OpenAI = require('openai');
const openai = new OpenAI();
let conversation = [
    {
        role: 'system',
        content: 'You are a professional Product owner that provides user stories.'
    }
];
/**
 * This class represents chatGPT chat completion service
 */
class ChatGPT {
    /**
   * @desc This function is being used to get chatGPT chat completion results
   * @param {string} prompt prompt
   */
    static async prompt(prompt, isClear = false) {
        if (isClear) {
            conversation = [
                {
                    role: 'system',
                    content: 'You are a professional Product owner that provides user stories.'
                }
            ];
        }
        conversation.push({
            role: 'user',
            content: prompt
        });
        const chatOptions = {
            model: 'gpt-3.5-turbo',
            messages: conversation
        };
        const result = await openai.chat.completions.create(chatOptions);
        return { text: result.data.choices[0].message.content };
    }
}

module.exports = ChatGPT;
