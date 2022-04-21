import { faArrowLeft, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";

export default function Movie() {
  let params = useParams();
  return (
    <main className="h-screen container pl-32 bg-slate-100">
        <a href="/movies" className="mt-24 btn btn-xs rounded-lg mb-8"><FontAwesomeIcon className="mr-2" icon={faArrowLeft} /> Back</a>
        <div className="container flex flex-row">
            <img 
                src="https://flxt.tmsimg.com/assets/p15917262_b_v13_ad.jpg"
                className="h-96 w-auto" 
                alt="Movie"
            />
            <div className="container ml-8 relative">
                <h1 className="text-3xl font-bold">Narcos Mexico</h1>
                <h4 className="text-md opacity-50 mb-4">Recommended by Yigit Atak</h4>
                <p className="mb-4">Narcos: Mexico is an American crime drama streaming television series created and produced by Chris Brancato, Carlo Bernard, and Doug Miro that premiered on Netflix on November 16, 2018. Narcos: Mexico is an American crime drama streaming television series created and produced by Chris Brancato, Carlo Bernard, and Doug Miro that premiered on Netflix on November 16, 2018.  It was originally intended to be the fourth season of the Netflix series Narcos, but it was ultimately developed as a companion series.</p>
                <p className="opacity-50"><span className="font-bold">Directed by:</span> Carlo Bernard, Chris Brancato, Doug Miro</p>
                <div className="absolute right-40 bottom-20 text-center">
                    <h4 className="text-lg font-bold">Rating</h4>
                    <FontAwesomeIcon className="mr-1" icon={faStar} />
                    <FontAwesomeIcon className="mr-1" icon={faStar} />
                    <FontAwesomeIcon className="mr-1" icon={faStar} />
                    <FontAwesomeIcon className="mr-1" icon={faStar} />
                </div>
            </div>
        </div>
    </main>
  );
}