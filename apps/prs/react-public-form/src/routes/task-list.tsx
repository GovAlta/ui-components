import { useNavigate } from "react-router-dom";
import {
  GoabText,
  GoabCallout,
  GoabPublicFormTaskSection,
  GoabPublicFormTaskItem,
} from "@abgov/react-components";
import { TaskSection } from "../shared/models/task";
import sectionsData from "../data/tasks.json";

const sections = sectionsData as TaskSection[];

/** A section counts as done only when every task in it is done. */
const isSectionComplete = (section: TaskSection) =>
  section.tasks.every((task) => task.status === "completed");

export function TaskList() {
  const navigate = useNavigate();
  const completedCount = sections.filter(isSectionComplete).length;
  const remaining = sections.length - completedCount;

  return (
    <div>
      <GoabText tag="h1" mt="none" mb="xl">
        Apply for a service (demo)
      </GoabText>

      <GoabCallout type="important" heading="Application incomplete" mb="xl">
        You have completed {completedCount} of {sections.length} sections.
        {remaining > 0 && ` ${remaining} left to complete.`}
      </GoabCallout>

      {sections.map((section, i) => (
        <GoabPublicFormTaskSection
          key={section.title}
          heading={`${i + 1}. ${section.title}`}
          mb="l"
        >
          {section.tasks.map((task) => (
            <GoabPublicFormTaskItem
              key={task.slug ?? task.name}
              heading={task.name}
              status={task.status}
              hint={task.hint}
              onClick={task.slug ? () => navigate(task.slug!) : undefined}
            />
          ))}
        </GoabPublicFormTaskSection>
      ))}
    </div>
  );
}
