"use client";

import { useRouter } from "next/navigation";
import { Header, Footer } from "@/components/layout";
import {
  CheckoutLayout,
  DeliveryForm,
  PaymentMethods,
  OrderSummary,
  CheckoutActions,
} from "@/components/checkout";
import { useCheckoutStore } from "@/stores/checkout";

export default function CheckoutPage() {
  const router = useRouter();
  const { customerInfo, deliveryInfo, paymentMethod, leasingTerm, reset } =
    useCheckoutStore();

  const handleSubmit = () => {
    // Validate form
    if (!customerInfo.fullName || !customerInfo.email) {
      alert("Prašome užpildyti visus privalomus laukus.");
      return;
    }

    if (
      !deliveryInfo.address ||
      !deliveryInfo.city ||
      !deliveryInfo.postalCode
    ) {
      alert("Prašome užpildyti pristatymo adresą.");
      return;
    }

    // In a real app, this would submit to a payment gateway
    console.log("Submitting order:", {
      customer: customerInfo,
      delivery: deliveryInfo,
      payment: {
        method: paymentMethod,
        leasingTerm: paymentMethod === "leasing" ? leasingTerm : undefined,
      },
    });

    // For demo purposes, show success and reset
    alert("Užsakymas sėkmingai pateiktas!");
    reset();
    router.push("/");
  };

  return (
    <>
      <Header />
      <main className="pt-32 pb-24 px-6 md:px-12 max-w-[1440px] mx-auto min-h-screen">
        <CheckoutLayout sidebar={<OrderSummary />}>
          {/* Header */}
          <header>
            <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-4 font-headline">
              Užsakymo užbaigimas
            </h1>
            <p className="text-on-surface-variant font-light tracking-wide max-w-lg">
              Sveikiname investuojant į savo ramybės inžineriją. Užpildykite
              duomenis, kad galėtume suderinti jūsų patirtį.
            </p>
          </header>

          {/* Step 1: Delivery Information */}
          <DeliveryForm />

          {/* Step 2: Payment Methods */}
          <PaymentMethods />

          {/* Checkout Actions */}
          <CheckoutActions onSubmit={handleSubmit} />
        </CheckoutLayout>
      </main>
      <Footer />
    </>
  );
}
