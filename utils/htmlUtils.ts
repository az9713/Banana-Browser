export const cleanGeneratedHtml = (html: string): string => {
  // Remove markdown code blocks if present
  let cleaned = html.replace(/```html/g, '').replace(/```/g, '');
  
  // Trim whitespace
  cleaned = cleaned.trim();
  
  return cleaned;
};

export const isValidUrl = (string: string): boolean => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    // If it doesn't have protocol, try adding https://
    try {
      new URL('https://' + string);
      return true;
    } catch (e) {
      return false;
    }
  }
};

export const normalizeUrl = (input: string): string => {
  if (!input) return '';
  if (input.startsWith('http://') || input.startsWith('https://')) {
    return input;
  }
  // Basic heuristic: if it looks like a domain, add https
  if (input.includes('.') && !input.includes(' ')) {
    return `https://${input}`;
  }
  // Otherwise it might be a search query, but for this browser we treat everything as a direct navigation attempt or search
  // For the sake of the prompt, we pass it as is if it's not a URL, the AI will figure it out (e.g. "search for cats")
  return input;
};
