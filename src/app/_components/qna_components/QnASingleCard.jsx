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
import { deleteTopTenQnAById } from '@/server-actions/topTenQuestionsAnswers';


const QnASingleCard = ({ qnaId, qnaTitle, getAllTopTenQnAOfTheCurrentlyLoggedInUser }) => {


  const deleteTopTenQnAFunc = async () => {

    try {

      const response = await deleteTopTenQnAById(qnaId);

      if (response?.success) {

        await getAllTopTenQnAOfTheCurrentlyLoggedInUser();

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
            onClick={deleteTopTenQnAFunc}
          />
          
          <CardTitle className="font-semibold text-xl">
            {qnaTitle.split(' ').length <= 2 ? qnaTitle : qnaTitle.split(' ').slice(0, 2).join(' ') + ' . . .'}
          </CardTitle>
        
        </CardHeader>

        <CardFooter className='mt-2 w-full'>

          <Link href={`/view-particular-qna-details/${qnaId}`} className='w-full'>

            <Button className='w-full py-7 bg-violet-800 text-lg'>View Details</Button>

          </Link>

        </CardFooter>

      </Card>

    </>
  );
};

export default QnASingleCard;
