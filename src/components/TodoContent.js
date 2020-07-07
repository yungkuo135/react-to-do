import React, { Component } from "react";
import { Tooltip, IconButton, Icon } from "@material-ui/core";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class TodoContent extends Component {
  handleSetTag = (tag, id) => {
    let value;
    const newTodos = this.state.todos.map((todo) => {
      if (todo.id === id) {
        todo[tag] = todo[tag] ? 0 : 1;
        value = todo[tag];
        todo.important_icon = todo.important ? "error" : "error_outline";
        todo.stared_icon = todo.stared ? "star" : "star_border";
        todo.done_icon = todo.done ? "check_box" : "crop_square";
      }
      return todo;
    });
    this.setState({
      todos: newTodos,
    });
    this.props.setTag(id, tag, value);
  };

  componentDidMount() {
    this.setState({
      todos: this.props.todos,
    });
  }
  render() {
    const todos = this.state?.todos;
    const todoItems =
      todos && todos.length ? (
        todos.map((todo) => {
          return (
            <div className="toDo_item" key={todo.id}>
              <Link className="toDo_link" to={"/edit/" + todo.id}>
                <div className="item_text">
                  <div className={`toDo_title ${todo.done ? "done" : ""}`}>
                    {todo.title}
                  </div>
                  <div className={`toDo_content ${todo.done ? "done" : ""}`}>
                    {todo.content}
                  </div>
                  {todo.frontend ? (
                    <span className="toDo_tag">
                      <span className="dots green"></span> Frontend
                    </span>
                  ) : null}
                  {todo.backend ? (
                    <span className="toDo_tag">
                      <span className="dots blue"></span> Backend
                    </span>
                  ) : null}
                  {todo.issue ? (
                    <span className="toDo_tag">
                      <span className="dots red"></span> Issue
                    </span>
                  ) : null}
                </div>
              </Link>
              <div className="item_icons">
                <Tooltip title="重要">
                  <IconButton
                    onClick={() => this.handleSetTag("important", todo.id)}
                  >
                    <Icon style={{ color: `${todo.important ? "red" : ""}` }}>
                      {todo.important_icon}
                    </Icon>
                  </IconButton>
                </Tooltip>
                <Tooltip title="優先">
                  <IconButton
                    onClick={() => this.handleSetTag("stared", todo.id)}
                  >
                    <Icon style={{ color: `${todo.stared ? "#ffc107" : ""}` }}>
                      {todo.stared_icon}
                    </Icon>
                  </IconButton>
                </Tooltip>
                <Tooltip title="完成">
                  <IconButton
                    onClick={() => this.handleSetTag("done", todo.id)}
                  >
                    <Icon style={{ color: `${todo.done ? "blue" : ""}` }}>
                      {todo.done_icon}
                    </Icon>
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          );
        })
      ) : (
        <div className="noContent">無資料</div>
      );

    return <div className="todo_list_content">{todoItems}</div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  let todos = JSON.parse(JSON.stringify(state.todo.todos));
  const path = ownProps.match.path.split("/")[1];
  const keyword = ownProps.match.params.keyword;
  if (path === "search") {
    todos = todos.filter((todo) => {
      return (
        todo.title.indexOf(keyword) > -1 || todo.content.indexOf(keyword) > -1
      );
    });
  } else if (path) {
    todos = todos.filter((todo) => {
      return todo[path] === 1;
    });
  }
  return {
    todos,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setTag: (id, tag, value) => {
      dispatch({ type: "SET_TAG", payload: { id, tag, value } });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoContent);
