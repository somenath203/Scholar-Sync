'use server';

import primsaClientConfig from '@/prismaClientConfig';


export const fetchTotalNumberOfEssentialYtVideosTopTenQnARoadmaps = async () => {

    try {

        const totalNumberOfEssentialYtVideos = await primsaClientConfig.essentialYoutubeLinks.count();

        const totalNumberOfTopTenQnA = await primsaClientConfig.topTenQuestionsAnswers.count();

        const totalNumberOfRoadmaps = await primsaClientConfig.roadMap.count();

        return {
            success: true,
            totalNumberOfEssentialYtVideos: totalNumberOfEssentialYtVideos,
            totalNumberOfTopTenQnA: totalNumberOfTopTenQnA,
            totalNumberOfRoadmaps: totalNumberOfRoadmaps
        }
        
    } catch (error) {
        
        console.log(error);

        return {
            success: false,
            message: error?.message || 'Something went wrong. Please try again after sometime'
        }

    }

}


export const fetchAllAvailableUsers = async () => {

    try {

        const users = await primsaClientConfig.profile.findMany();

        return {
            success: true,
            users: users
        }

    } catch (error) {
        
        console.log(error);

        return {
            success: false,
            message: error?.message || 'Something went wrong. Please try again after sometime'
        }

    }
    
}


export const fetchAllTopTenQuestionsAnswersOfTheTargetUser = async (userEmail) => {

    try {


        const allTopTenQnA = await primsaClientConfig.topTenQuestionsAnswers.findMany({
            where: {
                emailOfTheProfileWhoGeneratedTopTenQnA: userEmail
            }
        });
            
    
        return {
            success: true,
            data: allTopTenQnA
        };
        
        
    } catch (error) {
        
        return {
            success: false,
            message: error?.message || 'Something went wrong. Please try again after sometime'
        }

    }

}


export const fetchAllEssentialytGuidesAnswersOfTheTargetUser = async (userEmail) => {

    try {


        const allEssentialYtGuides = await primsaClientConfig.essentialYoutubeLinks.findMany({
            where: {
                emailOfTheProfileWhoStoredTheYoutubeLink: userEmail
            }
        });
            
    
        return {
            success: true,
            data: allEssentialYtGuides
        };
        
        
    } catch (error) {
        
        return {
            success: false,
            message: error?.message || 'Something went wrong. Please try again after sometime'
        }

    }

}


export const fetchAllRoadmapsOfTheTargetUser = async (userEmail) => {

    try {


        const allRoadmaps = await primsaClientConfig.roadMap.findMany({
            where: {
                emailOfTheProfileWhoGeneratedRoadmap: userEmail
            }
        });
            
    
        return {
            success: true,
            data: allRoadmaps
        };
        
        
    } catch (error) {
        
        return {
            success: false,
            message: error?.message || 'Something went wrong. Please try again after sometime'
        }

    }

}


export const banUserByIdAndReason = async (id, banReason) => {

    try {

      const updatedUser = await primsaClientConfig.profile.update({
        where: {
          id: id,
        },
        data: {
          isBanned: true,
          banReason: banReason?.banReason
        },
      });
  
      return {
        success: true,
        data: updatedUser,
      };

    } catch (error) {

      console.log(error);

      return {
        success: false,
        message: error?.message || "Something went wrong, please try again",
      };

    }

};
  


export const unbanUserById = async (id) => {

    try {

      const updatedUser = await primsaClientConfig.profile.update({
        where: {
          id: id,
        },
        data: {
          isBanned: false,
          banReason: ''
        },
      });
  
      return {
        success: true,
        data: updatedUser,
      };

    } catch (error) {

      console.log(error);

      return {
        success: false,
        message: error?.message || "Something went wrong, please try again",
      };

    }

};
