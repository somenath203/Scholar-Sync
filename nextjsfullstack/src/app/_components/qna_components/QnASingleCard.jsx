'use client';

import Link from 'next/link';

import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';


const QnASingleCard = ({ qnaId, qnaTitle }) => {

  return (
    <>

      <Card className="bg-gray-800 text-violet-400 shadow-lg border border-violet-800 text-center flex flex-col items-center text-xl">

        <CardHeader>
          <CardTitle className="font-semibold text-xl">{qnaTitle.split(' ').length <= 2 ? qnaTitle : qnaTitle.split(' ').slice(0, 2).join(' ') + ' . . .'}</CardTitle>
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