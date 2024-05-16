import { dateFormat } from '@/helpers/dateFormat'
import { getFormattedDate } from '@/helpers/getFormattedDate'
import icons from '@/lib/icons'
import Link from 'next/link'
import React from 'react'

export default function DiaryCard({diary}: {diary: DiaryResponse}) {
  return (
    <div className="relative h-fit transition-colors duration-100 hover:bg-white/5 flex flex-col gap-2 p-6 rounded-md border border-white/10 bg-white/10">
        <div className="flex items-center justify-between gap-2">
            <time className="text-xs text-primary/80">{dateFormat(diary.createdAt, "relative")}</time>
            <Link href={`/diary/${diary._id}`} className="text-white/50 transition-all duration-200 hover:text-white hover:translate-x-1 hover:-translate-y-1 cursor-pointer -rotate-45">
                {icons.arrowRight}
            </Link>
        </div>
        <Link href={`/diary/${diary._id}`}>
            <h2 className="text-xl font-bold line-clamp-1">{getFormattedDate(new Date(diary.createdAt))}</h2>
        </Link>
          <p title={diary.brief} className="line-clamp-2 font-light text-neutral-400">{diary.brief}</p>
    </div>
  )
}
