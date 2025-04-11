
import React from 'react';
import { useTaskContext } from '../contexts/TaskContext';

const ImportantPage = () => {
  const { tasks, toggleTaskCompletion, deleteTask } = useTaskContext();
  
  // Filter for high priority tasks
  const importantTasks = tasks.filter(task => task.priority === 'high');

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Important Tasks</h1>
      
      {importantTasks.length > 0 ? (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {importantTasks.map(task => (
              <li key={task.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTaskCompletion(task.id)}
                    className="h-4 w-4 text-todo-primary rounded border-gray-300 focus:ring-todo-primary"
                  />
                  
                  <div className="ml-3 flex-1">
                    <p className={`font-medium ${task.completed ? 'line-through text-gray-400' : ''}`}>
                      {task.title}
                    </p>
                    
                    {task.description && (
                      <p className="text-sm text-gray-500 mt-1">{task.description}</p>
                    )}
                    
                    {task.dueDate && (
                      <p className="text-sm text-gray-500 mt-1">
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-red-500 hover:text-red-700 focus:outline-none"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-500">No important tasks</p>
        </div>
      )}
    </div>
  );
};

export default ImportantPage;
