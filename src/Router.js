import React from "react";
import { Scene, Router, Actions } from "react-native-router-flux";
import BookList from "./components/BookList";
import BookSearch from "./components/BookSearch";

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root" hideNavBar>
        <Scene key="main">
          <Scene
            //rightTitle="Añadir libro"
            //onRight={() => Actions.bookSearch()}
            key="bookList"
            component={BookList}
            title="Mis libros"
            hideNavBar
            initial
          />
          <Scene
            key="bookSearch"
            component={BookSearch}
            title="Añadir libro"
            wrap={false}
            //hideNavBar
          />
        </Scene>
      </Scene>
    </Router>
  );
};

export default RouterComponent;
