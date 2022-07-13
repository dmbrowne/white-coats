import { InferCreationAttributes, Sequelize } from "sequelize";
import Clinic, { init as initClinicModel } from "./clinic";
import Patient, { init as initPatientModel } from "./patient";

type InitDataFixtures = { patients: InferCreationAttributes<Patient>[]; clinics: InferCreationAttributes<Clinic>[] };

function init(sequelize: Sequelize) {
  [initClinicModel, initPatientModel].forEach((initModel) => initModel(sequelize));

  Clinic.hasMany(Patient, { foreignKey: "clinic_id" });
  Patient.belongsTo(Clinic, { foreignKey: "clinic_id" });
}

export function seed({ patients, clinics }: InitDataFixtures) {
  return Clinic.bulkCreate(clinics).then(() => patients.map(({ id, ...patient }) => Patient.create(patient)));
}

export default init;
