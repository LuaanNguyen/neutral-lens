export async function getCurrentTabUrl(): Promise<string | undefined> {
  try {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    return tab?.url;
  } catch (error) {
    console.error("Error getting current tab:", error);
    return undefined;
  }
}
