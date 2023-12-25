import DB from "@/databases/postgres";
import { SmartAPI } from "smartapi-javascript";
import totp from "totp-generator";
import {
  ANGEL_ONE_2FA_KEY,
  ANGEL_ONE_PIN,
  ANGEL_ONE_CLIENT_ID,
  ANGEL_ONE_API_SECRET,
  ANGEL_ONE_API_KEY,
} from "@config";
import { logger } from "@/utils/logger";
import { response } from "express";
class AngelOneBoot {
  public angelScript = DB.AngelOneScript;
  public angelOne = DB.AngelOne;
  public smart_api = new SmartAPI({ api_key: ANGEL_ONE_API_KEY });
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
      const data = await this.angelOne.findAll({
        attributes: ["createdAt", "id"],
      });
      if (
        now.getDate() > currentDate.getDate() &&
        now.getHours() > currentDate.getHours()
      ) {
        const reGenratedata = await this.smart_api.generateSession(
          ANGEL_ONE_CLIENT_ID,
          ANGEL_ONE_PIN,
          this.generateTOTP()
        );
        const { jwtToken, refreshToken, feedToken } = reGenratedata.data;
        await data
          .update({
            feedToken: feedToken,
            refreshToken: refreshToken,
            jwtToken: jwtToken,
          })
          .then((data) => {
            logger.info("New Generated Added sucessfully");
          })
          .catch((error) => {
            logger.error(`there is error in Updating Data : ${error}`);
          });
      } else {
        logger.info("No there is no need for generating session");
      }
    } else {
      const sessionDetails = await this.smart_api.generateSession(
        ANGEL_ONE_CLIENT_ID,
        ANGEL_ONE_PIN,
        this.generateTOTP()
      );
      if (
        sessionDetails.status == true ||
        sessionDetails.message == "SUCCESS"
      ) {
        const { jwtToken, refreshToken, feedToken } = sessionDetails.data;
        const dataAddedinDatabase = await this.angelOne.create({
          broker: "angelOne",
          feedToken: feedToken,
          refreshToken: refreshToken,
          jwtToken: jwtToken,
        });
        if (dataAddedinDatabase) {
          logger.info("Credentials added in Databases 🔑");
        } else {
          logger.error("Error When Adding Credentials in database");
        }
      } else {
        logger.error(
          `Error When generateSession With AngelOne : ${sessionDetails.message}`
        );
      }
    }
  };

  public ScriptMaster = async () => {
    try {
      const count = await this.angelScript.count();
      if (!count) {
        const response = await fetch(
          "https://margincalculator.angelbroking.com/OpenAPI_File/files/OpenAPIScripMaster.json"
        );

        const data: any = await response.json();

        await this.angelScript.bulkCreate(data);
        logger.info("ScriptMaster Added !");
      } else {
        logger.info("Script Data Already added");
      }
    } catch (error) {
      logger.error("Error adding ScriptMaster:", error);
    }
  };

  constructor() {
    this.GenerateSession();
  }
}

export default AngelOneBoot;
