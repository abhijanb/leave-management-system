'use client'

import LeaveForm from "@/features/employee/components/ui/LeaveForm";
import { useApplyLeave } from "@/features/employee/hooks/useApplyLeave";

export default function ApplyLeavePage() {
    const { register, handleSubmit, errors, isLoading, onSubmit } = useApplyLeave();

  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-on-surface">Apply for Leave</h2>
        <p className="text-sm text-on-surface-variant mt-1">Fill in the details below to submit a new leave request.</p>
      </div>

      <div className="bg-surface border border-outline-variant rounded-xl p-4 md:p-6">
        <LeaveForm
          errors={errors}
          isLoading={isLoading}
          register={register}
          submitForm={handleSubmit(onSubmit)}
          submitLabel="Submit Request"
          idPrefix="apply"
        />
      </div>
    </div>
  );
}
