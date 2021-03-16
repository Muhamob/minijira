import './App.css';
import 'fontsource-roboto';

import { Container } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import BoardsListPage from './components/boards/list';
import BoardPage from './components/boards/detail';

function App() {
  return <BrowserRouter>
    <Container maxWidth="md">
      <Switch>
        <Route exact path="/boards">
          <BoardsListPage />
        </Route>
        <Route path="/boards/:key">
          <BoardPage />
        </Route>
      </Switch>
    </Container>
  </BrowserRouter>
}

export default App;
