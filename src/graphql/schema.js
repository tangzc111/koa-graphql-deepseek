import { buildSchema } from 'graphql';

export const schema = buildSchema(`
  type Query {
    "Get a response from DeepSeek AI"
    chat(message: String!): ChatResponse!
    
    "Get chat completion with custom parameters"
    chatWithOptions(input: ChatInput!): ChatResponse!
    
    "Health check for DeepSeek API"
    deepseekStatus: StatusResponse!
  }

  type ChatResponse {
    "The AI-generated response"
    content: String!
    
    "Model used for generation"
    model: String!
    
    "Token usage information"
    usage: Usage
    
    "Timestamp of the response"
    timestamp: String!
  }

  type Usage {
    "Number of tokens in the prompt"
    promptTokens: Int!
    
    "Number of tokens in the completion"
    completionTokens: Int!
    
    "Total tokens used"
    totalTokens: Int!
  }

  type StatusResponse {
    "Status of the service"
    status: String!
    
    "Timestamp of the check"
    timestamp: String!
  }

  input ChatInput {
    "The message to send to DeepSeek"
    message: String!
    
    "Model to use (default: deepseek-chat)"
    model: String
    
    "Temperature for randomness (0.0 to 2.0)"
    temperature: Float
    
    "Maximum tokens to generate"
    maxTokens: Int
    
    "System prompt to set context"
    systemPrompt: String
  }
`);
