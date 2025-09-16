import { useTokenExpiration } from '~/hooks/useTokenExpiration';

export function TokenExpirationChecker() {
  useTokenExpiration();
  return null; // This component doesn't render anything
}
