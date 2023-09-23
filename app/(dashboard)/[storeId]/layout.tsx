import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import { prismadb } from "@/lib/prismadb";
import Navbar from "@/components/navbar";
import Loading from "./loading";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
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
    <>
      <Navbar />
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </>
  );
}
