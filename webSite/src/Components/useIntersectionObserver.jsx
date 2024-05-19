import { useEffect, useRef } from "react";

const useIntersectionObserver = (callback, options) => {
  const observer = useRef(null);

  useEffect(() => {
    if ("IntersectionObserver" in window) {
      observer.current = new IntersectionObserver((entries) => {
        entries.forEach((entry) => callback(entry));
      }, options);
    }
    return () => observer.current && observer.current.disconnect();
  }, [callback, options]);

  const observe = (element) => {
    if (observer.current && element) {
      observer.current.observe(element);
    }
  };

  const unobserve = (element) => {
    if (observer.current && element) {
      observer.current.unobserve(element);
    }
  };

  return { observe, unobserve };
};

export default useIntersectionObserver;
