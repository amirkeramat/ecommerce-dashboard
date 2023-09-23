import { format } from "date-fns";
import { prismadb } from "@/lib/prismadb";

import CategoryClient from "./components/client";
import { CategoryColumn } from "./components/columns";
import { Suspense } from "react";
import Loading from "../../loading";
const CategoriesPage = async ({ params }: { params: { storeId: string } }) => {
  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCategories: CategoryColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    billboardLabel: item.billboard.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <>
      <div className="flex-col">
        <div className="flex-1 space-y-4 px-2 md:p-8 pt-6">
          <Suspense fallback={<Loading />}>
            <CategoryClient data={formattedCategories} />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default CategoriesPage;
