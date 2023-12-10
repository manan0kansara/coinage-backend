import Sequelize from 'sequelize';
import { NODE_ENV, DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME } from '@config';
import { logger } from '@utils/logger';
import AMXIDXscriptModel from "@/models/postgres/ScriptMasterAMXIDX.model";
import AngelOneCredentialsModels from '@/models/postgres/credentialsAngelOne.mode';
import COMDTYscriptModel from '@/models/postgres/ScriptMasterCOMDTY.model';
import FUTCOMscriptModel from '@/models/postgres/ScriptMasterFUTCOM.model';
import FUTCURscriptModel  from '@/models/postgres/ScriptMasterFUTCUR.model';
import FUTIDXscriptModel  from '@/models/postgres/ScriptMasterFUTIDX.model';
import FUTIRCscriptModel  from '@/models/postgres/ScriptMasterFUTIRC.model';
import FUTIRTscriptModel  from '@/models/postgres/ScriptMasterFUTIRT.model';
import FUTSTXscriptModel  from '@/models/postgres/ScriptMasterFUTSTX.model';
import IndexscriptModel  from '@/models/postgres/ScriptMasterIndex.model';
import NoinstrumentscriptModel  from '@/models/postgres/ScriptMasterNoinstrumentType';
import OPTCURscriptModel  from '@/models/postgres/ScriptMasterOPTCUR.model';
import OPTFUTscriptModel  from '@/models/postgres/ScriptMasterOPTFUT.model';
import OPTIDXscriptModel  from '@/models/postgres/ScriptMasterOPTIDX.model';
import OPTIRCscriptModel  from '@/models/postgres/ScriptMasterOPTIRC.model';
import OPTSTKscriptModel  from '@/models/postgres/ScriptMasterOPTSTK.model';
import UNDCURscriptModel  from '@/models/postgres/ScriptMasterUNDCUR.model';
import UNDIRCscriptModel  from '@/models/postgres/ScriptMasterUNDIRC.model';
import UNDIRDscriptModel  from '@/models/postgres/ScriptMasterUNDIRD.model';
import UNDIRTscriptModel  from '@/models/postgres/ScriptMasterUNDIRT.model';
const sequelize = new Sequelize.Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  dialect: 'postgres',
  host: DB_HOST,
  port: Number(DB_PORT),
  timezone: '+09:00',
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
  AMXIDX: AMXIDXscriptModel(sequelize),
  COMDTY: COMDTYscriptModel(sequelize),
  FUTCOM: FUTCOMscriptModel(sequelize),
  FUTCUR: FUTCURscriptModel(sequelize),
  FUTIDX: FUTIDXscriptModel(sequelize),
  FUTIRC: FUTIRCscriptModel(sequelize),
  FUTIRT: FUTIRTscriptModel(sequelize),
  FUTSTX: FUTSTXscriptModel(sequelize),
  Index: IndexscriptModel(sequelize),
  Noinstrument: NoinstrumentscriptModel(sequelize),
  OTPCUR: OPTCURscriptModel(sequelize),
  OPTFUT: OPTFUTscriptModel(sequelize),
  OPTIDX: OPTIDXscriptModel(sequelize),
  OPTIRC: OPTIRCscriptModel(sequelize),
  OPTSTK: OPTSTKscriptModel(sequelize),
  UNDCUR: UNDCURscriptModel(sequelize),
  UNDIRC: UNDIRCscriptModel(sequelize),
  UNDIRD: UNDIRDscriptModel(sequelize),
  UNDIRT: UNDIRTscriptModel(sequelize),
  sequelize, // connection instance (RAW queries) // library
};

export default DB;
