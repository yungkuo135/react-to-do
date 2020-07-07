import React from "react";
import { Button, Icon } from "@material-ui/core";
import { Link, NavLink } from "react-router-dom";
const filterTagsData = [
  {
    name: "stared",
    tag: "優先",
    iconName: "star",
  },
  {
    name: "important",
    tag: "重要",
    iconName: "error",
  },
  {
    name: "done",
    tag: "完成",
    iconName: "check_box",
  },
];
const labelTagsData = [
  {
    name: "frontend",
    iconColor: "#388e3c",
    iconName: "label_outline",
  },
  {
    name: "backend",
    iconColor: "#0091ea",
    iconName: "label_outline",
  },
  {
    name: "issue",
    iconColor: "#f44336",
    iconName: "label_outline",
  },
];
const filterTags = filterTagsData.map((tag) => {
  return (
    <NavLink to={"/" + tag.name} className="navLink" key={tag.name}>
      <div className="tabs_item">
        <Icon>{tag.iconName}</Icon>
        <span className="item_all">{tag.tag}</span>
      </div>
    </NavLink>
  );
});

const labelTags = labelTagsData.map((label) => {
  return (
    <NavLink to={"/" + label.name} className="navLink" key={label.name}>
      <div className="tabs_item">
        <Icon style={{ color: label.iconColor }}>{label.iconName}</Icon>
        <span className="item_all tag">{label.name}</span>
      </div>
    </NavLink>
  );
});
function Sidebar(props) {
  return (
    <div className="sidebar_nav">
      <div className="add">
        <Link to="/new">
          <Button variant="contained" className="add_btn" color="primary">
            新增事項
          </Button>
        </Link>
      </div>

      <div className="tabs_all">
        <NavLink exact to="/" className="navLink">
          <div className="tabs_item">
            <Icon>view_headline</Icon>
            <span className="item_all">全部</span>
          </div>
        </NavLink>
      </div>
      <div className="tabs_fliters">
        <div className="tabs_title">篩選</div>
        {filterTags}
      </div>
      <div className="tabs_tags">
        <div className="tabs_title">標籤</div>
        {labelTags}
      </div>
    </div>
  );
}

export default Sidebar;
