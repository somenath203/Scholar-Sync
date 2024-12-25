'use client';

import Link from 'next/link';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';


const BreadCrumbComponent = ({ link, name, itemId, tailwindClasses }) => {

  return (
    <Breadcrumb className={tailwindClasses}>

        <BreadcrumbList>

          <BreadcrumbItem>

            <Link href={link} className='tracking-wider font-semibold'>

              {name}

            </Link>

          </BreadcrumbItem>

          <BreadcrumbSeparator />

          <BreadcrumbItem>

            <BreadcrumbPage className='tracking-wider font-semibold'>

              {name} ID: <span className='text-violet-300'>{itemId}</span>

            </BreadcrumbPage>
            
          </BreadcrumbItem>

        </BreadcrumbList>

    </Breadcrumb>
  );

};


export default BreadCrumbComponent;
