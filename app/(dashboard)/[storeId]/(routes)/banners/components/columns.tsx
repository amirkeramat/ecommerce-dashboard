"use client";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import CellAction from "./cell-action";
import Image from "next/image";

export type BannerColumn = {
  id: string;
  label: string;
  imageUrl: string;
  isDefault: boolean;
  createdAt: string;
};

export const columns: ColumnDef<BannerColumn>[] = [
  {
    accessorKey: "label",
    header: ({ column }) => {
      return (
        <Button
          className="p-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Label
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          className="p-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "imageUrl",
    header: ({}) => {
      return <div>Image</div>;
    },
    cell: ({ row }) => (
      <Image
        width={62}
        height={62}
        alt="banner-img"
        className="object-centre"
        src={row.original.imageUrl}
      />
    ),
  },
  {
    accessorKey: "isDefault",
    header: ({}) => {
      return <div>Active Banner</div>;
    },
    cell: ({ row }) => (
      <div
        className={`w-6 h-6 rounded-full border  ${
          row.original.isDefault ? "bg-neutral-500 animate-pulse" : "bg-transparent"
        }`}
      ></div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
    header: ({}) => {
      return <div></div>;
    },
  },
];
