import React, { useEffect, useState } from 'react';

function AllTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('To Do');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/tasks`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials:"include",
          
        });
        console.log("Response status:", res);
        const data = await res.json();
        console.log("Fetched tasks:", data.tasks);
        setTasks(data.tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter(
    (task) => task.status === selectedStatus
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-6">All Tasks</h1>

      <div className="flex justify-center mb-6">
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="p-2 rounded bg-gray-800 border border-gray-600 text-white"
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>

      {loading ? (
        <p className="text-center text-gray-400">Loading tasks...</p>
      ) : filteredTasks.length === 0 ? (
        <p className="text-center text-gray-400">No tasks with this status.</p>
      ) : (
        <div className="grid gap-4 max-w-2xl mx-auto">
          {filteredTasks.map((task) => (
            <div
              key={task._id}
              className="bg-gray-800 p-4 rounded shadow"
            >
              <h3 className="font-semibold text-lg">{task.title}</h3>
              <p className="text-sm text-gray-400 capitalize">
                Status: {task.status}
              </p>
              <p className="text-sm text-gray-400 capitalize">
                createdAt: {task.createdAt.slice(0, 10)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllTasks;
