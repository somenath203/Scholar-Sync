'use server';

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";


export const getAuthUserDetails = async () => {

    try {

        const { getUser } = getKindeServerSession();

        const authUserDetails = await getUser();

        return authUserDetails;
        
    } catch (error) {
        
        console.log(error);

        return {
            success: true,
            message: error?.message || 'Something went wrong. Please try again after sometime'
        }

    }

}