const appName = process.env.NEXT_PUBLIC_APP_NAME || "Leave";

export const env = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "",
  isProduction: process.env.NODE_ENV === "production",
  appName,
  storagePrefix: `${appName}_`.toLowerCase(),
};
