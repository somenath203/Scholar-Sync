'use client';

import { useEffect, useState } from "react";
import { BiLoaderCircle } from "react-icons/bi";
import toast from "react-hot-toast";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import {
    BarChart,
    Bar,
    ResponsiveContainer,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";
  

import { fetchTotalNumberOfEssentialYtVideosTopTenQnARoadmaps } from "@/server-actions/adminServerActions";
import CountCard from "@/app/_components/admin_component/CountCard";
import { fetchParticularUserByEmailId } from "@/server-actions/userServerActions";



const OurOwnToolTip = ({ active, payload, label }) => {

    if (active && payload && label) {

      return (
        <div className="p-4 bg-slate-900 flex flex-col gap-4 rounded-md">

          <div className="text-medium text-lg">{label}</div>

          <p className="text-sm text-violet-400">
            Value: <span className="ml-2">{payload[0].value}</span>
          </p>

        </div>
      );

    }

};


const Page = () => {

    
    const { user } = useKindeAuth();


    const [ totalCounts, setTotalCounts ] = useState([]);

    const [ loading, setLoading ] = useState(false);

    const [ currentlyLoggedInUserDetails, setCurrentlyLoggedInUserDetails ] = useState({});


    const getCurrentlyLoggedInUserDetails = async () => {

        try {

            const currentlyLoggedInUserDetails = await fetchParticularUserByEmailId(user?.email);

            if(currentlyLoggedInUserDetails?.success) {

                setCurrentlyLoggedInUserDetails(currentlyLoggedInUserDetails);

            }
            
            
        } catch (error) {

            console.log(error);

            toast.error(error?.message, { 
                duration: 8000,
                style: {
                  background: '#333',
                  color: '#fff',
                },
            });
            
        } finally {

            setLoading(false);

        }

    }


    const getTotalCountsOfEachContent = async () => {

        try {

            setLoading(true);
           
            const response = await fetchTotalNumberOfEssentialYtVideosTopTenQnARoadmaps();

            if (response?.success) {

                setTotalCounts(response?.data);

            }

        } catch (error) {
            
            console.log(error);

            toast.error(error?.message, { 
                duration: 8000,
                style: {
                  background: '#333',
                  color: '#fff',
                },
            });
            
        } finally {

            setLoading(false);

        }

    }


    useEffect(() => {

        if (user) {

            getCurrentlyLoggedInUserDetails();

        }

    }, [user]);
    

    useEffect(() => {

        getTotalCountsOfEachContent();

    }, []);


    return (
        <div className="w-11/12 m-auto mt-40 lg:mt-32">

            <p className="text-center text-2xl lg:text-3xl text-violet-300 font-bold tracking-wider">Content Count Panel</p>

            {loading ? (

                <BiLoaderCircle className="text-5xl m-auto mt-8 text-white transition-all animate-spin duration-1000" />
            
            ) : (
                !currentlyLoggedInUserDetails?.data?.isAdmin ? (

                    <p className="text-center text-xl lg:text-2xl text-violet-500 font-bold tracking-wider mt-12 uppercase">
                        Access denied: You do not have permission to view this resource as you are not the admin
                    </p>

                ) : (

                    <div className="flex flex-col items-center justify-center gap-10">

                        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-5 mt-10">

                            {totalCounts?.map((totalCount) => (

                                <CountCard key={totalCount?.name} name={totalCount?.name} count={totalCount?.value} />

                            ))}

                        </div>

                        <div className="w-full h-[500px] flex flex-col items-center justify-center">

                            <ResponsiveContainer width={'100%'} height={'100%'}>

                                <BarChart data={totalCounts} margin={{ right: 40 }}>

                                    <XAxis dataKey="name" tick={{ fill: '#e4e4e7' }} />

                                    <YAxis />

                                    <CartesianGrid strokeDasharray="5 5" />

                                    <Legend />

                                    <Tooltip content={<OurOwnToolTip />} cursor={{ fill: 'transparent' }} />

                                    <Bar dataKey="value" fill="#762EE3FF" maxBarSize={100} /> 

                                </BarChart>

                            </ResponsiveContainer>

                        </div>

                    </div>

                )
            )}

        </div>
    );

};


export default Page;
