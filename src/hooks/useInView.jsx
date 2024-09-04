import { useEffect } from 'react'

export default function useInView(ref, callback) {
  useEffect(() => {

    const observer = new IntersectionObserver(([entry]) => {
        if(entry.isIntersecting) {
            callback();
        }
    }, {threshold: 0.1});

    if(ref.current) {
        observer.observe(ref.current);
    }
    return () => {
        if(ref.currentt) {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            observer.unobserve(ref.current)
        }
    }
  }, [ref, callback])
}
