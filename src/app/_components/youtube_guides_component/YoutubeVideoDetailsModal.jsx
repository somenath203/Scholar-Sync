'use client';

import Link from 'next/link';
import { FaExternalLinkAlt } from "react-icons/fa";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"


const YoutubeVideoDetailsModal = ({ videoTitle, videoDescription, videoLink, openYoutubeVideoDetailsModal, setOpenYoutubeVideoDetailsModal }) => {
  return (
    <AlertDialog open={openYoutubeVideoDetailsModal} onOpenChange={setOpenYoutubeVideoDetailsModal}>

      <AlertDialogContent className='bg-violet-950 overflow-auto max-h-[90vh]'>

        <AlertDialogHeader>

          <AlertDialogTitle className='text-center mb-5'>{videoTitle}</AlertDialogTitle>

          <div className='flex flex-col items-center justify-center text-center gap-8'>

            <span>{videoDescription}</span>

             <Link href={videoLink} target='_blank' className='underline flex items-center justify-center gap-2 text-white'>

                <span className='text-lg'>Youtube Video Link</span>

                <FaExternalLinkAlt className='size-5' />

             </Link>
          </div>

        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>OK</AlertDialogCancel>
        </AlertDialogFooter>

      </AlertDialogContent>

    </AlertDialog>
  )
}

export default YoutubeVideoDetailsModal;