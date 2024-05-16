import Button from "@/components/common/Button";
import CreateDiary from "@/components/forms/CreateDiary";
import icons from "@/lib/icons";
import Link from "next/link";

export default async function CreateArticlePage({params: {articleId}}: {params: {articleId: string}}) {

  return (
    <div className="container pb-10">
      <Link className="mb-5 w-max flex" href="/diary">
        <Button>{icons.angleLeft} Back to diary</Button>
      </Link>

      <CreateDiary />
    </div>
  );
}