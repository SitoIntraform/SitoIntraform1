"use client";

import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { Copy, Edit, MoreVertical, Trash } from "lucide-react";
import { SectionType } from "@/types";

import axios from "axios";
// import DeleteSomething from "@/components/modals/DeleteSomething";
// import { useDeleteSomething } from "@/hooks/useDeleteSomething";
import { Separator } from "@/components/ui/separator";
import useDeleteModal from "@/hooks/useDelete";
import DeleteModal from "@/components/admin/modals/DeleteModal";

export default function CellActionCorsi({ courseId }: { courseId: string }) {
  const router = useRouter();
  const params = useParams();

  const [deleteModal, setDeleteModal] = useState(false);

  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const onDelete = async () => {
    setLoading(false);

    try {
      const res = await axios.delete(`/api/course/${courseId}`);

      if (res.status === 200) {
        toast.success("Corso cancellato con successo");
        router.refresh();
        return;
      }
    } catch (err: any) {
      console.log(err);
      toast.error(err.response.data);
    } finally {
      setLoading(false);
      setDeleteModal(false);
    }
  };

  return (
    <>
      <DeleteModal
        isOpen={deleteModal}
        onCancel={onDelete}
        onClose={() => setDeleteModal(false)}
        disabled={loading}
        text="Sei sicuro di voler eliminare questo corso?"
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <MoreVertical className="h-4 w-4 cursor-pointer " />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Azioni</DropdownMenuLabel>
          <DropdownMenuItem
            disabled={loading}
            onClick={() => router.push(`/admin/corsi/${courseId}`)}
            className="cursor-pointer"
          >
            <Edit className="w-4 h-4 mr-2" />
            Modifica
          </DropdownMenuItem>
          <Separator className="my-1" />
          <DropdownMenuItem
            disabled={loading}
            onClick={() => setDeleteModal(true)}
            className="cursor-pointer"
          >
            <Trash className="w-4 h-4 mr-2" />
            Elimina
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
