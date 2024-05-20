import Button from '@/components/common/Button'
import icons from '@/lib/icons'
import Link from 'next/link'
import React from 'react'
import Skeleton from 'react-loading-skeleton'

export default function CreateDiaryLoading() {
  return (
    <div className="container pb-10">
      <Link className="mb-5 w-max flex" href="/diary">
        <Button>{icons.angleLeft} Back</Button>
      </Link>

        <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-2'>
                Brief
                <Skeleton height={40} />
            </div>

            <div className='flex flex-col gap-2'>
                Content
                <Skeleton height={300} />
            </div>
            <Button className="w-full">Add</Button>
        </div>
    </div>
  )
}
