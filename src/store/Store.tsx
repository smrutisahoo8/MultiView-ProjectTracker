import { create } from "zustand";

export type Status = "todo" | "inprogress" | "review" | "done";
export type Priority = "low" | "medium" | "high" | "critical";

export type Task = {
  id: string;
  title: string;
  assignee: string;
  priority: Priority;
  status: Status;
  startDate?: string;
  dueDate: string;
};

type Store = {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  moveTask: (id: string, status: Status) => void;
};

export const useStore = create<Store>((set) => ({
  tasks: [],

  setTasks: (tasks) => set({ tasks }),

  moveTask: (id, status) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, status } : task
      ),
    })),
}));