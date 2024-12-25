'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import NormalInput from '../form_inputs/NormalInput';
import { generateTopTenQuestionAnswer } from '@/server-actions/topTenQuestionsAnswers';
import LoaderModal from '../all_purpose_component/LoaderModal';


const QnADrawerForm = ({ openCreateQnADrawer, setOpenCreateQnADrawer, getAllTopTenQnAOfTheCurrentlyLoggedInUser }) => {


  const [ loading, setLoading ] = useState(false);

  const router = useRouter();


  const zodFormValidationSchema = z.object({
    topic: z.string().min(4, { message: "topic must be at least 4 characters long" }),
  });


  const {register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(zodFormValidationSchema),
  });


  const onSubmitForm = async (data) => {

    try {

      setLoading(true);

      const res = await generateTopTenQuestionAnswer(data);

      if(res?.success) {

        await getAllTopTenQnAOfTheCurrentlyLoggedInUser();

        setOpenCreateQnADrawer(false);

        toast.success(res?.message, { 
          duration: 5000,
          style: {
            background: '#333',
            color: '#fff',
          },
        });

        router.push(`view-particular-qna-details/${res?.data?.id}`);

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

    } finally {

      setLoading(false);

    }

  };


  return (
    <>

      <Drawer open={openCreateQnADrawer} onClose={() => setOpenCreateQnADrawer(false)}>

        <DrawerContent>

            <DrawerHeader>

              <DrawerTitle className="text-center">Generate QnA on any topic</DrawerTitle>

              <DrawerDescription className="text-center">Develop a set of 10 questions with corresponding answers on any selected topic.</DrawerDescription>

            </DrawerHeader>

          <div className="px-4 mt-4">

            <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmitForm)}>

              <NormalInput
                type="text"
                label="Topic"
                placeholder="write about the topic for which you would like to generate 10 questions and their corresponding answers"
                registerInput={register('topic')}
              />

              {errors.topic && (
                <p className="text-red-500">{errors.topic.message}</p>
              )}


              <div className='flex flex-col gap-3 mb-3'>

                <Button type="submit">Submit</Button>

                <Button variant="outline" onClick={() => setOpenCreateQnADrawer(false)}>Cancel</Button>

              </div>


            </form>

          </div>

        </DrawerContent>

      </Drawer>

      <LoaderModal openLoaderModal={loading} setOpenLoaderModal={setLoading} loaderText='Generating top 10 QnA' />

    </>
  );
};

export default QnADrawerForm;
