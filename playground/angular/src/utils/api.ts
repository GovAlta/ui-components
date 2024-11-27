export function fetchData(path: string): Record<string, unknown> | undefined {
  let data: string;
  switch (path) {
    case "/support-order-details":
      data = `{"form":{"what-is-your-role":{"heading":"","data":{"role":{"name":"role","value":"Recipient","label":"Role"}}},"address":{"heading":"Current address","data":{"city":{"name":"city","value":"3100 Arthur's Cres","label":"Address"},"postal-code":{"name":"postal-code","value":"T6W 2H7","label":""}}},"do-you-receive-support":{"heading":"","data":{"support":{"name":"support","value":"Yes","label":"Support?"}}},"recalculated":{"heading":"","data":{"recalculated":{"name":"recalculated","value":"Yes","label":"Recalculated?"}}}},"history":["what-is-your-role","address","do-you-receive-support","recalculated","summary"],"editting":"","lastModified":"2024-11-01T22:08:02.812Z","status":"complete"}`;
      break;
    case "other-party-profile":
      data = `{}`;
      break;
    case "previous-registrations":
      data = `{}`;
      break;
    default:
      data = `{}`;
      break;
  }

  return JSON.parse(data);
}

export function getValue(data: unknown | undefined, section: string, id: string) {
  if (!data) return;
  // @ts-expect-error ignore
  return data["form"][section]?.data?.[id].value || "";
}
