import React, { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    paypal?: any;
  }
}

interface PayPalButtonProps {
  price: string;
  itemName: string;
}

export default function PayPalButton({ price, itemName }: PayPalButtonProps) {
  const buttonContainerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (window.paypal) {
      setIsLoaded(true);
      return;
    }

    const scriptId = 'paypal-sdk-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://www.paypal.com/sdk/js?client-id=ASLAa6QURS7aKg8EKHEibh83dlkZCejqtlxCuRJPB5YABTMKjFNAnBufvS5hVGMavNH_FQnO06bdsPm8&currency=USD';
      script.async = true;
      script.onload = () => setIsLoaded(true);
      document.body.appendChild(script);
    } else {
      // Script is already loading, wait for it
      const checkInterval = setInterval(() => {
        if (window.paypal) {
          setIsLoaded(true);
          clearInterval(checkInterval);
        }
      }, 100);
      return () => clearInterval(checkInterval);
    }
  }, []);

  useEffect(() => {
    if (isLoaded && buttonContainerRef.current && window.paypal) {
      buttonContainerRef.current.innerHTML = ''; // Clear previous instance
      
      window.paypal.Buttons({
        style: {
          layout: 'horizontal',
          color: 'gold',
          shape: 'rect',
          label: 'buynow',
          height: 40
        },
        createOrder: (data: any, actions: any) => {
          // Extract numeric value from price string (e.g., "$120" -> "120.00")
          const numericPrice = parseFloat(price.replace(/[^0-9.]/g, '')).toFixed(2);
          return actions.order.create({
            purchase_units: [{
              description: itemName,
              amount: {
                currency_code: 'USD',
                value: numericPrice
              }
            }]
          });
        },
        onApprove: async (data: any, actions: any) => {
          const order = await actions.order.capture();
          alert(`Thank you for your purchase, ${order.payer.name.given_name}!`);
        },
        onError: (err: any) => {
          console.error("PayPal Error:", err);
          alert("There was an error processing your payment.");
        }
      }).render(buttonContainerRef.current);
    }
  }, [isLoaded, price, itemName]);

  return (
    <div className="w-full relative z-10 min-h-[40px]">
      {!isLoaded && (
        <div className="w-full h-[40px] bg-[#2D2D2D] animate-pulse rounded flex items-center justify-center text-xs text-[#A3A3A3] uppercase tracking-widest font-bold">
          Loading...
        </div>
      )}
      <div ref={buttonContainerRef} />
    </div>
  );
}
