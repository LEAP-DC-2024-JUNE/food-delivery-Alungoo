import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { renderUrl } from "@/utils/render";

const BulkUpdateModal = ({ selectedOrders, onUpdateComplete }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState("Pending");
  const [loading, setLoading] = useState(false);

  const statuses = [
    {
      name: "DELIVERED",
      style:
        "bg-[#F4F4F5] border-none text-zinc-600 hover:border-green-400 hover:bg-green-100 hover:text-green-700 rounded-full",
      activeStyle: "bg-green-100 text-green-700 border-green-400",
    },
    {
      name: "PENDING",
      style:
        "bg-[#F4F4F5] border-none text-zinc-600 hover:border-orange-400 hover:bg-orange-100 hover:text-orange-700 rounded-full",

      activeStyle: "bg-red-100 text-orange-700 border-orange-400",
    },
    {
      name: "CANCELLED",
      style:
        "bg-[#F4F4F5] border-none text-zinc-600 hover:border-red-400 hover:bg-red-100 hover:text-red-700 rounded-full",
      activeStyle: "bg-orange-100 text-red-700 border-red-400",
    },
  ];

  const handleBulkUpdate = async () => {
    if (selectedOrders.length === 0) {
      alert("Please select at least one order to update");
      return;
    }
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      // Create an array of updates with orderId and status
      const updates = selectedOrders.map((orderId: any) => ({
        orderId,
        status,
      }));

      const res = await fetch(`${renderUrl}/food-order/bulk-update`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error("Error response:", errorData);
        throw new Error(errorData.error || "Failed to update orders");
      }

      const result = await res.json();
      onUpdateComplete();
      setIsOpen(false);
    } catch (err: any) {
      console.error("Bulk update failed:", err);
      alert("Failed to update orders: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="rounded-full"
          disabled={selectedOrders.length === 0}
        >
          Change delivery state{" "}
          <span className="bg-white rounded-xl text-black px-[8px]">
            {selectedOrders.length}
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Change delivery state</DialogTitle>
        </DialogHeader>
        <div className="grid py-3">
          <div className="flex justify-between gap-2">
            {statuses.map((option) => (
              <Button
                key={option.name}
                variant="outline"
                className={`${option.style} ${
                  status === option.name ? option.activeStyle : ""
                }`}
                onClick={() => setStatus(option.name)}
              >
                {option.name}
              </Button>
            ))}
          </div>
        </div>
        <div>
          <Button
            className="w-full rounded-full"
            type="button"
            variant="default"
            onClick={handleBulkUpdate}
            disabled={loading || selectedOrders.length === 0}
          >
            {loading ? "Saving..." : "Save"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BulkUpdateModal;
