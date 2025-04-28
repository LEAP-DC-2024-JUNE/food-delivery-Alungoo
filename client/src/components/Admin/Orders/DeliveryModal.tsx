import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChevronsUpDown } from "lucide-react";
import { localUrl, renderUrl } from "@/utils/render";

const DeliveryModal = ({
  orderId,
  initialStatus,
  onStatusChange,
}: {
  orderId: string;
  initialStatus: string;
  onStatusChange?: (newStatus: string) => void;
}) => {
  const [status, setStatus] = useState(initialStatus || "PENDING");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const statuses = [
    {
      name: "DELIVERED",
      style: "bg-green-50 text-green-600 border-green-400 rounded-full",
    },
    {
      name: "PENDING",
      style: "bg-red-50 text-red-700 border-red-400 rounded-full",
    },
    {
      name: "CANCELLED",
      style: "bg-zinc-50 text-zinc-600 border-red-400 rounded-full",
    },
  ];

  const saveStatus = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${renderUrl}/food-order/${orderId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) throw new Error("Failed to update");

      const updatedOrder = await res.json();
      onStatusChange?.(updatedOrder.status);
      setOpen(false);
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <p
          className={`cursor-pointer flex items-center gap-2 rounded-full border px-3 py-1 ${
            statuses.find((s) => s.name === status)?.style
          }`}
        >
          {status} <ChevronsUpDown size={15} />
        </p>
      </DialogTrigger>

      <DialogContent className="w-full max-w-sm">
        <DialogHeader>
          <DialogTitle>Change delivery status</DialogTitle>
        </DialogHeader>

        <div className="flex justify-between">
          {statuses.map((option) => (
            <Button
              key={option.name}
              variant="outline"
              className={`justify-start ${option.style} ${
                status === option.name
              }`}
              onClick={() => setStatus(option.name)}
            >
              {option.name}
            </Button>
          ))}
        </div>

        <DialogFooter>
          <Button
            className="w-full rounded-full"
            onClick={saveStatus}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeliveryModal;
