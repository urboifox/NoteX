import Button from "@/components/common/Button";
import DiaryActions from "@/components/diaries/DiaryActions";
import icons from "@/lib/icons";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";

export default function OneDiaryLoading() {
  return (
      <div className="container flex flex-col gap-5">
          <Link href="/diary">
              <Button>{icons.arrowLeft} Back</Button>
          </Link>
          <div className="flex items-end justify-between">
              <Skeleton width={300} height={30} />
              <DiaryActions diaryId={""} />
          </div>
          <Skeleton height={300} />
      </div>
  );
}
