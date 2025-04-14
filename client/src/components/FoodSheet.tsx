"use client";
import { ShoppingCart, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { jwtDecode } from "jwt-decode";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { FoodOrderCompleteDialog } from "./Illustrations/FoodOrderCompleteDialog";

type FoodItem = {
  id: string;
  foodImage: string;
  foodName: string;
  foodIngredients: string;
  foodPrice: number;
  quantity: number;
};
type CartItem = {
  id: string;
  foodName: string;
  foodPrice: number;
  foodImage: string;
  foodIngredients: string;
  quantity: number;
};
interface DecodedToken {
  id: string;
  exp: number;
}
export function FoodSheet() {
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [cartItems, setCartItems] = useState<FoodItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [foodOrder, setFoodOrder] = useState<any>([]);
  const foodOrderDetails = async (userId: string) => {
    try {
      const res = await fetch(`http://localhost:4000/food-order/${userId}`);
      const foods = await res.json();
      console.log(foods);
      setFoodOrder(foods);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      console.log(token, "token shuu");
      if (token) {
        const decodedToken = jwtDecode<DecodedToken>(token);
        const userId = decodedToken?.id;
        if (userId) {
          foodOrderDetails(userId);
        }
      }
    } catch (err) {
      console.error("Error decoding token:", err);
    }
  }, []);

  const loadCart = () => {
    try {
      const savedCart = localStorage.getItem("foodCart");
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error("Error loading cart:", error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadCart();
    }
  }, [isOpen]);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedItems);
    localStorage.setItem("foodCart", JSON.stringify(updatedItems));
  };

  const removeItem = (id: string) => {
    const updatedItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedItems);
    localStorage.setItem("foodCart", JSON.stringify(updatedItems));
  };

  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in to place an order.");
        return;
      }

      const decodedToken = jwtDecode(token);
      const userId = (decodedToken as any).id;

      const cart: CartItem[] = JSON.parse(
        localStorage.getItem("foodCart") || "[]"
      );

      if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
      }

      const foodOrderItems = cart.map((item: any) => ({
        food: item.id,
        quantity: item.quantity,
      }));

      const totalPrice = cart.reduce((total: number, item: CartItem) => {
        return total + item.foodPrice * item.quantity;
      }, 0);

      const orderData = {
        user: userId,
        totalPrice,
        foodOrderItems,
        status: "PENDING",
      };

      const response = await fetch("http://localhost:4000/food-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (response.ok) {
        setCartItems([]);
        setShowSuccessDialog(true);
        localStorage.removeItem("foodCart");
      } else {
        alert("Failed to place order: " + (result.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button className="bg-white rounded-full hover:text-white px-3">
          <ShoppingCart size={40} color="red" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full max-w-[471px] p-8 overflow-y-auto bg-stone-700 border-none rounded-l-2xl">
        <div className=" flex flex-col justify-center items-center">
          <Tabs defaultValue="Cart" className="w-[350px] ">
            <TabsList className="grid w-full grid-cols-2 rounded-full">
              <TabsTrigger value="Cart">Cart</TabsTrigger>
              <TabsTrigger value="Order">Order</TabsTrigger>
            </TabsList>
            <TabsContent value="Cart">
              <Card className="">
                <CardHeader className=" pb-0 pt-4 px-4">
                  <CardTitle>My Cart</CardTitle>
                </CardHeader>
                <CardContent className="max-w-[439px] p-4 my-4 ">
                  {cartItems.length > 0 ? (
                    cartItems.map((item) => (
                      <div>
                        <div
                          key={item.id}
                          className="flex h-[120px] w-full gap-1"
                        >
                          <div className="w-[35%] flex-shrink-0">
                            <img
                              src={item.foodImage || "/placeholder.svg"}
                              alt={item.foodName}
                              className="h-[120px] w-full rounded-md object-cover"
                            />
                          </div>

                          <div className="flex flex-col justify-between w-[65%]">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium text-[16px] text-red-500">
                                  {item.foodName}
                                </h3>
                                <p className="text-sm text-gray-500 text-[12px] line-clamp-2">
                                  {item.foodIngredients}
                                </p>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border border-red-500 rounded-full p-2 flex-shrink-0"
                                onClick={() => removeItem(item.id)}
                              >
                                <X color="red" />
                              </Button>
                            </div>

                            <div className="flex justify-between items-center mt-2">
                              <div className="flex items-center gap-2">
                                <Button
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity - 1)
                                  }
                                  variant="ghost"
                                  size="sm"
                                  className="h-7 w-7 p-0"
                                >
                                  -
                                </Button>
                                <span>{item.quantity}</span>
                                <Button
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity + 1)
                                  }
                                  variant="ghost"
                                  className="h-7 w-7 p-0"
                                >
                                  +
                                </Button>
                              </div>
                              <p className="font-bold">
                                ${(item.foodPrice * item.quantity).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div>
                          <Separator
                            orientation="horizontal"
                            className=" border-b border-zinc-400 border-dashed my-5"
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-gray-400 py-8">
                      Your cart is empty
                    </div>
                  )}
                  {showSuccessDialog && (
                    <FoodOrderCompleteDialog
                      onClose={() => setShowSuccessDialog(false)}
                    />
                  )}
                </CardContent>
              </Card>

              {/* Checkout card */}
              {cartItems.length > 0 && (
                <Card className="mt-4">
                  <CardContent className="pt-6">
                    <div className="flex justify-between mb-4">
                      <span className="font-medium">Total:</span>
                      <span className="font-bold">
                        $
                        {cartItems
                          .reduce(
                            (total, item) =>
                              total + item.foodPrice * item.quantity,
                            0
                          )
                          .toFixed(2)}
                      </span>
                    </div>
                    <CardFooter>
                      <Button
                        className="w-full rounded-full bg-red-500 hover:bg-red-600"
                        onClick={handleCheckout}
                      >
                        Checkout
                      </Button>
                    </CardFooter>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="Order">
              <Card>
                <CardHeader>
                  <CardTitle>Order</CardTitle>
                  <CardDescription></CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">{foodOrder}</CardContent>
                <CardFooter></CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
}
