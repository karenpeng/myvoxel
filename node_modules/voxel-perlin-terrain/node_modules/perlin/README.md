# JS.Perlin

**forked from https://github.com/arcanis/js.perlin and made into a simple commonjs library**

```npm install perlin```

## Usage

- *require('perlin')( [ table ] )*

Returns a new generator instance. If `table` is set, then it will be used
as random lookup table otherwise a random table will be generated.

- *[instance].octaves*
- *[instance].frequency*
- *[instance].persistence*

Generator configurations variables.

- *[instance].generate( start, size, callback )*

This function will call `callback()` for each pixel in the N-dimensional
range between `start` and `start+size`, with two parameters : the
coordinates of the current pixel, and the related Perlin value.

```javascript
var generator = require('perlin')( );

generator.generate( [ 0, 0 ], [ 2, 2 ], function ( point, value ) {
    console.log( point, value );
} );
```

## Authors

Implementation by Maël Nison, from Jeremy Cochoy's [paper][2].

[2]: http://zenol.fr/dl/perlin_noise.pdf
