export const SIGNAL_REQUEST = "global/SIGNAL_REQUEST",
  signal = () => {
    return {
      type: SIGNAL_REQUEST
    };
  },
  SIGNAL_RESPONSE = "global/SIGNAL_RESPONSE",
  signalSuccess = () => {
    return {
      type: SIGNAL_RESPONSE
    };
  },
  signalError = error => {
    return {
      type: SIGNAL_RESPONSE,
      error
    };
  };
