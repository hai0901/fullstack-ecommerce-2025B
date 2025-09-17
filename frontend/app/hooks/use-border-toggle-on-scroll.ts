/*
 * RMIT University Vietnam
 * Course: COSC2769 - Full Stack Development
 * Semester: 2025B
 * Assessment: Assignment 02
 * Author: Le Duc Trung, Nguyen Huy Anh
 * ID: s3979718, s3956092
 */

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