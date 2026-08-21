/* Shared between the Server Function in actions.ts and the client form that
   consumes it.

   These live outside actions.ts deliberately: a "use server" file may only
   export async functions, so exporting the initial state from there registers
   it as a Server Function and every submit fails with
   `A "use server" file can only export async functions, found obj`.

   Keeping this file free of the Zod schema also keeps Zod out of the client
   bundle — the form imports only the constant below. */

/** The fields the contact form collects; the keys drive per-field errors. */
export type ContactField = "name" | "email" | "phone" | "message";

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
  errors?: Partial<Record<ContactField, string[]>>;
  /** Echoed back so a failed submit doesn't wipe what the visitor typed. */
  values?: Record<ContactField, string>;
};

export const initialContactState: ContactState = {
  status: "idle",
  message: "",
};
