'use client';

import { useState, useEffect } from "react";
import toast from "react-hot-toast";

import { Separator } from "@/components/ui/separator";
import CreateComponent from "@/app/_components/all_purpose_component/CreateComponent";
import QnADrawerForm from "@/app/_components/qna_components/QnADrawerForm";
import { fetchAllTopTenQuestionsAnswersByTheUser } from "@/server-actions/topTenQuestionsAnswers";
import QnACards from "@/app/_components/qna_components/QnACards";


const Page = () => {

  const [openCreateQnADrawer, setOpenCreateQnADrawer] = useState(false);

  const [ allQnAData, setAllQnAData ] = useState([]);

  const [ loadingQnAData, setLoadingQnAData ] = useState(false);


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

    getAllTopTenQnAOfTheCurrentlyLoggedInUser();

  }, []);


  return (
    <>
      <div className="text-white mt-36">

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
