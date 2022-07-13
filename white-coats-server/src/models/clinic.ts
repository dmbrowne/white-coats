import {
  Sequelize,
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  HasManyGetAssociationsMixin,
  NonAttribute,
} from "sequelize";
import Patient from "./patient";

class Clinic extends Model<InferAttributes<Clinic>, InferCreationAttributes<Clinic>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare getPatients: HasManyGetAssociationsMixin<Patient>;
  declare patients?: NonAttribute<Patient>;
}

export function init(sequelize: Sequelize) {
  Clinic.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { sequelize }
  );
}

export default Clinic;
