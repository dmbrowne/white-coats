import { Router } from "express";
import Clinic from "./models/clinic";
import Patient from "./models/patient";

const apiRoutes = Router();

apiRoutes.get("/clinics", (req, res) => {
  Clinic.findAll().then((clinics) => {
    res.send(clinics);
  });
});

apiRoutes.get("/clinics/:clinicId", (req, res) => {
  const clinicId = req.params.clinicId;
  Clinic.findByPk(clinicId).then((clinic) => {
    res.status(200).json(clinic);
  });
});

apiRoutes.get("/clinics/:clinicId/patients", async (req, res) => {
  const clinicId = req.params.clinicId;
  const clinic = await Clinic.findByPk(clinicId);
  if (!clinic) return res.status(404).json({ message: "Cannot find clinic with the provided ID" });
  clinic.getPatients().then((patients) => {
    res.status(200).json(patients);
  });
});

apiRoutes.get("/patient/:patientId", (req, res) => {
  const patientId = req.params.patientId;
  Patient.findByPk(patientId).then((patient) => {
    res.status(200).json(patient);
  });
});

export default apiRoutes;
