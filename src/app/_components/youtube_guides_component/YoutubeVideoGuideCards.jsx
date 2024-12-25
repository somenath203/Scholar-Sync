'use client';

import { BiLoaderCircle } from "react-icons/bi";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";

import YoutubeVideoGuideSingleCard from './YoutubeVideoGuideSingleCard';
import NoItemsFound from "../all_purpose_component/NoItemsFound";
import { Button } from "@/components/ui/button";


const YoutubeVideoGuideCards = ({ allVideosData, loadingAllVideoData, getAllEssentialYtVideosOfTheCurrentlyLoggedInUser }) => {
  

  const [page, setPage] = useState(1);


  return (
    <>
     
      {allVideosData.length !== 0 && <div className="w-full flex items-center justify-center lg:justify-start gap-3">

        <Button 
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >

          <FaArrowLeft 
            className="text-2xl text-violet-300"
          />

        </Button>

        <p className='text-violet-300 text-2xl font-bold my-8'>{page} / {Math.ceil(allVideosData.length / 3)}</p>

        <Button 
          disabled={page === Math.ceil(allVideosData.length / 3)}
          onClick={() => setPage(page + 1)}
        >

          <FaArrowRight className="text-2xl text-violet-300" />

        </Button>

      </div>}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {loadingAllVideoData ? <BiLoaderCircle className="text-5xl text-white transition-all animate-spin duration-1000" /> : allVideosData.length === 0 ? <NoItemsFound text='No Saved Yt Video Data' textSize='xl' /> : allVideosData.slice(page * 3 - 3, page * 3).map((allVideoData) => (

          <YoutubeVideoGuideSingleCard 
            key={allVideoData.id}
            id={allVideoData?.id}
            videoTitle={allVideoData.youtubeVideoName} 
            videoDescription={allVideoData.youtubeVideoDescription} 
            videoLink={allVideoData.youtubeVideoLink}
            getAllEssentialYtVideosOfTheCurrentlyLoggedInUser={getAllEssentialYtVideosOfTheCurrentlyLoggedInUser}
          />

        ))}

      </div>

    </>
  );
};

export default YoutubeVideoGuideCards;
