<script lang="ts">
  import { 
    Engine,
    Render,
    Runner,
    Mouse,
    MouseConstraint,
    World,
    Composite,
    Bodies,
    Body,
    Events,
  } from 'matter-js';
  import { createRagdoll } from 'matterjs-ragdoll';
  import { onMount } from 'svelte'; 
  let viewport: HTMLElement;
  let engine: Engine;
  let render: Render;
  let world: World;
  let wallBodies: { ground: Body, left: Body, right: Body };
  let w: number;
  let h: number;
  const walls = Composite.create();
  const humans = Composite.create();

  /**
  * Init
  * ==================================================
  */
  onMount(init);
  function init() {
    engine = Engine.create();
    world = engine.world;
    render = Render.create({
      element: viewport,
      engine,
      options: {
        background: 'transparent',
        wireframes: false,
        // showDebug: true,
        // showMousePosition: true,
      },
    });
    resize();
    
    const runner = Runner.create()
    Render.run(render);
    Runner.run(runner, engine);
    
    
    const mouse = addMouse();
    Composite.add(world, [mouse, walls, humans]);
    addWalls();
    addHuman();

    // setInterval(addHuman, 500)

  }

  /**
  * Add Mouse
  * ==================================================
  */
  function addMouse() {
    const mouse = Mouse.create(render.canvas);
    render.mouse = mouse;
    return MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.6,
        render: { visible: false }
      }
    });

  }


  /**
  * Add walls
  * ==================================================
  */
  function addWalls() {
    wallBodies = {
      ground: Bodies.rectangle(w/2, h+50, w, 100, { isStatic: true }),
      left: Bodies.rectangle(-50 , h/2, 100, h, { isStatic: true }),
      right: Bodies.rectangle(w + 50 , h/2, 100, h, { isStatic: true }),
    };
    Composite.add(walls, Object.values(wallBodies));
  }



  /**
  * Add people
  * ==================================================
  */
  function addHuman() {
    const human = createRagdoll(0.5) as Composite;
    Composite.translate(human, { x: w/2, y: h/4});
    Composite.add(humans, human);
  }


  /**
  * Resize
  * ==================================================
  */
  $: w, h, resize();
  function resize() {
    if (!render) return;
    render.options.width = w;
    render.options.height = h;
    render.canvas.width = w;
    render.canvas.height = h;
    render.bounds.max.x = w;
    render.bounds.max.y = h;
    if (!wallBodies) return;
    Body.setVertices(wallBodies.ground, [{x:w/-2, y:-50}, {x:w/2, y:-50}, {x:w/2, y:50}, {x:w/-2, y:50}]);
    Body.setVertices(wallBodies.left, [{x: -50,y: h/-2}, {x: 50,y: h/-2}, {x: 50,y: h/2}, {x: -50,y: h/2}]);
    Body.setVertices(wallBodies.right, [{x: -50,y: h/-2}, {x: 50,y: h/-2}, {x: 50,y: h/2}, {x: -50,y: h/2}]);
    Body.setPosition(wallBodies.ground, { x: w/2, y: h+50 });
    Body.setPosition(wallBodies.left, { x: -50, y: h/2 });
    Body.setPosition(wallBodies.right, { x: w+50, y: h/2 });
  }




</script>





<div 
  bind:this={ viewport }
  bind:clientHeight={h}
  bind:clientWidth={w}
  class="viewport"
></div>


<style lang="scss">
  .viewport {
    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    :global canvas {
      // position: relative;
      // z-index: 10;
      border: 1px solid var(--black);
    }
  }
</style>
