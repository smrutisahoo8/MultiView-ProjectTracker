import { useStore, Status } from "../store/Store";
import { KanbanColumn } from "../components/KanbanColumn";
import { useState, useRef, useCallback } from "react";

export function KanbanView() {
  const tasks = useStore((s) => s.tasks);
  const moveTask = useStore((s) => s.moveTask);

  const [draggedTask, setDraggedTask] = useState<string | null>(null);
  const [draggedElement, setDraggedElement] = useState<HTMLElement | null>(null);
  const [placeholder, setPlaceholder] = useState<HTMLElement | null>(null);
  const [hoveredColumn, setHoveredColumn] = useState<Status | null>(null);
  const [dropTargetStatus, setDropTargetStatus] = useState<Status | null>(null);

  const dragRef = useRef<HTMLDivElement>(null);

  const grouped = {
    todo: tasks.filter((t) => t.status === "todo"),
    inprogress: tasks.filter((t) => t.status === "inprogress"),
    review: tasks.filter((t) => t.status === "review"),
    done: tasks.filter((t) => t.status === "done"),
  } as Record<Status, typeof tasks>;

  const handleDragStart = useCallback((taskId: string, element: HTMLElement, startX: number, startY: number) => {
    setDraggedTask(taskId);
    setDraggedElement(element);
    setDropTargetStatus(null);

    const placeholderEl = document.createElement('div');
    placeholderEl.className = 'bg-secondary-200 rounded-lg border-2 border-dashed border-secondary-300 h-20 mb-3';
    element.parentElement?.insertBefore(placeholderEl, element);
    setPlaceholder(placeholderEl);

    element.style.opacity = '0.5';
    element.style.transform = 'rotate(5deg)';
    element.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.3)';
    element.style.position = 'fixed';
    element.style.pointerEvents = 'none';
    element.style.zIndex = '1000';
    element.style.left = `${startX - element.offsetWidth / 2}px`;
    element.style.top = `${startY - element.offsetHeight / 2}px`;

    const handlePointerMove = (e: PointerEvent) => {
      if (element) {
        element.style.left = `${e.clientX - element.offsetWidth / 2}px`;
        element.style.top = `${e.clientY - element.offsetHeight / 2}px`;
      }

      if (element) {
        element.style.display = 'none';
      }
      const hoverTarget = document.elementFromPoint(e.clientX, e.clientY);
      if (element) {
        element.style.display = '';
      }
      const columnEl = hoverTarget?.closest('[data-column-status]') as HTMLElement;
      const hoverStatus = columnEl?.dataset.columnStatus as Status;
      setHoveredColumn(hoverStatus || null);
      if (draggedTask) {
        setDropTargetStatus(hoverStatus || null);
      }
    };

    const handlePointerUp = (e: PointerEvent) => {
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerup', handlePointerUp);

      const task = tasks.find(t => t.id === draggedTask);
      if (dropTargetStatus && draggedTask && task && dropTargetStatus !== task.status) {
        moveTask(draggedTask, dropTargetStatus);
      }

      if (placeholder) {
        placeholder.remove();
      }
      if (element) {
        element.style.opacity = '';
        element.style.transform = '';
        element.style.boxShadow = '';
        element.style.position = '';
        element.style.left = '';
        element.style.top = '';
        element.style.pointerEvents = '';
        element.style.zIndex = '';
      }

      setDraggedTask(null);
      setDraggedElement(null);
      setPlaceholder(null);
      setHoveredColumn(null);
      setDropTargetStatus(null);
    };

    document.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerup', handlePointerUp);
  }, [draggedTask, moveTask, placeholder, tasks]);

  return (
    <div ref={dragRef}>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-secondary-900 mb-2">Kanban Board</h2>
        <p className="text-secondary-600">Manage your project tasks across different stages</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(grouped).map(([status, tasks]) => (
          <KanbanColumn
            key={status}
            status={status as Status}
            tasks={tasks}
            onDragStart={handleDragStart}
            isHovered={hoveredColumn === status}
            draggedTask={draggedTask}
          />
        ))}
      </div>
    </div>
  );
}
