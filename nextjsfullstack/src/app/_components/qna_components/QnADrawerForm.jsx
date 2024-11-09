'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';

import NormalInput from '../form_inputs/NormalInput';
import TextAreaInput from '../form_inputs/TextAreaInput';


const QnADrawerForm = ({ openCreateQnADrawer, setOpenCreateQnADrawer }) => {


  const zodFormValidationSchema = z.object({
    topicName: z.string().min(4, { message: "topic name must be at least 4 characters long" }),
    topicDescription: z.string().min(10, { message: "description must be at least 10 characters long" }),
  });


  const {register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(zodFormValidationSchema),
  });


  const onSubmitForm = async (data) => {

    try {

      console.log(data);

    } catch (error) {

      console.log(error);

    } finally {

    }

  };


  return (
    <Drawer open={openCreateQnADrawer} onClose={() => setOpenCreateQnADrawer(false)}>

      <DrawerContent className="h-[85vh] flex flex-col">

        <div className="flex-none">

          <DrawerHeader>

            <DrawerTitle className="text-center">Generate QnA on any topic</DrawerTitle>

            <DrawerDescription className="text-center">Develop a set of 10 questions with corresponding answers on any selected topic.</DrawerDescription>

          </DrawerHeader>

        </div>


        <div className="flex-1 overflow-y-auto px-4 mt-4">

          <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmitForm)}>

            <NormalInput
              type="text"
              label="Topic Name"
              placeholder="enter the topic name for which you would like to generate questions and their corresponding answers"
              registerInput={register('topicName')}
            />

            {errors.topicName && (
              <p className="text-red-500">{errors.topicName.message}</p>
            )}


            <TextAreaInput
              label="Topic Description"
              placeholder="provide a detailed description of the topic to help generate accurate questions and answers"
              registerInput={register('topicDescription')}
            />
            
            {errors.topicDescription && (
              <p className="text-red-500">{errors.topicDescription.message}</p>
            )}


            <div className='flex flex-col gap-3 mb-3'>

              <Button type="submit">Submit</Button>

              <Button variant="outline" onClick={() => setOpenCreateQnADrawer(false)}>Cancel</Button>

            </div>


          </form>

        </div>

      </DrawerContent>
      
    </Drawer>
  );
};

export default QnADrawerForm;
