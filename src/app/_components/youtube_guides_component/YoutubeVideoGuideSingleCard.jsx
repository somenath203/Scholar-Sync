'use client';

import { useState } from 'react';
import { FaTrashAlt } from "react-icons/fa";
import toast from 'react-hot-toast';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import YoutubeVideoDetailsModal from './YoutubeVideoDetailsModal';
import { deleteYtVideoById } from '@/server-actions/essentialYtVideosServerActions';


const YoutubeVideoGuideSingleCard = ({ videoTitle, videoDescription, videoLink, id, getAllEssentialYtVideosOfTheCurrentlyLoggedInUser }) => {


  const [ openYoutubeVideoDetailsModal, setOpenYoutubeVideoDetailsModal ] = useState(false);


  const deleteYtEssentialsVideoFunc = async () => {

    try {

      const response = await deleteYtVideoById(id);

      if (response?.success) {

        await getAllEssentialYtVideosOfTheCurrentlyLoggedInUser();

        toast.success(response?.message, { 
          duration: 5000,
          style: {
            background: '#333',
            color: '#fff',
          },
        });

      }
      
    } catch (error) {
      
      console.log(error);

      toast.error(error?.message, { 
        duration: 5000,
        style: {
          background: '#333',
          color: '#fff',
        },
      });
      
    }

  }
  
  
  return (
    <>

      <Card className="bg-gray-800 text-violet-400 shadow-lg border border-violet-800 text-center flex flex-col items-center text-xl">

      <CardHeader className="flex items-center justify-between w-full">
        
        <FaTrashAlt 
          className="text-red-500 text-base ml-auto cursor-pointer"
          onClick={deleteYtEssentialsVideoFunc}
        />

        <CardTitle className="font-semibold text-xl">
          {videoTitle.split(' ').length <= 2 ? videoTitle : videoTitle.split(' ').slice(0, 2).join(' ') + ' . . .'}
        </CardTitle>

      </CardHeader>

        <CardContent>

          <p className="text-white text-lg">{videoDescription.split(' ').length <= 4 ? videoDescription : videoDescription.split(' ').slice(0, 4).join(' ') + ' . . .'}</p>

        </CardContent>

        <CardFooter className='mt-2 w-full'>

          <Button 
            onClick={() => setOpenYoutubeVideoDetailsModal(true)} 
            className='w-full py-7 bg-violet-800 text-lg'
          >View Details</Button>

        </CardFooter>

      </Card>

      <YoutubeVideoDetailsModal
        videoTitle={videoTitle} 
        videoDescription={videoDescription}
        videoLink={videoLink}
        openYoutubeVideoDetailsModal={openYoutubeVideoDetailsModal} 
        setOpenYoutubeVideoDetailsModal={setOpenYoutubeVideoDetailsModal}
      />

    </>
  );
};

export default YoutubeVideoGuideSingleCard;
