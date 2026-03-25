import { useStore } from "../store/Store";

const statusColors = {
  todo: "bg-secondary-400",
  inprogress: "bg-primary-500",
  review: "bg-accent-500",
  done: "bg-green-500",
};

export function TimelineView() {
  const tasks = useStore((s) => s.tasks);
  const startOfMonth = new Date();
  startOfMonth.setDate(1);

  const pxPerDay = 30;
  const daysInMonth = new Date(startOfMonth.getFullYear(), startOfMonth.getMonth() + 1, 0).getDate();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-secondary-900 mb-2">Project Timeline</h2>
        <p className="text-secondary-600">Visualize task schedules and deadlines</p>
      </div>
      <div className="bg-white rounded-lg shadow-soft border border-secondary-200 p-6">
        <div className="overflow-x-auto">
          <div className="relative min-w-[1200px]">
            <div className="flex mb-4 border-b border-secondary-200 pb-2">
              <div className="w-48 flex-shrink-0 pr-4">
                <span className="text-sm font-semibold text-secondary-700">Task</span>
              </div>
              <div className="flex">
                {days.map((day) => (
                  <div key={day} className="w-8 text-center text-xs text-secondary-500">
                    {day}
                  </div>
                ))}
              </div>
            </div>

            <div
              className="absolute top-8 bottom-0 w-[2px] bg-accent-500 z-10"
              style={{ left: 192 + (new Date().getDate() - 1) * 32 }}
            >
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-accent-500 text-white text-xs px-2 py-1 rounded">
                Today
              </div>
            </div>

            <div className="space-y-3">
              {tasks.map((t) => {
                const start = t.startDate ? new Date(t.startDate) : new Date(t.dueDate);
                const due = new Date(t.dueDate);

                const left = 192 + ((start.getDate() - 1) * 32);
                const width = Math.max(32, (due.getDate() - start.getDate() + 1) * 32);

                const colorClass = statusColors[t.status];

                return (
                  <div key={t.id} className="flex items-center">
                    <div className="w-48 flex-shrink-0 pr-4">
                      <div className="text-sm font-medium text-secondary-900 truncate">{t.title}</div>
                      <div className="text-xs text-secondary-500">{t.assignee}</div>
                    </div>
                    <div className="relative flex-1">
                      <div
                        className={`h-8 ${colorClass} rounded-lg shadow-sm flex items-center px-3 text-white text-xs font-medium hover:shadow-md transition-shadow duration-200`}
                        style={{ marginLeft: left - 192, width }}
                      >
                        <span className="truncate">{t.title}</span>
                      </div>
                      <div
                        className="absolute top-0 w-1 h-8 bg-accent-600 rounded-r"
                        style={{ left: 192 + (due.getDate() - 1) * 32 - 192 + width - 4 }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}