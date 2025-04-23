import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

export function DeliveryAddressInput({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const handleOnChange = () => {
    onOpenChange(false);
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
