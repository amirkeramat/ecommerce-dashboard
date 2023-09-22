import { format } from "date-fns";
import { prismadb } from "@/lib/prismadb";
import BillboardClient from "./components/client";
import { BannerColumn } from "./components/columns";

const Banners = async ({ params }: { params: { storeId: string } }) => {
  const Banners = await prismadb.banner.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  console.log(Banners);

  const formattedBanners: BannerColumn[] = Banners.map((item) => ({
    id: item.id,
    label: item.label,
    imageUrl: item.imageUrl,
    isDefault:item.isDefault,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedBanners} />
      </div>
    </div>
  );
};

export default Banners;
