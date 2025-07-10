import { AlertCircle, RefreshCw, Zap } from 'lucide-react';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="flex justify-center items-center py-20">
      <div className="relative max-w-md w-full">
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-pink-500 rounded-3xl blur opacity-50"></div>
        
        <div className="relative glass rounded-3xl p-10 text-center border border-red-300/20 backdrop-blur-xl">
          {/* Error icon with animation */}
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-red-500/20 rounded-full animate-ping"></div>
            <div className="relative w-20 h-20 mx-auto bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
              <AlertCircle className="w-10 h-10 text-white animate-pulse" />
            </div>
          </div>
          
          {/* Error content */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-4 neon-glow">
              🚨 Oops! Something went wrong
            </h3>
            <p className="text-white/80 text-lg leading-relaxed bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
              {message}
            </p>
          </div>
          
          {/* Retry button */}
          {onRetry && (
            <button
              onClick={onRetry}
              className="group relative px-8 py-4 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-2xl hover:from-red-600 hover:to-pink-700 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 btn-bounce ripple"
            >
              <div className="flex items-center justify-center space-x-2">
                <RefreshCw className="w-5 h-5 group-hover:animate-spin" />
                <span>Try Again</span>
                <Zap className="w-4 h-4 animate-pulse" />
              </div>
            </button>
          )}
          
          {/* Decorative elements */}
          <div className="absolute top-4 right-4 w-4 h-4 bg-red-400/30 rounded-full animate-pulse"></div>
          <div className="absolute bottom-4 left-4 w-3 h-3 bg-pink-400/30 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;