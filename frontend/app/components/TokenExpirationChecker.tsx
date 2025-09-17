/*
 * RMIT University Vietnam
 * Course: COSC2769 - Full Stack Development
 * Semester: 2025B
 * Assessment: Assignment 02
 * Author: Le Duc Trung, Nguyen Huy Anh
 * ID: s3979718, s3956092
 */

import { useTokenExpiration } from '~/hooks/useTokenExpiration';

export function TokenExpirationChecker() {
  useTokenExpiration();
  return null; // This component doesn't render anything
}
