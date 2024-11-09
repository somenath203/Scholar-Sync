'use client';

import { useState, useEffect } from "react";
import toast from "react-hot-toast";

import { Separator } from "@/components/ui/separator";
import CreateComponent from "@/app/_components/all_purpose_component/CreateComponent";
import YoutubeGuidesDrawerForm from "@/app/_components/youtube_guides_component/youtubeGuidesDrawerForm";
import YoutubeVideoGuideCards from "@/app/_components/youtube_guides_component/YoutubeVideoGuideCards";
import { fetchAllEssentialYtVideosByTheUser } from "@/server-actions/essentialYtVideosServerActions";


const Page = () => {


  const [ openCreateYoutubeLearningDrawer, setOpenCreateYoutubeLearningDrawer ] = useState(false);

  const [ allVideosData, setAllVideosData ] = useState([]);

  const [ loadingAllVideoData, setLoadingAllVideoData ] = useState(false);
  

  const getAllEssentialYtVideosOfTheCurrentlyLoggedInUser = async () => {

    try {

      setLoadingAllVideoData(true);

      const allEssentialYtVideos = await fetchAllEssentialYtVideosByTheUser();

      setAllVideosData(allEssentialYtVideos.reverse());
      
      
    } catch (error) {
      
      console.log(error);

      toast.error(error?.message, { 
        duration: 8000,
        style: {
          background: '#333',
          color: '#fff',
        },
      });
      
    } finally {

      setLoadingAllVideoData(false);

    }

  }

  useEffect(() => {

    getAllEssentialYtVideosOfTheCurrentlyLoggedInUser();

  }, []);

  return (
    <>
      <div className="text-white mt-36">

        <div className="w-11/12 mx-auto">
        

          <p className="text-xl lg:text-2xl text-white mb-4">Save Yt Guides</p>


          <CreateComponent 
            text='Save YouTube Learning' 
            setOpenDrawer={setOpenCreateYoutubeLearningDrawer}
            extraClasses='text-lg'
          />


          <Separator className="my-8" />

          <p className="text-xl lg:text-2xl text-center lg:text-left text-white mb-4">Your YouTube Study Collection</p>

          <YoutubeVideoGuideCards 
            allVideosData={allVideosData}
            loadingAllVideoData={loadingAllVideoData}
          />

        </div>

      </div>

      <YoutubeGuidesDrawerForm 
        openCreateYoutubeLearningDrawer={openCreateYoutubeLearningDrawer} 
        setOpenCreateYoutubeLearningDrawer={setOpenCreateYoutubeLearningDrawer}
        getAllEssentialYtVideosOfTheCurrentlyLoggedInUser={getAllEssentialYtVideosOfTheCurrentlyLoggedInUser}
      />
    
    </>
  );
}

export default Page;
