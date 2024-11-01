export function isSessionExpired(): boolean {
  const expiryTime = localStorage.getItem('expiryTime');
  if (!expiryTime) {
    return true;
  }

  const currentTime = new Date().getTime();
  return currentTime > parseInt(expiryTime, 10);
}
