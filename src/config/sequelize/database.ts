import { Sequelize } from "sequelize";

const database = new Sequelize("sqlite::memory:", { logging: false });

export default database;
