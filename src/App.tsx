import { Provider } from 'react-redux';
import { store } from './store';
import { 
  createBrowserRouter, 
  RouterProvider 
} from 'react-router-dom';
import routes from './routes';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material';
import { theme } from './themeConfig';

const router = createBrowserRouter(
  routes
);

function App() {
  return (
    <Provider store={store}>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
    
  )
}

export default App;
