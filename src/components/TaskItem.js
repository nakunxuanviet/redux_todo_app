import React, { Component } from "react";
import * as actions from "../actions/index";
import { connect } from "react-redux";

class TaskItem extends Component {
  handleUpdateStatus = () => {
    this.props.onUpdateStatus(this.props.task.id);
  };

  handleDeleteTask = () => {
    this.props.onDeleteTask(this.props.task.id);
    this.props.onCloseForm();
  };

  render() {
    var { task, index } = this.props;

    return (
      <tr>
        <td className="text-center">{index + 1}</td>
        <td>{task.name}</td>
        <td className="text-center">
          <span
            className={
              task.status === true
                ? "label label-danger"
                : "label label-success"
            }
            onClick={this.handleUpdateStatus}
          >
            {task.status === true ? "Kích hoạt" : "Ẩn"}
          </span>
        </td>
        <td className="text-center">
          {/* <button type="button" className="btn btn-warning">
            <span className="fa fa-pencil mr-5"></span>Sửa
          </button> */}
          &nbsp;
          <button type="button" className="btn btn-danger" onClick={this.handleDeleteTask}>
            <span className="fa fa-trash mr-5"></span>Xóa
          </button>
        </td>
      </tr>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onUpdateStatus: (id) => {
      dispatch(actions.updateStatus(id));
    },
    onDeleteTask: (id) => {
      dispatch(actions.deleteTask(id));
    },
    onCloseForm: () => {
      dispatch(actions.closeForm())
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);
