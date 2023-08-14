export type GetUserDataRes =
  | {
      user: {
        EDEN_AI_API_KEY: string | null;
        GitHub: string | null;
        OPENAI_API_KEY: string | null;
      };
      statusCode: 200;
    }
  | {
      statusCode: 401;
      user: null;
    };
