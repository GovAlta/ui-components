import { useState } from "react";
import {
  GoabButton,
  GoabDatePicker,
  GoabFormItem,
  GoabText,
} from "@abgov/react-components";

type Language = "en-CA" | "fr-CA";

const translations = {
  "en-CA": {
    switchLanguage: "Français",
    heading: "Book an appointment",
    introduction: "Choose a date for your appointment.",
    dateLabel: "Appointment date",
    dateHelp: "Select a date from the calendar.",
  },
  "fr-CA": {
    switchLanguage: "English",
    heading: "Prendre un rendez-vous",
    introduction: "Choisissez une date pour votre rendez-vous.",
    dateLabel: "Date du rendez-vous",
    dateHelp: "Sélectionnez une date dans le calendrier.",
  },
} as const;

export function SwitchBetweenEnglishAndFrench() {
  const [language, setLanguage] = useState<Language>("en-CA");
  const [appointmentDate, setAppointmentDate] = useState<string>();
  const text = translations[language];

  function switchLanguage() {
    setLanguage((current) => (current === "en-CA" ? "fr-CA" : "en-CA"));
  }

  return (
    <section lang={language} key={language}>
      <GoabButton type="tertiary" onClick={switchLanguage} mb="l">
        {text.switchLanguage}
      </GoabButton>

      <GoabText tag="h2" size="heading-m" mt="none" mb="s">
        {text.heading}
      </GoabText>
      <GoabText tag="p" mt="none" mb="l">
        {text.introduction}
      </GoabText>

      <GoabFormItem
        label={text.dateLabel}
        helpText={text.dateHelp}
        requirement="optional"
      >
        <GoabDatePicker
          name="appointmentDate"
          value={appointmentDate}
          onChange={(event) => setAppointmentDate(event.valueStr || undefined)}
        />
      </GoabFormItem>
    </section>
  );
}
