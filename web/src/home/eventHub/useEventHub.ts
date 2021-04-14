import { useState } from "react";
import { EventHubOperations, EventHub as hub } from "./EventHub";

export function useEventHub(url: string): EventHubOperations {
  const [eventHub] = useState(hub(url));

  return {
    subscribe: eventHub.subscribe,
  };
}
