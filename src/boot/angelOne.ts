import DB from "@/databases/postgres";
import { SmartAPI } from 'smartapi-javascript';
import totp from 'totp-generator';
import { ANGEL_ONE_2FA_KEY, ANGEL_ONE_PIN, ANGEL_ONE_CLIENT_ID, ANGEL_ONE_API_SECRET, ANGEL_ONE_API_KEY } from '@config';
import { logger } from "@/utils/logger";
import { response } from "express";
class AngelOneBoot {
    public angelOne = DB.AngelOne;
    public AMXIDX = DB.AMXIDX;
    public COMDTY = DB.COMDTY;
    public FUTCOM = DB.FUTCOM;
    public FUTCUR = DB.FUTCUR;
    public FUTIDX = DB.FUTIDX;
    public FUTIRC = DB.FUTIRC;
    public FUTIRT = DB.FUTIRT;
    public FUTSTX = DB.FUTSTX;
    public Index = DB.Index;
    public Noinstrument = DB.Noinstrument;
    public OPTCUR = DB.OTPCUR;
    public OPTFUT = DB.OPTFUT;
    public OPTIDX = DB.OPTIDX;
    public OPTIRC = DB.OPTIRC;
    public OPTSTK = DB.OPTSTK;
    public UNDCUR = DB.UNDCUR;
    public UNDIRC = DB.UNDIRC;
    public UNDIRD = DB.UNDIRD;
    public UNDIRT = DB.UNDIRT;
    public smart_api = new SmartAPI({ api_key: ANGEL_ONE_API_KEY })
    public generateTOTP() {
        return totp(ANGEL_ONE_2FA_KEY);
    }

    public GenerateSession = async () => {
        const DataAvialable = await this.angelOne.count();
        if (DataAvialable > 0) {
            const currentDate = new Date();
            currentDate.setHours(10, 30, 0, 0);
            currentDate.setDate(currentDate.getDate() + 1);
            const now = new Date();
            const data = await this.angelOne.findAll({ attributes: ['createdAt', 'id'] });
            if (now.getDate() > currentDate.getDate() && now.getHours() > currentDate.getHours()) {
                const reGenratedata = await this.smart_api.generateSession(ANGEL_ONE_CLIENT_ID, ANGEL_ONE_PIN, this.generateTOTP());
                const { jwtToken, refreshToken, feedToken } = reGenratedata.data
                await data.update({ feedToken: feedToken, refreshToken: refreshToken, jwtToken: jwtToken }).then((data) => {
                    logger.info("New Generated Added sucessfully");
                }).catch((error) => {
                    logger.error(`there is error in Updating Data : ${error}`);
                });
            }
            else {
                logger.info("No there is no need for generating session");
            }
        }
        else {
            const sessionDetails = await this.smart_api.generateSession(ANGEL_ONE_CLIENT_ID, ANGEL_ONE_PIN, this.generateTOTP());
            if (sessionDetails.status == true || sessionDetails.message == 'SUCCESS') {
                const { jwtToken, refreshToken, feedToken } = sessionDetails.data
                const dataAddedinDatabase = await this.angelOne.create({ broker: 'angelOne', feedToken: feedToken, refreshToken: refreshToken, jwtToken: jwtToken });
                if (dataAddedinDatabase) {
                    logger.info("Credentials added in Databases 🔑");
                }
                else {
                    logger.error("Error When Adding Credentials in database");
                }
            }
            else {
                logger.error(`Error When generateSession With AngelOne : ${sessionDetails.message}`);
            }
        }

    }

    public ScriptMaster = async () => {
        const AMXIDXA:any = []
        const NoinstrumentA:any = []
        const OPTSTKA:any = []
        const OPTIDXA:any = []
        const FUTSTKA:any = []
        const FUTIDXA:any = []
        const OPTCURA:any = []
        const OPTIRCA:any = []
        const FUTCURA:any =[]
        const FUTIRCA:any = []
        const UNDIRCA:any = []
        const  UNDCURA:any = []
        const  FUTIRTA:any = []
        const INDEXA:any = []
        const  UNDIRTA:any = []
        const  UNDIRDA:any = []
        const OPTFUTA:any = []
        const COMDTYA:any =[]
        const FUTCOMA:any = []
         fetch(
            "https://margincalculator.angelbroking.com/OpenAPI_File/files/OpenAPIScripMaster.json",
          )
            .then((response) => response.json())
            .then((data:any) => {
          
              // Create an object to store counts for each instrument type
              const instrumentTypeCounts = {};

              // Loop through the array and count occurrences of each instrument type
              data.forEach((item) => {
                if (item.instrumenttype !== undefined) {
                  if (!instrumentTypeCounts[item.instrumenttype]) {
                    instrumentTypeCounts[item.instrumenttype] = 1;

                  } else {
                    instrumentTypeCounts[item.instrumenttype]++;
                  }
                } else {
                  // Count items with empty instrumenttype
                  if (!instrumentTypeCounts["empty"]) {
                    instrumentTypeCounts["empty"] = 1;

                  } else {
                    instrumentTypeCounts["empty"]++;
                  }
                }
                if(item.instrumenttype == 'AMXIDX'){
                    AMXIDXA.push(item)
                }
                if(item.instrumenttype == ''){
                    NoinstrumentA.push(item)
                }
                if(item.instrumenttype == 'OPTSTK'){
                    OPTSTKA.push(item)
                }
                if(item.instrumenttype == 'OPTIDX'){
                    OPTIDXA.push(item)
                }
                if(item.instrumenttype == 'FUTSTK'){
                    FUTSTKA.push(item)
                }
                if(item.instrumenttype == 'FUTIDX') {
                    FUTIDXA.push(item)
                }
                if(item.instrumenttype == 'OPTCUR') {
                    OPTCURA.push(item)
                }
                if(item.instrumenttype == 'OPTIRC') {
                    OPTIRCA.push(item)
                }
                if(item.instrumenttype == 'FUTCUR') {
                    FUTCURA.push(item)
                }
                if(item.instrumenttype == 'FUTIRCA') {
                    FUTIRCA.push(item)
                }
                if(item.instrumenttype == 'UNDIRC') {
                    UNDIRCA.push(item)
                }
                if(item.instrumenttype == 'UNDCUR') {
                    UNDCURA.push(item)
                }
                if(item.instrumenttype == 'FUTIRT') {
                    FUTIRTA.push(item)
                }
                if(item.instrumenttype == 'INDEX') {
                    INDEXA.push(item)
                }
                if(item.instrumenttype == 'UNDIRT') {
                    UNDIRTA.push(item)
                }
                if(item.instrumenttype == 'UNDIRDT') {
                    UNDIRDA.push(item)
                }
                if(item.instrumenttype == 'OPTFUT') {
                    OPTFUTA.push(item)
                }
                if(item.instrumenttype == 'COMDTY') {
                    COMDTYA.push(item)
                }
                if(item.instrumenttype == 'FUTCOM') {
                    FUTCOMA.push(item)
                }
              }); 
     
              this.AMXIDX.bulkCreate(AMXIDXA).then(() => {
                logger.info(`AMXIDX Data inserted in table 🎄`);
              }).catch((error) => {
                logger.error(`Error WHen create Bulkcreate for AMXIDX : ${error.message}`);
              });
              this.Noinstrument.bulkCreate(NoinstrumentA).then(() => {
                logger.info(`NoinstrumentA Data inserted in table 🎄`);
              }).catch((error) => {
                logger.error(`Error WHen create Bulkcreate for NoinstrumentA : ${error.message}`);
              })
              this.COMDTY.bulkCreate(COMDTYA).then(() => {
                logger.info(`COMDTYA Data inserted in table 🎄`);
              }).catch((error) => {
                logger.error(`Error WHen create Bulkcreate for COMDTYA : ${error.message}`);
              })
              this.FUTCOM.bulkCreate(FUTCOMA).then(() => {
                logger.info(`FUTCOMA Data inserted in table 🎄`);
              }).catch((error) => {
                logger.error(`Error WHen create Bulkcreate for FUTCOMA : ${error.message}`);
              })
              this.FUTCUR.bulkCreate(FUTCURA).then(() => {
                logger.info(`FUTCURA Data inserted in table 🎄`);
              }).catch((error) => {
                logger.error(`Error WHen create Bulkcreate for FUTCURA : ${error.message}`);
              })
              this.FUTIDX.bulkCreate(FUTIDXA).then(() => {
                logger.info(`FUTIDXA Data inserted in table 🎄`);
              }).catch((error) => {
                logger.error(`Error WHen create Bulkcreate for FUTIDXA : ${error.message}`);
              })
              this.FUTIRC.bulkCreate(FUTIRCA).then(() => {
                logger.info(`AMXIDX Data inserted in table 🎄`);
              }).catch((error) => {
                logger.error(`Error WHen create Bulkcreate for AMXIDX : ${error.message}`);
              })
              this.FUTIRT.bulkCreate(FUTIRTA).then(() => {
                logger.info(`FUTIRTA Data inserted in table 🎄`);
              }).catch((error) => {
                logger.error(`Error WHen create Bulkcreate for FUTIRTA : ${error.message}`);
              })
              this.FUTSTX.bulkCreate(FUTSTKA).then(() => {
                logger.info(`FUTSTKA Data inserted in table 🎄`);
              }).catch((error) => {
                logger.error(`Error WHen create Bulkcreate for FUTSTKA : ${error.message}`);
              })
              this.Index.bulkCreate(INDEXA).then(() => {
                logger.info(`INDEXA Data inserted in table 🎄`);
              }).catch((error) => {
                logger.error(`Error WHen create Bulkcreate for INDEXA : ${error.message}`);
              })
              this.OPTCUR.bulkCreate(OPTCURA).then(() => {
                logger.info(`OPTCURA Data inserted in table 🎄`);
              }).catch((error) => {
                logger.error(`Error WHen create Bulkcreate for OPTCURA: ${error.message}`);
              })
              this.OPTFUT.bulkCreate(OPTFUTA).then(() => {
                logger.info(`OPTFUTA Data inserted in table 🎄`);
              }).catch((error) => {
                logger.error(`Error WHen create Bulkcreate for OPTFUTA : ${error.message}`);
              })
              this.OPTIDX.bulkCreate(OPTIDXA).then(() => {
                logger.info(`OPTIDXA Data inserted in table 🎄`);
              }).catch((error) => {
                logger.error(`Error WHen create Bulkcreate for OPTIDXA : ${error.message}`);
              })
              this.OPTIRC.bulkCreate(OPTIRCA).then(() => {
                logger.info(`AMXIDX Data inserted in table 🎄`);
              }).catch((error) => {
                logger.error(`Error WHen create Bulkcreate for AMXIDX : ${error.message}`);
              })
              this.OPTSTK.bulkCreate(OPTSTKA).then(() => {
                logger.info(`OPTSTKA Data inserted in table 🎄`);
              }).catch((error) => {
                logger.error(`Error WHen create Bulkcreate for OPTSTKA : ${error.message}`);
              })
              this.UNDCUR.bulkCreate(UNDCURA).then(() => {
                logger.info(`UNDCURA Data inserted in table 🎄`);
              }).catch((error) => {
                logger.error(`Error WHen create Bulkcreate for UNDCURA : ${error.message}`);
              })
              this.UNDIRC.bulkCreate(UNDIRCA).then(() => {
                logger.info(`UNDIRCA Data inserted in table 🎄`);
              }).catch((error) => {
                logger.error(`Error WHen create Bulkcreate for UNDIRCA : ${error.message}`);
              })
              this.UNDIRD.bulkCreate(UNDIRDA).then(() => {
                logger.info(`UNDIRDA Data inserted in table 🎄`);
              }).catch((error) => {
                logger.error(`Error WHen create Bulkcreate for UNDIRDA : ${error.message}`);
              })
              this.UNDIRT.bulkCreate(UNDIRTA).then(() => {
                logger.info(`UNDIRTA Data inserted in table 🎄`);
              }).catch((error) => {
                logger.error(`Error WHen create Bulkcreate for UNDIRTA : ${error.message}`);
              })

              logger.info(instrumentTypeCounts)
            })
            .catch((error) => {
              console.log("Error fetching data:", error);
            });
          
        
    }
    


    constructor() {
        this.GenerateSession()
    }

}

export default AngelOneBoot;