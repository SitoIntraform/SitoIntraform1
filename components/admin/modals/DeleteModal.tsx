"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import axios from "axios";
import { Check, DoorClosed, LogOut, Trash } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

function DeleteModal({
  isOpen,
  onClose,
  onCancel,
  disabled,
  text
}: {
  isOpen: boolean;
  onClose: () => void;
  onCancel: () => void;
  disabled?: boolean;
  text: string;
}) {
  return (
    <Modal
      open={isOpen}
      title="Elimina"
      containerClass=""
      body={
        <>
          <p className="m-5 text-center large-normal">
            {text}
          </p>
        </>
      }
      bodyContainerClass=""
      footer={
        <div className="w-full flex md:flex-row flex-col items-center gap-3">
          <Button
            className="w-full h-[50px]"
            wfull
            onClick={onCancel}
            disabled={disabled}
          >
            <div className="flex flex-row items-center justify-center gap-2">
              <Trash />
              Cancella
            </div>
          </Button>
          <Button
            className="w-full h-[50px]"
            wfull
            onClick={onClose}
            disabled={disabled}
            secondary
          >
            <div className="flex flex-row items-center justify-center gap-2">
              <LogOut />
              Chiudi
            </div>
          </Button>
        </div>
      }
      footerContainerClass=""
      onClose={onClose}
    />
  );
}

export default DeleteModal;
