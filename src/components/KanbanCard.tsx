import { Task } from "../store/Store";

const priorityConfig = {
  low: { bg: "bg-secondary-100", text: "text-secondary-700", dot: "bg-secondary-400" },
  medium: { bg: "bg-yellow-100", text: "text-yellow-700", dot: "bg-yellow-400" },
  high: { bg: "bg-accent-100", text: "text-accent-700", dot: "bg-accent-400" },
  critical: { bg: "bg-red-100", text: "text-red-700", dot: "bg-red-400" },
};

export function KanbanCard({ task, onDragStart, isDragged }: { task: Task; onDragStart: (taskId: string, element: HTMLElement, startX: number, startY: number) => void; isDragged: boolean }) {
  const config = priorityConfig[task.priority];

  return (
    <div
      className={`bg-white rounded-lg shadow-soft border border-secondary-200 p-4 hover:shadow-medium transition-shadow duration-200 cursor-move ${
        isDragged ? 'opacity-0' : ''
      }`}
      style={{ touchAction: 'none' }}
      onPointerDown={(e) => {
        e.preventDefault();
        const element = e.currentTarget as HTMLElement;
        const rect = element.getBoundingClientRect();
        onDragStart(task.id, element, e.clientX, e.clientY);
      }}
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-semibold text-secondary-900 text-sm leading-tight">
          {task.title}
        </h4>
        <div className={`w-2 h-2 rounded-full ${config.dot} flex-shrink-0 ml-2`}></div>
      </div>
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center">
          <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center text-white text-xs font-medium mr-2">
            {task.assignee.charAt(0).toUpperCase()}
          </div>
          <span className="text-secondary-600">{task.assignee}</span>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${config.bg} ${config.text}`}>
          {task.priority}
        </span>
      </div>
    </div>
  );
}