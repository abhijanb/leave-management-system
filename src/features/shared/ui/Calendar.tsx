'use client'

import { Calendar as BigCalendar } from "react-big-calendar";
import type { View } from "react-big-calendar";
import { localizer } from "../lib/calendar";
import type { Event } from "react-big-calendar";
import { memo } from "react";

export interface CalendarEvent extends Event {
  id: number;
  title: string;
  start: Date;
  end: Date;
  status: "Pending" | "Approved" | "Rejected";
}

interface Props {
  events: CalendarEvent[];
  defaultView?: View;
  selectable?: boolean;
  onSelectEvent?: (event: CalendarEvent) => void;
}

const statusStyles: Record<CalendarEvent["status"], string> = {
  Pending: "bg-pending-bg text-pending-text border border-pending-text",
  Approved: "bg-approved-bg text-approved-text border border-approved-text",
  Rejected: "bg-rejected-bg text-rejected-text border border-rejected-text",
};

function Calendar({ events, defaultView = "month", selectable = false, onSelectEvent }: Props) {
  return (
    <div className="rbc-calendar">
      <BigCalendar<CalendarEvent>
        localizer={localizer}
        events={events}
        defaultView={defaultView}
        selectable={selectable}
        onSelectEvent={onSelectEvent}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        eventPropGetter={(event) => ({
          className: statusStyles[event.status],
        })}
        views={["month", "week", "day"]}
      />
    </div>
  );
}

export default memo(Calendar);
