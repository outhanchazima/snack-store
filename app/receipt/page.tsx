// app/receipt/page.tsx
"use client";

import { useEffect, useState } from 'react';

interface OrderDetails {
  orderId: string;
  items: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
  zone: string;
  location: string;
  deliveryInstructions: string;
  phoneNumber: string;
  subtotal: number;
  deliveryFee: number;
  total: number;
  date: string;
}

export default function ReceiptPage() {
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

  useEffect(() => {
    const storedOrder = localStorage.getItem('lastOrder');
    if (storedOrder) {
      setOrderDetails(JSON.parse(storedOrder));
    }
  }, []);

  if (!orderDetails) {
    return <div className="p-8 text-center">No order details found</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto p-8">
        <div className="text-center mb-8 pb-4 border-b">
          <div className="text-2xl font-bold mb-2">Your Store Name</div>
          <div className="text-gray-600">Order Receipt</div>
        </div>
        
        <div className="space-y-8">
          <div className="space-y-4">
            <div>
              <div className="font-semibold mb-2">Order Information</div>
              <div className="text-gray-600">Order ID: {orderDetails.orderId}</div>
              <div className="text-gray-600">
                Date: {new Date(orderDetails.date).toLocaleString()}
              </div>
            </div>
            
            <div>
              <div className="font-semibold mb-2">Delivery Details</div>
              <div className="text-gray-600">Zone: {orderDetails.zone}</div>
              <div className="text-gray-600">Location: {orderDetails.location}</div>
              <div className="text-gray-600">
                Instructions: {orderDetails.deliveryInstructions}
              </div>
              <div className="text-gray-600">Phone: {orderDetails.phoneNumber}</div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-3 text-left">Item</th>
                  <th className="py-3 text-left">Quantity</th>
                  <th className="py-3 text-left">Price</th>
                  <th className="py-3 text-left">Total</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.items.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3">{item.productId}</td>
                    <td className="py-3">{item.quantity}</td>
                    <td className="py-3">
                      {item.price.toLocaleString('en-KE', { 
                        style: 'currency', 
                        currency: 'KES' 
                      })}
                    </td>
                    <td className="py-3">
                      {(item.price * item.quantity).toLocaleString('en-KE', { 
                        style: 'currency', 
                        currency: 'KES' 
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>
                {orderDetails.subtotal.toLocaleString('en-KE', { 
                  style: 'currency', 
                  currency: 'KES' 
                })}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>
                {orderDetails.deliveryFee.toLocaleString('en-KE', { 
                  style: 'currency', 
                  currency: 'KES' 
                })}
              </span>
            </div>
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>
                {orderDetails.total.toLocaleString('en-KE', { 
                  style: 'currency', 
                  currency: 'KES' 
                })}
              </span>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-12 pt-4 border-t text-sm text-gray-500">
          <div>Thank you for your order!</div>
          <div>For any queries, please contact support@yourstore.com</div>
        </div>
      </div>
    </div>
  );
}