import { useLayoutEffect, useRef } from "react";

import useWindowStore from "#store/window";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

const windowWrapper = (Component, windowKey) => {
  const Wrapped = (props) => {
    const { focusWindow, windows } = useWindowStore();
    const { isOpen, zIndex } = windows[windowKey];

    const ref = useRef(null);

    useGSAP(() => {
      const el = ref.current;
      if (!el) return;

      if (isOpen) {
        const dockIcon = document.getElementById(`dock-icon-${windowKey}`);

        // Default animation if icon not found
        let initialVars = { scale: 0.8, opacity: 0, y: 40 };

        if (dockIcon) {
          const iconRect = dockIcon.getBoundingClientRect();
          const iconCenter = {
            x: iconRect.left + iconRect.width / 2,
            y: iconRect.top + iconRect.height / 2,
          };

          // Assuming window is centered or we can get its final rect
          // For now, let's assume the window will be centered on screen
          // We can't easily get the "final" rect before it's rendered and positioned
          // But if we assume it's centered:
          const windowCenter = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
          };

          const x = iconCenter.x - windowCenter.x;
          const y = iconCenter.y - windowCenter.y;

          initialVars = { scale: 0, opacity: 0, x, y };
        }

        el.style.display = "block";
        gsap.fromTo(
          el,
          initialVars,
          { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.5, ease: "power3.out" }
        );
      } else {
        // Closing animation (optional, for now just hide)
        // el.style.display = "none"; 
        // We rely on useLayoutEffect for hiding, but we could animate out here too
      }
    }, [isOpen]);
    useGSAP(() => {
      const el = ref.current;
      if (!el) return;

      const [instance] = Draggable.create(el, {
        allowEventDefault: true,
        onPress: function (e) {
          const target = e.target;
          
          // 1. Check for Resize Handle (Bottom Right Corner)
          // If clicking the element itself (not a child), check coordinates
          if (target === el) {
             const rect = el.getBoundingClientRect();
             const isResize = (e.clientX > rect.right - 20) && (e.clientY > rect.bottom - 20);
             if (isResize) return false; // Let browser handle resize
          }

          // 2. Check for Input/Form elements (always allow interaction)
          if (target.tagName === 'INPUT' ||
            target.tagName === 'TEXTAREA' ||
            target.closest('input, textarea, form, button, a')) {
            return false;
          }

          // 3. Check for Header or Footer
          const header = el.querySelector('#window-header');
          const footer = el.querySelector('.window-footer');
          
          const isHeader = header && (header === target || header.contains(target));
          const isFooter = footer && (footer === target || footer.contains(target));

          if (isHeader || isFooter) {
             focusWindow(windowKey);
             return true; // Start Drag
          }

          // 4. Otherwise (Content), allow interaction
          return false;
        }
      });

      return () => instance.kill();
    }, [isOpen])

    useLayoutEffect(() => {
      const el = ref.current;
      if (!el) return;
      el.style.display = isOpen ? "block" : "none";
    }, [isOpen]);

    return (
      <section 
        id={windowKey} 
        ref={ref} 
        style={{ 
          zIndex, 
          resize: 'both', 
          overflow: 'hidden',
          minWidth: '300px',
          minHeight: '200px',
          display: 'flex',
          flexDirection: 'column'
        }} 
        className="absolute"
        onMouseDown={() => focusWindow(windowKey)}
      >
        <Component {...props} />
        {/* Drag handle at the bottom, leaving space for resize handle */}
        <div className="window-footer absolute bottom-0 left-0 right-6 h-8 cursor-move bg-transparent" style={{ zIndex: 100 }} />
      </section>
    );
  };

  Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || "Component"
    })`;

  return Wrapped;
};

export default windowWrapper;
