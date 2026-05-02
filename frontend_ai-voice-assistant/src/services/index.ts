import { mockAssistantService } from "./MockAssistantService";
import type { AssistantService } from "./AssistantService";

// Swap to HttpAssistantService once the Python bridge exposes endpoints.
export const assistantService: AssistantService = mockAssistantService;
