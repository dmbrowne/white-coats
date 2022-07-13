import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/spinner";
import useClinics from "../hooks/use-clinics";

function Clinics() {
  const naivgate = useNavigate();
  const { getAllClinics } = useClinics();
  const clinicsQuery = useQuery("allClinics", getAllClinics);

  return (
    <div>
      <div className="prose">
        <h1>Clinics</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {clinicsQuery.isLoading && <Spinner />}
        {clinicsQuery.isSuccess &&
          clinicsQuery.data.map((clinic: any) => (
            <div className="card w-94 bg-base-100 shadow-xl" key={clinic.id}>
              <div className="card-body">
                <h2 className="card-title">{(clinic as any).name}</h2>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary" onClick={() => naivgate(`/clinics/${clinic.id}`)}>
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Clinics;
