'use client';

import { useEffect, useState } from "react";
import { BiLoaderCircle } from "react-icons/bi";
import toast from "react-hot-toast";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import Link from "next/link";
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { banUserByIdAndReason, fetchAllAvailableUsers, unbanUserById } from "@/server-actions/adminServerActions";
import { fetchParticularUserByEmailId } from "@/server-actions/userServerActions";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import NormalInput from "@/app/_components/form_inputs/NormalInput";
  
  

const Page = () => {


    const { user } = useKindeAuth();

    
    const [ allUsers, setAllUsers ] = useState([]);

    const [ currentlyLoggedInUserDetails, setCurrentlyLoggedInUserDetails ] = useState({});

    const [ loading, setLoading ] = useState(false);

    const [ loadingBanUser, setLoadingUnBanUser ] = useState(false);

    const [ openBanUserModal, setOpenBanUserModal ] = useState(false);

    const [ idOfUserToBeBanned, setIdOfUserToBeBanned ] = useState();


    const zodFormValidationSchema = z.object({
        banReason: z.string().min(1, { message: 'ban reason is required' })
    });


    const {register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(zodFormValidationSchema),
    });


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


    const getAllUsers = async () => {

        try {

            setLoading(true);
           
            const response = await fetchAllAvailableUsers();

            console.log(response);
            

            if (response?.success) {

                setAllUsers(response);

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


    const banUserWithReason = async (value) => {

        try {

            setLoadingUnBanUser(true);
            
            const response = await banUserByIdAndReason(idOfUserToBeBanned, value);

            if (response?.success) {

                await getAllUsers();

                setOpenBanUserModal(false);

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

            setLoadingUnBanUser(false);

        }

    }


    const unbanUser = async (idOfUserToBeBanned) => {

        try {

            setLoadingUnBanUser(true);
            
            const response = await unbanUserById(idOfUserToBeBanned);

            if (response?.success) {

                await getAllUsers();

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

            setLoadingUnBanUser(false);

        }

    }


    useEffect(() => {

        if (user) {

            getCurrentlyLoggedInUserDetails();

        }

    }, [user]);


    useEffect(() => {

        getAllUsers();

    }, []);
    

    return (
        <>

            <div className="w-11/12 m-auto mt-40 lg:mt-32">

                <p className="text-center text-2xl lg:text-3xl text-violet-300 font-bold tracking-wider">Users</p>

                {loading ? (

                    <BiLoaderCircle className="text-5xl m-auto mt-8 text-white transition-all animate-spin duration-1000" />

                ) : (

                    !currentlyLoggedInUserDetails?.data?.isAdmin ? (

                        <p className="text-center text-xl lg:text-2xl text-violet-500 font-bold tracking-wider mt-12 uppercase">
                            Access denied: You do not have permission to view this resource as you are not the admin
                        </p>

                    ) : (

                        <div className="w-full mt-10">

                            <p className="text-2xl tracking-wide font-bold flex items-center justify-center gap-2"> <span>Total Users:</span> <span className="text-violet-300">{allUsers?.users?.length}</span> </p>
                        
                            <Table className='mt-8'>

                                <TableCaption>A list of all the available users.</TableCaption>

                                <TableHeader>

                                    <TableRow>
                                        <TableHead>User ID</TableHead>
                                        <TableHead>Full Name</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Roadmaps</TableHead>
                                        <TableHead>QnAs</TableHead>
                                        <TableHead>Yt Guides</TableHead>
                                        <TableHead>Is Banned</TableHead>
                                        <TableHead>Action</TableHead>
                                    </TableRow>

                                </TableHeader>

                                <TableBody>

                                    {allUsers?.users?.map((user) => (

                                        <TableRow key={user?.id}>

                                            <TableCell>{user?.id}</TableCell>

                                            <TableCell>{user?.fullName}</TableCell>

                                            <TableCell>{user?.email}</TableCell>

                                            <TableCell>
                                            
                                                <Link href={`all-roadmaps-of-particular-user/${user.id}`}>
                                                    <Button>View Roadmaps</Button>
                                                </Link> 

                                            </TableCell>

                                            <TableCell>

                                                <Link href={`all-qnas-of-particular-user/${user.id}`}>
                                                    <Button>View QnAs</Button>
                                                </Link>

                                            </TableCell>

                                            <TableCell>

                                                <Link href={`all-yt-video-guides-of-particular-user/${user.id}`}>
                                                    <Button>View Yt Guides</Button>
                                                </Link>

                                            </TableCell>

                                            <TableCell>{user?.isBanned ? 'Yes' : 'No'}</TableCell>

                                            <TableCell>

                                                {user?.isBanned ? (

                                                    <Button 
                                                        className='bg-blue-700'
                                                        onClick={() => unbanUser(user.id)}
                                                    >Unban User</Button>

                                                ) : (

                                                    <Button 
                                                        variant='destructive'
                                                        onClick={() => {
                                                            setOpenBanUserModal(true);
                                                            setIdOfUserToBeBanned(user.id)
                                                        }}
                                                    >Ban User</Button>

                                                )}
                                            
                                            </TableCell>

                                        </TableRow>

                                    ))}

                                </TableBody>

                            </Table>

                        </div>

                    )
                )}

            </div>


            <AlertDialog open={openBanUserModal} onOpenChange={setOpenBanUserModal}>

                <AlertDialogContent>

                    <AlertDialogHeader>

                        <AlertDialogTitle className='text-center'>Ban User</AlertDialogTitle>

                    </AlertDialogHeader>


                    <form className="flex flex-col gap-3" onSubmit={handleSubmit(banUserWithReason)}>

                        <NormalInput
                            type="text"
                            label="Ban Reason"
                            placeholder="enter the reason why you want to ban the user"
                            registerInput={register('banReason')}
                        />

                        {errors.banReason && (
                            <p className="text-red-500 my-1">{errors.banReason.message}</p>
                        )}

                        <div className="flex items-center justify-end gap-2">

                            <Button disabled={loadingBanUser} variant='outlined' type="button" onClick={() => setOpenBanUserModal(false)}>Cancel</Button>
                            
                            <Button disabled={loadingBanUser} type="submit">Submit</Button>

                        </div>

                    </form>


                </AlertDialogContent>

            </AlertDialog>

        </>
    );

};


export default Page;
