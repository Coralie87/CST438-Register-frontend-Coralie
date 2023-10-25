import './App.css';
import {BrowserRouter, Switch, Route } from 'react-router-dom';
import ListAssignment from './components/ListAssignment';
import GradeAssignment from './components/GradeAssignment';
import Login from './components/Login';
import AddAssignment from './components/AddAssignment';

function App() {
  return (
    <div className="App">
      <h2>Gradebook</h2>
      <BrowserRouter>
          <div>
          <nav>
            <Link to="/">Assignment</Link> |
            <Link to="/admin">Admin</Link> |
            <Link to="/login">Login</Link>  
          </nav>
            <Switch>
            <Route exact path="/" component={ListAssignment} />
            <Route path="/schedule" component={GradeAssignment} />
            <Route path="/admin" component={AddAssignment} />
            <Route path="/login" component={Login} /> 
            <Route render={() => <h1>Page not found</h1>} />
            </Switch>
          </div>
        </BrowserRouter>
    </div>
  );
}

export default App;