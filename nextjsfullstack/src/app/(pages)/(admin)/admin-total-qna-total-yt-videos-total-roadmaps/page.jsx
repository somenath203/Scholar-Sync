'use client';

import { useEffect, useState } from "react";
import { BiLoaderCircle } from "react-icons/bi";
import toast from "react-hot-toast";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";

import { fetchTotalNumberOfEssentialYtVideosTopTenQnARoadmaps } from "@/server-actions/adminServerActions";
import CountCard from "@/app/_components/admin_component/CountCard";
import { fetchParticularUserByEmailId } from "@/server-actions/userServerActions";


const Page = () => {

    
    const { user } = useKindeAuth();


    const [ totalCounts, setTotalCounts ] = useState({});

    const [ loading, setLoading ] = useState(false);

    const [ currentlyLoggedInUserDetails, setCurrentlyLoggedInUserDetails ] = useState({});


    const getCurrentlyLoggedInUserDetails = async () => {

        try {

            const currentlyLoggedInUserDetails = await fetchParticularUserByEmailId(user?.email);

            if(currentlyLoggedInUserDetails?.success) {

                setCurrentlyLoggedInUserDetails(currentlyLoggedInUserDetails);

            }
            
            
        } catch (error) {

            console.log(error);

            toast.error(error?.message, { 
                duration: 8000,
                style: {
                  background: '#333',
                  color: '#fff',
                },
            });
            
        } finally {

            setLoading(false);

        }

    }


    const getTotalCountsOfEachContent = async () => {

        try {

            setLoading(true);
           
            const response = await fetchTotalNumberOfEssentialYtVideosTopTenQnARoadmaps();

            if (response?.success) {

                setTotalCounts(response);

            }

        } catch (error) {
            
            console.log(error);

            toast.error(error?.message, { 
                duration: 8000,
                style: {
                  background: '#333',
                  color: '#fff',
                },
            });
            
        } finally {

            setLoading(false);

        }

    }


    useEffect(() => {

        if (user) {

            getCurrentlyLoggedInUserDetails();

        }

    }, [user]);
    

    useEffect(() => {

        getTotalCountsOfEachContent();

    }, []);


    return (
        <div className="w-11/12 m-auto mt-40 lg:mt-32">

            <p className="text-center text-2xl lg:text-3xl text-violet-300 font-bold tracking-wider">Content Count Panel</p>

            {loading ? (

                <BiLoaderCircle className="text-5xl m-auto mt-8 text-white transition-all animate-spin duration-1000" />
            
            ) : (
                !currentlyLoggedInUserDetails?.data?.isAdmin ? (

                    <p className="text-center text-xl lg:text-2xl text-violet-500 font-bold tracking-wider mt-12 uppercase">
                        Access denied: You do not have permission to view this resource as you are not the admin
                    </p>

                ) : (

                    <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-5 mt-10">

                        <CountCard name='Roadmap' count={totalCounts?.totalNumberOfRoadmaps} />
                        
                        <CountCard name='QnA' count={totalCounts?.totalNumberOfTopTenQnA} />
                        
                        <CountCard name='Saved Yt Video' count={totalCounts?.totalNumberOfEssentialYtVideos} />
                    
                    </div>

                )
            )}

        </div>
    );

};


export default Page;
