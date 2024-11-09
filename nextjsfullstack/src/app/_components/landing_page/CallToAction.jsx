'use client';

import { LoginLink, useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import Link from "next/link";

import { Button } from "@/components/ui/button";


const CallToAction = () => {


  const { user } = useKindeAuth();


  return (
    <section className="bg-violet-900/20 py-16 mt-6 lg:mt-16 border-t border-b border-violet-900/30">

    <div className="container mx-auto px-4 text-center">

      <h2 className="text-2xl lg:text-3xl font-bold mb-6 text-white">
        Ready to Transform Your Academic Journey?
      </h2>

      <p className="text-lg lg:text-xl mb-8 text-gray-300">
        Join thousands of students who are already maximizing their potential with ScholarSync.
      </p>

      {user ? <Link href='/create-roadmap-and-roadmap-history'>

        <Button size="lg" className="bg-violet-600 hover:bg-violet-700 text-white">
          Start Your Journey
        </Button>

      </Link> : <LoginLink>

        <Button size="lg" className="bg-violet-600 hover:bg-violet-700 text-white">
          Start Your Journey
        </Button>
        
      </LoginLink>}

    </div>

  </section>
  )
}

export default CallToAction;