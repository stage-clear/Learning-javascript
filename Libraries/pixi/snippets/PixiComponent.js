import PIXI from '../path/to/pixi'

const [uid, $$] = [0, {}]

/**
 * PixiComponent
 * @class
 */
class PixiComponent {
  constructor(pixiApp, pixiParent, data = {}) {
    this.app = pixiApp
    this.parent = pixiParent ? pixiParent : null
    this.name = data.name ? data.name : `noname-${(uid += 1)}` 
    this.instanceOf = data.instanceOf || null
    this.$el = this.create_(this.instanceOf)
    this.$el.name = this.name
    this.x = data.x != null ? parseInt(data.x, 10) : 0
    this.y = data.y != null ? parseInt(data.y, 10) : 0
    this.scale = data.scale != null ? parseFLoat(data.scale) : 1.0
    
    this.data = data

    /**
     * Life cycle:
     */
    
    // Setup 
    if (typeof this.setup === 'function') {
      this.setup.call(this, this.events, this.data)
    }

    // Init
    if (typeof this.init === 'function') {
      this.init.call(this, this.events, this.data)
    }
    
    // A listener on mounted (a.k.a added)
    if (typeof this.mounted === 'function') {
      this.$el.on('added', () => {
        this.mounted.call(this)
      })
    }
    
    // Listener on custom events
    if (typeof this.addListeners === 'function') {
      this.addListeners.call(this, this.state, this.events)
    }

    this.mount_.call(this)
    this.set_.call(this)

    // Update (add to `app.ticker`)
    if (typeof this.update === 'function') {
      this.app.tickers.push({
        id: this.name,
        func: this.update.bind(this, this.state, this.events)
      })
    }
    
    // Bind the context for when this component is destoryed.
    this.destroy = this.destroy.bind(this)
  }
  
  /**
   * PixiComponent.setup()
   * @method
   */

  /**
   * PixiComponent.init()
   * @method
   */

  /**
   * PixiComponent.mounted()
   * @method
   */

  /**
   * PixiComponent.addListeners()
   * @method
   */
  
  /**
   * PixiComponent.update()
   * @method
   */
  
  /**
   * PixiComponent.removeUpdate()
   * @method 
   */
  removeUpdate() {
    for (let i = 0; i < this.app.tickers.length; i += 1) {
      if (this.app.tickers[i].id === this.name) {
        this.app.tickers.splice(i, 1)
        break
      }
    }
  }
  
  /**
   * PixiComponent.destroy()
   * @method
   */
  destroy() {
    this.destroy_()
    this.removeUpdate()
    this = null
  }
  
  /**
   * PixiComponent.create_()
   * @method
   * @private
   */
  create_(name) {
    if (name == null || !PIXI[name]) {
      return new PIXI.Container()
    }
    return new PIXI[name]()
  }

  /**
   * PixiComponent.mount_()
   * @method
   * @private
   */
  mount_() {
    if (!this.$el || !this.parent) return 
    if (typeof this.parent.addChild === 'function') {
      this.this.parent.addChild(this.$el)

      // Console outputs
      if (false) {
        console.log([
          `Added: ${this.$el.name}`,
          (this.instanceOf ? `InstanceOf: $(this.instanceOf)`: ''),
        ].join(' '))
      }
    }
  }

  /**
   * PixiComponent.set_()
   * @method 
   * @private 
   */
  set_() {
    this.$el.position.set(this.x, this.y)
    this.$el.scale.set(this.scale)
  }
  
  /**
   * PixiComponent.destroy_()
   */
  destroy_() {
    this.$el.destroy()
  }
  
  /**
   * PixiComponent#use()
   * @method 
   * @static
   */
  static use(name, body) {
    if (typeof $$[name] === 'undefined') {
      $$[name] = body
      body.call(this)
    }
  }
}

/**
 * Example: Create a component "App"
 */
class App extends PixiComponent {
  constructor(...args) {
    super(...args)
  }
  
  setup() {
    this.x = 10
    this.y = 20
  }
  
  init() {
    this.$el.x = this.x
    this.$el.y = this.y
  }
}

const app = new PIXI.Application(...)

PixiComponent.use('state', state)
PixiComponent.use('events', events)

new App(app, parent, {})
