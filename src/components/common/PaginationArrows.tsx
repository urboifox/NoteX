'use client';
import icons from "@/lib/icons";
import Button from "./Button";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function PaginationArrows() {

  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPage = searchParams.get('page');

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
 
      return params.toString()
    },
    [searchParams]
  )
  
  const handlePrev = () => {
    if (currentPage && parseInt(currentPage) >= 2) {
      const prevPage = parseInt(currentPage) - 1;
      const queryString = createQueryString('page', prevPage.toString());
      router.push(`?${queryString}`);
    }
  }

  const handleNext = () => {
    const nextPage = currentPage ? parseInt(currentPage) + 1 : 2;
    const queryString = createQueryString('page', nextPage.toString());
    router.push(`?${queryString}`);
  }

  return (
    <div className="flex items-center gap-4">
      <Button onClick={handlePrev}>
        {icons.arrowLeft}
      </Button>
      <Button onClick={handleNext}>
        {icons.arrowRight}
      </Button>
    </div>
  )
}
