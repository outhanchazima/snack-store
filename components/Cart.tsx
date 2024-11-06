"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { cartAtom, cartTotalAtom, isCartOpenAtom } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useAtom } from "jotai";
import { ArrowLeft, Minus, Plus, X } from "lucide-react";
import { useState } from "react";


// Mock data for delivery zones
const DELIVERY_ZONES = [
  { id: "1", name: "Zone A - CBD", fee: 200 },
  { id: "2", name: "Zone B - Westlands", fee: 250 },
  { id: "3", name: "Zone C - Kileleshwa", fee: 300 },
];

const LOCATIONS = {
  "1": [
    { id: "1a", name: "City Hall" },
    { id: "1b", name: "Archives" },
    { id: "1c", name: "Moi Avenue" },
  ],
  "2": [
    { id: "2a", name: "The Mall" },
    { id: "2b", name: "Sarit Centre" },
    { id: "2c", name: "The Oval" },
  ],
  "3": [
    { id: "3a", name: "Valley Arcade" },
    { id: "3b", name: "Ringroad Mall" },
    { id: "3c", name: "ArtCaffe" },
  ],
};

export function Cart() {
  const [isOpen, setIsOpen] = useAtom(isCartOpenAtom);
  const [cart, setCart] = useAtom(cartAtom);
  const [total] = useAtom(cartTotalAtom);
  const [stage, setStage] = useState("cart"); // cart, delivery, payment, confirmation
  
  // Form states
  const [selectedZone, setSelectedZone] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [deliveryInstructions, setDeliveryInstructions] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const selectedZoneData = DELIVERY_ZONES.find(zone => zone.id === selectedZone);
  const deliveryFee = selectedZoneData?.fee || 0;
  const totalWithDelivery = total + deliveryFee;

  const updateQuantity = (productId: string, sizeId: string, delta: number) => {
    setCart((items) =>
      items.map((item) => {
        if (item.productId === productId && item.sizeId === sizeId) {
          const newQuantity = item.quantity + delta;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
        }
        return item;
      }).filter(Boolean) as typeof cart
    );
  };

  const removeItem = (productId: string, sizeId: string) => {
    setCart((items) =>
      items.filter(
        (item) => !(item.productId === productId && item.sizeId === sizeId)
      )
    );
  };

  const handlePayment = async () => {
    if (!phoneNumber.match(/^(?:254|\+254|0)?([71]|\d{2})\d{8}$/)) {
      alert("Please enter a valid Kenyan phone number");
      return;
    }

    setIsProcessing(true);
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setStage("confirmation");
    } catch (error) {
      alert("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    // Reset form when closing
    setTimeout(() => {
      setStage("cart");
      setSelectedZone("");
      setSelectedLocation("");
      setDeliveryInstructions("");
      setPhoneNumber("");
    }, 300);
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleClose}>
      <SheetContent side="right" className="w-full sm:max-w-lg flex flex-col h-full">
        <SheetHeader className="flex-shrink-0">
          <div className="flex items-center">
            {stage !== "cart" && (
              <Button
                variant="ghost"
                size="icon"
                className="mr-2"
                onClick={() => setStage(stage === "payment" ? "delivery" : "cart")}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            <SheetTitle>
              {stage === "cart" && "Your Cart"}
              {stage === "delivery" && "Delivery Details"}
              {stage === "payment" && "Payment"}
              {stage === "confirmation" && "Order Confirmed"}
            </SheetTitle>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto mt-6">
          <AnimatePresence mode="wait">
            {stage === "cart" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {cart.map((item) => (
                  <div
                    key={`${item.productId}-${item.sizeId}`}
                    className="flex items-center justify-between py-4 border-b"
                  >
                    <div className="flex-1">
                      <h3 className="font-medium">{item.productId}</h3>
                      <p className="text-sm text-muted-foreground">
                        {formatCurrency(item.price)}
                      </p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.productId, item.sizeId, -1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.productId, item.sizeId, 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.productId, item.sizeId)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}

                {cart.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    Your cart is empty
                  </div>
                )}
              </motion.div>
            )}

            {stage === "delivery" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Select Zone
                  </label>
                  <Select value={selectedZone} onValueChange={setSelectedZone}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select delivery zone" />
                    </SelectTrigger>
                    <SelectContent>
                      {DELIVERY_ZONES.map(zone => (
                        <SelectItem key={zone.id} value={zone.id}>
                          {zone.name} - {formatCurrency(zone.fee)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedZone && (
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Select Location
                    </label>
                    <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        {LOCATIONS[selectedZone]?.map(location => (
                          <SelectItem key={location.id} value={location.id}>
                            {location.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Delivery Instructions
                  </label>
                  <Textarea
                    value={deliveryInstructions}
                    onChange={(e) => setDeliveryInstructions(e.target.value)}
                    placeholder="Enter any special delivery instructions..."
                    className="h-24"
                  />
                </div>
              </motion.div>
            )}

            {stage === "payment" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium mb-1">
                    M-Pesa Phone Number
                  </label>
                  <Input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter your M-Pesa number"
                  />
                </div>

                <div className="space-y-2">
                  {cart.map((item) => (
                    <div
                      key={`${item.productId}-${item.sizeId}`}
                      className="flex justify-between text-sm"
                    >
                      <span>
                        {item.productId} x {item.quantity}
                      </span>
                      <span>{formatCurrency(item.price * item.quantity)}</span>
                    </div>
                  ))}
                  
                  <div className="border-t pt-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>{formatCurrency(total)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Fee</span>
                      <span>{formatCurrency(deliveryFee)}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {stage === "confirmation" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center space-y-4"
              >
                <div className="text-green-600 text-xl font-medium">
                  Order Confirmed!
                </div>
                <p className="text-muted-foreground">
                  Thank you for your order. You will receive an SMS confirmation shortly.
                </p>
                <Button 
                  className="w-full" 
                  onClick={() => window.open('/receipt', '_blank')}
                >
                  Download Receipt
                </Button>
                <Button 
                  className="w-full mt-2" 
                  variant="outline"
                  onClick={() => window.print()}
                >
                  Print Receipt
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {cart.length > 0 && stage !== "confirmation" && (
          <div className="border-t mt-auto pt-4 space-y-4">
            <div className="flex justify-between text-lg font-medium">
              <span>Total</span>
              <span>{formatCurrency(stage === "cart" ? total : totalWithDelivery)}</span>
            </div>

            <Button 
              className="w-full" 
              disabled={
                (stage === "delivery" && (!selectedZone || !selectedLocation)) ||
                (stage === "payment" && !phoneNumber) ||
                isProcessing
              }
              onClick={() => {
                if (stage === "cart") setStage("delivery");
                else if (stage === "delivery") setStage("payment");
                else if (stage === "payment") handlePayment();
              }}
            >
              {isProcessing ? "Processing..." : 
                stage === "cart" ? "Continue to Delivery" :
                stage === "delivery" ? "Continue to Payment" :
                "Pay with M-Pesa"}
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}