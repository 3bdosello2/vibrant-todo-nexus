
import React from 'react';
import { useTaskContext } from '../contexts/TaskContext';

const UpcomingPage = () => {
  const { tasks, toggleTaskCompletion, deleteTask } = useTaskContext();
  
  // Filter for upcoming (not completed) tasks
  const upcomingTasks = tasks.filter(task => !task.completed);
  
  // Sort by due date (if available)
  const sortedTasks = [...upcomingTasks].sort((a, b) => {
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Upcoming Tasks</h1>
      
      {sortedTasks.length > 0 ? (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {sortedTasks.map(task => (
              <li key={task.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTaskCompletion(task.id)}
                    className="h-4 w-4 text-todo-primary rounded border-gray-300 focus:ring-todo-primary"
                  />
                  
                  <div className="ml-3 flex-1">
                    <div className="flex items-center">
                      <p className="font-medium">{task.title}</p>
                      <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                        task.priority === 'high' ? 'bg-red-100 text-red-800' : 
                        task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-green-100 text-green-800'
                      }`}>
                        {task.priority}
                      </span>
                    </div>
                    
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
          <p className="text-gray-500">No upcoming tasks</p>
        </div>
      )}
    </div>
  );
};

export default UpcomingPage;
