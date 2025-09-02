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