import React, { Component } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import Control from "./components/Control";
import TaskList from "./components/TaskList";
import * as uuid from "uuid";
import { connect } from "react-redux";
import * as actions from './actions/index'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    };
  }

  // onGenerateData = () => {
  //   var tasks = [
  //     {
  //       id: uuid.v4(),
  //       name: "Học ReactJS, Redux",
  //       status: true,
  //     },
  //     {
  //   ];
  //   this.setState({
  //     tasks: tasks,
  //   });
  //   localStorage.setItem("tasks", JSON.stringify(tasks));
  // };

  onToggleForm = () => {
    // this.setState({
    //   isDisplayForm: !this.state.isDisplayForm,
    // });
    this.props.onToggleForm();
  };

  onSubmit = (dataForm) => {
    var { tasks } = this.state;
    dataForm.id = uuid.v4();
    tasks.push(dataForm); 
    this.setState({
      tasks: tasks
    });   
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  render() {
    var {isDisplayForm} = this.props;
    // var { isDisplayForm } = this.state; // var tasks = this.state.tasks
    var elmTaskForm = isDisplayForm ? 
      <TaskForm onSubmit={this.onSubmit} /> : "" ;

    return (
      <div className="container">
        <div className="text-center">
          <h1>ToDo Application</h1>
          <hr />
        </div>
        <div className="row">
          {/* Form */}
          <div
            className={
              isDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ""
            }
          >
            {elmTaskForm}
          </div>
          <div
            className={
              isDisplayForm
                ? "col-xs-8 col-sm-8 col-md-8 col-lg-8"
                : "col-xs-12 col-sm-12 col-md-12 col-lg-12"
            }
          >
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.onToggleForm}
            >
              <span className="fa fa-plus mr-5"></span>Thêm Công Việc
            </button>         

            {/* Search & sort */}
            <Control />

            {/* List */}
            {/* Truyền props vào trong TaskList*/}
            <TaskList />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isDisplayForm : state.isDisplayForm
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onToggleForm: () => {
      dispatch(actions.toggleForm())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
