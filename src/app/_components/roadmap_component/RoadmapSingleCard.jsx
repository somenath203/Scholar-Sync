'use client';

import Link from 'next/link';
import toast from 'react-hot-toast';
import { FaTrashAlt } from "react-icons/fa";

import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { deleteRoadmapById } from '@/server-actions/roadmapServerActions';


const RoadmapSingleCard = ({ roadmapData, getAllRoadmapOfTheCurrentlyLoggedInUser }) => {


  const parsedRoadmapData = {
    ...roadmapData, 
    responseFromModel: JSON.parse(roadmapData?.responseFromModel), 
  };


  const deleteRoadmapFunc = async () => {

    try {

      const response = await deleteRoadmapById(roadmapData.id);

      if (response?.success) {

        await getAllRoadmapOfTheCurrentlyLoggedInUser();

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
            onClick={deleteRoadmapFunc}
          />
          
          <CardTitle className="font-semibold text-xl">
            {parsedRoadmapData?.responseFromModel?.title?.split(' ').length <= 2 ? parsedRoadmapData?.responseFromModel?.title : parsedRoadmapData?.responseFromModel?.title?.split(' ').slice(0, 2).join(' ') + ' . . .'}
          </CardTitle>
        
        </CardHeader>

        <CardFooter className='mt-2 w-full'>

          <Link href={`/view-particular-roadmap-details/${parsedRoadmapData?.id}`} className='w-full'>

            <Button className='w-full py-7 bg-violet-800 text-lg'>View Details</Button>

          </Link>

        </CardFooter>

      </Card>

    </>
  );
};

export default RoadmapSingleCard;
