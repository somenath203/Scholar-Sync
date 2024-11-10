'use server';

import primsaClientConfig from '@/prismaClientConfig';
import { getAuthUserDetails } from './authUserHelperDataFunc';


export const storeNewYtVideoData = async (data) => {

    try {

        const user = await getAuthUserDetails();

        await primsaClientConfig.essentialYoutubeLinks.create({
            data: {
                youtubeVideoName: data?.youtubeVideoName,
                youtubeVideoLink: data?.youtubeVideoLink,
                youtubeVideoDescription: data?.youtubeVideoDescription,
                emailOfTheProfileWhoStoredTheYoutubeLink: user?.email
            }
        });

        return {
            success: true,
            message: 'your youtube video data has been saved successfully'
        }
        
    } catch (error) {
        
        console.log(error);

        return {
            success: false,
            message: error?.message || 'Something went wrong. Please try again after sometime'
        }
        
    }

}


export const fetchAllEssentialYtVideosByTheUser = async () => {

    try {

        const user = await getAuthUserDetails();


        const allEssentialYtVideosCreatedByTheUser = await primsaClientConfig.essentialYoutubeLinks.findMany({
            where: {
                emailOfTheProfileWhoStoredTheYoutubeLink: user?.email
            }
        });
        

        return allEssentialYtVideosCreatedByTheUser;
        
    } catch (error) {
        
        return {
            success: false,
            message: error?.message || 'Something went wrong. Please try again after sometime'
        }

    }

}


export const deleteYtVideoById = async (id) => {
    
    try {

      await primsaClientConfig.essentialYoutubeLinks.delete({
        where: {
          id: id,
        },
      });
  
      return {
        success: true,
        message: "YouTube video data has been deleted successfully",
      };

    } catch (error) {

      console.log(error);
  
      return {
        success: false,
        message: error?.message || "Something went wrong. Please try again later",
      };

    }

};
  