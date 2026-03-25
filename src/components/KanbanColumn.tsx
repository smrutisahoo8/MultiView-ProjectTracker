import { Task, Status } from "../store/Store";
import { KanbanCard } from "./KanbanCard";

const statusConfig = {
  todo: { bg: "bg-secondary-100", border: "border-secondary-200", text: "text-secondary-700" },
  inprogress: { bg: "bg-primary-100", border: "border-primary-200", text: "text-primary-700" },
  review: { bg: "bg-accent-100", border: "border-accent-200", text: "text-accent-700" },
  done: { bg: "bg-green-100", border: "border-green-200", text: "text-green-700" },
};

export function KanbanColumn({
  status,
  tasks,
  onDragStart,
  isHovered,
  draggedTask
}: {
  status: Status;
  tasks: Task[];
  onDragStart: (taskId: string, element: HTMLElement, startX: number, startY: number) => void;
  isHovered: boolean;
  draggedTask: string | null;
}) {
  const config = statusConfig[status];

  return (
    <div
      data-column-status={status}
      className={`${config.bg} ${config.border} border-2 rounded-xl p-4 min-h-[500px] transition-all duration-200 hover:shadow-medium ${
        isHovered && draggedTask ? 'ring-2 ring-primary-300 ring-opacity-50' : ''
      }`}
    >
      <h3 className={`font-semibold text-lg mb-4 ${config.text} flex items-center justify-between`}>
        <span className="capitalize">{status}</span>
        <span className="bg-white bg-opacity-50 px-2 py-1 rounded-full text-sm font-medium">
          {tasks.length}
        </span>
      </h3>

      {tasks.length === 0 && (
        <div className="text-secondary-400 text-sm italic text-center py-8">
          No tasks in {status}
        </div>
      )}

      <div className="space-y-3">
        {tasks
          .filter(task => task.id !== draggedTask)
          .map((task) => (
          <KanbanCard
            key={task.id}
            task={task}
            onDragStart={onDragStart}
            isDragged={draggedTask === task.id}
          />
        ))}
      </div>
    </div>
  );
}