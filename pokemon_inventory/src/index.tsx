import React from 'react';
import ReactDom from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles.css'
import { Home, Dashboard, SignIn } from './components';
import reportWebVitals from './reportWebVitals';
import { format } from 'path';
import { theme } from './Theme/themes';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const root = ReactDom.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <Provider store={store}>
        <ThemeProvider theme={theme}>
        <Router>
            <Routes>
                <Route path='/' element={<Home title={'Pokemon_inventory'}/>}/>
                <Route path='/dashboard' element={<Dashboard/>}/>
                <Route path='/signin' element={<SignIn/>}/>
            </Routes>
        </Router>
        </ThemeProvider>
        </Provider>
    </React.StrictMode>
);


reportWebVitals()