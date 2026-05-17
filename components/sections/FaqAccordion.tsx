import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { JsonLd } from "@/components/utility/JsonLd";
import { faqPage, type FaqEntry } from "@/lib/jsonld/faq-page";

interface FaqAccordionProps {
  heading?: string;
  items: FaqEntry[];
  emitSchema?: boolean;
}

export function FaqAccordion({
  heading = "Frequently asked questions",
  items,
  emitSchema = true,
}: FaqAccordionProps) {
  if (items.length === 0) return null;
  return (
    <div>
      <h2 className="font-serif text-3xl tracking-tight md:text-4xl">
        {heading}
      </h2>
      <Accordion type="single" collapsible className="mt-8 w-full">
        {items.map((item, i) => (
          <AccordionItem key={i} value={`faq-${i}`}>
            <AccordionTrigger>{item.q}</AccordionTrigger>
            <AccordionContent>{item.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      {emitSchema && <JsonLd data={faqPage(items)} />}
    </div>
  );
}
