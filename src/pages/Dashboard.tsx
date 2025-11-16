import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

function Dashboard() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [tasks, setTasks] = useState([
    'Finish homework',
    'Call John',
    'Buy groceries'
  ]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      setTasks([...tasks, newTask.trim()]);
      setNewTask('');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-400 via-blue-300 to-cyan-200 flex items-center justify-center">
        <div className="text-white text-2xl font-semibold">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 via-blue-300 to-cyan-200 flex items-center justify-center px-4 py-8">
      <div className="bg-white rounded-3xl shadow-2xl p-12 w-full max-w-2xl">
        <h1 className="text-5xl font-bold text-blue-600 text-center mb-12">
          Your Tasks
        </h1>

        <div className="mb-12">
          <ul className="space-y-4">
            {tasks.map((task, index) => (
              <li
                key={index}
                className="text-xl text-gray-700 bg-gray-50 p-4 rounded-xl border-2 border-gray-200"
              >
                <span className="font-semibold text-blue-600">{index + 1}.</span> {task}
              </li>
            ))}
          </ul>
        </div>

        <form onSubmit={handleAddTask} className="mb-8">
          <label htmlFor="newTask" className="block text-lg font-semibold text-gray-700 mb-3">
            New Task
          </label>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              id="newTask"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="flex-1 px-5 py-4 text-lg border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="Enter a new task"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold text-xl py-4 px-8 rounded-xl shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-300"
            >
              Add Task
            </button>
          </div>
        </form>

        <button
          onClick={handleLogout}
          className="w-full bg-white text-blue-600 border-2 border-blue-600 font-semibold text-xl py-4 rounded-xl hover:bg-blue-50 transition-all duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
