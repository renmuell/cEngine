# cEngine.js

Lightweight javaScript canvas engine with plugin capability. Small list of plugins included.

## Features

- small core engine with
	- start()
	- stop()
	- step(count)
	- clear()
	- destroy()
- plugin support

## Usage

### Basic

```html
<script src="cEnginen.js"></script>
<script>
	cEngine.create({
	    step: (context) => {
				context.fillStyle = 'red'
			  context.fillRect(10, 10, 20, 20)
	    }
	  }).step() 
</script>
```

### Tiny Game with input plugin

```html
<script src="cEngine.js"></script>
<script src="cEngine.input.js"></script>
<script>
    
  let player = {
        x: 0,
        y: 0
      },
      engine = cEngine.create({
        autoClear: true,
        plugins: {
            input: cEngine.input.create()
        },
        step: (context) => {
          if (engine.plugins.input.keys.W) player.y--
          if (engine.plugins.input.keys.A) player.x--
          if (engine.plugins.input.keys.S) player.y++
          if (engine.plugins.input.keys.D) player.x++

          context.fillStyle = 'red'
          context.fillRect(player.x, player.y, 10, 10)
        }
      })

      engine.start()
      
</script>
```

## Examples

Browse them locally in the examples directory

## License

The [MIT](http://opensource.org/licenses/MIT) license. See LICENSE file.
