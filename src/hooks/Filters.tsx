import { useEffect, useState } from "react";

export function useFilters() {
  const [filters, setFilters] = useState({
    status: [] as string[],
    priority: [] as string[],
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setFilters({
      status: params.get("status")?.split(",") || [],
      priority: params.get("priority")?.split(",") || [],
    });
  }, []);

  const update = (next: typeof filters) => {
    setFilters(next);
    const params = new URLSearchParams();
    if (next.status.length) params.set("status", next.status.join(","));
    if (next.priority.length) params.set("priority", next.priority.join(","));

    window.history.replaceState({}, "", `?${params.toString()}`);
  };

  return { filters, update };
}