'use client';

import { BiLoaderCircle } from "react-icons/bi";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";

import NoItemsFound from "../all_purpose_component/NoItemsFound";
import QnASingleCard from "./QnASingleCard";
import { Button } from "@/components/ui/button";


const QnACards = ({ allQnAData, loadingAllQnAData, getAllTopTenQnAOfTheCurrentlyLoggedInUser }) => {


  const [page, setPage] = useState(1);


  return (
    <>

      {allQnAData.length !== 0 && <div className="w-full flex items-center justify-center lg:justify-start gap-3">

        <Button 
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >

          <FaArrowLeft 
            className="text-2xl text-violet-300"
          />

        </Button>

        <p className='text-violet-300 text-2xl font-bold my-8'>{page} / {Math.ceil(allQnAData.length / 3)}</p>

        <Button 
          disabled={page === Math.ceil(allQnAData.length / 3)}
          onClick={() => setPage(page + 1)}
        >

          <FaArrowRight className="text-2xl text-violet-300" />

        </Button>
      
      </div>}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
 
        {loadingAllQnAData ? <BiLoaderCircle className="text-5xl text-white transition-all animate-spin duration-1000" /> : allQnAData.length === 0 ? <NoItemsFound text='No QnA Data' textSize='xl' /> : allQnAData.slice(page * 3 - 3, page * 3).map((qnaData) => (

          <QnASingleCard 
            key={qnaData.id} 
            getAllTopTenQnAOfTheCurrentlyLoggedInUser={getAllTopTenQnAOfTheCurrentlyLoggedInUser}
            qnaId={qnaData.id} 
            qnaTitle={qnaData.topic}
          />

        ))}

      </div>

    </>
  );
};

export default QnACards;
