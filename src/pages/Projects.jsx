import React from "react";

const Projects = ({ pro }) => {
  return (
    <div>
      {pro.map((item) => {
        return <div>{item.name}</div>;
      })}
    </div>
  );
};

export default Projects;
