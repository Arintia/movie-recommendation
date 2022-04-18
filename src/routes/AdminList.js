import { useSelector } from "react-redux";
import AdminCard from "../components/AdminCard/AdminCard";

export default function AdminList() {
  const adminItems = useSelector(state => state.movies.adminItems);
  return (
    <main className="flex flex-col justify-center pt-12 w-screen h-screen bg-slate-100 text-center">
      <div className="container">
        <h2 className="text-3xl font-bold mb-6">Recommendation List</h2>
      </div>
      <div className="overflow-x-auto w-full max-w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Recommended Information</th>
              <th>Description</th>
              <th>Director</th>
              <th>Rating</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {adminItems.map(movie => 
              <AdminCard 
                key={movie.id}
                imgUrl={movie.imgUrl}
                title={movie.title}
                director={movie.director}
                description={movie.shortDesc}
                rating={movie.rating}
                recommendedBy={movie.recommendedBy}
              />
            )}
            
          </tbody>
        </table>
      </div>
    </main>
  );
}