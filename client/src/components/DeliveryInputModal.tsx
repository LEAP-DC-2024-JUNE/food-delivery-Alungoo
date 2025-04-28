import { Button } from "@/components/ui/button";
import { jwtDecode } from "jwt-decode";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { localUrl, renderUrl } from "@/utils/render";
interface DecodedToken {
  id: string;
  exp: number;
}
export function DeliveryAddressInput({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [address, setAddress] = useState("");
  const token = localStorage.getItem("token");
  let userId: string | null = null;
  if (token) {
    const decodedToken = jwtDecode<DecodedToken>(token);
    userId = decodedToken?.id;
  }

  const handleOnChange = async () => {
    onOpenChange(false);
    if (userId) {
      const updateUser = await fetch(`${renderUrl}/auth/update/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address }),
      });
      const res = await updateUser.json();
      console.log("Update response:", res);
    } else {
      console.error("User ID not found from token.");
    }
  };
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAddress(e.target.value);
  };
  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className=" w-full p-6">
          <DialogHeader>
            <DialogTitle>Delivery Address</DialogTitle>
          </DialogHeader>
          <Textarea
            className=" w-full h-[96px] my-[24px]"
            placeholder="Please provide specific address details such as building number, entrance, and apartment number"
            value={address}
            onChange={handleTextareaChange}
          />
          <DialogFooter>
            <div className=" flex gap-4">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={handleOnChange}>Deliver Here</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
