'use client';
import icons from "@/lib/icons";
import Button from "./Button";
import { useRouter, useSearchParams } from "next/navigation";
import { useQueryString } from "@/hooks/useQueryString";
import { PER_PAGE } from "@/constants";

export default function PaginationArrows({ count, perPage = PER_PAGE }: { count: number, perPage?: number }) {

  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPage = searchParams.get('page') || '1';

  const isFirst = parseInt(currentPage) === 1;
  const isLast = count - perPage * parseInt(currentPage) <= 0;

  const { appendQueryString } = useQueryString();
  
  const handlePrev = () => {
    if (!isFirst) {
      const prevPage = parseInt(currentPage) - 1;
      const queryString = appendQueryString('page', prevPage.toString());
      router.push(`?${queryString}`, { scroll: false });
    }
  }

  const handleNext = () => {
    if (!isLast) {
      const nextPage = currentPage ? parseInt(currentPage) + 1 : 2;
      const queryString = appendQueryString('page', nextPage.toString());
      router.push(`?${queryString}`, { scroll: false });
    }
  }

  return (
    <div className="flex items-center gap-4">
      <Button disabled={isFirst} onClick={handlePrev}>
        {icons.arrowLeft}
      </Button>
      <Button disabled={isLast} onClick={handleNext}>
        {icons.arrowRight}
      </Button>
    </div>
  )
}
