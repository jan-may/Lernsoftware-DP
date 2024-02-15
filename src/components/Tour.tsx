import { setActive } from "../feautures/navbar/navbarSlice";
import {
  setSelectedProblem,
  setSpeed,
  SPEED,
} from "../feautures/settings/settingsSlice";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import JoyRide from "react-joyride";
import { ActivButton } from "../feautures/navbar/navbarSlice";
import {
  setAccordionOpen,
  setIsTourRunning,
} from "../feautures/tour/tourSlice";
import { setIsTourCompleted } from "../feautures/io/ioSlice";
import { TourTooltip } from "./TourTooltip";
import { useTheme } from "./theme-provider";

const TOUR_STEPS = [
  {
    target: ".tour-1",
    content:
      "Vorab: Sollten Sie die Tour oder das Quiz wiederholen wollen können Sie dies hier tun.",
    disableBeacon: true,
  },
  {
    target: ".tour-2",
    content: "Wählen Sie hier ein Problem, welches Sie interessiert.",
    disableBeacon: true,
  },
  {
    target: ".tour-3",
    content: "Hier können Sie eine eigene Lösung implementieren!",
    disableBeacon: true,
  },
  {
    target: ".tour-4",
    content:
      "Code ausführen, Editor zurücksetzten und den Quellcode samt Tests einsehen. Die Tests können Sie auch lokal ausführen.",
    disableBeacon: true,
  },
  {
    target: ".tour-5",
    content:
      "Hier können Sie die Lösung visualisieren. Wählen Sie eine der drei Varianten aus.",
    disableBeacon: true,
  },
  {
    target: ".tour-6",
    content:
      "Knoten die mehrmals berechnet werden, werden hier rot markiert. Memoisierte Knoten hingegen sind grün.",
    disableBeacon: true,
    placement: "top-start",
  },
  {
    target: ".tour-7",
    content:
      "Code-Musterlösung und Anpassungsmöglichkeiten für die Visualisierung.",
    disableBeacon: true,
    placement: "right",
  },
  {
    target: ".tour-8",
    content: "Laufzeitanalyse und ggf. Erklärung.",
    disableBeacon: true,
    placement: "right",
  },
];

// Tour component
export const Tour = () => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const { accordionOpen } = useAppSelector((store) => store.tour);

  const handleFinishTour = () => {
    dispatch(setIsTourCompleted(true));
    dispatch(setIsTourRunning(false));
    localStorage.setItem("tourCompleted", "true");
  };

  return (
    <>
      <JoyRide
        tooltipComponent={TourTooltip as any}
        steps={TOUR_STEPS as any} // weird type error
        showSkipButton
        showProgress
        continuous
        hideBackButton
        disableOverlayClose
        disableCloseOnEsc
        hideCloseButton
        callback={(data) => {
          console.log(data);
          if (data.index == 0 && data.action == "start") {
          }
          if (data.index == 1 && data.action == "update") {
            dispatch(setSelectedProblem("fibonacci"));
          }
          if (data.index == 1 && data.action == "update") {
            dispatch(setAccordionOpen([...accordionOpen, "aufgabe-code"]));
          }
          if (data.index == 4 && data.action == "update") {
            dispatch(setActive(ActivButton.recursiveTree));
            dispatch(setSpeed(100)); // fast forward for visualization
          }
          if (data.index == 5 && data.action == "update") {
            dispatch(setIsTourRunning(true));
            dispatch(setActive(ActivButton.topDownMemo));
          }
          if (
            (data.index === 7 && data.status === "finished") ||
            data.action === "skip"
          ) {
            dispatch(setAccordionOpen([]));
            dispatch(setSelectedProblem(""));
            dispatch(setSpeed(SPEED));
            dispatch(setActive(ActivButton.problem));
            setIsTourRunning(false);
            handleFinishTour();
          }
        }}
        styles={{
          tooltipContainer: {
            textAlign: "left",
          },
          tooltip: {
            padding: "0px",
            margin: "0px",
          },
          buttonBack: {
            marginRight: 10,
          },
          spotlight: {
            borderRadius: 4,
            padding: 0,
            margin: 0,
          },
          options: {
            arrowColor: theme == "dark" ? "#202c34" : "#fff",
          },
        }}
        locale={{
          last: "Tour beenden",
          skip: "Tour beenden",
          next: "Weiter",
        }}
      />
    </>
  );
};
