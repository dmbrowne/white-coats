import ApiBase from "./lib";

class ClinicApi extends ApiBase {
  constructor(jwt?: string) {
    super(jwt);
  }

  getAllClinics = () => this.fetch("/api/v1/clinics");

  getClinicById = (clinicId: string) => this.fetch(`/api/v1/clinics/${clinicId}`);

  getPatients = (clinicId: string) => this.fetch(`/api/v1/clinics/${clinicId}/patients`);
}

export default ClinicApi;
