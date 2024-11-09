'use client';

import { useState, useEffect } from "react";

import { Separator } from "@/components/ui/separator";
import CreateComponent from "@/app/_components/all_purpose_component/CreateComponent";
import RoadmapDrawerForm from "@/app/_components/roadmap_component/RoadmapDrawerForm";
import { fetchAllRoadmapsByTheUser } from "@/server-actions/roadmapServerActions";
import RoadmapCards from "@/app/_components/roadmap_component/RoadmapCards";


const Page = () => {

  const [openCreateRoadmapDrawer, setOpenCreateRoadmapDrawer] = useState(false);

  const [ allRoadmapData, setAllRoadmapData ] = useState([]);

  const [ loadingRoadmapData, setLoadingRoadmapData ] = useState(false);


  const getAllRoadmapOfTheCurrentlyLoggedInUser = async () => {

    try {

      setLoadingRoadmapData(true);

      const allRoadmaps = await fetchAllRoadmapsByTheUser();

      setAllRoadmapData(allRoadmaps.reverse());
      
      
    } catch (error) {
      
      console.log(error);
      
    } finally {

      setLoadingRoadmapData(false);

    }

  }

  useEffect(() => {

    getAllRoadmapOfTheCurrentlyLoggedInUser();

  }, []);


  return (
    <>
      <div className="text-white mt-36">

        <div className="w-11/12 mx-auto">

          <p className="text-xl lg:text-2xl text-white mb-4">Create Roadmap</p>


          <CreateComponent 
            text='Create Roadmap' 
            setOpenDrawer={setOpenCreateRoadmapDrawer}
            extraClasses='text-xl'
          />


          <Separator className="my-8" />

          <div>

            <p className="text-xl lg:text-2xl text-center lg:text-left text-white mb-4">Your Roadmaps</p>

            <RoadmapCards 
              allRoadmapData={allRoadmapData} 
              loadingAllRoadmapData={loadingRoadmapData}
            />

          </div>

        </div>

      </div>


      <RoadmapDrawerForm 
        openCreateRoadmapDrawer={openCreateRoadmapDrawer} 
        setOpenCreateRoadmapDrawer={setOpenCreateRoadmapDrawer}
        getAllRoadmapOfTheCurrentlyLoggedInUser={getAllRoadmapOfTheCurrentlyLoggedInUser}
      />

    </>
  );
}

export default Page;
