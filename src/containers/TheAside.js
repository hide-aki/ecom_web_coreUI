import React from "react";
import { CContainer, CSidebar, CSidebarClose } from "@coreui/react";
import { useDispatch, useSelector } from "react-redux";
import WidgetsBrand from "../views/widgets/WidgetsBrand";

const TheAside = () => {
  const dispatch = useDispatch();
  const asideShow = useSelector((state) => state.changeState.asideShow);
  const setState = (state) => dispatch({ type: "set", asideShow: state });

  return (
    <CSidebar
      aside
      colorScheme="light"
      size="lg"
      overlaid
      show={asideShow}
      onShowChange={(state) => setState(state)}>
      <CSidebarClose onClick={() => setState(false)} />
      {/*aside content*/}
      <div className="nav-underline">
        <div className="nav nav-tabs">
          <div className="nav-item">
            <div className="nav-link">Aside</div>

            <CContainer className="my-3">
              <WidgetsBrand withCharts />
            </CContainer>
          </div>
        </div>
      </div>
    </CSidebar>
  );
};

export default TheAside;
