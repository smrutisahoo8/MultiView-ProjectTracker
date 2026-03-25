import { useStore } from "../store/Store";
import { useRef, useState, useEffect } from "react";

const priorityConfig = {
  low: { bg: "bg-secondary-100", text: "text-secondary-700" },
  medium: { bg: "bg-yellow-100", text: "text-yellow-700" },
  high: { bg: "bg-accent-100", text: "text-accent-700" },
  critical: { bg: "bg-red-100", text: "text-red-700" },
};

const statusConfig = {
  todo: { bg: "bg-secondary-100", text: "text-secondary-700" },
  inprogress: { bg: "bg-primary-100", text: "text-primary-700" },
  review: { bg: "bg-accent-100", text: "text-accent-700" },
  done: { bg: "bg-green-100", text: "text-green-700" },
};

export function ListView() {
  const tasks = useStore((s) => s.tasks);
  const ref = useRef<HTMLDivElement>(null);

  const rowHeight = 60;
  const buffer = 5;

  const [scrollTop, setScrollTop] = useState(0);
  const [containerHeight, setContainerHeight] = useState(500);

  const visibleCount = Math.ceil(containerHeight / rowHeight) + buffer * 2;
  let start = Math.floor(scrollTop / rowHeight) - buffer;
  start = Math.max(0, start);

  const end = start + visibleCount;

  const visible = tasks.slice(start, end);

  useEffect(() => {
    const updateHeight = () => {
      if (ref.current) {
        setContainerHeight(ref.current.clientHeight);
      }
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-secondary-900 mb-2">Task List</h2>
        <p className="text-secondary-600">View all your project tasks in a detailed list</p>
      </div>
      <div className="bg-white rounded-lg shadow-soft border border-secondary-200 overflow-hidden">
        <div className="bg-secondary-50 px-6 py-3 border-b border-secondary-200">
          <div className="grid grid-cols-12 gap-4 text-sm font-semibold text-secondary-700">
            <div className="col-span-4">Task</div>
            <div className="col-span-2">Assignee</div>
            <div className="col-span-2">Priority</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Due Date</div>
          </div>
        </div>
        <div
          ref={ref}
          onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
          className="h-[500px] overflow-auto"
        >
          <div style={{ height: tasks.length * rowHeight }}>
            <div style={{ transform: `translateY(${start * rowHeight}px)` }}>
              {visible.map((t) => {
                const pConfig = priorityConfig[t.priority];
                const sConfig = statusConfig[t.status];
                return (
                  <div key={t.id} className="h-[60px] border-b border-secondary-100 hover:bg-secondary-50 transition-colors duration-150">
                    <div className="grid grid-cols-12 gap-4 items-center px-6 py-3 text-sm">
                      <div className="col-span-4 font-medium text-secondary-900">{t.title}</div>
                      <div className="col-span-2 flex items-center">
                        <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white text-xs font-medium mr-3">
                          {t.assignee.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-secondary-700">{t.assignee}</span>
                      </div>
                      <div className="col-span-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${pConfig.bg} ${pConfig.text}`}>
                          {t.priority}
                        </span>
                      </div>
                      <div className="col-span-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${sConfig.bg} ${sConfig.text}`}>
                          {t.status}
                        </span>
                      </div>
                      <div className="col-span-2 text-secondary-600">{t.dueDate}</div>
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
