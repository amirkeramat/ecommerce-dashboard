import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import { prismadb } from "@/lib/prismadb";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { label, imageUrl, isDefault } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!label) {
      return new NextResponse("label is required", { status: 400 });
    }
    if (!imageUrl) {
      return new NextResponse("image URL is required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("store Id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    await prismadb.banner.updateMany({
      where: {
        storeId: params.storeId,
        isDefault: true,
      },
      data: {
        isDefault: false,
      },
    });

    const banner = await prismadb.banner.create({
      data: {
        label,
        imageUrl,
        isDefault,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(banner);
  } catch (error) {
    console.log("[BANNER_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("store Id is required", { status: 400 });
    }

    const banners = await prismadb.banner.  findFirst({
      where: {
        storeId: params.storeId,
        isDefault: true,
      },
    });

    return NextResponse.json(banners);
  } catch (error) {
    console.log("[BANNERS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
