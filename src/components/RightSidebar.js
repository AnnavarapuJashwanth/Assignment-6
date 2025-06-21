import React from 'react';
import './RightSidebar.css';

const RightSidebar = () => {
  const suggested = ["_chanikya_chowdary_", "dharani_chowdary_10", "btwits_nn"];

  return (
    <div className="right-sidebar">
      <h4>Suggested for you</h4>
      <ul>
        {suggested.map((user, i) => (
          <li key={i}>{user}</li>
        ))}
      </ul>
    </div>
  );
};

export default RightSidebar;
