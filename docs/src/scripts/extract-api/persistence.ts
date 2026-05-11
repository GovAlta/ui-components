import * as fs from "fs";
import * as path from "path";

interface ExtractedProp {
  name: string;
  type: string;
  typeLabel?: string;
  values?: string[];
  required: boolean;
  default: string | null;
  description: string;
  deprecated?: boolean;
}

interface ExtractedEvent {
  name: string;
  type: string;
  description: string;
  frameworks: ("react" | "angular" | "webComponents")[];
}

interface ExtractedSlot {
  name: string;
  type?: string;
  description: string;
  required?: boolean;
}

interface ExtractedComponentAPI {
  componentSlug: string;
  extractedFrom: string;
  frameworks: {
    react: {
      props: ExtractedProp[];
      events: ExtractedEvent[];
      slots: ExtractedSlot[];
    };
    angular: {
      props: ExtractedProp[];
      events: ExtractedEvent[];
      slots: ExtractedSlot[];
    };
    webComponents: {
      props: ExtractedProp[];
      events: ExtractedEvent[];
      slots: ExtractedSlot[];
    };
  };
}

function mergeItemArray<T extends { name: string; description: string }>(
  next: T[],
  existing: T[],
  context: string,
): T[] {
  const existingByName = new Map(existing.map((item) => [item.name, item]));
  const nextNames = new Set(next.map((item) => item.name));

  const merged: T[] = next.map((item) => {
    const existingItem = existingByName.get(item.name);
    if (existingItem && !item.description && existingItem.description) {
      return { ...item, description: existingItem.description };
    }
    return item;
  });

  for (const existingItem of existing) {
    if (!nextNames.has(existingItem.name)) {
      console.warn(
        `  Preserved manually-added entry "${existingItem.name}" in ${context} (not found in extraction — check source)`,
      );
      merged.push(existingItem);
    }
  }

  return merged.sort((a, b) => a.name.localeCompare(b.name));
}

function mergeWithExisting(
  next: ExtractedComponentAPI,
  existing: ExtractedComponentAPI,
): ExtractedComponentAPI {
  const fw = next.frameworks;
  const ex = existing.frameworks;
  return {
    ...next,
    frameworks: {
      react: {
        props: mergeItemArray(fw.react.props, ex.react.props, `${next.componentSlug}.json [react props]`),
        events: mergeItemArray(fw.react.events, ex.react.events, `${next.componentSlug}.json [react events]`),
        slots: mergeItemArray(fw.react.slots, ex.react.slots, `${next.componentSlug}.json [react slots]`),
      },
      angular: {
        props: mergeItemArray(fw.angular.props, ex.angular.props, `${next.componentSlug}.json [angular props]`),
        events: mergeItemArray(fw.angular.events, ex.angular.events, `${next.componentSlug}.json [angular events]`),
        slots: mergeItemArray(fw.angular.slots, ex.angular.slots, `${next.componentSlug}.json [angular slots]`),
      },
      webComponents: {
        props: mergeItemArray(fw.webComponents.props, ex.webComponents.props, `${next.componentSlug}.json [webComponents props]`),
        events: mergeItemArray(fw.webComponents.events, ex.webComponents.events, `${next.componentSlug}.json [webComponents events]`),
        slots: mergeItemArray(fw.webComponents.slots, ex.webComponents.slots, `${next.componentSlug}.json [webComponents slots]`),
      },
    },
  };
}

function saveComponentAPI(api: ExtractedComponentAPI, outputPath: string): void {
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
  }

  const filePath = path.join(outputPath, `${api.componentSlug}.json`);

  let merged = api;
  if (fs.existsSync(filePath)) {
    try {
      const existing = JSON.parse(fs.readFileSync(filePath, "utf-8")) as ExtractedComponentAPI;
      merged = mergeWithExisting(api, existing);
    } catch {
      // Malformed existing file. Overwrite with fresh extraction.
    }
  }

  fs.writeFileSync(filePath, JSON.stringify(merged, null, 2));
  console.log(`  Created: ${filePath}`);
}

export { saveComponentAPI };