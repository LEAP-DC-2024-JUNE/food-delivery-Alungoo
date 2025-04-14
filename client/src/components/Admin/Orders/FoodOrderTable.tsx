"use client";
import { useState, useEffect, Fragment } from "react";
import { FoodInfo } from "./FoodInfo";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown } from "lucide-react";
import { ChevronsUpDown } from "lucide-react";
import DeliveryModal from "./DeliveryModal";

const FoodOrderTable = () => {
  const [allOrderedData, setAllOrderedData] = useState<any[]>([]);

  const [openRows, setOpenRows] = useState<{ [key: string]: boolean }>({});

  const getAllFoodOrder = async () => {
    try {
      const response = await fetch("http://localhost:4000/food-order");
      const data = await response.json();
      setAllOrderedData(data);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(allOrderedData, "<<<<<orderedFood");
  useEffect(() => {
    getAllFoodOrder();
  }, []);

  const toggleFoodInfo = (orderId: string) => {
    setOpenRows((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  return (
    <div className=" bg-white mt-14 pt-5 pl-3 rounded-2xl shadow-lg max-w-[1132px]">
      <p className=" font-extrabold text-lg">Orders</p>
      <p className=" text-gray-400 text-[12px]">
        {allOrderedData.length} items
      </p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <div className="">
                <Checkbox />
              </div>
            </TableHead>
            <TableHead className="w-[50px]">№</TableHead>
            <TableHead className="w-[130px]">Customer</TableHead>
            <TableHead className="w-[130px]">Food</TableHead>
            <TableHead className="w-[130px]">Date</TableHead>
            <TableHead className="w-[50px]">Total</TableHead>
            <TableHead className="w-[130px]">Delivery Address</TableHead>
            <TableHead className="w-[100px]">
              <div className=" flex items-center gap-2">
                Delivery state <ChevronsUpDown size={15} />
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allOrderedData.map((order, index) => (
            <TableRow key={order._id}>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{order?.user?.email}</TableCell>
              <TableCell>
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => toggleFoodInfo(order._id)}
                >
                  {order.foodOrderItems?.length || 0} foods
                  <ChevronDown
                    size={16}
                    className={
                      openRows[order._id] ? "transform rotate-180" : ""
                    }
                  />
                </div>
                {openRows[order._id] && (
                  <div className="absolute bg-white shadow-lg rounded-md p-2 mt-1 border border-gray-200 w-64">
                    <FoodInfo foodItems={order.foodOrderItems} />
                  </div>
                )}
              </TableCell>
              <TableCell>
                {new Date(order.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>${order.totalPrice}</TableCell>
              <TableCell>{order.deliveryAddress || "N/A"}</TableCell>

              <TableCell>
                <DeliveryModal
                  orderId={order._id}
                  initialStatus={order.status}
                  onStatusChange={(newStatus) => {
                    setAllOrderedData((prev) =>
                      prev.map((o) =>
                        o._id === order._id ? { ...o, status: newStatus } : o
                      )
                    );
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
export default FoodOrderTable;
