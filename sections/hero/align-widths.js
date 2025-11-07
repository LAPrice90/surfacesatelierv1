(() => {
  const heroBlock = document.querySelector('.hero-block');
  if (!heroBlock) return;

  const tagline = heroBlock.querySelector('.hero-tagline');
  const headlineLines = heroBlock.querySelectorAll('.hero-line');
  if (!tagline || !headlineLines.length) return;

  const updateLetterSpacing = () => {
    const targetWidth = tagline.getBoundingClientRect().width;
    if (!targetWidth) return;

    headlineLines.forEach(line => {
      const text = line.textContent.trim();
      const letters = text.replace(/\s+/g, '').length;
      if (letters <= 1) return;

      const previousInlineValue = line.style.getPropertyValue('--hero-letter-spacing');
      line.style.setProperty('--hero-letter-spacing', '0px');
      const baseWidth = line.getBoundingClientRect().width;
      if (previousInlineValue) {
        line.style.setProperty('--hero-letter-spacing', previousInlineValue);
      } else {
        line.style.removeProperty('--hero-letter-spacing');
      }

      if (!baseWidth) return;
      const spacingPx = (targetWidth - baseWidth) / (letters - 1);
      if (spacingPx <= 0) {
        line.style.removeProperty('--hero-letter-spacing');
        return;
      }

      const clampedSpacing = Math.min(spacingPx, 50); // cap extreme gaps for huge screens
      line.style.setProperty('--hero-letter-spacing', `${clampedSpacing}px`);
    });
  };

  let frame;
  const requestUpdate = () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(updateLetterSpacing);
  };

  requestUpdate();
  window.addEventListener('load', requestUpdate);
  if (document.fonts && document.fonts.addEventListener) {
    document.fonts.addEventListener('loadingdone', requestUpdate);
  }
  window.addEventListener('resize', requestUpdate);
})();
