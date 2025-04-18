import { createContext, useContext, useState } from 'react';
import Toast from '../components/Toast';
import Loading from '../components/Loading';

const FeedbackContext = createContext();

export const useFeedback = () => {
  const context = useContext(FeedbackContext);
  if (!context) {
    throw new Error('useFeedback must be used within a FeedbackProvider');
  }
  return context;
};

export const FeedbackProvider = ({ children }) => {
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Yuklanmoqda...');

  const showToast = (message, type = 'success', duration = 3000) => {
    setToast({ message, type, duration });
  };

  const hideToast = () => {
    setToast(null);
  };

  const showLoading = (message = 'Yuklanmoqda...') => {
    setLoadingMessage(message);
    setLoading(true);
  };

  const hideLoading = () => {
    setLoading(false);
  };

  const value = {
    showToast,
    hideToast,
    showLoading,
    hideLoading
  };

  return (
    <FeedbackContext.Provider value={value}>
      {children}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={hideToast}
        />
      )}
      {loading && <Loading message={loadingMessage} fullScreen />}
    </FeedbackContext.Provider>
  );
}; 