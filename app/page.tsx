import { Header, Footer } from "@/components/layout";
import {
  Hero,
  ProcessSteps,
  CategoryGrid,
  Bestsellers,
  EngineeringFacts,
  ConsultationBooking,
} from "@/components/marketing";

export default function HomePage() {
  return (
    <>
      <Header variant="transparent" />
      <main>
        <Hero />
        <ProcessSteps />
        <CategoryGrid />
        <Bestsellers />
        <EngineeringFacts />
        <ConsultationBooking />
      </main>
      <Footer />
    </>
  );
}
