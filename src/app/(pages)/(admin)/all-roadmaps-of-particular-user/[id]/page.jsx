'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { BiLoaderCircle } from "react-icons/bi";
import toast from "react-hot-toast";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";

import { fetchParticularUserByEmailId, fetchParticularUserByItsId } from "@/server-actions/userServerActions";
import { fetchAllRoadmapsOfTheTargetUser } from "@/server-actions/adminServerActions";
import NoItemsFound from "@/app/_components/all_purpose_component/NoItemsFound";
import QnACards from "@/app/_components/qna_components/QnACards";
import RoadmapCards from "@/app/_components/roadmap_component/RoadmapCards";


const Page = () => {


    const { user } = useKindeAuth();

    const params = useParams();

    const id = params?.id;


    const [currentlyLoggedInUserDetails, setCurrentlyLoggedInUserDetails] = useState({});

    const [targertUserDetails, setTargetUserDetails] = useState({});

    const [allRoadmaps, setAllRoadmaps] = useState([]);

    const [loading, setLoading] = useState(true);

    const [loadingAllRoadmapData, setLoadingAllRoadmapData] = useState(false);


    const getCurrentlyLoggedInUserDetails = async () => {

        setLoading(true);

        try {

            const userDetails = await fetchParticularUserByEmailId(user?.email);

            if (userDetails?.success) {

                setCurrentlyLoggedInUserDetails(userDetails);

            }

        } catch (error) {

            console.log(error);

            toast.error(error?.message, {
                duration: 8000,
                style: { background: '#333', color: '#fff' },
            });

        } finally {

            setLoading(false);

        }

    };


    const fetchTargetUserDetails = async () => {

        setLoading(true);

        try {

            const userDetails = await fetchParticularUserByItsId(id);

            if (userDetails?.success) {

                setTargetUserDetails(userDetails);

            }

        } catch (error) {

            console.log(error);

            toast.error(error?.message || 'Failed to fetch target user details', {
                duration: 8000,
                style: { background: '#333', color: '#fff' },
            });

        } finally {

            setLoading(false);

        }

    };


    const fetchRoadmapsForTargetUser = async () => {

        setLoadingAllRoadmapData(true);

        try {

            if (targertUserDetails) {

                const roadmaps = await fetchAllRoadmapsOfTheTargetUser(targertUserDetails?.data?.email);
                
                if (roadmaps?.success) {

                    setAllRoadmaps(roadmaps?.data);  

                }
            }

        } catch (error) {

            console.log(error);

            toast.error(error?.message, {
                duration: 8000,
                style: { background: '#333', color: '#fff' },
            });

        } finally {

            setLoadingAllRoadmapData(false);

        }
    };

    useEffect(() => {

        if (user) {

            getCurrentlyLoggedInUserDetails();

        }

    }, [user]);


    useEffect(() => {

        if (id) {

            fetchTargetUserDetails();

        }

    }, [id]);


    useEffect(() => {

        if (targertUserDetails?.data?.email) {

            fetchRoadmapsForTargetUser();

        }

    }, [targertUserDetails]);


    return (
        <div className="w-11/12 m-auto mt-40 lg:mt-36">

            {loading ? (

                <BiLoaderCircle className="text-5xl m-auto mt-8 text-white transition-all animate-spin duration-1000" />
            
            ) : (
                !currentlyLoggedInUserDetails?.data?.isAdmin ? (

                    <p className="text-center text-xl lg:text-2xl text-violet-500 font-bold tracking-wider mt-12 uppercase">
                        Access denied: You do not have permission to view this resource as you are not the admin
                    </p>

                ) : (
                    loadingAllRoadmapData ? (

                        <BiLoaderCircle className="text-5xl m-auto mt-8 text-white transition-all animate-spin duration-1000" />
                    
                    ) : (
                        allRoadmaps?.length === 0 ? (

                            <NoItemsFound text='No Roadmaps found' textSize='xl' />

                        ) : (

                            <div className="flex flex-col gap-8">

                               <p className="text-xl lg:text-2xl text-center lg:text-left font-bold text-violet-400">{targertUserDetails?.data?.fullName}'s Roadmaps</p>

                                <RoadmapCards 
                                    allRoadmapData={allRoadmaps} 
                                    loadingAllRoadmapData={loadingAllRoadmapData}
                                />

                            </div>

                        )

                    )

                )

            )}

        </div>

    );

};


export default Page;