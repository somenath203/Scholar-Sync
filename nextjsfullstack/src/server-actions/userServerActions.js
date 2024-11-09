'use server';

import primsaClientConfig from '@/prismaClientConfig';


export const storeUserData = async (data) => {

  try {

    let userDetails = '';

    const existingUser = await primsaClientConfig.profile.findUnique({
      where: { email: data?.email },
    });
  

    if (!existingUser) {

      const userStored = await primsaClientConfig.profile.create({
        data: {
          fullName: data?.fullName,
          email: data?.email,
          profilePicUrl: data?.profilePicUrl,
        },
      });

      userDetails = userStored;
        
    } else {

      userDetails = existingUser;

    }

    return userDetails;


  } catch (error) {

    console.log(error);

    return {
        success: false,
        message: error?.message || 'Something went wrong. Please try again after sometime'
    }

  }

}


export const fetchParticularUserByEmailId = async (emailId) => {

  try {

      const user = await primsaClientConfig.profile.findUnique({
          where: {
              email: emailId
          }
      });

      return {
          success: true,
          data: user
      }
      
  } catch (error) {
      
      console.log(error);

      return {
          success: false,
          message: error?.message || 'something went wrong, please try again'
      }

  }

}


export const fetchParticularUserByItsId = async (id) => {

  try {

      const user = await primsaClientConfig.profile.findUnique({
          where: {
              id: id
          }
      });

      return {
          success: true,
          data: user
      }
      
  } catch (error) {
      
      console.log(error);

      return {
          success: false,
          message: error?.message || 'something went wrong, please try again'
      }

  }

}