import { GoabFormItem, GoabDatePicker } from "@abgov/react-components";

export const Bug2750Route = () => {
  const dateToday = new Date(new Date().setFullYear(new Date().getFullYear() + 100));
  const date100YearsAgo = new Date(
    new Date().setFullYear(new Date().getFullYear() - 100),
  );

  return (
    <main>
      <GoabFormItem label="Date Picker using min" mb="l">
        <GoabDatePicker name="dob" min={date100YearsAgo} />
      </GoabFormItem>
      <GoabFormItem label="Date Picker using min and max" mb="l">
        <GoabDatePicker name="dob" min={date100YearsAgo} max={dateToday} />
      </GoabFormItem>
      <GoabFormItem label="Date picker using max">
        <GoabDatePicker name="dob" max={dateToday} />
      </GoabFormItem>
    </main>
  );
};
