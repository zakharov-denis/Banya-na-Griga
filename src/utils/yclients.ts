/**
 * YClients Widget Integration
 * 
 * Opens the YClients booking widget when booking buttons are clicked
 */

declare global {
  interface Window {
    yclients?: {
      open?: () => void;
      show?: () => void;
    };
    YClients?: {
      open?: () => void;
      show?: () => void;
    };
  }
}

/**
 * Opens the YClients booking widget
 * The widget script is loaded from: https://w1867617.yclients.com/widgetJS
 * Simply triggers the online booking button created by the script
 */
export function openYClientsWidget(): void {
  // Wait for script to initialize, then trigger the button
  const triggerButton = () => {
    // Method 1: Try global API
    if ((window as any).yclients?.open) {
      (window as any).yclients.open();
      return;
    }
    if ((window as any).yclients?.show) {
      (window as any).yclients.show();
      return;
    }
    if ((window as any).YClients?.open) {
      (window as any).YClients.open();
      return;
    }
    if ((window as any).YClients?.show) {
      (window as any).YClients.show();
      return;
    }

    // Method 2: Find and click the button with "Онлайн-запись" text
    // The button has class "yButtonText" with text "Онлайн-запись"
    const buttonText = document.querySelector('.yButtonText');
    if (buttonText) {
      // Click on the button (might be parent element)
      const button = buttonText.closest('button') as HTMLElement ||
                     buttonText.closest('a') as HTMLElement ||
                     buttonText.closest('div[onclick]') as HTMLElement ||
                     buttonText.parentElement as HTMLElement;
      
      if (button) {
        button.click();
        return;
      }
      // If no parent found, try clicking the text element itself
      (buttonText as HTMLElement).click();
      return;
    }
  };

  // Try immediately and with delays
  triggerButton();
  setTimeout(triggerButton, 200);
  setTimeout(triggerButton, 500);
  setTimeout(triggerButton, 1000);
}

