import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ErrorToast.scss';

const ErrorToast = (message: string) => {
  toast(message, {
    closeButton: true,
    hideProgressBar: true,
    className: 'error-toast',
  });
};

export default ErrorToast;
