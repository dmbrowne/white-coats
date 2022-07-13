import fs from "fs";
import path from "path";

type CSVClinic = { id: number; name: string };
export function getClinics() {
  return new Promise<CSVClinic[]>((resolve, reject) => {
    fs.readFile(path.join(__dirname, "clinics.csv"), "utf8", (err, data) => {
      if (err) return reject(err.message);
      const csvJson = csvToJson<CSVClinic>(data);
      resolve(csvJson);
    });
  });
}

type CSVPatient = { id: number; clinic_id: number; first_name: string; last_name: string; date_of_birth: Date };
export function getPatients() {
  const promises = [path.join(__dirname, "patients-1.csv"), path.join(__dirname, "patients-2.csv")].map((filePath) => {
    return new Promise<CSVPatient[]>((resolve, reject) => {
      fs.readFile(filePath, "utf8", (err, data) => {
        if (err) return reject(err.message);
        const csvJson = csvToJson<Omit<CSVPatient, "date_of_birth"> & { date_of_birth: string }>(data);
        resolve(csvJson.map(({ date_of_birth, ...rest }) => ({ ...rest, date_of_birth: new Date(date_of_birth) })));
      });
    });
  });
  return Promise.all(promises).then(([patientSet1, patientSet2]) => [...patientSet1, ...patientSet2]);
}

function csvToJson<R extends { [key: string]: any }>(csv: string) {
  const [topRow, ...rows] = csv.slice(0, csv.length - 2).split("\n");
  const headers = topRow.split(",");
  return rows.map((row) => {
    return row.split(",").reduce(
      (accum, value, idx) => ({
        ...accum,
        [headers[idx]]: value,
      }),
      {} as R
    );
  });
}
