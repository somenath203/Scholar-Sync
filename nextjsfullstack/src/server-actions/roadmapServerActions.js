'use server';

import axios from 'axios';

import primsaClientConfig from '@/prismaClientConfig';
import { getAuthUserDetails } from './authUserHelperDataFunc';


export const createRoadMap = async (roadmapData) => {

    try {

        const user = await getAuthUserDetails();

        const generateStudentRoadmapPrompt = `
            Based on the following details, create a personalized roadmap in JSON format that outlines a step-by-step study plan for the student. Each step in the roadmap should include:
            - A unique ID for the step.
            - A step number in the format "Step 1," "Step 2," etc.
            - A detailed description for the step, providing specific guidance and tasks for the student.

            Additionally, create a clear, concise title for the roadmap that reflects the subject, education level, and exam name.

            Student Details:
            - Subject: ${roadmapData.studentSubjectName}
            - Education Level: ${roadmapData.studentEducationLevel}
            - Average Daily Study Hours: ${roadmapData.averageDailyStudyHours}
            - Exam Name: ${roadmapData.studentExamName}
            - Days Remaining Until Exam: ${roadmapData.daysRemainingUntilExam}
            - Syllabus Topics: 
              ${roadmapData.syllabusTopics}

            The output must be a valid JSON object only. It should be structured exactly as shown below, without any additional text, commentary, or formatting:

            {
                "title": "Generated Title for Roadmap",
                "roadmap": [
                    {
                        "id": "1",
                        "step": "Step 1",
                        "description": "Detailed guidance for the first step, including specific tasks based on the student's subject, education level, and remaining time."
                    },
                    {
                        "id": "2",
                        "step": "Step 2",
                        "description": "Detailed guidance for the second step, focusing on progressing further in the syllabus and adjusting based on daily study hours."
                    },
                    ...
                    {
                        "id": "n",
                        "step": "Step n",
                        "description": "Detailed guidance for the final step, wrapping up revision and preparing for the exam day."
                    }
                ]
            }

            Respond with only the JSON object.
        `;



        const { data } = await axios.post(process.env.FASTAPI_GENERATE_ROADMAP_BACKEND_URL, {
            textFromNextJSFrontend: generateStudentRoadmapPrompt
        });


        const dataStored = await primsaClientConfig.roadMap.create({
            data: {
                studentSubjectName: roadmapData.studentSubjectName,                  
                studentEducationLevel: roadmapData.studentEducationLevel,                  
                averageDailyStudyHours: roadmapData.averageDailyStudyHours,                 
                studentExamName: roadmapData.studentExamName,                        
                daysRemainingUntilExam: roadmapData.daysRemainingUntilExam,                 
                syllabusTopics: roadmapData.syllabusTopics,                         
                responseFromModel: data?.response_from_model?.content,
                emailOfTheProfileWhoGeneratedRoadmap : user?.email
            }
        });


        return {
            success: true,
            message: 'your personalized roadmap has been generated successfully',
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


export const fetchAllRoadmapsByTheUser = async () => {

    try {

        const user = await getAuthUserDetails();


        const allRoadmapsByTheUser = await primsaClientConfig.roadMap.findMany({
            where: {
                emailOfTheProfileWhoGeneratedRoadmap: user?.email
            }
        });
        

        return allRoadmapsByTheUser;
        
    } catch (error) {
        
        return {
            success: false,
            message: error?.message || 'Something went wrong. Please try again after sometime'
        }

    }

}


export const fetchParticularRoadmapById = async (roadmapId) => {

    try {

        const roadmap = await primsaClientConfig.roadMap.findUnique({
            where: {
                id: roadmapId
            }
        });

        return {
            success: true,
            data: roadmap
        }
        
    } catch (error) {
        
        console.log(error);

        return {
            success: false,
            message: error?.message || 'something went wrong, please try again'
        }

    }

}