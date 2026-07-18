'use client'

import { useMemo } from "react";
import { useGetManagerLeavesQuery } from "@/features/manager/managerApi";
import Calendar, { type CalendarEvent } from "@/features/shared/ui/Calendar";
import CalendarSkeleton from "@/features/shared/ui/CalendarSkeleton";
import ErrorMessage from "@/features/shared/ui/ErrorMessage";
import { MESSAGES } from "@/features/shared/constants/messages";
import { parseISO } from "date-fns";

export default function ManagerCalendarPage() {
  const { data: leaves, isLoading, isError } = useGetManagerLeavesQuery({ page: 1, limit: 500 });

  const events: CalendarEvent[] = useMemo(() => {
    return (leaves?.data ?? []).map((leave) => ({
      id: leave.id,
      title: `${leave.user.name} — ${leave.type}`,
      start: parseISO(leave.startDate),
      end: parseISO(leave.endDate),
      status: leave.status,
    }));
  }, [leaves]);

  return (
    <>
      <div>
        <h2 className="text-xl font-bold text-on-surface">Calendar</h2>
        <p className="text-sm text-on-surface-variant">View all team leave requests on a calendar.</p>
      </div>

      {isError && <ErrorMessage message={MESSAGES.errorLeaves} />}

      {isLoading ? (
        <CalendarSkeleton />
      ) : (
        <Calendar events={events} />
      )}
    </>
  );
}
