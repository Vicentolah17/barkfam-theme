import { Component } from '@theme/component';

/**
 * Keeps the buy form's single quantity field in step with the chosen Buy 1/2/3 offer.
 *
 * Shopify's dynamic checkout buttons read the first field named "quantity" in the
 * form, so the offers are radios under another name and this component copies the
 * checked value into one hidden "quantity" input that Add to cart and the
 * checkout buttons both submit.
 *
 * @typedef {{ quantity: HTMLInputElement }} Refs
 * @extends {Component<Refs>}
 */
class BarkfamOfferTiers extends Component {
  requiredRefs = ['quantity'];

  /**
   * Copies the chosen offer's quantity into the form.
   * @param {Event} event - change event from an offer radio
   */
  select(event) {
    const { target } = event;
    if (!(target instanceof HTMLInputElement) || !target.checked) return;

    this.refs.quantity.value = target.value;
  }
}

if (!customElements.get('barkfam-offer-tiers')) {
  customElements.define('barkfam-offer-tiers', BarkfamOfferTiers);
}
