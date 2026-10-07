/** FormSubmit has returned both boolean and string success values. Reject every other value. */
export function providerAccepted(value: unknown): boolean {
  if (!value || typeof value !== "object") return false;
  const success = (value as { success?: unknown }).success;
  return success === true || success === "true";
}
