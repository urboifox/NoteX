import { dateFormat } from '@/helpers/dateFormat'
import { getFormattedDate } from '@/helpers/getFormattedDate'
import icons from '@/lib/icons'
import Link from 'next/link'
import React from 'react'
import Skeleton from 'react-loading-skeleton'

export default function DiaryCard({diary}: {diary: DiaryResponse}) {
  return (
    <div className="relative h-fit transition-colors duration-200 hover:bg-white/5 hover:border-white/20 flex flex-col gap-2 p-6 rounded-md border border-white/10">
        <div className="flex items-center justify-between gap-2">
            <time className="text-xs text-primary/80">{diary.createdAt ? dateFormat(diary.createdAt, "relative") : <Skeleton width={100} />}</time>
            <Link href={`/diary/${diary._id ?? ""}`} className="text-white/50 transition-all duration-200 hover:text-white hover:translate-x-1 hover:-translate-y-1 cursor-pointer -rotate-45">
                {icons.arrowRight}
            </Link>
        </div>
        <Link href={`/diary/${diary._id}`}>
            <h2 className="text-xl font-bold line-clamp-1">{diary.createdAt ? getFormattedDate(new Date(diary.createdAt)) : <Skeleton height={20} width={200} />}</h2>
        </Link>
          <p title={diary.brief} className="line-clamp-2 font-light text-neutral-400">{diary.brief ?? <Skeleton width={80} />}</p>
    </div>
  )
}
