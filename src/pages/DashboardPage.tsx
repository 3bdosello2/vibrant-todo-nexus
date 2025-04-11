
import React from 'react';
import { useTaskContext } from '../contexts/TaskContext';

const DashboardPage = () => {
  const { tasks } = useTaskContext();
  
  // Calculate task statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const importantTasks = tasks.filter(task => task.priority === 'high').length;
  
  // Calculate completion percentage
  const completionPercentage = totalTasks > 0 
    ? Math.round((completedTasks / totalTasks) * 100) 
    : 0;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Task Statistics Cards */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="font-semibold text-gray-600">Total Tasks</h2>
          <p className="text-3xl font-bold">{totalTasks}</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="font-semibold text-gray-600">Completed</h2>
          <p className="text-3xl font-bold text-green-600">{completedTasks}</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="font-semibold text-gray-600">Pending</h2>
          <p className="text-3xl font-bold text-orange-500">{pendingTasks}</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="font-semibold text-gray-600">Important</h2>
          <p className="text-3xl font-bold text-red-500">{importantTasks}</p>
        </div>
      </div>
      
      {/* Completion Progress */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="font-semibold text-gray-600 mb-2">Task Completion</h2>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-todo-primary h-2.5 rounded-full" 
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
        <p className="mt-2 text-sm text-gray-600">{completionPercentage}% completed</p>
      </div>
      
      {/* Recent Tasks */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="font-semibold text-gray-600 mb-4">Recent Tasks</h2>
        {tasks.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {tasks.slice(0, 5).map(task => (
              <li key={task.id} className="py-3">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-3 ${
                    task.priority === 'high' ? 'bg-red-500' : 
                    task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`}></div>
                  <span className={`flex-1 ${task.completed ? 'line-through text-gray-400' : ''}`}>
                    {task.title}
                  </span>
                  <span className="text-sm text-gray-500">
                    {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No tasks available</p>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
