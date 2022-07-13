import React, { useMemo, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import useClinics from "../hooks/use-clinics";

function ClinicPatients() {
  const { clinicId } = useParams<{ clinicId: string }>();
  const [orderColumn, setOrderColumn] = useState("id");
  const [isAscending, setIsAscending] = useState(true);
  const { getClinicById, getPatients } = useClinics();
  const clinicQuery = useQuery(["clinic", clinicId], () => {
    if (!clinicId) throw new Error("Clinic Id not found in url");
    return getClinicById(clinicId);
  });
  const patientsQuery = useQuery(["clinicPatients", clinicId], () => {
    if (!clinicId) throw new Error("Clinic Id not found in url");
    return getPatients(clinicId);
  });

  const patientList = useMemo(() => {
    const patients = patientsQuery.data;
    if (!patients || !patients.length) return [];
    return patients.sort((a: any, b: any) => {
      const aValue = a[orderColumn];
      const bValue = b[orderColumn];
      if (aValue > bValue) return !!isAscending ? -1 : 1;
      if (aValue < bValue) return !!isAscending ? 1 : -1;
      return 0;
    });
  }, [orderColumn, isAscending, patientsQuery.data]);

  const setOrder = (column: string) => () => {
    if (orderColumn === column) setIsAscending(!isAscending);
    setOrderColumn(column);
  };

  return (
    <div>
      <div className="prose">
        <h1>{clinicQuery.data?.name ?? ""}</h1>
      </div>
      <div className="overflow-x-auto mt-24">
        <table className="table w-full">
          <thead>
            <tr>
              <th className="cursor-pointer" onClick={setOrder("id")}>
                id
              </th>
              <th className="cursor-pointer" onClick={setOrder("first_name")}>
                First name
              </th>
              <th className="cursor-pointer" onClick={setOrder("last_name")}>
                Last name
              </th>
              <th className="cursor-pointer" onClick={setOrder("date_of_birth")}>
                Date of birth
              </th>
            </tr>
          </thead>
          <tbody>
            {patientList.map((patient: any) => (
              <tr key={patient.id}>
                <th>{patient.id}</th>
                <td>{patient.first_name}</td>
                <td>{patient.last_name}</td>
                <td>{patient.date_of_birth}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ClinicPatients;
