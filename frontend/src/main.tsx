import App from './App.tsx'
import React from "react"
import ReactDOM from "react-dom/client"
import './index.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { AppContextProvider } from './contexts/AppContext.tsx'
//react query is used to handle query immediatly
//if a query failed it can not re-retry again it give error
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    }
  }
})
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
      <App />
      </AppContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
