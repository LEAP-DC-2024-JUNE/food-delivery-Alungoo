"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
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
import BulkUpdateModal from "./BulkUpdateModal";
import { renderUrl } from "@/utils/render";
import { Loader2 } from "lucide-react";

const FoodOrderTable = () => {
  const [allOrderedData, setAllOrderedData] = useState<any[]>([]);
  const [openRows, setOpenRows] = useState<{ [key: string]: boolean }>({});
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

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
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
    getAllFoodOrder();
  }, []);

  const toggleFoodInfo = (orderId: string) => {
    setOpenRows((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  const handleSelectOrder = (orderId: string) => {
    setSelectedOrders((prev) => {
      if (prev.includes(orderId)) {
        return prev.filter((id) => id !== orderId);
      } else {
        return [...prev, orderId];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(allOrderedData.map((order) => order._id));
    }
    setSelectAll(!selectAll);
  };

  const handleBulkUpdateComplete = () => {
    getAllFoodOrder();
    setSelectedOrders([]);
    setSelectAll(false);
  };
  const handleStatusChange = async (newStatus: string, orderId: string) => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${renderUrl}/food-order/${orderId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Failed to update");

      const updatedOrder = await res.json();
      setAllOrderedData((prev) =>
        prev.map((o) =>
          o._id === orderId ? { ...o, status: updatedOrder.status } : o
        )
      );
    } catch (err) {
      console.error("Status update failed", err);
    }
  };
  if (loading) {
    return (
      <div className=" flex h-screen items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }
  return (
    <div className="bg-white mt-14 pt-5 pl-3 rounded-2xl shadow-lg max-w-[1132px]">
      <div className="flex justify-between items-center">
        <div>
          <p className="font-extrabold text-lg">Orders</p>
          <p className="text-gray-400 text-[12px]">
            {allOrderedData.length} items • {selectedOrders.length} selected
          </p>
        </div>
        <div className="pr-4">
          <BulkUpdateModal
            selectedOrders={selectedOrders}
            onUpdateComplete={handleBulkUpdateComplete}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table className="my-16">
          <TableHeader className="bg-zinc-50">
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={selectAll}
                  onCheckedChange={handleSelectAll}
                />
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
              <TableRow
                key={order._id}
                className="relative hover:bg-zinc-50 transition-colors cursor-pointer"
              >
                <TableCell>
                  <Checkbox
                    checked={selectedOrders.includes(order._id)}
                    onCheckedChange={() => handleSelectOrder(order._id)}
                  />
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
                  <div className="flex items-center ">
                    <Select
                      value={order.status}
                      onValueChange={(newStatus) =>
                        handleStatusChange(newStatus, order._id)
                      }
                    >
                      <SelectTrigger
                        className={`rounded-full py-1 font-medium
                          ${
                            order.status === "DELIVERED"
                              ? "border-green-600"
                              : order.status === "CANCELLED"
                              ? "border-red-600"
                              : "border-yellow-600"
                          }`}
                      >
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent className=" border-none">
                        <SelectItem value="PENDING">Pending</SelectItem>
                        <SelectItem value="DELIVERED">Delivered</SelectItem>
                        <SelectItem value="CANCELLED">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
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
