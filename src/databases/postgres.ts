import Sequelize from 'sequelize';
import { NODE_ENV, DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME } from '@config';
import { logger } from '@utils/logger';
import AngelOneCredentialsModels from '@/models/postgres/credentialsAngelOne.model';
import AngelScriptMasterModel from '@/models/postgres/AngelScriptMaster.model';
const sequelize = new Sequelize.Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  dialect: 'postgres',
  host: DB_HOST,
  port: Number(DB_PORT),
  timezone: '+05:30',
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    underscored: false,
    freezeTableName: true,
  },
  pool: {
    min: 0,
    max: 5,
  },
  logQueryParameters: NODE_ENV === 'development',
  // logging: (query, time) => {
  //   logger.info(time + 'ms' + ' ' + query);
  // },
  logging:false,
  benchmark: true,
});

sequelize.authenticate();

const DB = {
  AngelOne:AngelOneCredentialsModels(sequelize),
  AngelOneScript: AngelScriptMasterModel(sequelize),
  sequelize, // connection instance (RAW queries) // library
};

export default DB;
