
import React, { createContext, useState, useContext, useEffect } from 'react';
import { taskStorage, userStorage, Task } from '../utils/storage';

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'userId'>) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  toggleTaskCompletion: (id: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  
  // Load tasks for current user when component mounts or user changes
  useEffect(() => {
    const loadTasks = () => {
      const currentUser = userStorage.getCurrentUser();
      if (currentUser) {
        const userTasks = taskStorage.getUserTasks(currentUser.id);
        setTasks(userTasks);
      } else {
        setTasks([]);
      }
    };
    
    loadTasks();
    
    // Set up event listener for storage changes
    window.addEventListener('storage', loadTasks);
    
    return () => {
      window.removeEventListener('storage', loadTasks);
    };
  }, []);

  const addTask = (taskData: Omit<Task, 'id' | 'userId'>) => {
    const currentUser = userStorage.getCurrentUser();
    if (!currentUser) return;
    
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      userId: currentUser.id,
    };
    
    taskStorage.addTask(newTask);
    setTasks(prev => [...prev, newTask]);
  };

  const updateTask = (updatedTask: Task) => {
    taskStorage.updateTask(updatedTask);
    setTasks(prev => prev.map(task => task.id === updatedTask.id ? updatedTask : task));
  };

  const deleteTask = (id: string) => {
    taskStorage.deleteTask(id);
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const toggleTaskCompletion = (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      const updatedTask = { ...task, completed: !task.completed };
      updateTask(updatedTask);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, toggleTaskCompletion }}>
      {children}
    </TaskContext.Provider>
  );
};
