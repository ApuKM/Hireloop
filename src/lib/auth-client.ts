import { createAuthClient } from "better-auth/react";
import { auth } from "./auth";
import { inferAdditionalFields, adminClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: process.env.BETTER_AUTH_URL,
  plugins: [
    // Explicitly define the fields instead of using <typeof auth>
    inferAdditionalFields({
      user: {
        role: { type: "string" },
        plan: { type: "string" }
      }
    }),
    adminClient()
  ],
  // Reduce session polling to every 5 minutes instead of default frequent polling
  sessionConfig: {
    fetchOnMount: true,
    fetchInterval: 5 * 60 * 1000, // 5 minutes in milliseconds
  },
});
