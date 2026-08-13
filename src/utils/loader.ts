// Custom event helper for triggering the global page transition overlay (Default duration: 1000ms)
export const triggerLogoLoader = (message = 'Switching Webpage...', duration = 450, callback?: () => void) => {
  window.dispatchEvent(
    new CustomEvent('xhuvo-trigger-loader', {
      detail: { message, duration, callback }
    })
  );
};

