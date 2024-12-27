'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from "react-hot-toast";
import { useState } from 'react';

import NormalInput from '../form_inputs/NormalInput';
import TextAreaInput from '../form_inputs/TextAreaInput';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { storeNewYtVideoData } from '@/server-actions/essentialYtVideosServerActions';
import LoaderModal from '../all_purpose_component/LoaderModal';


const YoutubeGuidesDrawerForm = ({ openCreateYoutubeLearningDrawer, setOpenCreateYoutubeLearningDrawer, getAllEssentialYtVideosOfTheCurrentlyLoggedInUser }) => {


  const zodFormValidationSchema = z.object({
    youtubeVideoName: z.string().min(4, { message: 'video name should be of minimum of 4 characters' }),
    youtubeVideoLink: z.string().url({ message: 'valid URL is required' }),
    youtubeVideoDescription: z.string().min(4, { message: 'video description should be of minimum of 4 characters' })
  });
  


  const {register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(zodFormValidationSchema),
  });


  const [ loading, setLoading ] = useState(false);


  const onSubmitForm = async (data) => {

    try {

      setLoading(true);

      const response = await storeNewYtVideoData(data);

      if (response?.success) {

        toast.success(response?.message, { 
          duration: 5000,
          style: {
            background: '#333',
            color: '#fff',
          },
        });

        await getAllEssentialYtVideosOfTheCurrentlyLoggedInUser();

        setOpenCreateYoutubeLearningDrawer(false);

      }
      
    } catch (error) {

      console.log(error);

      setOpenCreateYoutubeLearningDrawer(false);

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

      <Drawer open={openCreateYoutubeLearningDrawer} onClose={() => setOpenCreateYoutubeLearningDrawer(false)}>

        <DrawerContent className="h-[85vh] flex flex-col">

          <div className="flex-none">

            <DrawerHeader>

              <DrawerTitle className="text-center">Save YouTube Study Guide</DrawerTitle>

              <DrawerDescription className="text-center">Help student save essential YouTube content for their academic journey</DrawerDescription>

            </DrawerHeader>

          </div>

          <div className="flex-1 overflow-y-auto px-4 mt-4">

            <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmitForm)}>

              <NormalInput
                type="text"
                label="Youtube Video Name"
                placeholder="enter the name of the youtube video"
                registerInput={register('youtubeVideoName')}
              />

              {errors.youtubeVideoName && (
                <p className="text-red-500 my-1">{errors.youtubeVideoName.message}</p>
              )}

              <NormalInput
                type="url"
                label="Youtube Video Link"
                placeholder="enter the link of the youtube video"
                registerInput={register('youtubeVideoLink')}
              />

              {errors.youtubeVideoLink && (
                <p className="text-red-500 my-1">{errors.youtubeVideoLink.message}</p>
              )}

              <TextAreaInput
                label="Youtube Video Description"
                placeholder="enter a short description of the youtube video"
                registerInput={register('youtubeVideoDescription')}
              />

              {errors.youtubeVideoDescription && (
                <p className="text-red-500 my-1">
                  {errors.youtubeVideoDescription.message}
                </p>
              )}


              <div className='flex flex-col gap-3 mb-3'>

                <Button type="submit">Submit</Button>

                <Button type="button" variant="outline" onClick={() => setOpenCreateYoutubeLearningDrawer(false)}>Cancel</Button>

              </div>


            </form>

          </div>

        </DrawerContent>

      </Drawer>

      <LoaderModal openLoaderModal={loading} setOpenLoaderModal={setLoading} loaderText='Saving Youtube Guide' />

    </>
  );
};

export default YoutubeGuidesDrawerForm;
