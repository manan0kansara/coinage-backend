import { DB_NOSL_HOST,DB_NOSQL_PORT, DB_NOSQL_DATABASE } from '@config';

export const dbConnection = {
  url: `mongodb://${DB_NOSL_HOST}:${DB_NOSQL_PORT}/${DB_NOSQL_DATABASE}`,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
};
