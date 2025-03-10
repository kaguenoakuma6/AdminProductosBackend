import { Sequelize } from "sequelize-typescript";
import dotenv from 'dotenv';

dotenv.config();

const db = new Sequelize(process.env.POSTGRE_URL!, {
    models: [__dirname + '/../models/**/*'],
    logging: false
});

export default db;