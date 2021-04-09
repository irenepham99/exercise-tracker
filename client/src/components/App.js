import React from "react";
import ExerciseList from "./ExerciseList";
import { Router, Route, Switch } from "react-router-dom";
import Header from "./Header";
import NewExercise from "./NewExercise";
import history from "../history";
import EditExercise from "./EditExercise";

const App = () => {
  return (
    <div>
      <Router history={history}>
        <div>
          <Header />
          <Route path="/" exact component={ExerciseList} />
          <Route path="/exercise/new" exact component={NewExercise} />
          <Route path="/exercise/edit/:id" exact component={EditExercise} />
          <Route path="/exercise/log/:id" exact component={ExerciseLog} />
        </div>
      </Router>
    </div>
  );
};

export default App;
