import Button from "@/components/common/Button";
import DiaryForm from "@/components/forms/DiaryForm";
import icons from "@/lib/icons";
import Link from "next/link";

export default async function CreateDiaryPage() {

  return (
    <div className="container pb-10">
      <Link className="mb-5 w-max flex" href="/diary">
        <Button>{icons.angleLeft} Back</Button>
      </Link>

      <DiaryForm />
    </div>
  );
}