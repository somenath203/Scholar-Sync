'use client';

import { BiLoaderCircle } from "react-icons/bi";

import NoItemsFound from "../all_purpose_component/NoItemsFound";
import RoadmapSingleCard from "./RoadmapSingleCard";


const RoadmapCards = ({ allRoadmapData, loadingAllRoadmapData }) => {
  
  return (
    <div className="grid md:grid-cols-4 gap-6">
      
      {loadingAllRoadmapData ? <BiLoaderCircle className="text-5xl text-white transition-all animate-spin duration-1000" /> : allRoadmapData.length === 0 ? <NoItemsFound text='No Roadmap Data' textSize='xl' /> : allRoadmapData.map((roadmapData) => (

        <RoadmapSingleCard key={roadmapData.id} roadmapData={roadmapData} />

      ))}

    </div>
  );
};

export default RoadmapCards;
