import { prismadb } from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";



export async function GET(
  req: Request,
  { params }: { params: {  bannerId: string } }
) {
  try {

    if (!params.bannerId) {
      return new NextResponse("Banner id is required", { status: 400 });
    }


    const banner = await prismadb.banner.findUnique({
      where: {
        id: params.bannerId,
      },
    });

    return NextResponse.json(banner);
  } catch (error) {
    console.log("[BANNER_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; bannerId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { label,imageUrl,isDefault } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!label) {
      return new NextResponse("label is required", { status: 400 });
    }
    if (!imageUrl) {
      return new NextResponse("image URL is required", { status: 400 });
    }

    if (!params.bannerId) {
      return new NextResponse("Banner Id is required", { status: 400 });
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

    const banner = await prismadb.banner.updateMany({
      where: {
        id: params.bannerId,
      },
      data: {
        label,imageUrl,isDefault
      },
    });

    return NextResponse.json(banner);
  } catch (error) {
    console.log("[BANNER_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string,bannerId:string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.bannerId) {
      return new NextResponse("Banner id is required", { status: 400 });
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

    const banner = await prismadb.banner.deleteMany({
      where: {
        id: params.bannerId,
      },
    });

    return NextResponse.json(banner);
  } catch (error) {
    console.log("[BANNER_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
