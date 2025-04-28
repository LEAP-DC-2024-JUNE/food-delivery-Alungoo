"use client";

import { useState, useEffect } from "react";
import { FoodInfo } from "./FoodInfo";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown, ChevronsUpDown } from "lucide-react";
import DeliveryModal from "./DeliveryModal";
import { localUrl, renderUrl } from "@/utils/render";

const FoodOrderTable = () => {
  const [allOrderedData, setAllOrderedData] = useState<any[]>([]);
  const [openRows, setOpenRows] = useState<{ [key: string]: boolean }>({});

  const getAllFoodOrder = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch(`${renderUrl}/food-order`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setAllOrderedData(data);
    } catch (err) {
      console.error("Error fetching food orders:", err);
    }
  };

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
    <div className="bg-white mt-14 pt-5 pl-3 rounded-2xl shadow-lg max-w-[1132px]">
      <p className="font-extrabold text-lg">Orders</p>
      <p className="text-gray-400 text-[12px]">{allOrderedData.length} items</p>

      <div className="overflow-x-auto">
        <Table className="my-16">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox />
              </TableHead>
              <TableHead className="w-[50px]">№</TableHead>
              <TableHead className="w-[130px]">Customer</TableHead>
              <TableHead className="w-[130px]">Food</TableHead>
              <TableHead className="w-[130px]">Date</TableHead>
              <TableHead className="w-[50px]">Total</TableHead>
              <TableHead className="w-[130px]">Delivery Address</TableHead>
              <TableHead className="w-[100px]">
                <div className="flex items-center gap-2">
                  Delivery state <ChevronsUpDown size={15} />
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {allOrderedData.map((order, index) => (
              <TableRow key={order._id} className="relative">
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
                      className={`ml-1 transition-transform ${
                        openRows[order._id] ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                  {openRows[order._id] && (
                    <div className="absolute z-10 bg-white shadow-lg rounded-md p-2 mt-2 border border-gray-200 w-64">
                      <FoodInfo foodItems={order.foodOrderItems} />
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  {new Date(order.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>${order.totalPrice}</TableCell>
                <TableCell>{order.user.address}</TableCell>
                <TableCell>
                  <DeliveryModal
                    orderId={order._id}
                    initialStatus={order.status}
                    onStatusChange={(newStatus) =>
                      setAllOrderedData((prev) =>
                        prev.map((o) =>
                          o._id === order._id ? { ...o, status: newStatus } : o
                        )
                      )
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default FoodOrderTable;
