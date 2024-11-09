'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ImSpinner7 } from "react-icons/im";
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

import { fetchParticularQnAById } from '@/server-actions/topTenQuestionsAnswers';
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


    const [loading, setLoading] = useState(true);

    const [particularQnA, setParticularQnA] = useState({});

    const [activeItem, setActiveItem] = useState(null);

    const [error, setError] = useState(null);  


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

                setError("QnA with this ID does not exist.");

            }

        } catch (error) {

            console.log(error);

            setError("An error occurred while fetching the QnA.");

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        if (id) {

            fetchParticularQnA(id);

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
