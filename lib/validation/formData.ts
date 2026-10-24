export function parseRepeatableField(formData: FormData, fieldName: string): string[] {
  return formData
    .getAll(fieldName)
    .map((value) => (typeof value === "string" ? value.trim() : ""))
    .filter((value) => value.length > 0);
}
