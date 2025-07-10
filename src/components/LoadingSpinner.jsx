import { Loader2, Sparkles } from 'lucide-react';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col justify-center items-center py-20">
      <div className="relative">
        {/* Outer glow ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 blur-lg opacity-75 animate-pulse"></div>
        
        {/* Main spinner */}
        <div className="relative w-20 h-20 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 p-1 animate-spin">
          <div className="w-full h-full rounded-full bg-gray-900/80 backdrop-blur-sm flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-white animate-pulse" />
          </div>
        </div>
        
        {/* Inner rotating elements */}
        <div className="absolute inset-2 rounded-full border-2 border-dashed border-white/30 animate-spin" style={{animationDirection: 'reverse', animationDuration: '3s'}}></div>
      </div>
      
      {/* Loading text */}
      <div className="mt-8 text-center">
        <h3 className="text-2xl font-bold text-white mb-2 neon-glow">Loading Projects</h3>
        <p className="text-white/70 text-lg">✨ Fetching your amazing projects...</p>
        
        {/* Animated dots */}
        <div className="flex justify-center items-center mt-4 space-x-2">
          <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>
      </div>
      
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-pink-400/50 rounded-full animate-ping"></div>
        <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-purple-400/50 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/4 left-3/4 w-2 h-2 bg-cyan-400/50 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;