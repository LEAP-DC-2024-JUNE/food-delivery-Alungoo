"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { Plus, Minus, Check } from "lucide-react";
import { DialogTitle } from "@radix-ui/react-dialog";
import { DeliveryAddressInput } from "./DeliveryInputModal";

type FoodDetailProps = {
  id: string;
  foodImage: string;
  foodName: string;
  foodIngredients: string;
  foodPrice: number;
};

export function FoodDetail({
  id,
  foodImage,
  foodName,
  foodIngredients,
  foodPrice,
}: FoodDetailProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [deliveryInput, setDeliveryInput] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const price = foodPrice * quantity;

  const addToCart = () => {
    // odoo cart d bga items awah
    const cart = JSON.parse(localStorage.getItem("foodCart") || "[]");

    const newItem = {
      id,
      foodImage,
      foodName,
      foodIngredients,
      foodPrice,
      quantity,
    };

    const updatedCart = [
      ...cart.filter((item: any) => item.id !== id),
      newItem,
    ];
    localStorage.setItem("foodCart", JSON.stringify(updatedCart));
    setIsOpen(false);
    setDeliveryInput(true);
  };

  return (
    <>
      {deliveryInput && (
        <DeliveryAddressInput
          open={deliveryInput}
          onOpenChange={(isOpen) => {
            setDeliveryInput(isOpen);
            setShowAlert(true);
            setTimeout(() => {
              setShowAlert(false);
            }, 1500);
          }}
        />
      )}
      {showAlert && (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 z-50">
          <Alert className="bg-black text-white shadow-lg">
            <div className=" flex flex-row items-center gap-4">
              <Check className="h-5 w-5" color="white" />
              <AlertDescription>
                <span>Food is being added to the cart!</span>
              </AlertDescription>
            </div>
          </Alert>
        </div>
      )}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="absolute bottom-2 right-2 bg-white hover:bg-gray-100 text-red-500 rounded-full w-10 h-10 p-0">
            <Plus className="h-5 w-5" />
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[826px] max-w-[826px] p-6">
          <div className="flex flex-row gap-6 h-full">
            <div className="w-[377px] flex-shrink-0">
              <DialogTitle className="p-0">
                <img
                  src={foodImage}
                  alt={foodName}
                  width={377}
                  height={364}
                  className="w-full h-[364px] object-cover rounded-lg"
                />
              </DialogTitle>
            </div>

            <div className="flex-1 flex flex-col justify-between overflow-hidden">
              <div>
                <h2 className="text-red-500 text-lg font-semibold">
                  {foodName}
                </h2>
                <p className="text-sm text-gray-700 mb-4">{foodIngredients}</p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex flex-col">
                    <span className="text-[16px] font-normal">Total price</span>
                    <div className="font-medium text-[24px]">
                      ${price.toFixed(2)}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      className="rounded-full px-2"
                      variant="outline"
                      size="sm"
                      onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                    >
                      <Minus />
                    </Button>
                    <span>{quantity}</span>
                    <Button
                      className="rounded-full px-2"
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus />
                    </Button>
                  </div>
                </div>
                <Button className="w-full" onClick={addToCart}>
                  Add to cart
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
