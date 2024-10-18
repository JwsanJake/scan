import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ContextProvider } from './shared/context/ContextProvider.jsx'
import { RelationProvider } from './shared/hooks/useRelations.jsx'
import './index.css'
import Toast from './shared/components/Toast/index.jsx'
import { RouterProvider } from 'react-router-dom'
import router from './router.jsx'


const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			cacheTime: 30 * 1000,
			staleTime: 25 * 1000,
			refetchOnMount: true,
			refetchOnWindowFocus: false,
		},
	},
})


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
			<ContextProvider>
				<RelationProvider>
					<Toast/>
					<RouterProvider router={router}/>
				</RelationProvider>
			</ContextProvider>
        </QueryClientProvider>
   </React.StrictMode>,
)
