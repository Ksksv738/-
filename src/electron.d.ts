export {};

declare global {
  interface Window {
    electron: {
      launchGame: (path: string) => Promise<{ success: boolean; message: string }>;
    };
  }
}
