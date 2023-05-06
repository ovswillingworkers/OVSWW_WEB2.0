import React from "react";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";

type SetSelectedOption = (selectedOption: string) => void;
interface MainmenuProps {
  isAdmin: boolean;
  onOptionClick: SetSelectedOption;
}

const Mainmenu = ({ onOptionClick, isAdmin }: MainmenuProps) => {
  const handleClick = (option: string) => {
    onOptionClick(option);
  };

  return (
    <div className="mainmenu">
      <div className="menu-option">
        <div className="mainmenu-jobpost">
          <h2>Job Post</h2>
          <UploadOutlined className="jobpost-icon" />
          <div>
            <a href="#" onClick={() => handleClick("new-job-posting")}>
              <h1>Create New Job Post</h1>
            </a>
            <a href="#" onClick={() => handleClick("all-job-posting")}>
              <h1>View All Job Posting</h1>
            </a>
          </div>
        </div>

        {isAdmin && (
          <div className="mainmenu-user">
            <h2>Admin Access</h2>
            <UserOutlined className="user-icon" />
            <div>
              <a href="#" onClick={() => handleClick("createNewUser")}>
                <h1>Create New User</h1>
              </a>
              <a href="#" onClick={() => handleClick("all-list-user")}>
                <h1>View All Users</h1>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Mainmenu;
