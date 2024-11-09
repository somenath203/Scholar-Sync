'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ImSpinner7 } from "react-icons/im";
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import 'react-vertical-timeline-component/style.min.css';

import { fetchParticularRoadmapById } from '@/server-actions/roadmapServerActions';
import { Separator } from '@/components/ui/separator';
import BreadCrumbComponent from '@/app/_components/all_purpose_component/BreadCrumbComponent';


const Page = () => {


    const params = useParams();

    const id = params?.id;


    const [loading, setLoading] = useState(true);

    const [particularRoadmap, setParticularRoadmap] = useState({});

    const [error, setError] = useState(null);  


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

                setError("Roadmap with this ID does not exist.");

            }

        } catch (error) {

            console.log(error);

            setError("An error occurred while fetching the roadmap.");

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        if (id) {

            fetchParticularRoadmap(id);

        }

    }, [id]);


    return (
        <div className="w-11/12 m-auto mt-40 lg:mt-32">

            {loading ? (

                <ImSpinner7 className="text-white text-5xl transition-all animate-spin duration-1000" />
            
            ) : error ? (

                <p className="text-2xl text-red-500 font-bold">{error}</p> 

            ) : (
                <>
                    
                    <BreadCrumbComponent name='Roadmap' link='/create-roadmap-and-roadmap-history' itemId={id} tailwindClasses='mb-10' />

                    <div className='flex flex-col w-full lg:w-2/3 gap-5 bg-violet-950/60 py-6 px-8 rounded-3xl text-lg lg:text-xl text-center lg:text-left'>

                        <div className='w-full flex flex-col gap-5 lg:gap-0 lg:flex-row lg:items-center lg:justify-between'>

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
