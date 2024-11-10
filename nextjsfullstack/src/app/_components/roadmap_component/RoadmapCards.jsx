'use client';

import { BiLoaderCircle } from "react-icons/bi";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";

import NoItemsFound from "../all_purpose_component/NoItemsFound";
import RoadmapSingleCard from "./RoadmapSingleCard";
import { Button } from "@/components/ui/button";


const RoadmapCards = ({ allRoadmapData, loadingAllRoadmapData, getAllRoadmapOfTheCurrentlyLoggedInUser }) => {


  const [page, setPage] = useState(1);
  
  
  return (
    <>
     
      <div className="w-full flex items-center justify-center lg:justify-start gap-3">

        <Button 
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >

          <FaArrowLeft 
            className="text-2xl text-violet-300"
          />

        </Button>

        <p className='text-violet-300 text-2xl font-bold my-8'>{page} / {Math.ceil(allRoadmapData.length / 3)}</p>

        <Button 
          disabled={page === Math.ceil(allRoadmapData.length / 3)}
          onClick={() => setPage(page + 1)}
        >

          <FaArrowRight className="text-2xl text-violet-300" />

        </Button>
      
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {loadingAllRoadmapData ? <BiLoaderCircle className="text-5xl text-white transition-all animate-spin duration-1000" /> : allRoadmapData.length === 0 ? <NoItemsFound text='No Roadmap Data' textSize='xl' /> : allRoadmapData.slice(page * 3 - 3, page * 3).map((roadmapData) => (

          <RoadmapSingleCard 
            key={roadmapData.id}
            roadmapData={roadmapData}
            getAllRoadmapOfTheCurrentlyLoggedInUser={getAllRoadmapOfTheCurrentlyLoggedInUser}
          />

        ))}

      </div>

    </>
  );
};

export default RoadmapCards;
