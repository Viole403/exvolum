
export type OperatingSystem = 'mac' | 'windows' | 'linux' | 'unknown';

/**
 * Detects the user's operating system
 * @returns The detected operating system
 */
export function detectOS(): OperatingSystem {
  if (typeof window === 'undefined') {
    return 'unknown'; // Server-side rendering
  }

  const userAgent = window.navigator.userAgent.toLowerCase();
  const platform = window.navigator.platform?.toLowerCase() || '';

  // Check for macOS
  if (
    userAgent.includes('mac') ||
    platform.includes('mac') ||
    userAgent.includes('darwin')
  ) {
    return 'mac';
  }

  // Check for Windows
  if (
    userAgent.includes('win') ||
    platform.includes('win') ||
    userAgent.includes('windows')
  ) {
    return 'windows';
  }

  // Check for Linux
  if (
    userAgent.includes('linux') ||
    platform.includes('linux') ||
    userAgent.includes('x11')
  ) {
    return 'linux';
  }

  return 'unknown';
}

/**
 * Gets the appropriate modifier key symbol for the current OS
 * @returns The modifier key symbol (⌘ for Mac, Ctrl for others)
 */
export function getModifierKey(): string {
  const os = detectOS();
  return os === 'mac' ? '⌘' : 'Ctrl';
}

/**
 * Gets the appropriate modifier key text for the current OS
 * @returns The modifier key text (Cmd for Mac, Ctrl for others)
 */
export function getModifierKeyText(): string {
  const os = detectOS();
  return os === 'mac' ? 'Cmd' : 'Ctrl';
}

/**
 * Checks if the current OS is macOS
 * @returns True if the OS is macOS
 */
export function isMac(): boolean {
  return detectOS() === 'mac';
}

/**
 * Checks if the current OS is Windows
 * @returns True if the OS is Windows
 */
export function isWindows(): boolean {
  return detectOS() === 'windows';
}

/**
 * Checks if the current OS is Linux
 * @returns True if the OS is Linux
 */
export function isLinux(): boolean {
  return detectOS() === 'linux';
}

/**
 * Gets the keyboard shortcut display for search
 * @returns The formatted keyboard shortcut string
 */
export function getSearchShortcut(): { symbol: string; text: string } {
  const os = detectOS();

  if (os === 'mac') {
    return {
      symbol: '⌘K',
      text: 'Cmd+K'
    };
  }

  return {
    symbol: 'Ctrl+K',
    text: 'Ctrl+K'
  };
}