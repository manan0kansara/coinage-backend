import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import { logger,stream } from '@utils/logger';
import {connect,set} from 'mongoose';
import {NODE_ENV,PORT} from '@config';
import DB from '@/databases/postgres';
import { dbConnection } from './databases/mongodb';
import AngelOneBoot from '@/boot/angelOne';
import Websocket from './liveData';

class App {
    public app:express.Application;
    public env: string;
    public port: string | number;
    
    constructor() {
        this.app = express();
        this.env = NODE_ENV || 'development';
        this.port = PORT || 3000;

        this.connectToDatabase();
        const angel = new AngelOneBoot();
        angel.ScriptMaster()
        const websocket = new Websocket();
        websocket.connect();
    }

    

    public listen() {
        this.app.listen(this.port,()=>{
            logger.info(`=================================`);
            logger.info(`======= ENV: ${this.env} =======`);
            logger.info(`🚀 App listening on the port ${this.port}`);
            logger.info(`=================================`);
        })
    }

    public getServer() {
        return this.app;
    }

    private connectToDatabase() {
        DB.sequelize.sync({force:false}).then((data) =>{
            logger.info("Postgres connected Sucessfully ❤️")
        });

        if(this.env !== 'production'){
            set('debug',true);
        }

        connect(dbConnection.url).then((data) => {
            logger.info("Mongoose Connected Sucessfully ❤️")
        });

    }

}

export default App;