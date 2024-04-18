"use client";

import useScrollBar from "@/hooks/useScrollbar";
import React, { MouseEvent, useCallback, useEffect } from "react";
import { useState, useRef } from "react";

function CustomScrollbar({
  children,
  containerStyle,
  childrenContainerStyle,
  scrollbarStyle,
  trackStyle,
  scrollbarContainerStyle,
}: {
  children: React.ReactNode;
  containerStyle: string;
  childrenContainerStyle: string;
  scrollbarStyle: string;
  trackStyle: string;
  scrollbarContainerStyle: string;
}) {
  const thumbRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  const scrollBar = useScrollBar();

  function scrollBarHeight() {
    if (!thumbRef.current || !contentRef.current) return;

    const thumbEle = thumbRef.current;
    const contentEle = contentRef.current;

    const scrollRatio = contentEle.clientHeight / contentEle.scrollHeight;
    thumbEle.style.height = `${scrollRatio === 1 ? 0 :scrollRatio * 100}%`;
  }

  useEffect(() => {
    if(scrollBar.onChangeValue === true){
      scrollBarHeight();
      scrollBar.onReset();
    }
  }, [scrollBar.onChangeValue, scrollBar])

  useEffect(() => {
    const body = document.body;

    // Funzione di callback per l'observer
    const callback = (mutationsList: MutationRecord[]) => {
      for (let mutation of mutationsList) {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class"
        ) {
          if (body.classList.contains("modal-open")) {
            setVisible(false);
          } else {
            setVisible(true);
            scrollBarHeight();
            handleScrollContent();
          }
          break;
        }
      }
    };

    // Creazione dell'observer
    const observer = new MutationObserver(callback);

    // Configurazione dell'observer per osservare i cambiamenti degli attributi del body
    const config = {
      attributes: true,
      attributeFilter: ["class"],
      subtree: true,
    };
    observer.observe(body, config);

    // Pulizia dell'observer quando il componente si smonta
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!contentRef.current) return;
    scrollBarHeight();
  });

  useEffect(() => {
    scrollBarHeight();

    window.addEventListener("resize", scrollBarHeight);

    return () => {
      window.removeEventListener("resize", scrollBarHeight);
    };
  }, []);

  const handleScrollContent = () => {
    if (!thumbRef.current || !contentRef.current || !visible) return;

    const thumbEle = thumbRef.current;
    const contentEle = contentRef.current;
    thumbEle.style.top = `${
      (contentEle.scrollTop * 100) / contentEle.scrollHeight
    }%`;
  };

  useEffect(() => {
    if (!contentRef.current) return;

    handleScrollContent();
    const contentEle = contentRef.current;
    contentEle.addEventListener("scroll", handleScrollContent);
    return () => {
      contentEle.removeEventListener("scroll", handleScrollContent);
    };
  }, []);

  const handleMouseDown = (e: MouseEvent) => {
    if (!thumbRef.current || !contentRef.current || !visible) return;
    const ele = thumbRef.current;
    const contentEle = contentRef.current;

    const startPos = {
      top: contentEle.scrollTop,
      x: e.clientX,
      y: e.clientY,
    };

    const handleMouseMove = (e: any) => {
      const dx = e.clientX - startPos.x;
      const dy = e.clientY - startPos.y;
      const scrollRatio = contentEle.clientHeight / contentEle.scrollHeight;
      contentEle.scrollTop = startPos.top + dy / scrollRatio;
      updateCursor(ele);
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      resetCursor(ele);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleClickTrack = (e: any) => {
    const trackEle = trackRef.current;
    const contentEle = contentRef.current;
    if (!trackEle || !contentEle || !visible) {
      return;
    }
    const bound = trackEle.getBoundingClientRect();
    const percentage = (e.clientY - bound.top) / bound.height;
    contentEle.scrollTop =
      percentage * (contentEle.scrollHeight - contentEle.clientHeight);
  };

  const handleTouchStart = useCallback((e: any) => {
    const ele = thumbRef.current;
    const contentEle = contentRef.current;
    if (!ele || !contentEle) {
      return;
    }
    const touch = e.touches[0];
    const startPos = {
      top: contentEle.scrollTop,
      x: touch.clientX,
      y: touch.clientY,
    };

    const handleTouchMove = (e: any) => {
      const touch = e.touches[0];
      const dx = touch.clientX - startPos.x;
      const dy = touch.clientY - startPos.y;
      const scrollRatio = contentEle.clientHeight / contentEle.scrollHeight;
      contentEle.scrollTop = startPos.top + dy / scrollRatio;
      updateCursor(ele);
    };

    const handleTouchEnd = () => {
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
      resetCursor(ele);
    };

    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);
  }, []);

  const updateCursor = (ele: HTMLDivElement) => {
    ele.style.cursor = "grabbing";
    ele.style.userSelect = "none";
    document.body.style.cursor = "grabbing";
    document.body.style.userSelect = "none";
  };

  const resetCursor = (ele: HTMLDivElement) => {
    ele.style.cursor = "grab";
    ele.style.userSelect = "";
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
  };

  return (
    <>
      <div className={containerStyle + " overflow-hidden"}>
        <div
          className={childrenContainerStyle + " overflow-auto"}
          ref={contentRef}
        >
          {children}
        </div>
      </div>
      <div className={scrollbarContainerStyle + `opacity-0 z-[300] ${visible ? "opacity-100" : "opacity-0"} transition-all duration-300`} id="scrollbar">
        <div
          className={trackStyle}
          id="scrollbar__track"
          ref={trackRef}
          onClick={handleClickTrack}
        />
        <div
          className={scrollbarStyle}
          id="scrollbar__thumb"
          ref={thumbRef}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        />
      </div>
    </>
  );
}

export default CustomScrollbar;
