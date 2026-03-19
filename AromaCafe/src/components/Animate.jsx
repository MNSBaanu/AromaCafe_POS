import useInView from '../hooks/useInView';

/**
 * Wraps children with a scroll-triggered animation.
 * variant: 'fadeUp' | 'fadeIn' | 'fadeLeft' | 'fadeRight' | 'scaleUp' | 'slideIn'
 * delay: ms string e.g. '200ms'
 */
export default function Animate({ children, variant = 'fadeUp', delay = '0ms', className = '', style = {} }) {
  const [ref, inView] = useInView();

  return (
    <div
      ref={ref}
      className={`anim anim-${variant}${inView ? ' anim-visible' : ''} ${className}`}
      style={{ transitionDelay: delay, ...style }}
    >
      {children}
    </div>
  );
}
