# Project Tracker

A modern, professional project management application built with React, TypeScript, and Tailwind CSS. Features multiple views for task management, advanced filtering, and seamless user interactions.

## Features

### Multiple Views
- **Kanban Board**: Visual task management with drag-and-drop between columns
- **List View**: Detailed task list with virtual scrolling for performance
- **Timeline View**: Gantt-style visualization of task schedules

### Advanced Interactions
- **Custom Drag-and-Drop**: Native browser drag events for moving tasks between Kanban columns
- **Virtual Scrolling**: Efficient handling of large datasets (500+ tasks) in List View
- **Real-time Filtering**: Instant filtering by status, priority, assignee, and due date range

### State Management & Persistence
- **URL State**: Filters are reflected in URL query parameters for shareable, bookmarkable views
- **Browser Navigation**: Back/forward navigation preserves filter states
- **Zustand Store**: Centralized state management for tasks and filters

### Professional UI/UX
- **Tailwind CSS**: Custom design system with professional color palette and shadows
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Accessibility**: Proper semantic HTML and keyboard navigation support

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd project-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will open at `http://localhost:3000`

## Usage

### Navigation
Use the header buttons to switch between views:
- 📋 Kanban Board
- 📝 List View
- ⏰ Timeline

### Filtering Tasks
The filter bar above the views allows you to:
- **Status**: Select multiple statuses (Todo, In Progress, Review, Done)
- **Priority**: Filter by priority levels (Low, Medium, High, Critical)
- **Assignee**: Choose specific team members
- **Due Date Range**: Set from/to dates for due dates

Filters apply instantly and update the URL. Use the "Clear All" button to reset filters.

### Kanban Board
- Drag tasks between columns to change their status
- Visual feedback shows valid drop zones during drag
- Tasks snap back if dropped outside valid areas

### List View
- Scroll through all tasks efficiently with virtual scrolling
- Handles large datasets without performance degradation
- Sortable columns and detailed task information

### Timeline View
- Visual representation of task schedules
- Shows task duration and due dates
- Today indicator for current date reference

## Technologies Used

- **React 19**: Modern React with hooks and concurrent features
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework with custom design system
- **Zustand**: Lightweight state management
- **Vite**: Fast build tool and development server

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── FilterBar.tsx    # Global filtering interface
│   ├── KanbanCard.tsx   # Task card component
│   └── KanbanColumn.tsx # Kanban column component
├── data/
│   └── Tasks.tsx        # Task data generation
├── hooks/               # Custom React hooks
├── store/
│   └── Store.tsx        # Zustand state management
└── view/                # Main view components
    ├── KanbanView.tsx   # Kanban board implementation
    ├── ListView.tsx     # Virtual scrolling list
    └── TimelineView.tsx # Timeline visualization
```

## Development

### Available Scripts

- `npm start`: Start development server
- `npm build`: Build for production
- `npm test`: Run test suite
- `npm eject`: Eject from Create React App (not recommended)

### Code Quality
- ESLint for code linting
- TypeScript for type checking
- Prettier for code formatting

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.