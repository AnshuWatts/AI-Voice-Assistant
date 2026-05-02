import { mockAssistantService } from "./MockAssistantService";
import { HttpAssistantService } from "./HttpAssistantService";
import type { AssistantService } from "./AssistantService";

const backendUrl =
  (import.meta.env.VITE_BACKEND_URL as string | undefined)?.trim() ||
  "http://localhost:8000";

const shouldUseMock =
  import.meta.env.MODE === "test" ||
  (import.meta.env.VITE_USE_MOCK as string | undefined) === "true";

export const assistantService: AssistantService = shouldUseMock
  ? mockAssistantService
  : new HttpAssistantService(backendUrl);
