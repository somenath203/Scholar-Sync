'use client';

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import { FaBan } from "react-icons/fa";
import { BiLoaderCircle } from "react-icons/bi";

import { Separator } from "@/components/ui/separator";
import CreateComponent from "@/app/_components/all_purpose_component/CreateComponent";
import QnADrawerForm from "@/app/_components/qna_components/QnADrawerForm";
import { fetchAllTopTenQuestionsAnswersByTheUser } from "@/server-actions/topTenQuestionsAnswers";
import { fetchParticularUserByEmailId } from "@/server-actions/userServerActions";
import QnACards from "@/app/_components/qna_components/QnACards";


const Page = () => {
  

  const { user } = useKindeAuth();

  
  const [openCreateQnADrawer, setOpenCreateQnADrawer] = useState(false);

  const [ allQnAData, setAllQnAData ] = useState([]);

  const [ loadingQnAData, setLoadingQnAData ] = useState(false);

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


  const getAllTopTenQnAOfTheCurrentlyLoggedInUser = async () => {

    try {

      setLoadingQnAData(true);

      const allQnAs = await fetchAllTopTenQuestionsAnswersByTheUser();

      setAllQnAData(allQnAs.reverse());
      
      
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

      setLoadingQnAData(false);

    }

  }


  useEffect(() => {

    if(user) {

      getCurrentlyLoggedInUserDetails();

    }

  }, [user]);
  

  useEffect(() => {

    getAllTopTenQnAOfTheCurrentlyLoggedInUser();

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

          <p className="text-xl lg:text-2xl text-white mb-4">Generate QnA</p>


          <CreateComponent 
            text='Create 10 QnA' 
            setOpenDrawer={setOpenCreateQnADrawer}
            extraClasses='text-xl'
          />


          <Separator className="my-8" />


          <p className="text-xl lg:text-2xl text-center lg:text-left text-white mb-4">Your QnAs</p>

          <QnACards 
            allQnAData={allQnAData} 
            loadingAllQnAData={loadingQnAData}
            getAllTopTenQnAOfTheCurrentlyLoggedInUser={getAllTopTenQnAOfTheCurrentlyLoggedInUser}
          />

        </div>

      </div>

      <QnADrawerForm 
        openCreateQnADrawer={openCreateQnADrawer} 
        setOpenCreateQnADrawer={setOpenCreateQnADrawer}
        getAllTopTenQnAOfTheCurrentlyLoggedInUser={getAllTopTenQnAOfTheCurrentlyLoggedInUser}
      />

    </>
  );
}

export default Page;
