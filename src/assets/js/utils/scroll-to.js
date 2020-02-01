import TweenMax from 'TweenMax';
import ScrollToPlugin from 'gsap/ScrollToPlugin';

// eslint-disable-next-line
const preserve = [ScrollToPlugin]; // prevent tree shaking

export function customScrollTo(
  to,
  { duration = 1, autoKill = false, element = window, offsetY = 100 } = {}
) {
  TweenMax.to(element, duration, {
    scrollTo: { y: to, autoKill, offsetY },
    ease: Power1.easeOut,
  });
}
