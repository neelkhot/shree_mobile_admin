import React, { useEffect, useCallback } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getaOrder } from "../features/auth/authSlice";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Product Name",
    dataIndex: "name",
  },
  {
    title: "Brand",
    dataIndex: "brand",
  },
  {
    title: "Count",
    dataIndex: "count",
  },
  {
    title: "Color",
    dataIndex: "color",
  },
  {
    title: "Size",
    dataIndex: "size",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
];

const ViewOrder = () => {
  const { id: orderId } = useParams();
  const dispatch = useDispatch();
  const { singleorder, isLoading, isError, message } = useSelector(
    (state) => state?.auth
  );

  const loadOrder = useCallback(() => {
    if (orderId) {
      dispatch(getaOrder(orderId));
    }
  }, [dispatch, orderId]);

  useEffect(() => {
    loadOrder();
  }, [loadOrder]);

  const orderState = singleorder?.orders;
  const data1 = (orderState?.orderItems || []).map((item, index) => ({
      key: index + 1,
      name: item?.product?.title || "Product unavailable",
      brand: item?.product?.brand || "-",
      count: item?.quantity,
      amount: item?.price,
      color: (
        <div className="col-3">
          <ul
            className="colors ps-0"
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              marginBottom: "10px",

              backgroundColor: item?.color?.title || "#ddd",
            }}
          ></ul>
        </div>
      ),
      size: item?.size?.title || "-",
    }));

  return (
    <div>
      <h3 className="mb-4 title">View Order</h3>
      {isError && (
        <div className="alert alert-danger">
          {typeof message === "string" ? message : "Unable to load order"}
        </div>
      )}
      <div>
        <Table
          columns={columns}
          dataSource={data1}
          loading={isLoading}
          locale={{ emptyText: isLoading ? "Loading order..." : "No products found in this order" }}
        />
      </div>
    </div>
  );
};

export default ViewOrder;
