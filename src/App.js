import './App.css';
import 'fontsource-roboto';

import { Container } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import BoardsListPage from './components/boards/list';

function App() {
  return <BrowserRouter>
    <Container maxWidth="md">
      <Switch>
        <Route exact path="/boards">
          <BoardsListPage />
        </Route>
        {/* <Route exact path="/boards/:board">
          <BoardPage />
        </Route> */}
      </Switch>
    </Container>
  </BrowserRouter>
}

export default App;
