'use client';

import Image from "next/image";
import { usePathname } from "next/navigation";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState, useEffect } from "react";
import { SiRoadmapdotsh } from "react-icons/si";
import { MdQuestionAnswer } from "react-icons/md";
import { FaYoutube } from "react-icons/fa";
import { LoginLink, RegisterLink, LogoutLink, useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import Link from "next/link";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { storeUserData } from "@/server-actions/userServerActions";
import LoaderModal from "./LoaderModal";



const Navbar = () => {

  const pathname = usePathname();  

  const [openDrawer, setOpenDrawer] = useState(false);

  const [openProfileModal, setOpenProfileModal] = useState(false);

  const [loading, setLoading] = useState(false);


  const { user } = useKindeAuth();


  useEffect(() => {

    const saveUserData = async () => {

      if (user) {

        try {

          setLoading(true);

          const userData = {
            fullName: `${user?.given_name} ${user?.family_name}`,
            email: user?.email,
            profilePicUrl: user?.picture,
          };

          await storeUserData(userData);

        } catch (error) {

          console.log(error);

          toast.error(error?.message, { 
            duration: 5000,
            style: {
              background: '#333',
              color: '#fff',
            },
          });

        } finally {

          setLoading(false);

        }

      }

    };

    saveUserData();

  }, [user]);


  const navLinksArr = [
    {
      id: 1,
      title: 'Create Roadmap',
      icon: <SiRoadmapdotsh className="h-9 w-9 text-violet-400" />,
      link: '/create-roadmap-and-roadmap-history'
    },
    {
      id: 2,
      title: 'Top 10 Q&A',
      icon: <MdQuestionAnswer className="h-9 w-9 text-violet-400" />,
      link: '/create-qna-and-qna-history'
    },
    {
      id: 3,
      title: 'Essential YouTube Links',
      icon: <FaYoutube className="h-9 w-9 text-violet-400" />,
      link: '/create-saved-yt-links-and-yt-link-history'
    },
  ];  

  return (
    <>

      <nav className="fixed top-0 w-full z-50 bg-gray-950/60 backdrop-blur-sm border-b border-gray-800">

        <div className="container mx-auto px-4 py-6 lg:py-0">

          <div className="flex flex-col gap-4 lg:gap-0 lg:flex-row items-center lg:justify-between h-20 mx-10 lg:mx-16">

            <div className="flex items-center justify-center gap-4 lg:gap-3">

              {pathname !== '/' && <RxHamburgerMenu className="h-6 w-6 text-violet-200 cursor-pointer" onClick={() => setOpenDrawer(true)} />}

                <Link className="flex items-center gap-2" href='/'>

                  <Image 
                    src='/education_logo.svg' 
                    width={40} 
                    height={40} 
                    alt="logo"
                  />

                  <p className="text-xl font-bold text-white">
                    Scholar <span className="text-violet-400">Sync</span>
                  </p>

                </Link>

            </div>

            <div className="flex items-center space-x-4">

              {user ? <>

                <DropdownMenu>

                  <DropdownMenuTrigger asChild>

                    <Image
                      src={user?.picture}
                      alt={user?.given_name}
                      className="w-10 h-10 rounded-full object-cover cursor-pointer"
                      width={100}
                      height={100}
                    />

                  </DropdownMenuTrigger>

                  <DropdownMenuContent>

                    <DropdownMenuLabel>{user?.given_name} {user?.family_name}</DropdownMenuLabel>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem 
                      className='cursor-pointer' 
                      onClick={() => setOpenProfileModal(true)}
                    >Profile</DropdownMenuItem>

                    <DropdownMenuItem>

                      <LogoutLink>Logout</LogoutLink>

                    </DropdownMenuItem>

                  </DropdownMenuContent>

                </DropdownMenu>

              </> : <>

                <LoginLink>

                  <Button 
                    variant="ghost" 
                    className="text-gray-300 hover:text-violet-400 hover:bg-violet-900/20"
                  >
                    Sign In
                  </Button>


                </LoginLink>
                
                <RegisterLink>

                  <Button 
                    className="bg-violet-600 text-white hover:bg-violet-700 transition-colors"
                  >
                    Sign Up
                  </Button>

                </RegisterLink>
                
              </>}

              
            </div>

          </div>

        </div>

      </nav>

      <Sheet open={openDrawer} onOpenChange={setOpenDrawer}>

        <SheetContent side="left">

          <SheetHeader>

            <SheetTitle className='flex items-center justify-center gap-2'>

              <Image 
                src='/education_logo.svg' 
                width={40} 
                height={40} 
                alt="sidebar logo"
              />

              <p className="text-2xl font-bold text-white">
                Scholar <span className="text-violet-400">Sync</span>
              </p>

            </SheetTitle>

          </SheetHeader>

          <div className="mt-20">

            {navLinksArr.map((navLink) => (

              <Link 
                href={navLink.link}
                key={navLink.id} 
                className="flex items-center gap-3 my-10 p-6 hover:border-2 hover:border-violet-300 rounded-xl bg-violet-900/20 cursor-pointer hover:bg-violet-900/40 transition-all duration-200"
                onClick={() => setOpenDrawer(false)}
              >
                
                {navLink.icon}

                <p className="text-lg">{navLink.title}</p>

              </Link>

            ))}

          </div>

        </SheetContent>

      </Sheet>

      <AlertDialog open={openProfileModal} onOpenChange={setOpenProfileModal}>

        <AlertDialogContent className='bg-violet-950'>

          <AlertDialogHeader>

            <AlertDialogTitle className='text-center'>Profile</AlertDialogTitle>

            <AlertDialogDescription className='text-center flex flex-col items-center justify-center gap-5 text-lg font-bold'>
              
              <span className="flex flex-col gap-2 items-center justify-center mt-3">

                <span>Full Name</span>

                <span className="text-violet-300">{user?.given_name} {user?.family_name}</span>

              </span>

              <span className="flex flex-col gap-2 items-center justify-center">

                <span>Email Address</span>

                <span className="text-violet-300">{user?.email}</span>

              </span>

            </AlertDialogDescription>

          </AlertDialogHeader>

          <AlertDialogFooter>

            <AlertDialogCancel>OK</AlertDialogCancel>

          </AlertDialogFooter>

        </AlertDialogContent>

      </AlertDialog>


      <LoaderModal openLoaderModal={loading} setOpenLoaderModal={setLoading} loaderText='Loading your Account' />

    </>
  );
};

export default Navbar;