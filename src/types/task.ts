export interface Task {
  id: number;
  text: string;
  completed: boolean;
  categoryId: number;
  date: string;
  priority: 'low' | 'medium' | 'high';
}

export interface Category {
  id: number;
  name: string;
  color: string;
}

export interface TaskContextType {
  categories: Category[];
  tasks: Task[];
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  addCategory: (name: string, color: string) => void;
  addTask: (task: Omit<Task, 'id'>) => void;
  toggleTask: (taskId: number) => void;
  getTasksByDate: (date: string) => Task[];
  getTasksByCategory: (categoryId: number) => Task[];
  deleteTask: (taskId: number) => void;
  updateTask: (taskId: number, updates: Partial<Task>) => void;
  getTaskStats: () => {
    totalTasks: number;
    completedTasks: number;
    pendingTasks: number;
    completionRate: number;
  };
}