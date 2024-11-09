'use server';

import primsaClientConfig from '@/prismaClientConfig';


export const storeUserData = async (data) => {

    try {

      const existingUser = await primsaClientConfig.profile.findUnique({
        where: { email: data?.email },
      });
  

      if (!existingUser) {

        await primsaClientConfig.profile.create({
          data: {
            fullName: data?.fullName,
            email: data?.email,
            profilePicUrl: data?.profilePicUrl,
          },
        });
        
      } 

    } catch (error) {

        console.log(error);

        return {
            success: false,
            message: error?.message || 'Something went wrong. Please try again after sometime'
        }

    }

  }