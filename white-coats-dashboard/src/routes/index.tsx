import { Navigate, Route, Routes } from "react-router-dom";
import ClinicPatients from "./clinic-patients";
import Clinics from "./clinics";

function AppRoutes() {
  return (
    <div className="p-4">
      <Routes>
        <Route path="/" element={<Navigate replace={true} to="clinics" />} />
        <Route path="/clinics" element={<Clinics />} />
        <Route path="/clinics/:clinicId" element={<ClinicPatients />} />
      </Routes>
    </div>
  );
}

export default AppRoutes;
