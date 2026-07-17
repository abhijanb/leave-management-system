'use client'

import { X } from "lucide-react";
import type { LeaveResponse } from "@/features/manager/managerApi";
import { useEditLeave } from "../hooks/useEditLeave";
import { LeaveForm } from "./ui/LeaveForm";

interface Props {
  leave: LeaveResponse;
  onClose: () => void;
}

export function EditLeaveModal({ leave, onClose }: Props) {
  const { register, handleSubmit, errors, isLoading, onSubmit } = useEditLeave(leave, onClose);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div
        className="bg-surface border border-outline-variant rounded-xl p-6 w-full max-w-lg mx-4 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-on-surface">Edit Leave Request</h3>
          <button onClick={onClose} className="p-1 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <LeaveForm
          errors={errors}
          isLoading={isLoading}
          onClose={onClose}
          register={register}
          submitForm={handleSubmit(onSubmit)}
          idPrefix="edit"
        />
      </div>
    </div>
  );
}
