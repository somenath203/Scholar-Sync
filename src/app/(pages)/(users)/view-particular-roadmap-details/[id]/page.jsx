'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ImSpinner7 } from "react-icons/im";
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import toast from "react-hot-toast";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import { FaBan } from "react-icons/fa";
import { BiLoaderCircle } from "react-icons/bi";
import 'react-vertical-timeline-component/style.min.css';

import { fetchParticularRoadmapById } from '@/server-actions/roadmapServerActions';
import { fetchParticularUserByEmailId } from "@/server-actions/userServerActions";
import { Separator } from '@/components/ui/separator';
import BreadCrumbComponent from '@/app/_components/all_purpose_component/BreadCrumbComponent';


const Page = () => {


    const params = useParams();

    const id = params?.id;


    const { user } = useKindeAuth();


    const [loading, setLoading] = useState(true);

    const [particularRoadmap, setParticularRoadmap] = useState({});

    const [error, setError] = useState(null); 
    
    const [ loadingCurrentlyLoggedInUserData, setLoadingCurrentlyLoggedInUserData ] = useState(false);

    const [currentlyLoggedInUserDetails, setCurrentlyLoggedInUserDetails] = useState({});


    const getCurrentlyLoggedInUserDetails = async () => {

        try {
    
          setLoadingCurrentlyLoggedInUserData(true);
    
          const userDetails = await fetchParticularUserByEmailId(user?.email);
    
          console.log(userDetails);
          
    
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
    
          setLoadingCurrentlyLoggedInUserData(false);
    
        }
    
    };


    const fetchParticularRoadmap = async (roadmapId) => {

        try {

            setLoading(true);

            setError(null); 


            const response = await fetchParticularRoadmapById(roadmapId);


            if (response?.success) {
                const parsedResponse = {
                    ...response?.data,
                    responseFromModel: JSON.parse(response?.data?.responseFromModel),
                };

                setParticularRoadmap(parsedResponse);

            } else {

                setError("An error occurred while fetching the roadmap or the LLM model was unable to generate the Roadmap correctly. Please go back, refresh the page, and try creating a new one.");

            }

        } catch (error) {

            console.log(error);

            setError("An error occurred while fetching the roadmap or the LLM model was unable to generate the Roadmap correctly. Please go back, refresh the page, and try creating a new one.");

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        if(user) {
    
          getCurrentlyLoggedInUserDetails();
    
        }
    
    }, [user]);


    useEffect(() => {

        if (id) {

            fetchParticularRoadmap(id);

        }

    }, [id]);


    return (
        loadingCurrentlyLoggedInUserData ? <div className="text-white mt-44 w-11/12 mx-auto">

        <BiLoaderCircle className="text-5xl text-white transition-all animate-spin duration-1000" />

        </div> : currentlyLoggedInUserDetails?.data?.isBanned ? <div className="text-white mt-44 lg:mt-36">

        <div className="w-11/12 mt-44 mx-auto flex flex-col gap-4 items-center justify-center text-center">

            <FaBan className="text-6xl text-red-400" />
            
            <p className="text-xl text-violet-200 font-bold">
                Your account has been banned by the administrator. Please check your profile for details about the suspension reason.
            </p>

            <p className="mt-2 italic">
                For assistance with this matter, please contact the administrator at <span className="underline">admin@gmail.com</span>
            </p>
        
        </div>

        </div> : <div className="w-11/12 m-auto mt-40 lg:mt-32">

            {loading ? (

                <ImSpinner7 className="text-white text-5xl transition-all animate-spin duration-1000" />
            
            ) : error ? (

                <p className="text-lg lg:text-2xl text-center text-red-400 font-bold">{error}</p> 

            ) : (
                <>
                    
                    <BreadCrumbComponent name='Roadmap' link='/create-roadmap-and-roadmap-history' itemId={id} tailwindClasses='mb-10' />

                    <div className='flex flex-col gap-5 text-lg lg:text-xl'>

                        <div className='w-full flex flex-col gap-5'>

                            <p className='flex flex-col lg:flex-row gap-2'> <span>Subject Name:</span> <span className='text-violet-300 font-semibold tracking-wide'>{particularRoadmap?.studentSubjectName}</span> </p>

                            <p className='flex flex-col lg:flex-row gap-2'> <span>Exam Name:</span> <span className='text-violet-300 font-semibold tracking-wide'>{particularRoadmap?.studentExamName}</span> </p>

                        </div>

                        <div>

                            <p className='flex flex-col lg:flex-row gap-2'> <span>Days Remaining for exam:</span> <span className='text-violet-300 font-semibold tracking-wide'>{particularRoadmap?.daysRemainingUntilExam}</span> </p>
                        
                        </div>

                    </div>


                    <Separator className='my-8' />
                    

                    <p className="text-xl lg:text-3xl text-violet-300 font-bold mb-5">{particularRoadmap?.responseFromModel?.title}</p>


                    <VerticalTimeline layout='1-column-left' className="!ml-0 !pl-0">

                        {particularRoadmap?.responseFromModel?.roadmap?.map((roadMap) => (

                            <VerticalTimelineElement
                                key={roadMap?.id}
                                className="vertical-timeline-element--work"
                                contentStyle={{ background: '#4F29B0FF', color: '#fff' }}
                                contentArrowStyle={{ borderRight: '7px solid  #070C18' }}
                                iconStyle={{ background: '#39246DFF', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                icon={<span style={{ color: '#fff', fontSize: '16px', fontWeight: 'bold' }}>{roadMap?.id}</span>}
                                >
                                
                                <h3 className="vertical-timeline-element-title">{roadMap?.step}</h3>

                                <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>

                                    {roadMap?.description}

                                </Markdown>

                            </VerticalTimelineElement>

                        ))}

                    </VerticalTimeline>

                </>
            )}
            
        </div>
    );

};


export default Page;
