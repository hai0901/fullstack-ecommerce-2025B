/*
 * RMIT University Vietnam
 * Course: COSC2769 - Full Stack Development
 * Semester: 2025B
 * Assessment: Assignment 02
 * Author: Le Duc Trung, Nguyen Huy Anh
 * ID: s3979718, s3956092
 */

export async function isUsernameTaken(username: string): Promise<boolean> {
  const taken = ["admin", "test", "alice"]; // example existing usernames
  return taken.includes(username.toLowerCase());
}

export async function isBusinessNameTaken(username: string): Promise<boolean> {
  const taken = ["admin", "test", "alice"]; // example existing usernames
  return taken.includes(username.toLowerCase());
}

export async function isBusinessAddressTaken(username: string): Promise<boolean> {
  const taken = ["admin", "test", "alice"]; // example existing usernames
  return taken.includes(username.toLowerCase());
}