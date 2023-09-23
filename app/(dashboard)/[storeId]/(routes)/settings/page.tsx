import { prismadb } from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import SettingsForm from "./components/settings-form";
import { Suspense } from "react";
import Loading from "../../loading";

interface SettingsPageProps {
  params: {
    storeId: string;
  };
}
const SettingsPage: React.FC<SettingsPageProps> = async ({ params }) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <div className="flex-col ">
      <div className="flex-1 space-y-4 px-2 md:p-8 pt-6 ">
        <Suspense fallback={<Loading/>}>
          <SettingsForm initialData={store} />
        </Suspense>
      </div>
    </div>
  );
};

export default SettingsPage;
