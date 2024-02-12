import { BeaconRenderProps, TooltipRenderProps } from "react-joyride";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

interface TourProps {
  continuous: boolean;
  index: number;
  size: number;
  step: any;
  isLastStep: boolean;
  backProps: BeaconRenderProps;
  closeProps: BeaconRenderProps;
  skipProps: BeaconRenderProps;
  primaryProps: BeaconRenderProps;
  tooltipProps: TooltipRenderProps;
}

export const TourTooltip = ({
  continuous,
  index,
  size,
  step,
  isLastStep,
  skipProps,
  primaryProps,
  tooltipProps,
}: TourProps) => {
  return (
    <Card className="w-[400px] dark:bg-secondary" {...tooltipProps}>
      <CardHeader className="pt-0 pb-2">
        {step.title && <CardTitle>{step.title}</CardTitle>}
        <CardDescription>
          <div className="flex justify-between align-middle items-center">
            {`${index + 1} / ${size}`}{" "}
            <Button className="" variant={"link"} {...(skipProps as any)}>
              x
            </Button>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>{step.content}</CardContent>
      <CardFooter className="flex justify-between">
        {continuous && (
          <>
            <Button
              {...(skipProps as any)}
              size="sm"
              variant="outline"
              disabled={isLastStep}
            >
              <p id="close">Tour beenden</p>
            </Button>
            <Button {...(primaryProps as any)} size="sm">
              <p id="next">{isLastStep ? "Tour abschließen" : "weiter"}</p>
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};
