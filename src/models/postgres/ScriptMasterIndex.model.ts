import {ScriptMaster} from '@/interface/scriptMaster.model';
import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
export type IndexScriptCreationAttributes = Optional<ScriptMaster, 'exch_seg' | 'expiry' | 'id' | 'instrumenttype' | 'lotsize' | 'strike' | 'symbol' | 'tick_size' | 'token'>;
export class IndexscriptModel extends Model<ScriptMaster,IndexScriptCreationAttributes> implements ScriptMaster {
    public id:string;
    public token:string;
    public symbol: string;
    public expiry: string;
    public strike: string;
    public lotsize: string;
    public instrumenttype: string;
    public exch_seg: string;
    public tick_size: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export default function (sequelize:Sequelize): typeof IndexscriptModel {
    IndexscriptModel.init({
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey:true,
            allowNull: false
        },
        token: {
            type: DataTypes.STRING,
            allowNull: true
        },
        symbol: {
            type: DataTypes.STRING,
            allowNull: true
        },
        expiry: {
            type : DataTypes.STRING,
            allowNull: true
        },
        strike: {
            type: DataTypes.STRING,
            allowNull: true
        },
        lotsize: {
            type: DataTypes.STRING,
            allowNull: true
        },
        instrumenttype: {
            type: DataTypes.STRING,
            allowNull: true
        },
        exch_seg: {
            type: DataTypes.STRING,
            allowNull: true
        },
        tick_size: {
            type: DataTypes.STRING,
            allowNull: true
        },

    },{
        tableName: 'Index',
        sequelize
    });
    return IndexscriptModel;
}