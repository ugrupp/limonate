import throttle from "lodash.throttle";
import {
  Bodies,
  Body,
  Composite,
  Engine,
  Events,
  Mouse,
  MouseConstraint,
  Query,
  Render,
  Runner,
  Vertices,
} from "matter-js";
import React, { useEffect, useRef, useState } from "react";
import { useSetRecoilState } from "recoil";
import { menuOpenState } from "../lib/state";

const Menu = () => {
  const setMenuOpen = useSetRecoilState(menuOpenState);

  const menuItems = [
    {
      text: "Wer?",
      href: "/#wer",
      texture: "/images/wer.png",
      position: {
        x: 0.225,
        y: -0.25,
      },
      angle: 0.4,
      bodyOptions: {},
    },
    {
      text: "Was?",
      href: "/#was",
      texture: "/images/was.png",
      position: {
        x: 0.44,
        y: -0.55,
      },
      angle: -0.2,
      bodyOptions: {},
    },
    {
      text: "Shop",
      href: "/#shop",
      texture: "/images/shop.png",
      position: {
        x: 0.6,
        y: -1.2,
      },
      angle: 0.25,
      bodyOptions: {},
    },
    {
      text: "Info",
      href: "/#info",
      texture: "/images/info.png",
      position: {
        x: 0.75,
        y: -0.8,
      },
      angle: -0.175,
      bodyOptions: {},
    },
  ];

  const scene = useRef(null);
  const [engine, setEngine] = useState(null);
  const [runner, setRunner] = useState(null);
  let render = null;
  let mouseConstraint = null;

  const setupScene = () => {
    if (scene.current) {
      const width = scene.current.offsetWidth;
      const height = scene.current.offsetHeight;

      setEngine(Engine.create());
      setRunner(Runner.create());

      if (engine && runner) {
        // set up renderer
        render = Render.create({
          element: scene.current,
          engine: engine,
          options: {
            width,
            height,
            wireframes: false,
            background: "transparent",
            showBounds: false,
          },
        });

        Render.run(render);
        Runner.run(runner, engine);

        // Create menu items
        const targetWidthFactor = window.matchMedia("(min-width: 1024px)")
          .matches
          ? 0.3
          : 0.48;
        const targetWidth = width * targetWidthFactor;
        const textureWidth = 601;
        const textureHeight = 294;
        const yCentreOffset = 0.7;

        const textureShrink = 0.96;

        // Render each menu item using menu shape body with custom texture
        const menuItemBodies = menuItems.map(function ({
          texture,
          href,
          position,
          angle,
          bodyOptions,
        }) {
          const xPos = position.x * width;
          const yPos = position.y * height;

          const body = Bodies.rectangle(
            xPos,
            yPos,
            targetWidth,
            targetWidth / 2,
            {
              density: 0.6,
              friction: 0.45,
              restitution: 0.425,
              chamfer: {
                radius: [0, 0, targetWidth / 2 - 1, targetWidth / 2 - 1],
                quality: 10,
              },
              render: {
                sprite: {
                  texture,
                  xScale: (targetWidth / textureWidth) * textureShrink,
                  yScale:
                    (targetWidth / textureHeight) *
                    (textureHeight / textureWidth) *
                    textureShrink,
                  yOffset: 1 - yCentreOffset,
                },
              },
              ...bodyOptions,
            }
          );

          const oldCentre = Vertices.centre(body.vertices);
          const newYCentre =
            body.bounds.min.y +
            (body.bounds.max.y - body.bounds.min.y) * yCentreOffset;
          Body.setCentre(
            body,
            {
              x: oldCentre.x,
              y: newYCentre,
            },
            false
          );
          Body.rotate(body, angle);
          Body.setAngularVelocity(body, 0.01 * (angle <= 0 ? -1 : 1));

          Body.set(body, "href", href);

          Composite.add(engine.world, body);

          return body;
        });

        // boundaries
        const wallOptions = {
          isStatic: true,
          render: {
            visible: false,
          },
        };
        const wallThickness = 500;
        Composite.add(engine.world, [
          Bodies.rectangle(
            -wallThickness / 2,
            height / 2,
            wallThickness,
            height,
            wallOptions
          ),
          Bodies.rectangle(
            width / 2,
            height + wallThickness / 2,
            width,
            wallThickness,
            wallOptions
          ),
          Bodies.rectangle(
            width + wallThickness / 2,
            height / 2,
            wallThickness,
            height,
            wallOptions
          ),
        ]);

        const mouse = Mouse.create(render.canvas);
        mouseConstraint = MouseConstraint.create(engine, {
          mouse,
        });

        // keep the mouse in sync with rendering
        render.mouse = mouse;

        // Follow body links
        const mouseHandler = ({ mouse, source }) => {
          const hoveredBodies = Query.point(menuItemBodies, mouse.position);
          if (hoveredBodies.length) {
            const href = hoveredBodies[0]?.href;
            if (href) {
              if (document.location.pathname !== "/") {
                window.location = href;
              } else {
                setMenuOpen(false);

                document
                  .getElementById(href.replace("/#", ""))
                  ?.scrollIntoView({
                    behavior: "smooth",
                  });
              }
            }
          }
        };

        Events.on(mouseConstraint, "mouseup", mouseHandler);

        // Change cursor on body hover
        Events.on(mouseConstraint, "mousemove", function ({ mouse }) {
          render?.canvas?.classList.toggle(
            "cursor-pointer",
            Query.point(menuItemBodies, mouse.position).length
          );
        });

        // Allow for native scrolling and clear other listeners
        mouseConstraint.mouse.element.removeEventListener(
          "mousewheel",
          mouseConstraint.mouse.mousewheel
        );
        mouseConstraint.mouse.element.removeEventListener(
          "DOMMouseScroll",
          mouseConstraint.mouse.mousewheel
        );
        mouseConstraint.mouse.element.removeEventListener(
          "touchmove",
          mouseConstraint.mouse.mousemove
        );
      }
    }
  };

  const clearScene = () => {
    if (render) {
      Render.stop(render);
      Runner.stop(runner);
      Composite.clear(engine.world);
      Engine.clear(engine);
      Events.off(mouseConstraint);
      render.element.innerHTML = "";
      render = null;
      setEngine(null);
      setRunner(null);
    }
  };

  useEffect(() => {
    // Set up scene initially
    setupScene();

    // Clear and re-setup scene on resize
    window.addEventListener(
      "resize",
      throttle(() => {
        window.requestAnimationFrame(() => {
          if (scene.current) {
            clearScene();
            setupScene();
          }
        });
      }, 200)
    );

    // unmount
    return () => {
      clearScene();
    };
  }, [scene.current]);

  return (
    <div className="w-full h-full overflow-hidden">
      <nav ref={scene} className="h-full w-full" />
    </div>
  );
};

export default Menu;
