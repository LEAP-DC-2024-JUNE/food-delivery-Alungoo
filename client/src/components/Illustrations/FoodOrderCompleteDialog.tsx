import { Copy } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FoodOrderPic from "../../../public/foodOrderPic.png";

export function FoodOrderCompleteDialog({ onClose }: { onClose: () => void }) {
  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className=" flex flex-col justify-center items-center w-[664px] [button[data-dialog-close]]:hidden">
        <DialogHeader>
          <DialogTitle className=" text-[24px]">
            Your order has been successfully placed !
          </DialogTitle>
        </DialogHeader>
        <Image src={FoodOrderPic} alt="kidsPicture" />
        <DialogFooter className="">
          <DialogClose asChild>
            <Button type="button" variant="secondary" className=" rounded-full">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
        <style jsx>{`
          [data-dialog-close] {
            display: none !important;
          }
        `}</style>
      </DialogContent>
    </Dialog>
  );
}
