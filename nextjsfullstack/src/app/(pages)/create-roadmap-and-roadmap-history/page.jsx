'use client';

import { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator";
import CreateComponent from "@/app/_components/all_purpose_component/CreateComponent";
import RoadmapDrawerForm from "@/app/_components/roadmap_component/RoadmapDrawerForm";


const Page = () => {

  const [openCreateRoadmapDrawer, setOpenCreateRoadmapDrawer] = useState(false);

  return (
    <>
      <div className="text-white mt-36">

        <div className="w-11/12 mx-auto">

          <p className="text-2xl text-white mb-4">Create Roadmap</p>


          <CreateComponent 
            text='Create Roadmap' 
            setOpenDrawer={setOpenCreateRoadmapDrawer}
            extraClasses='text-xl'
          />


          <Separator className="my-8" />

          <div>

            <p className="text-2xl text-white mb-4">Your Roadmaps</p>

            <div className="grid md:grid-cols-4 gap-5">

              <Card className="p-6 hover:shadow-violet-900/50 hover:shadow-lg transition-all duration-300 bg-gray-800/70 border-gray-500">

                <CardHeader>

                  <CardTitle>Card Title</CardTitle>

                  <CardDescription>Card Description</CardDescription>

                </CardHeader>

                <CardContent>

                  <p>Card Content</p>

                </CardContent>

                <CardFooter>

                  <p>Card Footer</p>

                </CardFooter>

              </Card>

            </div>

          </div>

        </div>

      </div>


      <RoadmapDrawerForm 
        openCreateRoadmapDrawer={openCreateRoadmapDrawer} 
        setOpenCreateRoadmapDrawer={setOpenCreateRoadmapDrawer}
      />

    </>
  );
}

export default Page;
