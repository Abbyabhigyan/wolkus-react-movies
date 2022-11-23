import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import SimpleBottomNavigation from "./components/MainNav";
import Movies from "./Pages/Movies/Movies";
import Series from "./Pages/Series/Series";
import Trending from "./Pages/Trending/Trending";
import Search from "./Pages/Search/Search";
import { Container } from "@material-ui/core";
import {AuthProvider} from "./context/AuthContext";
import Login from "./Pages/Login"
import CredBox from "./components/Header/CredBox";

function App() {
  return (
    <BrowserRouter>
        <AuthProvider>
          <Header/>
          <CredBox/>
          <div className="app">
            <Container>
              <Switch>
                <Route path="/" component={Login} exact />
                <Route path="/trending" component={Trending} exact />
                <Route path="/movies" component={Movies} />
                <Route path="/series" component={Series} />
                <Route path="/search" component={Search} />
              </Switch>
            </Container>
          </div>
          <SimpleBottomNavigation />
        </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
