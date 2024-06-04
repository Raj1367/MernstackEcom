import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import Router from './routes'
import {Provider} from 'react-redux'
import { store } from './ReduxToolkit/Store/Store'

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <RouterProvider router={Router}></RouterProvider>
    </Provider>
)
