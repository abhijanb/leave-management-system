import { UseFormRegister, FieldErrors } from "react-hook-form";
import { TYPE_OPTIONS } from "@/features/shared/constants/messages";
import { LeaveType } from "@/features/shared/types";

export interface LeaveFormData {
  type: LeaveType;
  startDate: string;
  endDate: string;
  reason: string;
}

interface Props {
  register: UseFormRegister<LeaveFormData>;
  submitForm: (e: React.FormEvent<HTMLFormElement>) => void;
  errors: FieldErrors<LeaveFormData>;
  onClose?: () => void;
  isLoading: boolean;
  idPrefix?: string;
  submitLabel?: string;
}

const leaveTypes = TYPE_OPTIONS.filter((t) => t !== "All") as LeaveType[];

export function LeaveForm({
  register,
  submitForm,
  errors,
  onClose,
  isLoading,
  idPrefix = "leave",
  submitLabel = "Save Changes",
}: Props) {
    return (
        <form className="flex flex-col gap-5" onSubmit={submitForm}>
            <div>
                <label className="text-xs font-medium text-on-surface-variant uppercase tracking-wider block mb-1" htmlFor={`${idPrefix}-type`}>
                    Leave Type
                </label>
                <select
                    id={`${idPrefix}-type`}
                    className="w-full px-4 py-2 bg-background border border-outline-variant rounded-md text-on-surface focus:outline-none focus:border-primary"
                    {...register("type")}
                >
                    {leaveTypes.map((t) => (
                        <option key={t} value={t}>{t}</option>
                    ))}
                </select>
                {errors.type && <p className="text-xs text-error mt-1">{errors.type.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="text-xs font-medium text-on-surface-variant uppercase tracking-wider block mb-1" htmlFor={`${idPrefix}-startDate`}>
                        Start Date
                    </label>
                    <input
                        id={`${idPrefix}-startDate`}
                        type="date"
                        className="w-full px-4 py-2 bg-background border border-outline-variant rounded-md text-on-surface focus:outline-none focus:border-primary"
                        {...register("startDate")}
                    />
                    {errors.startDate && <p className="text-xs text-error mt-1">{errors.startDate.message}</p>}
                </div>
                <div>
                    <label className="text-xs font-medium text-on-surface-variant uppercase tracking-wider block mb-1" htmlFor={`${idPrefix}-endDate`}>
                        End Date
                    </label>
                    <input
                        id={`${idPrefix}-endDate`}
                        type="date"
                        className="w-full px-4 py-2 bg-background border border-outline-variant rounded-md text-on-surface focus:outline-none focus:border-primary"
                        {...register("endDate")}
                    />
                    {errors.endDate && <p className="text-xs text-error mt-1">{errors.endDate.message}</p>}
                </div>
            </div>

            <div>
                <label className="text-xs font-medium text-on-surface-variant uppercase tracking-wider block mb-1" htmlFor={`${idPrefix}-reason`}>
                    Reason
                </label>
                <textarea
                    id={`${idPrefix}-reason`}
                    rows={4}
                    placeholder="Brief reason for leave..."
                    className="w-full px-4 py-2 bg-background border border-outline-variant rounded-md text-on-surface placeholder-outline focus:outline-none focus:border-primary resize-none"
                    {...register("reason")}
                />
                {errors.reason && <p className="text-xs text-error mt-1">{errors.reason.message}</p>}
            </div>

            <div className="flex gap-3 justify-end pt-2">
                {onClose && (
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-on-surface-variant bg-surface-container-high hover:bg-surface-container-highest rounded-md transition-colors"
                    >
                        Cancel
                    </button>
                )}
                <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium bg-primary text-on-primary rounded-md hover:brightness-110 transition-all disabled:opacity-50"
                    disabled={isLoading}
                >
                    {isLoading ? "Saving..." : submitLabel}
                </button>
            </div>
        </form>
    )
}
