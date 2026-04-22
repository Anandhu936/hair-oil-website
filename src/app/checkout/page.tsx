"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Lock, ShieldCheck, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";

// Extend Window to include Razorpay
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Razorpay: any;
  }
}

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (document.getElementById("razorpay-script")) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.id = "razorpay-script";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

interface FormData {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, clearCart } = useCartStore();
  const [isMounted, setIsMounted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
  });
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    setIsMounted(true);
    if (items.length === 0) {
      router.push("/");
    }
    // Pre-load Razorpay script in the background
    loadRazorpayScript();
  }, [items.length, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePayWithRazorpay = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!formRef.current?.checkValidity()) {
      formRef.current?.reportValidity();
      return;
    }

    setIsProcessing(true);

    try {
      // 1. Load Razorpay script (already pre-loaded, this ensures it)
      const loaded = await loadRazorpayScript();
      if (!loaded || !window.Razorpay) {
        alert("Failed to load payment gateway. Please check your internet and try again.");
        setIsProcessing(false);
        return;
      }

      // 2. Create a Razorpay order on our server
      const orderRes = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: total,
          currency: "INR",
          receipt: `receipt_${Date.now()}`,
        }),
      });

      if (!orderRes.ok) {
        const err = await orderRes.json();
        throw new Error(err.error || "Order creation failed");
      }

      const order = await orderRes.json();

      // 3. Open Razorpay checkout modal
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "GEETHIKA",
        description: "Premium Hair Oil",
        image: "/favicon.ico",
        order_id: order.id,
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          contact: formData.phone,
        },
        notes: {
          address: `${formData.address}, ${formData.city} - ${formData.postalCode}`,
        },
        theme: {
          color: "#7C5C3E",
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        handler: async function (response: any) {
          // 4. Verify the payment signature server-side
          try {
            const verifyRes = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json();

            if (verifyData.success) {
              // 5. Payment verified — clear cart and go to success page
              clearCart();
              router.push(
                `/checkout/success?paymentId=${verifyData.paymentId}&orderId=${verifyData.orderId}`
              );
            } else {
              alert("Payment verification failed. Please contact support.");
              setIsProcessing(false);
            }
          } catch {
            alert("Verification error. Please contact support with your payment ID.");
            setIsProcessing(false);
          }
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", function () {
        alert("Payment failed. Please try again.");
        setIsProcessing(false);
      });

      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Something went wrong. Please try again.");
      setIsProcessing(false);
    }
  };

  if (!isMounted || items.length === 0) return null;

  const subtotal = getSubtotal();
  const shipping = subtotal >= 999 ? 0 : 150;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-black/10 dark:border-white/10 p-6 bg-card sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl font-bold text-primary tracking-tight">
            GEETHIKA
          </Link>
          <Link href="/" className="text-sm font-medium text-foreground/60 hover:text-foreground flex items-center gap-1">
            <ChevronLeft size={16} /> Return to Store
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 md:px-6 py-12">
        <form
          ref={formRef}
          onSubmit={handlePayWithRazorpay}
          noValidate
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
        >
          {/* Left Column - Forms */}
          <div className="lg:col-span-7 space-y-10">

            {/* Contact Info */}
            <section>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-4">Contact Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="email"
                  name="email"
                  id="checkout-email"
                  required
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                  className="sm:col-span-2 w-full h-12 bg-card border border-black/10 dark:border-white/10 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-primary text-foreground/50"
                />
                <div className="sm:col-span-2 relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/50 text-sm flex items-center gap-1.5">
                    <Smartphone size={15} />
                    +91
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    id="checkout-phone"
                    required
                    pattern="[6-9][0-9]{9}"
                    placeholder="10-digit mobile number"
                    value={formData.phone}
                    onChange={handleChange}
                    maxLength={10}
                    className="w-full h-12 bg-card border border-black/10 dark:border-white/10 rounded-lg pl-16 pr-4 focus:outline-none focus:ring-2 focus:ring-primary text-foreground/50"
                  />
                </div>
              </div>
            </section>

            {/* Shipping Address */}
            <section>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-4">Shipping Address</h2>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  id="checkout-firstname"
                  required
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="col-span-2 sm:col-span-1 border border-black/10 dark:border-white/10 h-12 bg-card rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-primary text-foreground/50"
                />
                <input
                  type="text"
                  name="lastName"
                  id="checkout-lastname"
                  required
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="col-span-2 sm:col-span-1 border border-black/10 dark:border-white/10 h-12 bg-card rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-primary text-foreground/50"
                />
                <input
                  type="text"
                  name="address"
                  id="checkout-address"
                  required
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                  className="col-span-2 border border-black/10 dark:border-white/10 h-12 bg-card rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-primary text-foreground/50"
                />
                <input
                  type="text"
                  name="city"
                  id="checkout-city"
                  required
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  className="col-span-2 sm:col-span-1 border border-black/10 dark:border-white/10 h-12 bg-card rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-primary text-foreground/50"
                />
                <input
                  type="text"
                  name="postalCode"
                  id="checkout-postalcode"
                  required
                  placeholder="Postal Code"
                  value={formData.postalCode}
                  onChange={handleChange}
                  pattern="[1-9][0-9]{5}"
                  maxLength={6}
                  className="col-span-2 sm:col-span-1 border border-black/10 dark:border-white/10 h-12 bg-card rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-primary text-foreground/50"
                />
              </div>
            </section>

            {/* Payment Method Info */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-2xl font-serif font-bold text-foreground">Payment</h2>
                <Lock size={16} className="text-foreground/40" />
              </div>

              <div className="bg-card border border-black/10 dark:border-white/10 rounded-xl p-6 shadow-sm">
                {/* Security Badge */}
                <div className="flex items-center gap-3 mb-5 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700/40 rounded-lg">
                  <ShieldCheck size={20} className="text-green-600 dark:text-green-400 shrink-0" />
                  <p className="text-sm text-green-700 dark:text-green-400 font-medium">
                    All transactions are 100% secure and encrypted by Razorpay.
                  </p>
                </div>

                {/* Payment Methods */}
                <p className="text-sm font-medium text-foreground/70 mb-4">Accepted payment methods:</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {["UPI", "Credit Card", "Debit Card", "Net Banking", "EMI", "Wallets"].map((method) => (
                    <span
                      key={method}
                      className="text-xs font-medium px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20"
                    >
                      {method}
                    </span>
                  ))}
                </div>

                <p className="text-xs text-foreground/50 leading-relaxed">
                  Clicking &quot;Pay Now&quot; will open the Razorpay secure payment window. Your card details are never stored on our servers.
                </p>
              </div>
            </section>

            <div className="hidden lg:block pt-4">
              <Button
                type="submit"
                size="lg"
                id="pay-button-desktop"
                disabled={isProcessing}
                className="w-full shadow-lg shadow-primary/20 text-lg h-14"
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Opening Payment...
                  </span>
                ) : (
                  `Pay ₹${total.toFixed(2)}`
                )}
              </Button>
              <p className="text-center text-xs text-foreground/40 mt-3 flex items-center justify-center gap-1">
                <Lock size={11} /> Secured by Razorpay
              </p>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-5 relative mt-10 lg:mt-0">
            <div className="bg-card border border-black/10 dark:border-white/10 rounded-2xl p-6 lg:p-8 sticky top-32 shadow-xl shadow-black/5">
              <h2 className="text-xl font-serif font-bold text-foreground mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-background shrink-0 border border-black/5">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                      <span className="absolute -top-2 -right-2 bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full z-10 font-medium shadow-sm">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm text-foreground line-clamp-1">{item.name}</h4>
                      <p className="text-xs text-foreground/60">{item.size}</p>
                    </div>
                    <p className="font-medium text-sm text-foreground">₹{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-6 border-t border-black/10 dark:border-white/10 mb-6">
                <div className="flex justify-between text-foreground/70 text-sm">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-foreground/70 text-sm">
                  <span>Shipping</span>
                  {shipping === 0 ? (
                    <span className="text-green-600 dark:text-green-400 font-medium">FREE</span>
                  ) : (
                    <span>₹{shipping.toFixed(2)}</span>
                  )}
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-foreground/50">Free shipping on orders above ₹999</p>
                )}
                <div className="flex justify-between font-bold text-xl text-foreground pt-4 border-t border-black/10 dark:border-white/10">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>

              <div className="lg:hidden">
                <Button
                  type="submit"
                  id="pay-button-mobile"
                  disabled={isProcessing}
                  size="lg"
                  className="w-full shadow-lg shadow-primary/20 text-lg h-14"
                >
                  {isProcessing ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Opening Payment...
                    </span>
                  ) : (
                    `Pay ₹${total.toFixed(2)}`
                  )}
                </Button>
                <p className="text-center text-xs text-foreground/40 mt-3 flex items-center justify-center gap-1">
                  <Lock size={11} /> Secured by Razorpay
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
