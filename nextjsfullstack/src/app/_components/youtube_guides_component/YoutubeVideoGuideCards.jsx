'use client';

import { BiLoaderCircle } from "react-icons/bi";

import YoutubeVideoGuideSingleCard from './YoutubeVideoGuideSingleCard';
import NoItemsFound from "../all_purpose_component/NoItemsFound";


const YoutubeVideoGuideCards = ({ allVideosData, loadingAllVideoData }) => {
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      
      {loadingAllVideoData ? <BiLoaderCircle className="text-5xl text-white transition-all animate-spin duration-1000" /> : allVideosData.length === 0 ? <NoItemsFound text='No Saved Video Data' textSize='xl' /> : allVideosData.map((allVideoData) => (

        <YoutubeVideoGuideSingleCard 
          key={allVideoData.id}
          videoTitle={allVideoData.youtubeVideoName} 
          videoDescription={allVideoData.youtubeVideoDescription} 
          videoLink={allVideoData.youtubeVideoLink}
        />

      ))}

    </div>
  );
};

export default YoutubeVideoGuideCards;
