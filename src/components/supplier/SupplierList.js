import React, { useEffect, useState } from "react";
import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CPagination,
  CRow,
} from "@coreui/react";

import { getSupplierAPI } from "../../apiCalls/get";
import { useDispatch, useSelector } from "react-redux";
import { onLogoutv2 } from "../../apiCalls/auth";
import { deleteSupplierAPI } from "../../apiCalls/post";
import CIcon from "@coreui/icons-react";
import { useHistory } from "react-router-dom";

const fields = [
  "name",
  "address",
  "email",
  "telNo",
  "faxNo",
  {
    key: "operations",
    label: "Operations",
    sorter: false,
  },
];

function SupplierList() {
  const dispatch = useDispatch();
  const history = useHistory();
  const token = useSelector((state) => state.userInfo.user.token);
  const [supplierData, setSupplierData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [fetchTrigger, setFetchTrigger] = useState(0);

  useEffect(() => {
    setLoading(true);
    getSupplierAPI(token, "*", currentPage)
      .then(({ data }) => {
        setSupplierData(data.resultList);
        // console.log(data.resultList);
        setTotalPages(data.totalPage);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response) {
          onLogoutv2(dispatch);
          // console.error("err response", error.response); // client received an error response (5xx, 4xx)
        } else if (error.request) {
          // console.error("err req", error.request); // client never received a response, or request never left
        } else {
          setTimeout(() => {
            setFetchTrigger(fetchTrigger + 1);
          }, 2000);
          // anything else // console.error("There was an error!", error);
        }
      });
  }, [token, dispatch, currentPage, fetchTrigger]);

  const handleDeleteSupplier = ({ id }) => {
    const updatePayload = {
      supplier_id: id,
    };
    deleteSupplierAPI(updatePayload, token)
      .then((data) => {
        // console.log(data);
        setFetchTrigger(fetchTrigger + 1);
      })
      .catch((error) => {});
  };
  const handleEditSupplier = (item, index) => {
    history.push({
      pathname: "/updateSupplier",
      state: item,
    });
  };
  const editDeleteButtonGroup = (item, index) => (
    <>
      <CButton
        className="inline"
        color="info"
        variant="ghost"
        shape="pill"
        size="sm"
        onClick={() => {
          handleEditSupplier(item, index);
        }}>
        <CIcon name="cil-pencil" />
      </CButton>
      <CButton
        className="inline"
        color="danger"
        variant="ghost"
        shape="pill"
        size="sm"
        onClick={() => {
          handleDeleteSupplier(item, index);
        }}>
        <CIcon name="cil-trash" />
      </CButton>
    </>
  );
  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            Supplier List
            <div className="card-header-actions">
              <CButton
                className="inline"
                color="info"
                variant="outline"
                shape="pill"
                // size="sm"
                onClick={() => {
                  history.push({
                    pathname: "/createSupplier",
                  });
                }}>
                <CIcon name="cil-plus" className="mr-2 float-left" />
                Create Supplier
              </CButton>
            </div>
          </CCardHeader>
          <CCardBody>
            <CDataTable
              items={supplierData}
              fields={fields}
              loading={loading}
              hover
              striped
              bordered
              size="sm"
              itemsPerPage={10}
              pagination
              sorter
              scopedSlots={{
                operations: (item, index) => (
                  <td className="py-2">{editDeleteButtonGroup(item, index)}</td>
                ),
              }}
            />
            <CPagination
              pages={totalPages}
              activePage={currentPage}
              onActivePageChange={setCurrentPage}
              // arrows={totalPages < 5 && false}
              // doubleArrows={totalPages < 5 && false}
              className={totalPages < 2 ? "d-none" : ""}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
}

export default SupplierList;
