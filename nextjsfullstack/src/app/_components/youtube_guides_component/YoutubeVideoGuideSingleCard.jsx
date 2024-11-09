'use client';

import { useState } from 'react';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import YoutubeVideoDetailsModal from './YoutubeVideoDetailsModal';


const YoutubeVideoGuideSingleCard = ({ videoTitle, videoDescription, videoLink }) => {


  const [ openYoutubeVideoDetailsModal, setOpenYoutubeVideoDetailsModal ] = useState(false);
  
  
  return (
    <>

      <Card className="bg-gray-800 text-violet-400 shadow-lg border border-violet-800 text-center flex flex-col items-center text-xl">

        <CardHeader>
          <CardTitle className="font-semibold text-xl">{videoTitle.split(' ').length <= 2 ? videoTitle : videoTitle.split(' ').slice(0, 2).join(' ') + ' . . .'}</CardTitle>
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
