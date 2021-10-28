import React, { Component } from "react";
import "./App.scss";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Navigation from "./components/navigation";
import Home from "./pages/Home";
import Books from "./pages/Books";
import BookDetail from "./pages/Books/BookDetail.js";

class App extends Component {

  render() {
    return (
      <div className="App">
        <Navigation />
        <Switch>
          <Route 
            path="/" 
            component={Home} 
            exact 
          />

          <Route
            path="/books"
            component={Books}
            exact
          />
          <Route
            path="/books/:id"
            component={BookDetail}
            exact
          ></Route>
        </Switch>
      </div>
    );
  }
}

export default App;

{
  /* <Route 
            path="/books/:bookId" 
            component={() => <BookDetail bookList={this.state.bookItem} />}
            exact
          >
          </Route> */
}
{
  /* <BookDetail bookList={this.state.bookItem} /> */
}
