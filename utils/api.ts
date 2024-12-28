export const getApiUrl = () => {
    if (process.env.NODE_ENV === 'development') {
      return 'http://localhost:3000'; 
    } else {
      return 'https://fitness-tracker-murex-chi.vercel.app'; 
    }
  };