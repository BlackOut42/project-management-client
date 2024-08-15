import React from 'react';
import "../styles/PersonalArea.css";

const PanelContainer = ({ renderPanel }) => {
  return (
    <div className="panel-container">
      {renderPanel()}
    </div>
  );
};

export default PanelContainer;