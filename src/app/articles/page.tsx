import ArticleCard from "@/components/articles/ArticleCard";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import PaginationArrows from "@/components/common/PaginationArrows";
import icons from "@/lib/icons";
import Link from "next/link";

const article = {
    id: 1,
    title: "Article 1",
    description: "Article 1 description amdoawmoia odiaw mwoa mawod oid ma",
    createdAt: new Date(),
}

const articles = Array(12).fill(article);

export default async function ArticlesPage() {
  return (
    <div className="container pb-5 mt-5 space-y-5">
      <div className="flex items-center justify-between gap-4">
        <Input
          icon={icons.search}
          placeholder="Search..."
        />
        <Link
          href="/articles/create"
        >
            <Button className="p-3">
                {icons.plus}
            </Button>
        </Link>
      </div>

      <div className="gap-4 grid min-h-96 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
        {articles.length > 0 ? (
          articles.map((article, index) => {
            return <ArticleCard key={index} article={article} />;
          })
        ) : (
          <div className="col-span-full flex items-center justify-center flex-col gap-4">
            <p className="text-neutral-400">
              Looks like you haven&apos;t created any articles yet.
            </p>
            <Link href="/articles/create">
              <Button>Create {icons.plus}</Button>
            </Link>
          </div>
        )}
      </div>

      <div className="flex items-center justify-end">
        <PaginationArrows />
      </div>
    </div>
  );
}
