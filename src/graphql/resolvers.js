import { DeepSeekService } from '../services/deepseek.js';

const deepseekService = new DeepSeekService();

export const rootValue = {
  // Simple chat query
  chat: async ({ message }) => {
    try {
      const response = await deepseekService.chat(message);
      return response;
    } catch (error) {
      throw new Error(`Failed to get response from DeepSeek: ${error.message}`);
    }
  },

  // Chat with custom options
  chatWithOptions: async ({ input }) => {
    try {
      const response = await deepseekService.chatWithOptions(input);
      return response;
    } catch (error) {
      throw new Error(`Failed to get response from DeepSeek: ${error.message}`);
    }
  },

  // Check DeepSeek API status
  deepseekStatus: async () => {
    try {
      const status = await deepseekService.checkStatus();
      return status;
    } catch (error) {
      return {
        status: 'error',
        timestamp: new Date().toISOString(),
      };
    }
  },
};
