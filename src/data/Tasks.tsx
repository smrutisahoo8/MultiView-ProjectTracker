import { Task, Status, Priority } from "../store/Store";

const users = ["AB", "CD", "EF", "GH", "IJ", "KL"];
const priorities: Priority[] = ["low", "medium", "high", "critical"];
const statuses: Status[] = ["todo", "inprogress", "review", "done"];

export function generateTasks(n = 500): Task[] {
  return Array.from({ length: n }).map((_, i) => {
    const start = new Date();
    start.setDate(start.getDate() - Math.random() * 10);

    const due = new Date();
    due.setDate(due.getDate() + Math.random() * 15 - 5);

    return {
      id: String(i),
      title: `Task ${i}`,
      assignee: users[Math.floor(Math.random() * users.length)],
      priority: priorities[Math.floor(Math.random() * priorities.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      startDate: Math.random() > 0.2 ? start.toISOString() : undefined,
      dueDate: due.toISOString(),
    };
  });
}