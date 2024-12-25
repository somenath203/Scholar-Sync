'use server';

import axios from 'axios';

import primsaClientConfig from '@/prismaClientConfig';
import { getAuthUserDetails } from './authUserHelperDataFunc';


export const generateTopTenQuestionAnswer = async (qnadata) => {

    try {

        const user = await getAuthUserDetails();

        const topTenQuestionAnswerPrompt = `
            You are an expert JSON generator. Generate an array of 10 objects where each object represents a question and an in-depth answer based on the following topic. Ensure the output is strictly a valid and properly formatted JSON object, without any additional text, commentary, or formatting.

            Topic: ${qnadata.topic}

            The JSON should include:
            - 'id': A unique ID for the question-answer pair.
            - 'question': A question based on the given topic.
            - 'answer': An in-depth answer to the corresponding question based on the given topic.

            The output must adhere to the following structure exactly, without deviations or extra information:

            {
                "questionsAndAnswers": [
                    {
                        "id": "1",
                        "question": "First Question based on the given topic",
                        "answer": "Answer based on the first question of the topic"
                    },
                    {
                        "id": "2",
                        "question": "Second Question based on the given topic",
                        "answer": "Answer based on the second question of the topic"
                    },
                    ...
                    {
                        "id": "10",
                        "question": "Tenth Question based on the given topic",
                        "answer": "Answer based on the tenth question of the topic"
                    }
                ]
            }

            Respond with only the JSON object and ensure it is well-formed, valid, and properly indented.
        `;
        

        const { data } = await axios.post(`${process.env.WEBSITE_BASE_URL}/api/toptenqna`, {
            textFromNextJSFrontend: topTenQuestionAnswerPrompt
        });



        const dataStored = await primsaClientConfig.topTenQuestionsAnswers.create({
            data: {
                topic: qnadata?.topic,
                responseFromModel: data?.response_from_model?.kwargs?.content,
                emailOfTheProfileWhoGeneratedTopTenQnA: user?.email
            }
        });


        return {
            success: true,
            message: 'your top ten question-answer has been saved successfully',
            data: dataStored
        }
        
        
    } catch (error) {
        
        console.log(error);

        return {
            success: false,
            message: error?.message || 'Something went wrong. Please try again after sometime'
        }

    }

}


export const fetchAllTopTenQuestionsAnswersByTheUser = async () => {

    try {

        const user = await getAuthUserDetails();


        const allTopTenQnACreatedByTheUser = await primsaClientConfig.topTenQuestionsAnswers.findMany({
            where: {
                emailOfTheProfileWhoGeneratedTopTenQnA: user?.email
            }
        });
        

        return allTopTenQnACreatedByTheUser;
        
    } catch (error) {
        
        return {
            success: false,
            message: error?.message || 'Something went wrong. Please try again after sometime'
        }

    }

}


export const fetchParticularQnAById = async (qnaId) => {

    try {

        const qna = await primsaClientConfig.topTenQuestionsAnswers.findUnique({
            where: {
                id: qnaId
            }
        });

        return {
            success: true,
            data: qna
        }
        
    } catch (error) {
        
        console.log(error);

        return {
            success: false,
            message: error?.message || 'something went wrong, please try again'
        }

    }

}


export const deleteTopTenQnAById = async (id) => {
    
    try {

      await primsaClientConfig.topTenQuestionsAnswers.delete({
        where: {
          id: id,
        },
      });
  
      return {
        success: true,
        message: "Top 10 qna data has been deleted successfully",
      };

    } catch (error) {

      console.log(error);
  
      return {
        success: false,
        message: error?.message || "Something went wrong. Please try again later",
      };

    }

};
