import React, { useEffect, useState } from "react";

function Toastify({ text, type }) {
  const [showToast, setShowToast] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowToast(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleClose = () => {
    setShowToast(false);
  };

  return (
    <>
      {showToast && (
        <div
          className={`flex items-center flex-col p-5 `}
        >
          <div
            className={`relative min-h-[var(--toastify-toast-min-height)] box-border mb-4 px-2 py-2 rounded shadow-md flex justify-between max-h-[var(--toastify-toast-max-height)] overflow-hidden font-sans cursor-default direction-ltr capitalize e--light ype} se-on-click`}
          >
            <div
              role="alert"
              className="m-auto p-2 flex items-center "
            >
              <div className="mr-2 w-5 flex-shrink-0 flex ">
                {type === "error" ? (
                  <svg
                    viewBox="0 0 24 24"
                    width="100%"
                    height="100%"
                    fill="red"
                  >
                    <path d="M11.983 0a12.206 12.206 0 00-8.51 3.653A11.8 11.8 0 000 12.207 11.779 11.779 0 0011.8 24h.214A12.111 12.111 0 0024 11.791 11.766 11.766 0 0011.983 0zM10.5 16.542a1.476 1.476 0 011.449-1.53h.027a1.527 1.527 0 011.523 1.47 1.475 1.475 0 01-1.449 1.53h-.027a1.529 1.529 0 01-1.523-1.47zM11 12.5v-6a1 1 0 012 0v6a1 1 0 11-2 0z"></path>
                  </svg>
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    width="100%"
                    height="100%"
                    fill="green"
                  >
                    <path d="M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6.927 8.2l-6.845 9.289a1.011 1.011 0 01-1.43.188l-4.888-3.908a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.61 1.183z"></path>
                  </svg>
                )}
              </div>
              <div>{text}</div>
            </div>
            <button
              onClick={handleClose}
              className="text-gray-700 bg-transparent outline-none border-none p-0 cursor-pointer opacity-70 transition-opacity duration-300 self-start Toastify__close-button Toastify__close-button--light"
              type="button"
              aria-label="close"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 14 16"
                className="fill-current h-4 w-3"
              >
                <path
                  fillRule="evenodd"
                  d="M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z"
                ></path>
              </svg>
            </button>
            <div
              role="progressbar"
              aria-hidden="false"
              aria-label="notification timer"
              className={`absolute left-0 bottom-0 w-full h-1 Toastify_progress-bar ${
                type === "error" ? "bg-red-500" : "bg-green-500"
              }`}
            ></div>
          </div>
        </div>
      )}
    </>
  );
}

export default Toastify;
