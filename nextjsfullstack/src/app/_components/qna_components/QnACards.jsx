'use client';

import { BiLoaderCircle } from "react-icons/bi";

import NoItemsFound from "../all_purpose_component/NoItemsFound";
import QnASingleCard from "./QnASingleCard";


const QnACards = ({ allQnAData, loadingAllQnAData }) => {
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      
      {loadingAllQnAData ? <BiLoaderCircle className="text-5xl text-white transition-all animate-spin duration-1000" /> : allQnAData.length === 0 ? <NoItemsFound text='No QnA Data' textSize='xl' /> : allQnAData.map((qnaData) => (

        <QnASingleCard 
          key={qnaData.id} 
          qnaId={qnaData.id} 
          qnaTitle={qnaData.topic}
        />

      ))}

    </div>
  );
};

export default QnACards;
