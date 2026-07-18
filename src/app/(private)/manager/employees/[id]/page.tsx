'use client'

import { useState, useCallback } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useGetEmployeeQuery, useGetManagerLeavesQuery } from "@/features/manager/managerApi";
import RequestsTable from "@/features/manager/components/RequestsTable";
import ErrorMessage from "@/features/shared/ui/ErrorMessage";
import { MESSAGES } from "@/features/shared/constants/messages";
import { ChevronLeft } from "lucide-react";
import type { StatusFilterValue, TypeFilterValue, SortOrder } from "@/features/shared/types";

export default function EmployeeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const employeeId = Number(id);

  const { data: employee, isLoading: employeeLoading, isError: employeeError } = useGetEmployeeQuery(employeeId);

  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<StatusFilterValue>("All");
  const [type, setType] = useState<TypeFilterValue>("All");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const employeeName = employee?.name ?? "";

  const { data: leaves, isLoading: leavesLoading, isFetching: leavesFetching, isError: leavesError } = useGetManagerLeavesQuery({
    page,
    limit: 10,
    employee: employeeName || undefined,
    status: status === "All" ? undefined : status,
    type: type === "All" ? undefined : type,
    sortBy: "startDate",
    sortOrder,
  }, { skip: !employeeName });

  const handleStatus = useCallback((s: StatusFilterValue) => { setStatus(s); setPage(1); }, []);
  const handleType = useCallback((t: TypeFilterValue) => { setType(t); setPage(1); }, []);

  return (
    <>
      <div className="flex items-center gap-3 mb-2">
        <Link href="/manager/employees" className="p-1.5 rounded-lg hover:bg-surface-container-high transition-colors">
          <ChevronLeft className="w-5 h-5 text-on-surface-variant" />
        </Link>
        <div>
          <h2 className="text-xl font-bold text-on-surface">Employee Details</h2>
          <p className="text-sm text-on-surface-variant">Leave requests for this team member.</p>
        </div>
      </div>

      {employeeError && <ErrorMessage message={MESSAGES.errorEmployees} />}
      {leavesError && <ErrorMessage message={MESSAGES.errorLeaves} />}

      {employeeLoading ? (
        <div className="bg-surface border border-outline-variant rounded-xl p-6 space-y-4 animate-pulse">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-surface-container-high" />
            <div className="space-y-2">
              <div className="h-5 w-40 rounded bg-surface-container-high" />
              <div className="h-4 w-56 rounded bg-surface-container-high" />
            </div>
          </div>
        </div>
      ) : employee ? (
        <div className="bg-surface border border-outline-variant rounded-xl p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl font-bold shrink-0">
              {employee.name[0].toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-lg font-semibold text-on-surface truncate">{employee.name}</p>
              <p className="text-sm text-on-surface-variant truncate">{employee.email}</p>
            </div>
          </div>
        </div>
      ) : null}

      <RequestsTable
        leaves={leaves}
        loading={leavesLoading}
        fetching={leavesFetching}
        page={page}
        setPage={setPage}
        status={status}
        setStatus={handleStatus}
        type={type}
        setType={handleType}
        employee=""
        setEmployee={() => {}}
        sortOrder={sortOrder}
        onSortToggle={() => setSortOrder((o) => o === "asc" ? "desc" : "asc")}
      />
    </>
  );
}
