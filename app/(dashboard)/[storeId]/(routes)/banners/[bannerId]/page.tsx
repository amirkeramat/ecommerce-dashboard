import { prismadb } from "@/lib/prismadb";

import BannersForm from "./components/banner-form";

const BillboardPage = async ({
  params,
}: {
  params: { bannerId: string };
}) => {
  const banner = await prismadb.banner.findUnique({
    where: {
      id: params.bannerId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BannersForm initialData={banner} />
      </div>
    </div>
  );
};

export default BillboardPage;
