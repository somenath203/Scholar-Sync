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
import SelectInput from '../form_inputs/SelectInput';
import TextAreaInput from '../form_inputs/TextAreaInput';
import { createRoadMap } from '@/server-actions/roadmapServerActions';
import LoaderModal from '../all_purpose_component/LoaderModal';


const RoadmapDrawerForm = ({ openCreateRoadmapDrawer, setOpenCreateRoadmapDrawer, getAllRoadmapOfTheCurrentlyLoggedInUser }) => {
    

  const zodFormValidationSchema = z.object({
    studentSubjectName: z.string().min(4, { message: 'subject name must be at least 4 characters long' }),
    studentEducationLevel: z.enum(['Class 10 or below', 'Class 10 + 2', 'Undergraduate Degree', 'Postgraduate Degree'], { message: 'please select a valid education level' }),
    averageDailyStudyHours: z.coerce.number().positive({ message: 'average daily study hours must be a positive number' }).min(1, { message: 'average daily study hours must be at least 1' }).max(15, { message: 'average daily study hours cannot exceed 15' }),
    studentExamName: z.string().min(4, { message: 'exam name must be at least 4 characters long' }),
    daysRemainingUntilExam: z.coerce.number().positive({ message: 'days remaining must be a positive number' }),
    syllabusTopics: z.string().min(10, { message: 'syllabus topics must be at least 10 characters long' })
  });


  const {register, handleSubmit, control, formState: { errors }, reset } = useForm({
    resolver: zodResolver(zodFormValidationSchema),
  });


  const [ loading, setLoading ] = useState(false);

  const router = useRouter();


  const onSubmitForm = async (data) => {

    try {

      setLoading(true);

      const res = await createRoadMap(data);

      if(res?.success) {

        await getAllRoadmapOfTheCurrentlyLoggedInUser();

        setOpenCreateRoadmapDrawer(false);

        setLoading(false);

        toast.success(res?.message, { 
          duration: 5000,
          style: {
            background: '#333',
            color: '#fff',
          },
        });

        router.push(`view-particular-roadmap-details/${res?.data?.id}`);

      }

    } catch (error) {

      console.log(error);

      toast.success(error?.message, { 
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

      <Drawer open={openCreateRoadmapDrawer} onClose={() => setOpenCreateRoadmapDrawer(false)}>

        <DrawerContent className="h-[85vh] flex flex-col">

          <div className="flex-none">

            <DrawerHeader>

              <DrawerTitle className="text-center">Generate Personalized Roadmap</DrawerTitle>

              <DrawerDescription className="text-center">Plan and track student's journey step-by-step with a personalized roadmap designed to achieve your goals</DrawerDescription>
            
            </DrawerHeader>
          
          </div>

          <div className="flex-1 overflow-y-auto px-4 mt-4">

            <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmitForm)}>

              <NormalInput
                type="text"
                label="Student Subject Name"
                placeholder="enter the student's subject name"
                registerInput={register('studentSubjectName')}
              />

              {errors.studentSubjectName && (
                <p className="text-red-500">{errors.studentSubjectName.message}</p>
              )}


              <SelectInput
                label="Student Education Level"
                placeholder="select student's current education level"
                name='studentEducationLevel'
                control={control}
              />

              {errors.studentEducationLevel && (
                <p className="text-red-500">{errors.studentEducationLevel.message}</p>
              )}


              <NormalInput
                type="number"
                label="Student Average Daily Study Hours"
                placeholder="enter the number of hours the student typically studies each day"
                registerInput={register('averageDailyStudyHours')}
              />

              {errors.averageDailyStudyHours && (
                <p className="text-red-500">{errors.averageDailyStudyHours.message}</p>
              )}


              <NormalInput
                type="text"
                label="Student Exam Name"
                placeholder="enter the student's exam name"
                registerInput={register('studentExamName')}
              />

              {errors.studentExamName && (
                <p className="text-red-500">{errors.studentExamName.message}</p>
              )}


              <NormalInput
                type="number"
                label="Days Remaining Until Subject Exam"
                placeholder="enter the number of days left until the student's exam"
                registerInput={register('daysRemainingUntilExam')}
              />

              {errors.daysRemainingUntilExam && (
                <p className="text-red-500">{errors.daysRemainingUntilExam.message}</p>
              )}


              <TextAreaInput
                label="Student Syllabus Topics for the Subject"
                placeholder="list all topics from the syllabus in detail for the student"
                registerInput={register('syllabusTopics')}
              />

              {errors.syllabusTopics && (
                <p className="text-red-500">{errors.syllabusTopics.message}</p>
              )}


              <div className='flex flex-col gap-3 mb-3'>

                <Button type="submit">Submit</Button>

                <Button variant="outline" onClick={() => setOpenCreateRoadmapDrawer(false)}>Cancel</Button>

              </div>


            </form>

          </div>

        </DrawerContent>

      </Drawer>

      <LoaderModal openLoaderModal={loading} setOpenLoaderModal={setLoading} loaderText='Generating Personalized Roadmap' />

    </>
  );
};

export default RoadmapDrawerForm;
