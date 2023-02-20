import { Body,Bodies,Constraint,Composite } from 'matter-js';

export default class Ragdoll {
  static create( x:number, y:number, scale:number=1 ) {
    const spriteScale = {
      xScale: scale * 0.5,
      yScale: scale * 0.5,
    }
    const headOptions = {
      label: 'head',
      collisionFilter: {
        group: Body.nextGroup(true)
      },
      chamfer: { radius: [15 * scale, 15 * scale, 15 * scale, 15 * scale] },
      render: { sprite: {
        ...spriteScale,
        texture: 'sprites/head.png',
      }},
    };

    const chestOptions = {      
      label: 'chest',
      collisionFilter: {
        group: Body.nextGroup(true)
      },
      chamfer: { radius: [20 * scale, 20 * scale, 26 * scale, 26 * scale] },
      render: { sprite: {
        ...spriteScale,
        texture: 'sprites/torso.png',

      }},
    };

    const leftArmOptions = {      
      label: 'left-arm',
      collisionFilter: {
        group: Body.nextGroup(true)
      },
      chamfer: { radius: 10 * scale },
      render: { sprite: {
        ...spriteScale,
        texture: 'sprites/left-arm.png',
      }},
    };

    const leftLowerArmOptions = { ...leftArmOptions, ...{
      label: 'left-arm-lower',
      render: { sprite: {
        ...spriteScale,
        texture: 'sprites/left-lower-arm.png',
      }},
    }};

    const rightArmOptions = {      
      label: 'right-arm',
      collisionFilter: {
        group: Body.nextGroup(true)
      },
      chamfer: { radius: 10 * scale },
      render: { sprite: {
        ...spriteScale,
        texture: 'sprites/right-arm.png',
      }},
    };

    const rightLowerArmOptions = {...rightArmOptions, ...{
      label: 'right-arm-lower',
      render: { sprite: {
        ...spriteScale,
        texture: 'sprites/right-lower-arm.png',
      }},
    }};

    const leftLegOptions = {      
      label: 'left-leg',
      collisionFilter: {
        group: Body.nextGroup(true)
      },
      chamfer: { radius: 10 * scale },
      render: { sprite: {
        ...spriteScale,
        texture: 'sprites/left-leg.png',
      }},
    };

    const leftLowerLegOptions = { ...leftLegOptions, ...{
      label: 'left-leg-lower',
      render: { sprite: {
        ...spriteScale,
        texture: 'sprites/left-lower-leg.png',
      }},
    }};

    const rightLegOptions = { 
      label: 'right-leg',
      collisionFilter: {
        group: Body.nextGroup(true)
      },
      chamfer: { radius: 10 * scale },
      render: { sprite: {
        ...spriteScale,
        texture: 'sprites/right-leg.png',
      }},
    };

    const rightLowerLegOptions = { ...rightLegOptions, ...{
      label: 'right-leg-lower',
      render: { sprite: {
        ...spriteScale,
        texture: 'sprites/right-lower-leg.png',
      }},
    }};

    const head = Bodies.rectangle(x, y - 70 * scale, 34 * scale, 40 * scale, headOptions);
    const chest = Bodies.rectangle(x, y, 55 * scale, 80 * scale, chestOptions);
    const rightUpperArm = Bodies.rectangle(x + 39 * scale, y - 15 * scale, 20 * scale, 40 * scale, rightArmOptions);
    const rightLowerArm = Bodies.rectangle(x + 39 * scale, y + 25 * scale, 20 * scale, 60 * scale, rightLowerArmOptions);
    const leftUpperArm = Bodies.rectangle(x - 39 * scale, y - 15 * scale, 20 * scale, 40 * scale, leftArmOptions);
    const leftLowerArm = Bodies.rectangle(x - 39 * scale, y + 25 * scale, 20 * scale, 60 * scale, leftLowerArmOptions);
    const leftUpperLeg = Bodies.rectangle(x - 20 * scale, y + 57 * scale, 20 * scale, 40 * scale, leftLegOptions);
    const leftLowerLeg = Bodies.rectangle(x - 20 * scale, y + 97 * scale, 20 * scale, 60 * scale, leftLowerLegOptions);
    const rightUpperLeg = Bodies.rectangle(x + 20 * scale, y + 57 * scale, 20 * scale, 40 * scale, rightLegOptions);
    const rightLowerLeg = Bodies.rectangle(x + 20 * scale, y + 97 * scale, 20 * scale, 60 * scale, rightLowerLegOptions);

    const chestToRightUpperArm = Constraint.create({
        bodyA: chest,
        pointA: { x: 24 * scale, y: -23 * scale },
        pointB: { x: 0, y: -8 * scale },
        bodyB: rightUpperArm,
        stiffness: 1,
        render: { visible: false }
    });

    const chestToLeftUpperArm = Constraint.create({
        bodyA: chest,
        pointA: { x: -24 * scale, y: -23 * scale },
        pointB: { x: 0, y: -8 * scale },
        bodyB: leftUpperArm,
        stiffness: 1,
        render: { visible: false }
    });

    const chestToLeftUpperLeg = Constraint.create({
        bodyA: chest,
        pointA: { x: -10 * scale, y: 30 * scale },
        pointB: { x: 0, y: -10 * scale },
        bodyB: leftUpperLeg,
        stiffness: 1,
        render: { visible: false }
    });

    const chestToRightUpperLeg = Constraint.create({
        bodyA: chest,
        pointA: { x: 10 * scale, y: 30 * scale },
        pointB: { x: 0, y: -10 * scale },
        bodyB: rightUpperLeg,
        stiffness: 1,
        render: { visible: false }
    });

    const upperToLowerRightArm = Constraint.create({
        bodyA: rightUpperArm,
        bodyB: rightLowerArm,
        pointA: { x: 0, y: 15 * scale },
        pointB: { x: 0, y: -25 * scale },
        stiffness: 1,
        render: { visible: false }
    });

    const upperToLowerLeftArm = Constraint.create({
        bodyA: leftUpperArm,
        bodyB: leftLowerArm,
        pointA: { x: 0, y: 15 * scale },
        pointB: { x: 0, y: -25 * scale },
        stiffness: 1,
        render: { visible: false }
    });

    const upperToLowerLeftLeg = Constraint.create({
        bodyA: leftUpperLeg,
        bodyB: leftLowerLeg,
        pointA: { x: 0, y: 20 * scale },
        pointB: { x: 0, y: -20 * scale },
        stiffness: 1,
        render: { visible: false }
    });

    const upperToLowerRightLeg = Constraint.create({
        bodyA: rightUpperLeg,
        bodyB: rightLowerLeg,
        pointA: { x: 0, y: 20 * scale },
        pointB: { x: 0, y: -20 * scale },
        stiffness: 1,
        render: { visible: false }
    });

    const headContraint = Constraint.create({
        bodyA: head,
        pointA: { x: 0, y: 25 * scale },
        pointB: { x: 0, y: -35 * scale },
        bodyB: chest,
        stiffness: 1,
        render: { visible: false }
    });

    const legToLeg = Constraint.create({
        bodyA: leftLowerLeg,
        bodyB: rightLowerLeg,
        stiffness: 0.01
    });

    const person = Composite.create({
        bodies: [
            chest, head, leftLowerArm, leftUpperArm, 
            rightLowerArm, rightUpperArm, leftLowerLeg, 
            rightLowerLeg, leftUpperLeg, rightUpperLeg
        ],
        constraints: [
            upperToLowerLeftArm, upperToLowerRightArm, chestToLeftUpperArm, 
            chestToRightUpperArm, headContraint, upperToLowerLeftLeg, 
            upperToLowerRightLeg, chestToLeftUpperLeg, chestToRightUpperLeg
        ]
    });

    return person;
  }
}