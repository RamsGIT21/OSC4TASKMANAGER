import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 via-blue-300 to-cyan-200 flex items-center justify-center px-4">
      <div className="text-center max-w-4xl w-full space-y-12">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white drop-shadow-lg leading-tight">
          Welcome to My Task Manager
        </h1>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-16">
          <button
            onClick={() => navigate('/login')}
            className="w-full sm:w-64 bg-white text-blue-600 font-semibold text-xl py-5 px-10 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:bg-blue-50"
          >
            Login
          </button>

          <button
            onClick={() => navigate('/signup')}
            className="w-full sm:w-64 bg-white text-blue-600 font-semibold text-xl py-5 px-10 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:bg-blue-50"
          >
            Signup
          </button>

          <button
            onClick={() => navigate('/dashboard')}
            className="w-full sm:w-64 bg-white text-blue-600 font-semibold text-xl py-5 px-10 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:bg-blue-50"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
