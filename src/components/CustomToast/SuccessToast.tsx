import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './SuccessToast.scss';

const SuccessToast = (message: string) => {
  toast(message, {
    closeButton: true,
    hideProgressBar: false,
    className: 'success-toast',
  });
};

export default SuccessToast;
