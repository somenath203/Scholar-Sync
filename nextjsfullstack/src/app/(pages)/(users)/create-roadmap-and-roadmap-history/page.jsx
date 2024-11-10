'use client';

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import { FaBan } from "react-icons/fa";
import { BiLoaderCircle } from "react-icons/bi";

import { Separator } from "@/components/ui/separator";
import CreateComponent from "@/app/_components/all_purpose_component/CreateComponent";
import RoadmapDrawerForm from "@/app/_components/roadmap_component/RoadmapDrawerForm";
import { fetchAllRoadmapsByTheUser } from "@/server-actions/roadmapServerActions";
import { fetchParticularUserByEmailId } from "@/server-actions/userServerActions";
import RoadmapCards from "@/app/_components/roadmap_component/RoadmapCards";


const Page = () => {


  const { user } = useKindeAuth();


  const [openCreateRoadmapDrawer, setOpenCreateRoadmapDrawer] = useState(false);

  const [ allRoadmapData, setAllRoadmapData ] = useState([]);

  const [ loadingRoadmapData, setLoadingRoadmapData ] = useState(false);

  const [ loadingCurrentlyLoggedInUserData, setLoadingCurrentlyLoggedInUserData ] = useState(false);

  const [currentlyLoggedInUserDetails, setCurrentlyLoggedInUserDetails] = useState({});


  const getCurrentlyLoggedInUserDetails = async () => {

    try {

      setLoadingCurrentlyLoggedInUserData(true);

      const userDetails = await fetchParticularUserByEmailId(user?.email);

      console.log(userDetails);
      

      if (userDetails?.success) {

        setCurrentlyLoggedInUserDetails(userDetails);

      }

    } catch (error) {

      console.log(error);

      toast.error(error?.message, {
          duration: 8000,
          style: { background: '#333', color: '#fff' },
      });

    } finally {

      setLoadingCurrentlyLoggedInUserData(false);

    }

  };


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

    if(user) {

      getCurrentlyLoggedInUserDetails();

    }

  }, [user]);


  useEffect(() => {

    getAllRoadmapOfTheCurrentlyLoggedInUser();

  }, []);


  return (
    loadingCurrentlyLoggedInUserData ? <div className="text-white mt-44 w-11/12 mx-auto">

      <BiLoaderCircle className="text-5xl text-white transition-all animate-spin duration-1000" />

    </div> : currentlyLoggedInUserDetails?.data?.isBanned ? <div className="text-white mt-44 lg:mt-36">

      <div className="w-11/12 mt-44 mx-auto flex flex-col gap-4 items-center justify-center text-center">

        <FaBan className="text-6xl text-red-400" />
        
        <p className="text-xl text-violet-200 font-bold">
          Your account has been banned by the administrator. Please check your profile for details about the suspension reason.
        </p>

        <p className="mt-2 italic">
          For assistance with this matter, please contact the administrator at <span className="underline">admin@gmail.com</span>
        </p>
      
      </div>

    </div> : <>
      <div className="text-white mt-44 lg:mt-36">

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
              getAllRoadmapOfTheCurrentlyLoggedInUser={getAllRoadmapOfTheCurrentlyLoggedInUser}
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
