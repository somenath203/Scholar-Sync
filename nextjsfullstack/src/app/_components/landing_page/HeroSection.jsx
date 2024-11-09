'use client';

import { LoginLink, useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import Link from "next/link";

import { Button } from '@/components/ui/button';


const HeroSection = () => {


  const { user } = useKindeAuth();


  return (
    <header className="container mx-auto px-4 mt-36">

      <div className="text-center space-y-6">

        <h1 className="text-5xl font-bold text-white">
          Scholar <span className="text-violet-400">Sync</span>
        </h1>

        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Your AI-Powered Learning Companion: Personalized Pathways, Topic-Based QnAs, and Organized Youtube Study Guides - for Students and Their Parents.
        </p>

        <div className="flex justify-center gap-4">

          {user ? <Link href='/create-roadmap-and-roadmap-history'>

            <Button
              size="lg"
              className="bg-violet-600 hover:bg-violet-700 text-white px-10 py-6"
            >
              Get Started
            </Button>

          </Link> : <LoginLink>

            <Button
              size="lg"
              className="bg-violet-600 hover:bg-violet-700 text-white px-10 py-6"
            >
              Get Started
            </Button>

          </LoginLink>}

        </div>

      </div>

    </header>
  );
};


export default HeroSection;
