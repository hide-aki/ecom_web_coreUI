import React from "react";
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useHistory } from "react-router-dom";
import { logout } from "../actions";
import { useDispatch } from "react-redux";
import axios from "axios";

const TheHeaderDropdown = () => {
  let history = useHistory();
  const dispatch = useDispatch();

  const handleLogout = () => {
    axios
      .get("http://localhost:3001/logout", { withCredentials: true })
      .then(({ data }) => {
        // console.log("returned: ", data);
        dispatch(logout());
        history.push("/login");
      })
      .catch((error) => {
        if (error.response) {
          // console.error("err response", error.response);
          // client received an error response (5xx, 4xx)
        } else if (error.request) {
          // console.error("err req", error.request);
          // client never received a response, or request never left
        } else {
          // anything else
          // console.error("There was an error!", error);
        }
      });
  };

  return (
    <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg
            src={"avatars/6.jpg"}
            className="c-avatar-img"
            alt="admin@bootstrapmaster.com"
          />
        </div>{" "}
      </CDropdownToggle>{" "}
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem header tag="div" color="light" className="text-center">
          <strong> Account </strong>{" "}
        </CDropdownItem>{" "}
        <CDropdownItem>
          <CIcon name="cil-bell" className="mfe-2" />
          Updates{" "}
          <CBadge color="info" className="mfs-auto">
            42{" "}
          </CBadge>{" "}
        </CDropdownItem>{" "}
        <CDropdownItem>
          <CIcon name="cil-envelope-open" className="mfe-2" />
          Messages{" "}
          <CBadge color="success" className="mfs-auto">
            42{" "}
          </CBadge>{" "}
        </CDropdownItem>{" "}
        <CDropdownItem>
          <CIcon name="cil-task" className="mfe-2" />
          Tasks{" "}
          <CBadge color="danger" className="mfs-auto">
            42{" "}
          </CBadge>{" "}
        </CDropdownItem>{" "}
        <CDropdownItem>
          <CIcon name="cil-comment-square" className="mfe-2" />
          Comments{" "}
          <CBadge color="warning" className="mfs-auto">
            42{" "}
          </CBadge>{" "}
        </CDropdownItem>{" "}
        <CDropdownItem header tag="div" color="light" className="text-center">
          <strong> Settings </strong>{" "}
        </CDropdownItem>{" "}
        <CDropdownItem>
          <CIcon name="cil-user" className="mfe-2" />
          Profile{" "}
        </CDropdownItem>{" "}
        <CDropdownItem>
          <CIcon name="cil-settings" className="mfe-2" />
          Settings{" "}
        </CDropdownItem>{" "}
        <CDropdownItem>
          <CIcon name="cil-credit-card" className="mfe-2" />
          Payments{" "}
          <CBadge color="secondary" className="mfs-auto">
            42{" "}
          </CBadge>{" "}
        </CDropdownItem>{" "}
        <CDropdownItem>
          <CIcon name="cil-file" className="mfe-2" />
          Projects{" "}
          <CBadge color="primary" className="mfs-auto">
            42{" "}
          </CBadge>{" "}
        </CDropdownItem>{" "}
        <CDropdownItem divider />
        <CDropdownItem>
          <CIcon name="cil-lock-locked" className="mfe-2" />
          Lock Account{" "}
        </CDropdownItem>{" "}
        <CDropdownItem onClick={handleLogout}>
          <CIcon name="cil-lock-locked" className="mfe-2" />
          Logout Account
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default TheHeaderDropdown;
