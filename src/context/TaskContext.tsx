/* eslint-disable react-refresh/only-export-components */
import type { ReactNode } from 'react';
import React, { createContext, useState, useContext, useEffect } from 'react';

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

interface TaskContextType {
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

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within TaskProvider');
  }
  return context;
};

interface TaskProviderProps {
  children: ReactNode;
}

const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>(() => {
    try {
      const saved = localStorage.getItem('taskCategories');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.error('Error loading categories from localStorage:', error);
    }
    return [
      { id: 1, name: 'Front-End', color: '#667eea' },
      { id: 2, name: 'Back-End', color: '#764ba2' },
      { id: 3, name: 'Design', color: '#f56565' },
      { id: 4, name: 'Reuniões', color: '#48bb78' },
    ];
  });

  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const saved = localStorage.getItem('categoryTasks');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.error('Error loading tasks from localStorage:', error);
    }
    const today = new Date().toISOString().split('T')[0];
    return [
      { 
        id: 1, 
        text: 'Criar componentes React', 
        completed: true, 
        categoryId: 1, 
        date: today, 
        priority: 'high' 
      },
      { 
        id: 2, 
        text: 'Configurar API endpoints', 
        completed: false, 
        categoryId: 2, 
        date: today, 
        priority: 'medium' 
      },
      { 
        id: 3, 
        text: 'Design Changes', 
        completed: false, 
        categoryId: 3, 
        date: today, 
        priority: 'low' 
      },
    ];
  });

  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  useEffect(() => {
    try {
      localStorage.setItem('taskCategories', JSON.stringify(categories));
    } catch (error) {
      console.error('Error saving categories to localStorage:', error);
    }
  }, [categories]);

  useEffect(() => {
    try {
      localStorage.setItem('categoryTasks', JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving tasks to localStorage:', error);
    }
  }, [tasks]);

  const addCategory = (name: string, color: string) => {
    if (name.trim() === '') return;
    
    const newCategory: Category = {
      id: Date.now(),
      name: name.trim(),
      color,
    };
    
    setCategories(prev => [...prev, newCategory]);
  };

  const addTask = (taskData: Omit<Task, 'id'>) => {
    const newTask: Task = {
      id: Date.now(),
      ...taskData,
    };
    
    setTasks(prev => [...prev, newTask]);
  };

  const toggleTask = (taskId: number) => {
    setTasks(prev => prev.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (taskId: number) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const updateTask = (taskId: number, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task =>
      task.id === taskId ? { ...task, ...updates } : task
    ));
  };

  const getTasksByDate = (date: string) => {
    return tasks.filter(task => task.date === date);
  };

  const getTasksByCategory = (categoryId: number) => {
    return tasks.filter(task => task.categoryId === categoryId);
  };

  
  const getTaskStats = () => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.completed).length;
    const pendingTasks = totalTasks - completedTasks;
    
    return {
      totalTasks,
      completedTasks,
      pendingTasks,
      completionRate: totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0
    };
  };

  const value: TaskContextType = {
    categories,
    tasks,
    selectedDate,
    setSelectedDate,
    addCategory,
    addTask,
    toggleTask,
    deleteTask,
    updateTask,
    getTasksByDate,
    getTasksByCategory,
    getTaskStats,
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};

export { TaskProvider, useTaskContext };
export default TaskProvider;