'use client'

import { useState, memo } from "react";
import { Search } from "lucide-react";
import { useGetEmployeesQuery } from "@/features/manager/managerApi";
import { useDebounce } from "@/features/shared/hooks/useDebounce";
import ErrorMessage from "@/features/shared/ui/ErrorMessage";
import { MESSAGES } from "@/features/shared/constants/messages";

function EmployeeListPage() {
  const { data: employees, isLoading, isError } = useGetEmployeesQuery();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  const filtered = (employees ?? []).filter(
    (e) => e.name.toLowerCase().includes(debouncedSearch.toLowerCase()) || e.email.toLowerCase().includes(debouncedSearch.toLowerCase()),
  );

  return (
    <>
      <div>
        <h2 className="text-xl font-bold text-on-surface">Employees</h2>
        <p className="text-sm text-on-surface-variant">View and manage team members.</p>
      </div>

      {isError && <ErrorMessage message={MESSAGES.errorEmployees} />}

      <div className="bg-surface border border-outline-variant rounded-xl overflow-hidden">
        <div className="p-4 border-b border-outline-variant">
          <div className="relative max-w-xs">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
            <input
              type="text"
              placeholder="Search employees..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm bg-background border border-outline-variant rounded-md text-on-surface placeholder-outline focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="divide-y divide-outline-variant">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 p-4 animate-pulse">
                <div className="w-10 h-10 rounded-full bg-surface-container-high" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 rounded bg-surface-container-high w-1/3" />
                  <div className="h-3 rounded bg-surface-container-high w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center text-sm text-on-surface-variant">
            {search ? "No employees match your search." : "No employees found."}
          </div>
        ) : (
          <div className="divide-y divide-outline-variant">
            {filtered.map((employee) => (
              <div key={employee.id} className="flex items-center gap-4 px-4 py-3 hover:bg-surface-container-low transition-colors">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold shrink-0">
                  {employee.name[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-on-surface truncate">{employee.name}</p>
                  <p className="text-xs text-on-surface-variant truncate">{employee.email}</p>
                </div>
                <span className="text-xs font-medium capitalize bg-surface-container-high px-2 py-1 rounded text-on-surface-variant">
                  {employee.role}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default memo(EmployeeListPage);
