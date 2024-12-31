'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ImSpinner7 } from "react-icons/im";
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import toast from "react-hot-toast";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import { FaBan } from "react-icons/fa";
import { BiLoaderCircle } from "react-icons/bi";

import { fetchParticularQnAById } from '@/server-actions/topTenQuestionsAnswers';
import { fetchParticularUserByEmailId } from "@/server-actions/userServerActions";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import BreadCrumbComponent from '@/app/_components/all_purpose_component/BreadCrumbComponent';


const Page = () => {


    const params = useParams();

    const id = params?.id;


    const { user } = useKindeAuth();


    const [loading, setLoading] = useState(true);

    const [particularQnA, setParticularQnA] = useState({});

    const [activeItem, setActiveItem] = useState(null);

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


    const fetchParticularQnA = async (qnaId) => {

        try {


            setLoading(true);

            setError(null); 


            const response = await fetchParticularQnAById(qnaId);


            if (response?.success) {
                const parsedResponse = {
                    ...response.data,
                    responseFromModel: JSON.parse(response.data.responseFromModel),
                };

                setParticularQnA(parsedResponse);

            } else {

                setError("An error occurred while fetching the QnA or the LLM model was unable to generate the QnAs correctly. Please go back, refresh the page, and try creating a new one.");

            }

        } catch (error) {

            console.log(error);

            setError("An error occurred while fetching the QnA or the LLM model was unable to generate the QnAs correctly. Please go back, refresh the page, and try creating a new one.");

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

            fetchParticularQnA(id);

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

                    <BreadCrumbComponent name='Top 10 QnA' link='/create-qna-and-qna-history' itemId={id} tailwindClasses='mb-10' />

                    <p className="text-xl lg:text-3xl text-white font-bold">
                        Top 10 questions on: <span className="text-violet-400">{particularQnA?.topic}</span>
                    </p>

                    <Accordion
                        type="single"
                        value={activeItem}
                        onValueChange={(value) => setActiveItem(value)}
                        collapsible
                        className="mt-5 flex flex-col gap-2"
                    >
                        {particularQnA?.responseFromModel?.questionsAndAnswers?.map((response) => (

                            <AccordionItem key={response?.id} value={response?.id}>

                                <AccordionTrigger className="text-lg lg:text-xl">

                                    <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>

                                        {response?.question}

                                    </Markdown>

                                </AccordionTrigger>

                                <AccordionContent className="text-base lg:text-lg">
                                    
                                    <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>

                                        {response?.answer}

                                    </Markdown>

                                </AccordionContent>

                            </AccordionItem>

                        ))}

                    </Accordion>

                </>
            )}
            
        </div>
    );

};


export default Page;
