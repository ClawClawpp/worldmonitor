/**
 * LLM prompt injection sanitizer — type declarations for llm-sanitize.js
 */

/** Sanitize a single string for safe inclusion in an LLM prompt. */
export function sanitizeForPrompt(input: unknown): string;

/** Sanitize an array of headline strings, dropping any that become empty after sanitization. */
export function sanitizeHeadlines(headlines: unknown[]): string[];
