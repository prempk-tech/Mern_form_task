import './App.css';
import Router from './Router';

import { Provider } from 'react-redux';
import store from "./store/store";
// import Home from './components/Home.jsx';

function App() {
  return (
    <div>
        <Provider store={store}>
      <Router />
      </Provider>
    </div>
  );
}

export default App;
