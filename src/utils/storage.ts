
// Storage keys
export const STORAGE_KEYS = {
  USERS: 'todo_app_users',
  CURRENT_USER: 'todo_app_current_user',
  TASKS: 'todo_app_tasks',
};

// User interface
export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
}

// Task interface
export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  userId: string;
}

// User storage methods
export const userStorage = {
  // Get all users
  getUsers: (): User[] => {
    const users = localStorage.getItem(STORAGE_KEYS.USERS);
    return users ? JSON.parse(users) : [];
  },

  // Add a new user
  addUser: (user: User): void => {
    const users = userStorage.getUsers();
    users.push(user);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  },

  // Find user by email
  findUserByEmail: (email: string): User | undefined => {
    const users = userStorage.getUsers();
    return users.find(user => user.email === email);
  },

  // Set current user
  setCurrentUser: (user: User): void => {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  },

  // Get current user
  getCurrentUser: (): User | null => {
    const user = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return user ? JSON.parse(user) : null;
  },

  // Log out current user
  logout: (): void => {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  }
};

// Task storage methods
export const taskStorage = {
  // Get all tasks
  getTasks: (): Task[] => {
    const tasks = localStorage.getItem(STORAGE_KEYS.TASKS);
    return tasks ? JSON.parse(tasks) : [];
  },

  // Get tasks for current user
  getUserTasks: (userId: string): Task[] => {
    const allTasks = taskStorage.getTasks();
    return allTasks.filter(task => task.userId === userId);
  },

  // Add a new task
  addTask: (task: Task): void => {
    const tasks = taskStorage.getTasks();
    tasks.push(task);
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
  },

  // Update a task
  updateTask: (updatedTask: Task): void => {
    const tasks = taskStorage.getTasks();
    const index = tasks.findIndex(task => task.id === updatedTask.id);
    if (index !== -1) {
      tasks[index] = updatedTask;
      localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
    }
  },

  // Delete a task
  deleteTask: (taskId: string): void => {
    const tasks = taskStorage.getTasks();
    const filteredTasks = tasks.filter(task => task.id !== taskId);
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(filteredTasks));
  }
};
