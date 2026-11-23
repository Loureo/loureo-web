// One element carried across a page change (cross-document view transitions), the right way:
// the transition name is set only for that navigation, only between the two pages that share it, and only if the
// element is on screen and has something drawn on both sides. A name fixed in CSS makes an off-screen element fly in
// from nowhere, or morph into an empty canvas.
//
// This module handles leaving a page (`pageswap`). Arriving (`pagereveal`) must be handled before the new page's first
// frame, which a module script cannot promise (Vite drops `blocking="render"`), so each page has a small inline
// script in its <head> doing the same checks: see `index.html` and `almenara/index.html`.

const onScreen = (el) => {
  if (!el) return false;
  const r = el.getBoundingClientRect();
  return r.width > 0 && r.bottom > innerHeight * 0.15 && r.top < innerHeight * 0.85;
};

/**
 * @param {string} name     view-transition-name shared by both pages
 * @param {() => Element|null} element  the element on this page
 * @param {(path: string) => boolean} other  is this the path of the page on the other side?
 * @param {() => boolean} [ready]  is the element showing something (an image decoded, a frame drawn)?
 */
export function carry(name, element, other, ready = () => true) {
  const tag = (el, vt) => {
    el.style.viewTransitionName = name;
    vt.finished.finally(() => { el.style.viewTransitionName = ""; });
  };
  addEventListener("pageswap", (e) => {
    const url = e.activation?.entry?.url;
    if (!e.viewTransition || !url) return;
    const el = element();
    if (other(new URL(url).pathname) && onScreen(el) && ready()) tag(el, e.viewTransition);
  });
}
