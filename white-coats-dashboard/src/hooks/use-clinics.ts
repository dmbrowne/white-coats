import ClinicApi from "../api/clinics";

function useClinics() {
  // Do something here like get user from localstorage, or auth context etc
  // const {user} = useContext(AuthContext);
  const clinicApi = new ClinicApi(/* user?.jwt */);
  return {
    ...clinicApi,
  };
}

export default useClinics;
