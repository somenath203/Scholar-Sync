import { FaBrain } from "react-icons/fa";
import { FaQuestion } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

import { Card, CardContent } from "@/components/ui/card";


const FeatuesSection = () => {


  const features = [
    {
      id: 1,
      title: 'AI-Powered Roadmaps',
      description: 'Get personalized learning paths, customized to match your syllabus and learning style, helping you stay on track and reach your goals efficiently.',
      icon: <FaBrain className="h-6 w-6 text-violet-400" />
    },
    {
      id: 2,
      title: 'Topic-Based QnA Generator',
      description: 'Easily generate question and answer sets on any topic with this intuitive form. Input a topic name and provide a detailed description to receive a tailored set of 10 questions with corresponding answers.',
      icon: <FaQuestion className="h-6 w-6 text-violet-400" />
    },
    {
      id: 3,
      title: 'YouTube Study Guides',
      description: 'Effortlessly save and organize essential YouTube content to enhance your academic journey, ensuring that you have quick access to valuable resources tailored to your learning needs.',
      icon: <FaYoutube className="h-6 w-6 text-violet-400" />
    },
  ];
  

  return (
    <section className="container mx-auto px-4 py-8 mt-6">

      <h2 className="text-3xl font-bold text-center mb-12 text-white">
        Transform Your Learning Journey
      </h2>

      <div className="grid md:grid-cols-3 gap-8">

        {features.map((feature) => (
          <Card key={feature.id} className="p-6 hover:shadow-violet-900/50 hover:shadow-lg transition-all duration-300 bg-gray-800 border-gray-800">
            
            <CardContent className="space-y-4 pt-4">
              
              <div className="h-12 w-12 rounded-lg bg-violet-900/30 flex items-center justify-center">
                {feature.icon}
              </div>

              <h3 className="text-xl font-semibold text-white">
                {feature.title}
              </h3>

              <p className="text-gray-400">
                {feature.description}
              </p>

            </CardContent>

          </Card>
        ))}

      </div>

    </section>
  );
};


export default FeatuesSection;
