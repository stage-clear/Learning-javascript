/**
 * @see http://buildnewgames.com/box2dweb/
 */


/**
 * Bootstrapping
 */
var b2Vec2 = Box2D.Common.Math.b2Vec2;
var b2BodyDef = Box2D.Dynamics.b2BodyDef;
var b2Body = Box2D.Dynamics.b2Body;
var b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
var b2Fixture = Box2D.Dynamics.b2Fixture;
var b2World = Box2D.Dynamics.b2World;
var b2MassData = Box2D.Collision.b2MassData;
var b2PolygonShape = Box2D.Collision.Shapes.b2polugonShape;
var b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
var b2DebugDraw = Box2D.Dynamics.b2DebugDraw;

/**
 * Creating the world
 */
var Physics = window.Physics = function(element, scale) {
  var gravity = new b2Vec2(0, 9.8);
  this.world = new b2World(gravity, true);
  this.element = element;
  this.context = element.getContext('2d');
  this.scale = scale || 30;
  this.dtRemaining = 0;
  this.stepAmount = 1 / 60;
};

/**
 * Stepping the world
 */
Physics.prototype.step = function(dt) {
  this.dtRemaining += dt;
  while (this.dtRemaining > this.stepAmount) {
    this.dtRemaining -= this.stepAmount;
    this.world.Step(this.stepAmount,
      8, // velocity iterations
      3  // position iterations
    );
  }
  if (this.debugDraw) {
    this.world.DrawDebugData();
  }
}

Physics.prototype.debug = function() {
  this.debugDraw = new b2DebugDraw();
  this.debugDraw.SetSprite(this.context);
  this.debugDraw.SetDrawScale(this.scale);
  this.debugDraw.SetFillAlpha(0.3);
  this.debugDraw.SetLineThickness(1.0);
  this.debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
  this.world.SetDebugDraw(this.debugDraw);
};

var physics;
var lastFrame = new Date().getTime();

window.gameLoop = function() {
  var tm = new Date().getTime();
  requestAnimationFrame(gameLoop);
  var dt = (tm - lastFrame) / 1000;
  if (dt > 1 / 15) {
    dt = 1 / 15;
  }
  physics.step(dt);
  lastFrame = tm;
};

function init() {
  physics = new Physics(document.getElementById('b2dCanvas'));
  physics.debug();
  requestAnimationFrame(gameLoop);
}

window.addEventListener('load', init);

/**
 * Adding in Bodies
 */
var Body = window.Body = function(physics, details) {
  this.details = details = details || {};
  
  // Create the definision
  this.definition = new b2BodyDef();
  
  // Set up the definition
  for (var k in this.definitionDefaults) {
    this.definition[k] = details[k] || this.definitionDefaults[k];
  }
  this.definition.position = new b2Vec2(detail.x || 0, details.y || 0);
  this.definition.linearVelocity = new b2Vec2(detail.vx || 0, details.vy || 0);
  this.definition.userData = this;
  this.definition.type = details.type === 'static' ? b2Body.b2_staticBody : b2Body.b2_dynamicBody;
  
  // Create the Body
  this.body = physics.world.CreateBody(this.definition);
  
  // Create the fixture
  this.fixtureDef = new b2FixtureDef();
  for (var l in this.fixtureDefaults) {
    this.fixtureDef[l] = details[l] || this.fixtureDefaults[l];
  }
  
  details.shape = details.shape || this.defaults.shape;
  
  switch (details.shape) {
    case 'circle':
      details.radius = details.radius || this.defaults.radius;
      this.fixtureDef.shape = new b2CircleShape(details.radius);
      break;
    case 'polygon':
      this.fixtureDef.shape = new b2PolygonShape();
      this.fixtureDef.shape.SetAsArray(details.points, details.points.length);
      break;
    case 'block':
    default: 
      details.width = details.width || this.defaults.width;
      details.height = details.height || this.defaults.height;
      
      this.fixtureDef.shape = new b2PolgonShape();
      this.fixtureDef.shape.SetAsBox(details.width / 2, details.height / 2);
      break;
  }
}

function init() {
  physics = window.physics = new Physics(document.getElementById('b2dCanvas'));
  
  // Create some walls
  new Body(physics, { type: 'static', x: 0, y: 0, height: 50,  width: 0.5 });
  new Body(physics, { type: 'static', x:51, y: 0, height: 50,  width: 0.5 });
  new Body(physics, { type: 'static', x: 0, y: 0, height: 0.5, width: 120 });
  new Body(physics, { type: 'static', x: 0, y:25, height: 0.5, width: 120 });
  
  window.bdy = new Body(physics, { x: 5, y: 8 });
  new Body(physics, { x: 13, y: 8 });
  new Body(physics, { x: 8,  y: 3 });
  
  requestAnimationFrame(gameLoop);
}

/**
 * Taking over rendering
 */
if (this.debugDraw) {
  this.world.DrawDebugData();
} else {
  this.context.clearRect(0, 0, this.element.width, this.element.height);
  
  var obj = this.world.GetBodyList();
  
  this.context.save();
  this.context.scale(this.scale, this.scale);
  
  while (obj) {
    var body = obj.GetUserData();
    if (body) {
      body.draw(this.context);
    }
    
    obj = obj.GetNext();
  }
  this.context.restore();
}

Body.prototype.draw = function(context) {
  var pos = this.body.GetPosition();
  var angle = this.body.GetAngle();
  
  // Save the context
  context.save();
  
  // Translate and rotate
  context.translate(pos.x, pos.y);
  context.rotate(angle);
  
  // Draw the shape outline if the shape has a color
  if (this.details.color) {
    context.fillStyle = this.details.color;
    
    switch (this.details.shape) {
      case 'circle':
        context.beginPath();
        context.arc(0, 0, this.details.radius, 0, Math.PI * 2);
        context.fill();
        break;
      case 'polygon':
        var points = this.details.points;
        context.biginPath();
        context.moveTo(points[0].x, points[0].y);
        for (var i = 1; i < points.length; i++) {
          context.lineTo(points[i].x, points[i].y);
        }
        context.fill();
        break;
      case 'block':
        context.fillRect(
          -this.details.width / 2, 
          -this.details.height / 2,
          this.details.width,
          this.details.height,
        );
      default: 
        break;
    }
  }
  
  // If an image property is set, draw the image.
  if (this.details.image) {
    context.drawImage(
      this.details.image,
      -this.details.width / 2,
      -this.detaisl.height / 2,
      this.details.width, 
      this.details.height,
    );
  }

  context.restore();
}

/**
 * Picking and Moving
 */
Physics.prototype.click = function(callback) {
  var self = this;
  
  function handleClick(e) {
    e.preventDefault();
    var point = {
      x: (e.offsetX || e.layerX) / self.scale,
      y: (e.offsetY || e.layerY) / self.scale,
    };
    
    self.world.QueryPoint(function(fixture) {
      callback(
        fixture.GetBody(),
        fixture,
        point,
      )
    });
  }
  
  this.element.addEventListener('mousedonw', handleClick);
  this.element.addEventListener('touchstart', handleClick);
};

physics.click(function(body) {
  body.ApplyImpulse({ x: 1000, y: -1000 }, body.GetWorldCenter());
})


/**
 * Listening for collisions
 */
Physics.prototype.collision = function() {
  this.listener = new Box2D.Dynamics.b2ContactListener();
  this.listener.PostSolve = function(contact, impulse) {
    var bodyA = context.GetFixtureA().GetBody().GetUserData();
    var bodyB = context.GetFixtureB().GetBody().GetUserData();
    
    if (bodyA.contact) {
      bodyA.contact(contact, impulse, true);
    }
    
    if (bodyB.contact) {
      bodyB.contact(contact, impulse, false);
    }
  };
  
  this.world.SetContactListener(this.listener);
}

var body = new Body(physics, {
  color: 'blue',
  x: 8,
  y: 3,
});

body.contact = function(contact, impulse, first) {
  var magnitude = Math.sqrt(
    impulse.normalIMpulses[0] * impulse.normalImpulses[0] + impulse.normalImpulses[1] * impulse.normalImpulses[1]
  );
  var color = Math.round(magnitude / 2);
  
  if (magnitude > 10) {
    this.details.color = 'rgb(' color + ', 50, 50)';
  }
}

/**
 * Adding Joints
 */
Physics.prototype.dragNDrop = function() {
  var self = this;
  var obj = null;
  var joint = null;
  
  function calculateWorldPosition(e) {
    return point = {
      x: (e.offsetX || e.layerX) / self.scale,
      y: (e.offsetY || e.layerY) / self.scale,
    }
  }
  
  this.element.addEventListener('mousedown', function(e) {
    e.preventDefault();
    var point = calculateWorldPosition(e);
    self.world.QueryPoint(function(fixture) {
      obj = fixture.GetBody().GetUserData();
    }, point);
  });
  
  this.element.addEventListener('mousemove', function(e) {
    if (!obj) {
      return ;
    }
    
    var point = calculateWorldPosition(e);
    
    if (!joint) {
      var jointDefinition = new Box2D.Dynamics.Joints.b2MouseJointDef();

      jointDefinition.bodyA = self.worldGetGroundBody();
      jointDefinition.bodyB = obj.body;
      jointDefinition.target.Set(point.x, point.y);
      jointDefinition.maxForce = 100000;
      jointDefinition.timeStep = self.stepAmount;
      joint = self.world.CreateJoint(JointDefinition);
    }
    
    joint.SetTarget(new b2Vec2(point.x, point.y));
  });
  
  this.element.addEventListener('mouseup', function(e) {
    obj = null;
    if (joint) {
      self.world.DestroyJoint(joint);
      joint = null;
    }
  });
}

// Distance Joints:
body1 = new Body(physics, {
  color: 'red',
  x: 15,
  y: 12,
}).body;

def = new Box2D.Dynamics.Joints.b2DistanceJointDef();
def.Initialize(
  body1,
  body2,
  body1.GetWorldCenter(),
  body2.GetWorld.Center(),
);
var joint = world.CreateJoint(def);

// Revolute Joints:
body1 = new Body(physics, { color: 'red', x: 20, y: 12 }).body;
body2 = new Body(physics, { image: img, x: 24, y: 12 }).body;
def = new Box2D.Dynamics.Joints.b2RevoluteJointDef();
def.Initialize(
  body1, 
  body2,
  new b2Vec2(22, 14),
);
var joint = world.CreateJoint(def);

// Prismatic Joints:
body1 = new Body(physics, { color: 'red', x: 15, y: 12 }).body;
body2 = new Body(physics, { image: img, x: 25, y: 12 }).body;
def = new Box2D.Dynamics.Joints.b2PrismaticJointDef();
def.Initialize(
  body1, 
  body2,
  new b2Vec2(20, 14),
  new b2Vec2(1, 0),
);
def.enableLimit = true;
def.lowerTranslation = 4;
def.upperTranslation = 15;
var joint = world.CreateJoint(def);

// Pulley Joints:
body1 = new Body(physics, { color: 'red', x: 15, y: 12 }).body;
body2 = new Body(physics, { image: img, x: 25, y: 12}).body;
def = new Box2D.Dynamics.Joints.b2PulleyJointDef();
def.Initialize(
  body1,
  body2,
  new b2Vec2(13, 0),
  new b2Vec2(25, 0),
  body1.GetWorldCenter(),
  body2,GetWorldCenter(),
  1,
);

var joint = world.CreateJoint(def);

// Gear Joints:
body1 = new Body(physics, { color: 'red', x: 15, y: 12 }).body;
body2 = new Body(physics, { image: img, x: 25, y: 12 }).body;
var def1 = new Box2D.Dynamics.Joints.b2RevoluteJointDef();
def1.Initialize(
  physics.world.GetGroundBody(),
  body1,
  body1.GetWorldCenter(),
);

var joint1 = physics.world.CreateJoint(def1);

var def2 = new Box2D.Dynamics.Joints.b2RevoluteJointDef()
def2.Initialize(
  physics,
  body2,
  body2.GetWorldCenter(),
);
var joint2 = physics.world.CreateJoint(def2);

def = new Box2D.Dynamics.Joints.b2GearJointDef();

def.bodyA = body1;
def.bodyB = body2;

def.joint1 = joint1;
def.joint2 = joint2;
def.ratio = 2;
var joint = world.CreateJoint(def);

/**
 * Wrapping Up:
 */
