import { Component } from '@theme/component';
import { prefersReducedMotion } from '@theme/utilities';

/**
 * Previous and next buttons for the BarkFam reviews slider.
 *
 * The track is a scroll-snap row, so it already swipes and scrolls by keyboard
 * without this script. The buttons move one review at a time and wrap around
 * at either end. scrollIntoView keeps the stepping correct in RTL.
 *
 * @typedef {{ track: HTMLElement }} Refs
 * @extends {Component<Refs>}
 */
class BarkfamReviewsComponent extends Component {
  requiredRefs = ['track'];

  /** Shows the previous review, or the last one from the first. */
  previous() {
    this.#step(-1);
  }

  /** Shows the next review, or the first one from the last. */
  next() {
    this.#step(1);
  }

  /**
   * @param {number} direction - -1 for previous, 1 for next
   */
  #step(direction) {
    const { track } = this.refs;
    const slides = Array.from(track.children).filter((child) => child instanceof HTMLElement);
    if (slides.length < 2 || track.clientWidth === 0) return;

    const current = Math.round(Math.abs(track.scrollLeft) / track.clientWidth);
    const target = slides[(current + direction + slides.length) % slides.length];
    if (!target) return;

    target.scrollIntoView({
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      block: 'nearest',
      inline: 'start',
    });
  }
}

if (!customElements.get('barkfam-reviews-component')) {
  customElements.define('barkfam-reviews-component', BarkfamReviewsComponent);
}
