export const pageTransition = {
    hidden: {
      scale: 0.8,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        delay: 0.1,
      },
    },
  };

export const topFunction = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

export const scrollFunction = (scrollButton : React.RefObject<HTMLButtonElement>) => {
    if (scrollButton && scrollButton.current) {
      var buttonElm = scrollButton?.current as HTMLButtonElement;
      if (
        document.documentElement.scrollTop > 20 ||
        document.body.scrollTop > 20
      ) {
        buttonElm.style.display = "inline-block";
      } else {
        buttonElm.style.display = "none";
      }
    }
  };