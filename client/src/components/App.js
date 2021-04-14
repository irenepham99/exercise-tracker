import React from "react";
import ExerciseList from "./Exercise/ExerciseList";
import { Router, Route, Switch } from "react-router-dom";
import Header from "./Header";
import NewExercise from "./Exercise/NewExercise";
import history from "../history";
import EditExercise from "./Exercise/EditExercise";
import ExerciseLog from "./Exercise/ExerciseLog";
import ExerciseChart from "./Exercise/ExerciseChart";
import Notification from "./Notification";
import RoutineList from "./Routine/RoutineList";
import RoutineCreate from "./Routine/RoutineCreate";
import RoutineEdit from "./Routine/RoutineEdit";

const App = () => {
  return (
    <div>
      <Router history={history}>
        <div>
          <Header />
          <Route path="/" exact component={ExerciseList} />
          <Route path="/exercise" exact component={ExerciseList} />
          <Route path="/exercise/new" exact component={NewExercise} />
          <Route path="/exercise/edit/:id" exact component={EditExercise} />
          <Route path="/exercise/:id/log" exact component={ExerciseLog} />
          <Route path="/exercise/:id/chart" exact component={ExerciseChart} />
          <Route path="/routine" exact component={RoutineList} />
          <Route path="/routine/new" exact component={RoutineCreate} />
          <Route path="/routine/edit/:id" exact component={RoutineEdit} />
          <Notification />
        </div>
      </Router>
    </div>
  );
};

export default App;
