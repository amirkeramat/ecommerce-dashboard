import React from "react";
import SizeForm from "./components/category-from";
import { prismadb } from "@/lib/prismadb";
const SizePage = async ({
  params,
}: {
  params: { sizeId: string; storeId: string };
}) => {
  const size = await prismadb.size.findUnique({
    where: {
      id: params.sizeId,
    },
  });


  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeForm  initialData={size} />
      </div>
    </div>
  );
};

export default SizePage;
