import { useEffect, useState } from "react";

export function useBorderToggleOnScroll(targetId: string, threshold = 0.1) {
  const [showBorder, setShowBorder] = useState(true);

  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => setShowBorder(!entry.isIntersecting),
      { threshold }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [targetId, threshold]);

  return showBorder;
}