import { FaqAccordion } from "./FaqAccordion";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

export const Faq = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Button className="-translate-y-1" variant="secondary">
          FAQ
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>FAQ / Help</SheetTitle>
          <SheetDescription>
            <FaqAccordion />
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
