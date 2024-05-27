'use client';
import { dateFormat } from '@/helpers/dateFormat'
import icons from '@/lib/icons'
import Link from 'next/link'
import Skeleton from 'react-loading-skeleton'
import Tooltip from '../common/Tooltip';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { AuthAtom } from '@/recoil/atoms/AuthAtom';

export default function BlogCard({ blog }: {blog: BlogResponse}) {

    const auth = useRecoilValue(AuthAtom);
    const [copyText, setCopyText] = useState("Copy link")

    const handleCopy = () => {
        navigator.clipboard.writeText(window.location.origin + "/" +auth?.username + "/blogs/" + blog.slug);
        setCopyText("Copied!")
        setTimeout(() => setCopyText("Copy link"), 2000)
    }

  return (
      <div className="relative h-fit transition-colors duration-200 hover:bg-white/5 hover:border-white/20 flex flex-col gap-2 p-6 rounded-md border border-white/10">
          <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div>
                    {blog.published ? icons.globe : icons.lock}
                </div>
                  <time className="text-xs text-primary/80">
                      {blog.createdAt ? (
                          dateFormat(blog.createdAt, "date")
                      ) : (
                          <Skeleton width={100} />
                      )}
                  </time>
                  {" - "}
                  <time className="text-xs text-primary/80">
                      {blog.createdAt ? (
                          dateFormat(blog.createdAt, "relative")
                      ) : (
                          <Skeleton width={100} />
                      )}
                  </time>
              </div>
              <div className="flex items-center gap-2">
                <Tooltip title={copyText}>
                  <div onClick={handleCopy} className='text-white/50 transition-all duration-200 hover:text-white cursor-pointer'>{icons.link}</div>
                </Tooltip>
                  <Link
                      href={`/blog/${blog.slug ?? ""}`}
                      className="text-white/50 transition-all duration-200 hover:text-white hover:translate-x-1 hover:-translate-y-1 cursor-pointer -rotate-45"
                  >
                      {icons.arrowRight}
                  </Link>
              </div>
          </div>
          <Link href={`/blog/${blog.slug}`}>
              <h2 className="text-xl font-bold line-clamp-1">
                  {blog.title || <Skeleton height={20} width={200} />}
              </h2>
          </Link>
          <p
              title={blog.brief}
              className="line-clamp-2 font-light text-neutral-400"
          >
              {blog.brief ?? <Skeleton width={80} />}
          </p>
      </div>
  );
}
