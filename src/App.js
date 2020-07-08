import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import "./App.scss";
import Sidebar from "./components/Sidebar";
import TodoContent from "./components/TodoContent";
import TodoEdit from "./components/TodoEdit";

import { HashRouter, Switch, Route, Link } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import Theme from "./Theme";
import Toolbar from "@material-ui/core/Toolbar";
import Icon from "@material-ui/core/Icon";
import Input from "@material-ui/core/Input";

class App extends Component {
  state = {
    text: "",
  };
  handleInput = (e) => {
    this.setState({
      text: e.target.value.trim(),
    });
  };
  render() {
    return (
      <ThemeProvider theme={Theme}>
        <HashRouter basename="/">
          <div className="App">
            <Toolbar className="home_info">
              <div className="info_title">
                <Icon>calendar_today</Icon>待辦事項
              </div>
              <form className="search_section">
                <div className="search_bar">
                  <Link
                    to={
                      this.state.text.length <= 0
                        ? "/"
                        : `/search/${this.state.text}`
                    }
                  >
                    <Button type="submit" className="search_icon">
                      <Icon>search</Icon>
                    </Button>
                  </Link>
                  <Input
                    type="text"
                    name="searchText"
                    onChange={this.handleInput}
                    disableUnderline={true}
                    placeholder="輸入文字以搜尋內容"
                  />
                </div>
              </form>
            </Toolbar>
            <div className="wrapper">
              <Sidebar />
              <Switch>
                <Route exact path="/" component={TodoContent} />
                <Route exact key="new" path="/new" component={TodoEdit} />
                <Route key="stared" path="/stared" component={TodoContent} />
                <Route
                  key="important"
                  path="/important"
                  component={TodoContent}
                />
                <Route key="done" path="/done" component={TodoContent} />
                <Route
                  key="frontend"
                  path="/frontend"
                  component={TodoContent}
                />
                <Route key="beckend" path="/backend" component={TodoContent} />
                <Route key="issue" path="/issue" component={TodoContent} />
                <Route
                  path="/search/:keyword"
                  render={(routeProps) => (
                    <TodoContent
                      {...routeProps}
                      key={routeProps.match.params.keyword}
                    />
                  )}
                />
                <Route path="/edit/:id" component={TodoEdit} />
              </Switch>
            </div>
          </div>
        </HashRouter>
      </ThemeProvider>
    );
  }
}

export default App;
