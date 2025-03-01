// lib/auth/token.ts

import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import type { AuthTokens, DecodedToken, User } from "./types";

// Cookie names
const ACCESS_TOKEN_COOKIE = "access_token";
const REFRESH_TOKEN_COOKIE = "refresh_token";

// Cookie options
const COOKIE_OPTIONS = {
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  path: "/",
};

// Token expiration buffer (in seconds) to refresh before expiration
const TOKEN_EXPIRATION_BUFFER = 60; // 1 minute

/**
 * Set authentication tokens in cookies
 */
export function setTokens(tokens: AuthTokens): void {
  Cookies.set(ACCESS_TOKEN_COOKIE, tokens.accessToken, {
    ...COOKIE_OPTIONS,
    expires: 1, // 1 day
  });

  Cookies.set(REFRESH_TOKEN_COOKIE, tokens.refreshToken, {
    ...COOKIE_OPTIONS,
    expires: 30, // 30 days
  });
}

/**
 * Get authentication tokens from cookies
 */
export function getTokens(): AuthTokens | null {
  const accessToken = Cookies.get(ACCESS_TOKEN_COOKIE);
  const refreshToken = Cookies.get(REFRESH_TOKEN_COOKIE);

  if (!accessToken || !refreshToken) {
    return null;
  }

  return { accessToken, refreshToken };
}

/**
 * Remove authentication tokens from cookies
 */
export function removeTokens(): void {
  Cookies.remove(ACCESS_TOKEN_COOKIE, { path: "/" });
  Cookies.remove(REFRESH_TOKEN_COOKIE, { path: "/" });
}

/**
 * Decode JWT token and extract user information
 */
export function decodeToken(token: string): DecodedToken | null {
  try {
    return jwtDecode<DecodedToken>(token);
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
}

/**
 * Get user from access token
 */
export function getUserFromToken(token: string): User | null {
  const decoded = decodeToken(token);

  if (!decoded) {
    return null;
  }

  return {
    id: decoded.id,
    name: decoded.name,
    email: decoded.email,
    role: decoded.role,
    tenantId: decoded.tenantId,
  };
}

/**
 * Check if access token is expired or about to expire
 */
export function isTokenExpired(token: string): boolean {
  const decoded = decodeToken(token);

  if (!decoded) {
    return true;
  }

  // Get current time in seconds
  const currentTime = Math.floor(Date.now() / 1000);

  // Check if token is expired or about to expire
  return decoded.exp <= currentTime + TOKEN_EXPIRATION_BUFFER;
}

/**
 * Get access token from cookies
 */
export function getAccessToken(): string | null {
  return Cookies.get(ACCESS_TOKEN_COOKIE) || null;
}

/**
 * Get refresh token from cookies
 */
export function getRefreshToken(): string | null {
  return Cookies.get(REFRESH_TOKEN_COOKIE) || null;
}