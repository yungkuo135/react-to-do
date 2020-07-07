import React, { Component } from "react";
import {
  Icon,
  IconButton,
  Button,
  Checkbox,
  TextField,
} from "@material-ui/core";
import { connect } from "react-redux";

class TodoEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNewTodo: false,
    };
  }
  handleClick = (tag, icon) => {
    let newTodo = { ...this.state.todo };
    switch (tag) {
      case "important":
        newTodo.important = !this.state.todo.important ? 1 : 0;
        newTodo.important_icon = newTodo.important ? "error" : "error_outline";
        break;
      case "star":
        newTodo.stared = !this.state.todo.stared ? 1 : 0;
        newTodo.stared_icon = newTodo.stared ? "star" : "star_border";
        break;
      case "done":
        newTodo.done = !this.state.todo.done ? 1 : 0;
        newTodo.done_icon = newTodo.done ? "check_box" : "crop_square";
        break;
      default:
        break;
    }
    this.setState({
      todo: newTodo,
    });
  };
  handleCheck = (e) => {
    const tag = e.target.name;
    const value = !parseInt(e.target.value, 10) ? 1 : 0;
    let newTodo = { ...this.state.todo };
    newTodo[tag] = value;
    this.setState({
      todo: newTodo,
    });
  };
  handleTextChange = (e) => {
    const name = e.target.name;
    //const value = !parseInt(e.target.value, 10) ? 1 : 0;
    let newTodo = { ...this.state.todo };
    newTodo[name] = e.target.value;
    this.setState({
      todo: newTodo,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.isNewTodo) {
      this.props.addTodo(this.state.todo);
    } else this.props.editTodo(this.state.todo);

    this.props.history.push("/");
  };
  handleCancel = () => {
    this.props.history.push("/");
  };

  componentDidMount() {
    if (this.props.match.path === "/new") {
      this.setState({
        isNewTodo: true,
      });
    }
    this.setState({
      todo: this.props.todo[0],
    });
  }

  render() {
    const { todo } = this.state;
    const todoForm = todo ? (
      <div className="todo_edit_wrapper">
        <form className="edit_form">
          <div className="item_icons">
            <IconButton
              onClick={() => this.handleClick("important", `${todo.important}`)}
            >
              <Icon style={{ color: `${todo.important ? "red" : ""}` }}>
                {todo.important_icon}
              </Icon>
            </IconButton>
            <IconButton
              onClick={() => this.handleClick("star", `${todo.stared}`)}
            >
              <Icon style={{ color: `${todo.stared ? "#ffc107" : ""}` }}>
                {todo.stared_icon}
              </Icon>
            </IconButton>
            <IconButton
              onClick={() => this.handleClick("done", `${todo.done}`)}
            >
              <Icon style={{ color: `${todo.done ? "blue" : ""}` }}>
                {todo.done_icon}
              </Icon>
            </IconButton>
          </div>
          <div className="edit_tags">
            <Checkbox
              name="frontend"
              checked={todo.frontend ? true : false}
              value={todo.frontend}
              onClick={this.handleCheck}
            />
            Frontend
            <Checkbox
              name="backend"
              checked={todo.backend ? true : false}
              value={todo.backend}
              onClick={this.handleCheck}
            />
            Backend
            <Checkbox
              name="issue"
              checked={todo.issue ? true : false}
              value={todo.issue}
              onClick={this.handleCheck}
            />
            Issue
          </div>
          <div>
            <TextField
              style={{ width: "100%" }}
              label="標題"
              name="title"
              defaultValue={todo.title}
              onChange={this.handleTextChange}
              multiline
              required
            />
          </div>
          <div>
            <TextField
              className="content_input"
              style={{ width: "100%", height: "150px", marginTop: "10px" }}
              label="內容"
              name="content"
              defaultValue={todo.content}
              onChange={this.handleTextChange}
              multiline
            />
          </div>
          <div className="edit_btns">
            <Button
              variant="contained"
              disabled={!this.state.todo.title}
              onClick={this.handleSubmit}
            >
              儲存
            </Button>
            <Button variant="outlined" onClick={this.handleCancel}>
              取消
            </Button>
          </div>
        </form>
      </div>
    ) : (
      <span>尚無資料</span>
    );
    return todoForm;
  }
}
const defaultTodo = [
  {
    id: "",
    title: "",
    content: "",
    frontend: 0,
    backend: 0,
    issue: 0,
    important: 0,
    stared: 0,
    done: 0,
    important_icon: "error_outline",
    stared_icon: "star_border",
    done_icon: "crop_square",
  },
];
const mapStateToPorps = (state, ownProps) => {
  const todoId = ownProps.match?.params.id;
  const todo = todoId
    ? state.todo.todos.filter((todo) => todo.id === todoId)
    : defaultTodo;
  return {
    todo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editTodo: (todo) => {
      dispatch({ type: "EDIT_TODO", todo });
    },
    addTodo: (todo) => {
      dispatch({ type: "ADD_TODO", todo });
    },
  };
};
export default connect(mapStateToPorps, mapDispatchToProps)(TodoEdit);
