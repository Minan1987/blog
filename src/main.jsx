import { StrictMode } from 'react'
import 'bootstrap/dist/css/bootstrap.rtl.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/index.jsx'
import { Provider } from 'react-redux'
import { store } from './store'
  
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
        <ToastContainer position="top-center"/>
      </Provider>
    </StrictMode>,
  )


