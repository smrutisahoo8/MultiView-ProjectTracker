import React, { useEffect, useState } from 'react';
import './App.css';
import { useStore } from './store/Store';
import { generateTasks } from './data/Tasks';
import { KanbanView } from './view/KanbanView';
import { ListView } from './view/ListView';
import { TimelineView } from './view/TimelineView';

function App() {
  const setTasks = useStore((s) => s.setTasks);
  const [view, setView] = useState("kanban");
  useEffect(() => {
    setTasks(generateTasks());
  }, []);

  const views = [
    { id: "kanban", label: "Kanban Board", icon: "📋" },
    { id: "list", label: "List View", icon: "📝" },
    { id: "timeline", label: "Timeline", icon: "⏰" },
  ];

  return (
    <div className="min-h-screen bg-secondary-50">
      <header className="bg-white shadow-soft border-b border-secondary-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-secondary-900">Project Tracker</h1>
              </div>
            </div>
            <nav className="flex space-x-1">
              {views.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setView(v.id)}
                  className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    view === v.id
                      ? 'bg-primary-500 text-white shadow-medium'
                      : 'text-secondary-600 hover:text-secondary-900 hover:bg-secondary-100'
                  }`}
                >
                  <span className="mr-2">{v.icon}</span>
                  {v.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {view === "kanban" && <KanbanView />}
        {view === "list" && <ListView />}
        {view === "timeline" && <TimelineView />}
      </main>
    </div>
  );
}

export default App;
