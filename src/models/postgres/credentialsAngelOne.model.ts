import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import {credentialsAngelOne} from '@/interface/credentials.model';

export type AngelOneCredentialsCreationAttributes = Optional<credentialsAngelOne,'broker'| 'feedToken' | 'id'| 'jwtToken' | 'refreshToken'>;
export class AngelOneCredentialsModels extends Model<credentialsAngelOne,AngelOneCredentialsCreationAttributes> implements credentialsAngelOne{
    public id:string;
    public broker:string;
    public feedToken:string;
    public jwtToken: string;
    public refreshToken: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export default function (sequelize:Sequelize): typeof AngelOneCredentialsModels {
    AngelOneCredentialsModels.init({
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey:true,
            allowNull: false
        },
        broker: {
            type: DataTypes.STRING,
            allowNull:false
        },
        feedToken: {
            type: DataTypes.TEXT,
            allowNull:false
        },
        jwtToken: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        refreshToken: {
            type: DataTypes.TEXT,
            allowNull: false
        },
    },{
        tableName: 'AngelOneCredential',
        sequelize
    },
    );
    return AngelOneCredentialsModels;
}