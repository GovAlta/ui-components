import { Component } from "@angular/core";
import type { GoabDatePickerOnChangeDetail } from "@abgov/ui-components-common";

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

@Component({
  selector: "app-switch-between-english-and-french",
  templateUrl: "./angular.html",
})
export class SwitchBetweenEnglishAndFrenchComponent {
  language: Language = "en-CA";
  appointmentDate: string | undefined;

  get text() {
    return translations[this.language];
  }

  switchLanguage(): void {
    this.language = this.language === "en-CA" ? "fr-CA" : "en-CA";
  }

  onDateChange(event: GoabDatePickerOnChangeDetail): void {
    this.appointmentDate = event.valueStr || undefined;
  }
}
