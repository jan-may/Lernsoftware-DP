import { setActive } from "../feautures/navbar/navbarSlice";
import { setSelectedProblem } from "../feautures/settings/settingsSlice";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import JoyRide from "react-joyride";
import { ActivButton } from "../feautures/navbar/navbarSlice";
import {
  setAccordionOpen,
  setIsTourRunning,
} from "../feautures/tour/tourSlice";
import { setIsTourCompleted } from "../feautures/io/ioSlice";

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
    content:
      "Hier können Sie eine eigene Lösung implementieren! Zum Ausführen benötigen Sie einen API-Key. Weiteres dazu im FAQ-Bereich.",
    disableBeacon: true,
  },
  {
    target: ".tour-4",
    content:
      "Code ausführen, Editor zurücksetzten und den Quellcode samt Tests einsehen. Die Tests könenn Sie auch lokal ausführen, wenn Sie keinen Api-Key haben.",
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
        steps={TOUR_STEPS as any} // weird type error
        showSkipButton
        showProgress
        continuous
        hideBackButton
        disableOverlayClose
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
          }
          if (data.index == 5 && data.action == "update") {
            dispatch(setIsTourRunning(true));
            dispatch(setActive(ActivButton.topDownMemo));
          }
          if (data.index === 7 && data.status === "finished") {
            dispatch(setAccordionOpen([]));
            dispatch(setSelectedProblem(""));
            dispatch(setActive(ActivButton.problem));
            setIsTourRunning(false);
            handleFinishTour();
          }
        }}
        styles={{
          tooltipContainer: {
            textAlign: "left",
          },
          buttonBack: {
            marginRight: 10,
          },
          spotlight: {
            borderRadius: 4,
            padding: 0,
            margin: 0,
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
