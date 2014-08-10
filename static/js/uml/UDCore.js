





/**
 * Define static functions to aid in handling javascript elements,
 * inheritance and type checking
 *
 * @author Martín Vega-leal Ordóñez
 * @update 3/11/2010
 *
 * @class JSFun
 */
var JSFun = {



  /**
   * Allowed to inherit a class from another previously defined
   *
   * @author Martín Vega-leal Ordóñez
   * @update 3/10/2010
   *
   * @method extend
   * @param {Object} subClass Class that inherits the properties
   * @param {Object} baseClass Base class in the inheritance
   */
  extend: function( subClass, baseClass) {
    function inheritance() {};
    inheritance.prototype = baseClass.prototype;

    subClass.prototype = new inheritance();
    subClass.prototype.constructor = subClass;
    subClass.baseConstructor = baseClass;
    subClass.base = baseClass.prototype;
  },



  /**
   * Check if the introduced object is of type number and is finite
   *
   * @author Martín Vega-leal Ordóñez
   * @update 3/10/2010
   *
   * @method isNumber
   * @param {Object} value Object that is checked
   * @return {Boolean} If the object is a number and is finite
   */
  isNumber: function( value ) {
    return typeof value === 'number' && isFinite( value );
  },



  /**
   * Check if the introduced object is of type string
   *
   * @author Martín Vega-leal Ordóñez
   * @update 3/10/2010
   *
   * @method isString
   * @param {Object} value Object that is checked
   * @return {Boolean} If the object is a string
   */
  isString: function( value ) {
    return typeof value === 'string';
  },



  /**
   * Check if the introduced object is of type array
   *
   * @author Rafael Molina Linares
   * @update 18/10/2011
   *
   * @method isArray
   * @param {Object} value Object that is checked
   * @return {Boolean} If the object is an array
   */
  isArray: function( value ) {
    return Object.prototype.toString.call(value) === '[object Array]';
  },


  /**
   * Check if the introduced object is of type boolean
   *
   * @author Rafael Molina Linares
   * @update 18/10/2011
   *
   * @method isBoolean
   * @param {Object} value Object that is checked
   * @return {Boolean} If the object is an boolean
   */
  isBoolean: function( value ) {
    return typeof value === 'boolean';
  }


}



















/**
 * Constructor de la clase Point
 * Define un objeto que representa un punto en dos dimensiones
 *
 * @author Martín Vega-leal Ordóñez
 * @update 3/11/2010
 *
 * @class Point
 */
var Point = function( x, y ) {

  this.setPoint( x, y );
}



/**
 * Modifica las coordenadas del punto
 *
 * @author Martín Vega-leal Ordóñez
 * @update 3/11/2010
 *
 * @method setPoint
 * @param {Number} x Nueva coordenada X del punto
 * @param {Number} y Nueva coordenada Y del punto
 * @return {Point} El punto modificado
 */
Point.prototype.setPoint = function( x, y ) {
  if( x instanceof Point ) {
    this.setX( x._x );
    this.setY( x._y );
  } else {
    this.setX( x );
    this.setY( y );
  }

  return this;
}



/**
 * Modifica la coordenada X del punto
 *
 * @author Martín Vega-leal Ordóñez
 * @update 3/11/2010
 *
 * @method setX
 * @param {Number} x Nueva coordenada X del punto
 * @return {Point} El punto modificado
 */
Point.prototype.setX = function( x ) {
  if( JSFun.isNumber( x ) ) {
    this._x = x;
  }

  return this;
}



/**
 * Modifica la coordenada Y del punto
 *
 * @author Martín Vega-leal Ordóñez
 * @update 3/11/2010
 *
 * @method setY
 * @param {Number} y Nueva coordenada Y del punto
 * @return {Point} El punto modificado
 */
Point.prototype.setY = function( y ) {
  if( JSFun.isNumber( y ) ) {
    this._y = y;
  }

  return this;
}



/**
 * Devuelve la coordenada X del punto
 *
 * @author Martín Vega-leal Ordóñez
 * @update 3/11/2010
 *
 * @method getX
 * @return {Number} La coordenada x del punto
 */
Point.prototype.getX = function() {
  return this._x;
}



/**
 * Devuelve la coordenada Y del punto
 *
 * @author Martín Vega-leal Ordóñez
 * @update 3/11/2010
 *
 * @method getY
 * @return {Number} La coordenada y del punto
 */
Point.prototype.getY = function() {
  return this._y;
}



/**
 * Comprueba si dos puntos tienen las mismas coordenadas
 *
 * @author Martín Vega-leal Ordóñez
 * @update 3/11/2010
 *
 * @method equals
 * @param {Point} p Punto para comparar
 * @return {Boolean} Si los dos puntos son iguales
 */
Point.prototype.equals = function( p ) {
  if( p instanceof Point && this._x == p.x && this.y == p._y )
    return true;
  else
    return false;
}



/**
 * Devuelve la coordenada X del punto adaptada al centro de un píxel
 *
 * @author Martín Vega-leal Ordóñez
 * @update 3/11/2010
 *
 * @method pixelX
 * @return {Number} La coordenada x del punto dentro el píxel más cercano
 */
Point.prototype.pixelX = function() {
  return parseInt( this._x ) + 0.5;
}



/**
 * Devuelve la coordenada Y del punto adaptada al centro de un píxel
 *
 * @author Martín Vega-leal Ordóñez
 * @update 3/11/2010
 *
 * @method pixelY
 * @return {Number} La coordenada y del punto dentro el píxel más cercano
 */
Point.prototype.pixelY = function() {
  return parseInt( this._y ) + 0.5;
}








/**
 * Interfaz Element
 * Representa todo objeto representable en un diagrama
 *
 * @author Martín Vega-leal Ordóñez
 * @update 5/10/2010
 *
 * @class Element
 */
var Element = function() {}



/**
 * Comprueba que se ha pulsado sobre el elemento en las coordenadas
 * indicadas
 *
 * @author Martín Vega-leal Ordóñez
 * @update 05/10/2010
 *
 * @method select
 * @param {Number} x Coordenada x
 * @param {Number} y Coordenada y
 * @return {Boolean} Si el punto está sobre el elemento
 */
Element.prototype.select = function( x, y ) { return false; }



/**
 * Deselecciona el elemento y cierra toda interación abierta
 *
 * @author Martín Vega-leal Ordóñez
 * @update 05/10/2010
 *
 * @method deselect
 */
Element.prototype.deselect = function() {}



/**
 * Realiza las acciones necesarias causadas por el arrastre del ratón
 * por parte de un usuario
 *
 * @author Martín Vega-leal Ordóñez
 * @update 05/10/2010
 *
 * @method drag
 * @param {Number} x Coordenada x de la nueva posición
 * @param {Number} y Coordenada y de la nueva posición
 */
Element.prototype.drag = function( x, y ) {}



/**
 * Realiza las acciones necesarias cuando el usuario suelta el
 * ratón que tenía pulsado en la posición indicada
 *
 * @author Martín Vega-leal Ordóñez
 * @update 05/10/2010
 *
 * @method drop
 * @param {Number} x Coordenada x de la posición
 * @param {Number} y Coordenada y de la posición
 */
Element.prototype.drop = function( x, y ) {}



/**
 * Dibuja completamente el elemento en el lienzo canvas,
 *
 * @author Martín Vega-leal Ordóñez
 * @update 05/10/2010
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Contexto del elemento canvas
 */
Element.prototype.draw = function( context ) {}



/**
 * Dibuja la silueta del elemento
 * Esta función se activa para representar el desplazamiento de los objetos
 * por el lienzo de dibujo cuando son desplazados o se modifica su tamaño
 *
 * @author Martín Vega-leal Ordóñez
 * @update 05/10/2010
 *
 * @method drawShape
 * @param {CanvasRenderingContext2D} context Contexto del elemento canvas
 */
Element.prototype.drawShape = function( context ) {}



/**
 * Comprueba si el punto indicado está sonbre el elemento
 *
 * @author Martín Vega-leal Ordóñez
 * @update 05/10/2010
 *
 * @method isOver
 * @param {Number} x Coordenada x del punto a comprobar
 * @param {Number} y Coordenada y del punto a comprobar
 * @return {Boolean} Si el punto está sobre el nodo
 */
Element.prototype.isOver = function( x, y ) { return false; }



/**
 * Almacena una referencia al diagrama al que pertenece el elemento
 *
 * @author Martín Vega-leal Ordóñez
 * @update 05/10/2010
 *
 * @method setDiagram
 * @param {Diagram} diagram Diagrama al que pertenece
 */
Element.prototype.setDiagram = function( diagram ) {}



/**
 * Devuelve el padre del elemento, en caso de no tener,
 * devuelve null
 *
 * @author Martín Vega-leal Ordóñez
 * @update 05/10/2010
 *
 * @method getParent
 * @return {Node} Nodo padre, si tiene uno asignado
 */
Element.prototype.getParent = function() { return null; }



/**
 * Devuelve el punto central del elemento
 * Este punto sirver para calcular las lineas de las relaciones entre elementos
 *
 * @author Martín Vega-leal Ordóñez
 * @update 05/10/2010
 *
 * @method getCentralPoint
 * @return {Point} Coordenadas del punto central del elemento
 */
Element.prototype.getCentralPoint = function() { return new Point(); }



/**
 * Devuelve el punto de intersección entre el indicado por parámetros
 * y la forma del elemento
 * Este punto sirver para calcular las lineas de las relaciones entre elementos
 *
 * @author Martín Vega-leal Ordóñez
 * @update 05/10/2010
 *
 * @method getLinkCentered
 * @param {Number} x Coordenada x del punto
 * @param {Number} y Coordenada y del punto
 * @return {Point} Punto de intersección con los bordes del nodo
 */
Element.prototype.getLinkCentered = function( x, y ) { return new Point(); }



 /**
 * Recibe un nodo xml con la información del elemento y recupera los datos
 *
 * @author Martín Vega-leal Ordóñez
 * @update 05/10/2010
 *
 * @method setElementXML
 * @param {DOMNode} xmlnode Nodo xml con la información del elemento
 */
Element.prototype.setElementXML = function( xmlnode ) { }



/**
 * Genera un nodo XML con la información referente al elemento
 *
 * @author Martín Vega-leal Ordóñez
 * @update 05/10/2010
 *
 * @method getElementXML
 * @param {DOMNode} parent Nodo padre del árbol xml que se generará
 * @return {DOMNode} Nodo xml con la información referente al elemento
 */
Element.prototype.getElementXML = function( parent ) { return ""; }









/**
 * Constructor de la clase JSGraphic
 * Define funciones estáticas para la ayuda en el dibujo de elementos
 * gráficos en canvas
 *
 * @author Martín Vega-leal Ordóñez
 * @update 3/11/2010
 *
 * @class JSGraphic
 */
var JSGraphic = {



  /**
   * Adapta un valor numerico al más cercano que se adapte a la posición
   * dentro de un pixel
   *
   * @author Martín Vega-leal Ordóñez
   * @update 3/10/2010
   *
   * @method toPixel
   * @param {Number} x Posición que se adaptará
   * @return {Number} Posición más cercana al interior exacto de un píxel
   */
  toPixel: function( x ) {
    return parseInt( x ) + 0.5;
  },



  /**
   * Dibuja una linea discontinua entre dos puntos, el margen de dicontinuidad
   * se puede definir
   *
   * @author Martín Vega-leal Ordóñez
   * @update 3/10/2010
   *
   * @method dashedLine
   * @param {CanvasRenderingContext2D} context Contexto del elemento canvas
   * @param {Number} x1 Coordenada del eje X del primer punto
   * @param {Number} y1 Coordenada del eje Y del primer punto
   * @param {Number} x2 Coordenada del eje X del segundo punto
   * @param {Number} y2 Coordenada del eje Y del segundo punto
   * @param {Number} size Distancia entre fragmentos discontinuos
   */
  dashedLine: function( context, x1, y1, x2, y2, size ) {

    var divisions = Math.sqrt( (x2 - x1 ) * ( x2 - x1 ) + ( y2 - y1 ) * ( y2 - y1 ) ) / size;
    divisions = divisions/2 - 1;

    var angle = Math.abs( Math.atan2( y2 - y1 , x2 - x1 ) );
    var incx = Math.cos( angle ) * size;
    var incy = Math.sin( angle ) * size;

    var x = x1;
    var y = y1;

    if( y2 < y1 )
      incy = - incy;

    context.beginPath();
    for( var i=0; i < divisions; i++ ) {
      context.moveTo( x, y );

      x += incx;
      y += incy;
      context.lineTo( x, y );

      x += incx;
      y += incy;
    }

    context.moveTo( x, y );
    x += incx;
    y += incy;

    if( (incx > 0 && x > x2) || (incx < 0 && x < x2) )
      x = x2;
    if( (incy > 0 && y > y2) || (incy < 0 && y < y2) )
      y = y2;

    context.lineTo( x, y );
    context.stroke();
  },



  /**
   * Calcula el punto de intersección entre dos rectas, dados dos puntos
   * de cada una de ellas
   *
   * @author Martín Vega-leal Ordóñez
   * @update 3/10/2010
   *
   * @method lineIntersection
   * @param {Number} x1 Coordenada del eje X de un punto de la primera recta
   * @param {Number} y1 Coordenada del eje Y de un punto de la primera recta
   * @param {Number} x2 Coordenada del eje X de otro punto de la primera recta
   * @param {Number} y2 Coordenada del eje Y de otro punto de la primera recta
   * @param {Number} x3 Coordenada del eje X de un punto de la segunda recta
   * @param {Number} y3 Coordenada del eje Y de un punto de la segunda recta
   * @param {Number} x4 Coordenada del eje X de otro punto de la segunda recta
   * @param {Number} y4 Coordenada del eje Y de otro punto de la segunda recta
   * @return {Point} Punto de intersección entre las dos rectas
   */
  lineIntersection: function( x1, y1, x2, y2, x3, y3, x4, y4 ) {
    var a1 = y2 - y1;
    var b1 = x1 - x2;
    var c1 = - b1 * y1 - a1 * x1;

    var a2 = y4 - y3;
    var b2 = x3 - x4;
    var c2 = - b2 * y3 - a2 * x3;

    var x, y;

    if( x1 == x2 ) {
      x = x1;
      y = - ( c2 + a2 * x ) / b2;
    } else if( y1 == y2 ) {
      y = y1;
      x = - ( c2 + b2 * y ) / a2;
    }else if( x3 == x4 ) {
      x = x3;
      y = - ( c1 + a1 * x ) / b1;
    } else if( y3 == y4 ) {
      y = y3;
      x = - ( c1 + b1 * y ) / a1;
    }else {
      var h = - b1 / b2;
      x =  - ( h * c2 + c1 ) / ( a1 + h * a2 );
      y = - ( c1 + a1 * x ) / b1;
    }

    return new Point( x, y );
  },



  /**
   * Define el trazo de una elipse sobre el lienzo de dibujo
   *
   * @author Martín Vega-leal Ordóñez
   * @update 3/10/2010
   *
   * @method ellipse
   * @param {CanvasRenderingContext2D} context Contexto del elemento canvas
   * @param {Number} x Coordenada X del centro de la elipse
   * @param {Number} y Coordenada Y del centro de la elipse
   * @param {Number} h Semieje mayor de la elipse
   * @param {Number} v Semieje menor de la elipse
   */
  ellipse: function( context, x, y, h, v ) {
    var C = 0.5522847498307933;
    var ch = C * h;
    var cv = C * v;

    context.beginPath();
    context.moveTo( x - h, y );
    context.bezierCurveTo( x - h , y - cv, x - ch, y - v,  x, y - v );
    context.bezierCurveTo( x + ch, y - v, x + h , y - cv, x + h, y );
    context.bezierCurveTo( x + h, y + cv, x + ch , y + v, x, y + v );
    context.bezierCurveTo( x - ch, y + v, x - h , y + cv, x - h, y );
  },



  /**
   * Define el trazo de un rombo sobre el lienzo de dibujo
   *
   * @author Martín Vega-leal Ordóñez
   * @update 3/10/2010
   *
   * @method rhombus
   * @param {CanvasRenderingContext2D} context Contexto del elemento canvas
   * @param {Number} x Coordenada X del centro de la elipse
   * @param {Number} y Coordenada Y del centro de la elipse
   * @param {Number} width Diagonal horizontal del rombo
   * @param {Number} height Diagonal vertical del rombo
   */
  rhombus: function( context, x, y, width, height ) {
    context.beginPath();
    context.moveTo( x, y + height/2 );
    context.lineTo( x + width/2, y );
    context.lineTo( x + width, y + height/2 );
    context.lineTo( x + width/2, y + height );
    context.closePath();
  },


  /**
   * Define el trazo de un triangulo sobre el lienzo de dibujo
   *
   * @author Alejandro Arrabal Hidalgo
   * @update 28/08/2012
   *
   * @method triangle
   * @param {CanvasRenderingContext2D} context Contexto del elemento canvas
   * @param {Number} x Coordenada X del centro del triangulo
   * @param {Number} y Coordenada Y del centro del triangulo
   * @param {Number} width longitud horizontal del triangulo
   * @param {Number} height altura vertical del triangulo
   * @param {Number} direction Direccion en el sentido de las agujas del reloj (0: Arriba,1:Derecha...)
   */
  triangle: function( context, x, y, width, height, direction ) {
    context.beginPath();
    switch(direction){
    case 0:
        context.moveTo( x, y + height/2 );
        context.lineTo( x + width/2, y );
        context.lineTo( x + width, y + height/2 );
    	break;
    case 1:
        context.moveTo( x + width/2, y );
        context.lineTo( x + width, y + height/2 );
        context.lineTo( x + width/2, y + height );
    	break;
    case 2:
        context.moveTo( x, y + height/2 );
        context.lineTo( x + width, y + height/2 );
        context.lineTo( x + width/2, y + height );
    	break;
    default:
        context.moveTo( x, y + height/2 );
    	context.lineTo( x + width/2, y );
    	context.lineTo( x + width/2, y + height );
    	break;
    }

    context.closePath();
  },




  /**
   * Calcula el punto de intersección entre una elipse y la recta formada
   * por un punto y el centro de la elipse
   *
   * @author Martín Vega-leal Ordóñez
   * @update 3/10/2010
   *
   * @method ellipseIntersection
   * @param {Number} cx Coordenada del eje X del centro de la elipse
   * @param {Number} cy Coordenada del eje Y del centro de la elipse
   * @param {Number} a Semieje mayor de la elipse
   * @param {Number} b Semieje menor de la elipse
   * @param {Number} ax Coordenada del eje X de un punto de la recta
   * @param {Number} ay Coordenada del eje Y de un punto de la recta
   * @return {Point} Punto de intersección
   */
  ellipseIntersection: function( cx, cy, a, b, ax, ay) {
    var m = (ay - cy ) / (ax - cx );

    var incx = 0;
    var incy = 0;

    var aux;

    if( a > 0 && b > 0 )
      incx = Math.sqrt( 1 / ( 1/(a*a) + (m*m)/(b*b) ) );

    aux = (1 - (incx*incx)/(a*a) )*(b*b);
    if( a > 0 &&  aux >= 0 )
      incy = Math.sqrt( aux );

    if( ax < cx )
      incx = - incx;

    if( ay < cy )
      incy = - incy;

    return new Point( cx + incx, cy + incy );
  }//,



}



var ComponentStyle={
		  component_color: '#000000'
}




/**
 * Constructor of the class component.
 * A component is a small part that adds semantics
 * to a element higher, as a node or a relation
 *
 * @author Martín Vega-leal Ordóñez / Rafael Molina Linares / Alejandro Arrabal Hidalgo
 * @update 29/11/2010 / 5/10/2011 / 01/08/2012
 *
 * @class Component
 * @param {String} id Identification of component, inside of your parent
 * @param {Number} margin Separation between the component and its adjacents
 * @param {Component.position} position Position of component inside of the parent
 * @param {Boolean} centered If the element will be centered
 * @param {Number} orientation Indicates the vertical u horizontal orientation of the component:
 *																- 0: horizontal
 *																- 1: vertical
 * @param {Boolean} visible If the component is visible
 */
var Component = function( params ) {
  params = params || {}

  this._x = 0;
  this._y = 0;

  this._width = 0;
  this._height = 0;

  this._minWidth = 0;
  this._minHeight = 0;

  this._superWidth = 0;
  this._parent = null;



  this._setId( params.id || '' );

  this._setMargin( params.margin || 0 );

  this._setPosition( params.position || Component.Float );

  this._setCentered( params.centered || false );

  this._orientation = params.orientation || 0;

  this._visible = params.visible || true;
}

Component.Static = 0;
Component.Float = 1;
Component.TopRight = 2;
Component.Bottom = 3;
Component.BottomLeft = 4;
Component.BottomRight = 5;
Component.TopLeft = 8;
Component.Xmovement = 10;
Component.Top = 11;
Component.Left = 12;
Component.Right = 13;



/**
 * Assigns a id to the component
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method _setId
 * @private
 * @param {String} newId New id of the component
 */
Component.prototype._setId = function( newId ) {
  if( JSFun.isString( newId ) ) {
    this._id = newId;
  } else {
    this._id = '';
  }
}



/**
 * Return the id of the component
 *
 * @author Martín Vega-leal Ordóñez
 * @update 30/11/2010
 *
 * @method getId
 * @return {String} Id of the component
 */
Component.prototype.getId = function() {
  return this._id;
}



/**
 * Modifies the position of the component
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method setCoodinates
 * @param {Number} x New coordinate x of the component
 * @param {Number} x New coordinate y of the component
 */
Component.prototype.setCoordinates = function( x, y ) {
  this._x = x;
  this._y = y;
}



/**
 * Update the position of the component according to a relative movement
 * to the before position
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method updatePosition
 * @param {Number} incx Movement in the x axis
 * @param {Number} incy Movement in the y axis
 */
Component.prototype.updatePosition = function( incx, incy ) {
  this._x += incx;
  this._y += incy;
}



/**
 * Sets the width of the component
 *
 * @author Martín Vega-leal Ordóñez
 * @update 30/11/2010
 *
 * @method setWidth
 * @protected
 * @param {Number} newWidth New width of the component
 */
Component.prototype.setWidth = function( newWidth ) {
  if( newWidth > this._minWidth ) {
    this._width = newWidth + 2 * this._margin;
  } else {
    this._width = this._minWidth;
  }
}



/**
 * Sets the height of the component
 *
 * @author Martín Vega-leal Ordóñez
 * @update 6/11/2010
 *
 * @method setHeight
 * @protected
 * @param {Number} newHeight New height of the component
 */
Component.prototype.setHeight = function( newHeight ) {
  if( newHeight > this._minHeight ) {
    this._height = newHeight + 2*this._margin;
  } else {
    this._height = this._minHeight;
  }
}

/**
 * Set the visibility to the component to true or false
 *
 * @author Rafael Molina Linares
 * @update 17/10/2011
 *
 * @method setVisibility
 * @protected
 * @param {Boolean} bool value of visibility of the component
 */
Component.prototype.setVisibility = function( bool ) {

  this._visible = bool;
}


/**
 * Set the minimal width of the component
 *
 * @author Martín Vega-leal Ordóñez
 * @update 7/11/2010
 *
 * @method setMinHeight
 * @protected
 * @param {Number} value New minimal width of the component
 */
Component.prototype.setMinWidth = function( value ) {
  if( value > 0 ) {
    this._minWidth = value;
  }

  if( value > this._width ) {
    this._width = value;
  }
}



/**
 * Sets the minimal height of the component
 *
 * @author Martín Vega-leal Ordóñez
 * @update 6/11/2010
 *
 * @method setMinHeight
 * @protected
 * @param {Number} value New minimal height of the component
 */
Component.prototype.setMinHeight = function( value ) {
  if( value > 0 ) {
    this._minHeight = value;
  }

  if( value > this._height ) {
    this._height = value;
  }

}



/**
 * Set the disponible width for the node inside your container element,
 * this gives a margin to move and focus
 *
 * @author Martín Vega-leal Ordóñez
 * @update 6/11/2010
 *
 * @method setSuperWidth
 * @param {Number} size Overall width within of the component that contains
 */
Component.prototype.setSuperWidth = function( size ) {
  if( size >= 0 ) {
    this._superWidth = size;
  }
}




/**
 * Sets the margin of the component
 *
 * @author Martín Vega-leal Ordóñez
 * @update 6/11/2010
 *
 * @method _setMargin
 * @private
 * @param {Number} value New margin to the component
 */
Component.prototype._setMargin = function( value ) {
  if( JSFun.isNumber( value ) ) {
    this._margin = value;
  } else {
    this._margin = 0;
  }
}



/**
 * Sets a reference to your parent element that contains it
 *
 * @author Martín Vega-leal Ordóñez
 * @update 8/11/2010
 *
 * @method setParent
 * @param {Element|SuperComponent|Diagram} newParent Parent element that contains it
 */
Component.prototype.setParent = function( newParent ) {
  if( newParent instanceof Element || newParent instanceof SuperComponent || newParent instanceof Diagram ) {
    this._parent = newParent;
  }
}



/**
 * Sets the position that will occupy the component whitin your parent
 *
 * @author Martín Vega-leal Ordóñez
 * @update 8/11/2010
 *
 * @method _setPosition
 * @private
 * @param {Number} value New position that will occupy whitin the parent component
 */
Component.prototype._setPosition = function( value ) {
  if(    value == Component.Float
      || value == Component.Static
      || value == Component.TopRight
      || value == Component.Bottom
      || value == Component.BottomLeft
      || value == Component.BottomRight
      || value == Component.TopLeft
      || value == Component.sideLeft
      || value == Component.Xmovement
      || value == Component.Top
      || value == Component.Left
      || value == Component.Right)
  {
    this._position = value;

  } else {
    this._position = Component.Float;
  }
}

/**
 * Sets if the component will be centered(horizontally or vertically) or not
 *
 * @author Martín Vega-leal Ordóñez
 * @update 8/11/2010
 *
 * @method _setCentered
 * @private
 * @param {Number} value If the component will be centered
 */
Component.prototype._setCentered = function( value ) {
  if( value == true ) {
    this._centered = true;
  } else {
    this._centered = false;
  }

}



/**
 * Returns the position of the component, your x coordinate
 *
 * @author Martín Vega-leal Ordóñez
 * @update 8/11/2010
 *
 * @method _getX
 * @protected
 * @return {Number} Coordinate x of the position of the component
 */
Component.prototype._getX = function() {
  return this._x;
}



/**
 * Returns the position of the component, your y coordinate
 *
 * @author Martín Vega-leal Ordóñez
 * @update 8/11/2010
 *
 * @method _getY
 * @protected
 * @return {Number} Coordinate y of the position of the component
 */
Component.prototype._getY = function() {
  return this._y;
}



/**
 * Returns the position of the component, your x coordinate, specially
 * formatted for the drawing of lines and that these fit
 * within a pixel to not fade
 *
 * @author Martín Vega-leal Ordóñez
 * @update 8/11/2010
 *
 * @method getPixelX
 * @protected
 * @return {Number} Coordinate x of the position of the component
 */
Component.prototype.getPixelX = function() {
  return JSGraphic.toPixel( this._x );
}



/**
 * Returns the position of the component, your x coordinate, specially
 * formatted for the drawing of lines and that these fit
 * within a pixel to not fade
 *
 * @author Martín Vega-leal Ordóñez
 * @update 8/11/2010
 *
 * @method getPixelY
 * @protected
 * @return {Number} Coordinate y of the position of the component
 */
Component.prototype.getPixelY = function() {
  return JSGraphic.toPixel( this._y );
}



/**
 * Returns the real position of the component content, taking in
 * account the assigned margin, your x coordinate
 *
 * @author Martín Vega-leal Ordóñez
 * @update 8/11/2010
 *
 * @method _getMX
 * @protected
 * @return {Number} Coordinate  of the real position of the content
 */
Component.prototype._getMX = function() {
  return this._x + this._margin;
}



/**
 * Returns the real position of the component content, taking in
 * account the assigned margin, your y coordinate
 *
 * @author Martín Vega-leal Ordóñez
 * @update 8/11/2010
 *
 * @method _getMY
 * @protected
 * @return {Number} Coordinate y of the real position of the content
 */
Component.prototype._getMY = function() {
  return this._y + this._margin;
}



/**
 * Returns the width of the component
 *
 * @author Martín Vega-leal Ordóñez
 * @update 8/11/2010
 *
 * @method getWidth
 * @return {Number} Width of the component
 */
Component.prototype.getWidth = function() {
  return this._width;
}



/**
 * Returns the height of the component
 *
 * @author Martín Vega-leal Ordóñez
 * @update 8/11/2010
 *
 * @method getHeight
 * @return {Number} Height of the component
 */
Component.prototype.getHeight = function() {
  return this._height;
}



/**
 * Returns the margin of the component
 *
 * @author Martín Vega-leal Ordóñez
 * @update 8/11/2010
 *
 * @method _getMargin
 * @private
 * @return {Number} Margin of the component
 */
Component.prototype._getMargin = function() {
  return this._margin;
}



/**
 * Returns the width margin that the component has
 * whitin your parent element
 *
 * @author Martín Vega-leal Ordóñez
 * @update 8/11/2010
 *
 * @method getSuperWidth
 * @return {Number} Maximum width of the component
 */
Component.prototype.getSuperWidth = function() {
  if( this._parent instanceof SuperComponent ) {
    return this._parent.getSuperWidth();
  } else {
    return this._superWidth;
  }
}



/**
 * Returns the parent element of the component
 *
 * @author Martín Vega-leal Ordóñez
 * @update 2/11/2010
 *
 * @method getParent
 * @return {Element|SuperComponent|Diagram} Parent element of the component
 */
Component.prototype.getParent = function() {
  return this._parent;
}



/**
 * Returns the position of the component whitin your parent element
 *
 * @author Martín Vega-leal Ordóñez
 * @update 8/11/2010
 *
 * @method getPosition
 * @return {Component.position} Positioin of the component
 */
Component.prototype.getPosition = function() {
  return this._position;
}



/**
 * Returns if the component is centered vertically or horizontally
 *
 * @author Martín Vega-leal Ordóñez
 * @update 8/11/2010
 *
 * @method isCentered
 * @return {Boolean} If the component is centered
 */
Component.prototype.isCentered = function() {
  return this._centered;
}



/**
 * Gets a XML node with the information of the component
 *
 * @author Martín Vega-leal Ordóñez
 * @update 3/11/2010
 *
 * @method getComponentXML
 * @param {DOMNode} parent Parent  node of the xml tree that will be generated
 * @return {DOMNode Node with the information of the component
 */
Component.prototype.getComponentXML = function( parent ) {
  var xmlcomp = parent.createElement( 'item' );

  if( this._id ) {
    xmlcomp.setAttribute( 'id', this._id );
  }

  xmlcomp.setAttribute( 'value', this.getValue() );
  return xmlcomp;
}



/**
 * Notifies to the parent element that should be
 * re-drawn because the component has changed
 *
 * @author Martín Vega-leal Ordóñez
 * @update 1/11/2010
 *
 * @method notifyDraw
 */
Component.prototype.notifyDraw = function() {
  if( this._parent ) {
    this._parent.notifyDraw();
  }
}



/**
 * Notifies to the parent element that should be updated and drawn
 *
 * @author Martín Vega-leal Ordóñez / Rafael Molina Linares
 * @update 1/11/2010 / 17/09/2011
 *
 * @method notifyChange
 */
Component.prototype.notifyChange = function() {
  if( this._parent ) {

		var beforeWidth = (this._orientation) ? this._parent._height : this._parent._width;

		/*
			Notify changes in the parent. The parent of the component
			can be a node(or supernode), or a super-component
		*/
		if(this._parent instanceof SuperNode)
	    this._parent.notifyChange(true);
		else
	    this._parent.notifyChange();

		if(this._parent && this._parent._parent instanceof SuperNode)
			this._parent._parent.notifyChange(true);

    this._parent.notifyDraw();
  }
}



/**
 * Notifies to the parent element that the component has been remove
 *
 * @author Martín Vega-leal Ordóñez
 * @update 1/11/2010
 *
 * @method notifyDelete
 */
Component.prototype.notifyDelete = function() {

  if( this._parent instanceof SuperComponent || this._parent instanceof Diagram || this._parent.getParent() instanceof SuperNode) {

    this._parent.notifyDelete( this );
  }
}



/**
 * Notifies to the parent element that the component wanna up a level
 * in relation to adjacent components
 *
 * @author Martín Vega-leal Ordóñez
 * @update 1/11/2010
 *
 * @method notifyToUp
 */
Component.prototype.notifyToUp = function() {
  if( this._parent instanceof SuperComponent ) {
    this._parent.notifyToUp( this );
  }
}



/**
 * Notifies to the parent element that the component wanna go down a level
 * in relation to adjacent components
 *
 * @author Martín Vega-leal Ordóñez
 * @update 1/11/2010
 *
 * @method notifyToDown
 */
Component.prototype.notifyToDown = function() {
  if( this._parent instanceof SuperComponent ) {
    this._parent.notifyToDown( this );
  }
}



/**
 * Checks if the indicated point is over the component
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method isOver
 * @param {Number} x Coordinate x of the point to check
 * @param {Number} y Coordinate y of the point to check
 * @return {Boolean} If the point is over the component
 */
Component.prototype.isOver = function( x, y ) {
  if( this._visible &&
			x >= this._x
      && x <= this._x + this._width
      && y >= this._y
      && y <= this._y + this._height )
  {
    return true;
  } else {
    return false;
  }
}



/**
 * Draws the component on the canvas element
 *
 * @author Martín Vega-leal Ordóñez
 * @update 4/11/2010
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Context of the canvas element
 */
Component.prototype.draw = function( context ) {}



/**
 * Checks that it is pressed over the component on the given coordinates
 * and in affirmative case, the corresponding actiokns are activated
 *
 * @author Martín Vega-leal Ordóñez
 * @update 4/11/2010
 *
 * @method select
 * @param {Number} x Coordinate x
 * @param {Number} y Coordinate y
 * @return {Boolean} If the point is over the component
 */
Component.prototype.select = function( x, y ) { return false; }



/**
 * Draws the component's shape and its button(if has)
 *
 * @author Martín Vega-leal Ordóñez
 * @update 4/11/2010
 *
 * @method drawShape
 * @param {CanvasRenderingContext2D} context Contexto del elemento canvas
 */
Component.prototype.drawShape = function( context ) {}



/**
 * Deselects the component and close all openned dialog
 *
 * @author Martín Vega-leal Ordóñez
 * @update 4/11/2010
 *
 * @method deselect
 */
Component.prototype.deselect = function() {}



/**
 * Modifies the component's value
 *
 * @author Martín Vega-leal Ordóñez
 * @update 4/11/2010
 *
 * @method setValue
 * @param {String} value Text that will be assigned to the component
 */
Component.prototype.setValue = function( value ) {}



/**
 * Returns the value of the component
 *
 * @author Martín Vega-leal Ordóñez
 * @update 4/11/2010
 *
 * @method getValue
 * @return {String} Text that contains the component
 */
Component.prototype.getValue = function() { return; }



/**
 * Modifies the component's font color
 *
 * @author Jose Maria Gomez Hernandez
 * @update 03/04/2012
 *
 * @method setFontColor
 * @param {colorCSS}  color that will be assigned to the component
 */
Component.prototype.setFontColor = function( color ) {}




/**
 * Returns the component's font color
 *
 * @author Jose Maria Gomez Hernandez
 * @update 07/06/2012
 *
 * @method getFontColor
 * @return {colorCSS} Current component's font color
 */
Component.prototype.getFontColor = function() {return ;}



/**
 * Modifies the component's font family
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 01/08/2012
 *
 * @method setFontFamily
 * @param {font-familyCSS}  font family that will be assigned to the component
 */
Component.prototype.setFontFamily = function( font_family ) {}




/**
 * Returns the component's font family
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 01/08/2012
 *
 * @method getFontFamily
 * @return {font-familyCSS} Current component's font family
 */
Component.prototype.getFontFamily = function() {return;}




/**
 * Modifies the component's font size
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 01/08/2012
 *
 * @method setFontSize
 * @param {font-sizeCSS}  font size that will be assigned to the component
 */
Component.prototype.setFontSize = function( font_size ) {}




/**
 * Returns the component's font size
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 01/08/2012
 *
 * @method getFontSize
 * @return {font-sizeCSS} Current component's font size
 */
Component.prototype.getFontSize = function() {return;}




/**
 * Modifies the component's font style
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 05/08/2012
 *
 * @method setFontS
 * @param {font-styleCSS}  font style that will be assigned to the component
 */
Component.prototype.setFontStyle = function( font_style ) {}




/**
 * Returns the component's font style
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 05/08/2012
 *
 * @method getFontStyle
 * @return {font-styleCSS} Current component's font style
 */
Component.prototype.getFontStyle = function() {return;}



/**
 * get the Component's font weight
 *
 * @author  Alejandro Arrabal Hidalgo
 * @update  08/08/2012
 *
 * @method getFontStyle
 * @return {cssFont-Weight} the current font weight
 */

Component.prototype.getFontWeight = function( ) {return;}




/**
 *	Modifies the Component's font weight
 *
 * @author  Alejandro Arrabal Hidalgo
 * @update  08/08/2012
 *
 * @method setFontWeight
 * @param {cssFont-Weight} font weight to stablish
 */

Component.prototype.setFontWeight = function( weight ) {}



/**
 * Receives a xml component with the information of the component and get it back
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 30/08/2012
 *
 * @method setComponentXML
 * @param {DOMNode} xmlcomponent Xml component with the information of the component
 */
Component.prototype.setComponentXML = function( xmlcomponent ) {
	  if( xmlcomponent.getAttribute('id') ) {
		    this._id=xmlcomponent.getAttribute('id');
		  }
  if(xmlcomponent.getAttribute( 'fontColor' ) )  this.setFontColor( xmlcomponent.getAttribute( 'fontColor' )  );
  if(xmlcomponent.getAttribute( 'fontSize' ))this.setFontSize( xmlcomponent.getAttribute( 'fontSize' )  );
  if(xmlcomponent.getAttribute( 'fontFamily' ))this.setFontFamily( xmlcomponent.getAttribute( 'fontFamily' )  );
  if(xmlcomponent.getAttribute( 'fontStyle' ))this.setFontStyle( xmlcomponent.getAttribute( 'fontStyle' )  );
  if(xmlcomponent.getAttribute( 'fontWeight' ))this.setFontWeight( xmlcomponent.getAttribute( 'fontWeight' )  );
  this.setValue( xmlcomponent.getAttribute( 'value' ) );

}



/**
 * SuperComponent class constructor
 * A super-component is an object that manages different
 * components of a determined way to obtain
 * greater functionality
 *
 * @author Martín Vega-leal Ordóñez / Alejandro Arrabal Hidalgo
 * @update 29/11/2010	01/08/2012
 *
 * @class SuperComponent
 * @extends Component
 *
 * @param {colorCSS} text_color color of the component's text
 * @param {font-familyCSS} text_family text family of the component's text
 * @param {font-sizeCSS} font_size size of the component's font
 * @param {font-styleCSS} font_style style of the component's font
 * @param {font-weightCSS} font_weight weight of the component's font
 */
var SuperComponent = function( params ) {
  params = params || {};
  SuperComponent.baseConstructor.call( this, params );

  this._childs = [];
  this._activeChild = null;
  this._visibleSubComponents = true;

  this.setFontColor(params.text_color || '#000000');
  this.setFontSize(params.font_size || '12');
  this._font_width=this.getFontSize()/1.5;
  this.line_height=parseInt(this.getFontSize())+1;
  this.setFontFamily(params.text_family || 'monospace');
  this.setFontStyle(params.font_style || 'normal');
  this.setFontWeight(params.font_weight || 'normal');
}
JSFun.extend( SuperComponent, Component );



/**
 * Modify the visibility of the sub-components that
 * the component contains. If the sub-components are
 * visibles, there are made invisible, and vice versa
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method changeVisibility
 */
SuperComponent.prototype.changeVisibility = function() {
  this._visibleSubComponents = !this._visibleSubComponents;
}


/**
 * Set the visibility to the component to true or false
 *
 * @author Rafael Molina Linares
 * @update 17/10/2011
 *
 * @method setVisibility
 * @protected
 * @param {Boolean} bool value of visibility of the component
 */
SuperComponent.prototype.setVisibility = function( bool ) {

	this._visible = bool;

	for(var j=0;j<this._childs.length;j++)
		this._childs[j]._visible = bool;
}


/**
 * Returns if a super-component is visible at that moment
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method visibilitySubComponents
 * @return {Boolean} If the super-component is visible
 */
SuperComponent.prototype.visibilitySubComponents = function() {
  return this._visibleSubComponents;
}



/**
 * Generates a XML node with the information of the super-component.
 * For this, the sub-components of the component are consulted.
 *
 * @author Martín Vega-leal Ordóñez / Alejandro Arrabal Hidalgo
 * @update 3/11/2010 / 09/08/2012
 *
 * @method getComponentXML
 * @param {DOMNode} parent Parent node of the xml tree that is generated
 * @return {DOMNode Node with the information of the super-component
 */
SuperComponent.prototype.getComponentXML = function( parent ) {

  var xmlcomp = parent.createElement( 'superitem' );
  xmlcomp.setAttribute( 'id', this._id );
  xmlcomp.setAttribute( 'visibleSubComponents', this._visibleSubComponents );
  if(this.getFontColor()!='#000000')xmlcomp.setAttribute( 'fontColor', this.getFontColor() );
  if(this.getFontSize()!='12') xmlcomp.setAttribute( 'fontSize', this.getFontSize() );
  if(this.getFontStyle()!='normal')xmlcomp.setAttribute( 'fontStyle', this.getFontStyle() );
  if(this.getFontFamily()!='monospace')xmlcomp.setAttribute( 'fontFamily', this.getFontFamily() );
  if(this.getFontWeight()!='normal')xmlcomp.setAttribute( 'fontWeight', this.getFontWeight() );
  var i;
  for( i in this._childs ) {
    xmlcomp.appendChild( this._childs[i].getComponentXML( parent ) );
  }

  return xmlcomp;
}



/**
 * Receives a xml node with the information of the super-component and get it back
 *
 * @author Martín Vega-leal Ordóñez	/ Alejandro Arrabal Hidalgo
 * @update 28/11/2010	/30/08/2012
 *
 * @method setComponentXML
 * @param {DOMNode} xmlnode XML node with the information of the super-component
 */
SuperComponent.prototype.setComponentXML = function( xmlnode ) {

  var i;
  var childs = xmlnode.childNodes;

  if( xmlnode.getAttribute( 'visibleSubComponents' ) == 'true' ) {
    this._visibleSubComponents = true;
  } else {
    this._visibleSubComponents = false;
  }
  if(xmlnode.getAttribute( 'fontColor' ))this.setFontColor( xmlnode.getAttribute( 'fontColor' )  );
  if(xmlnode.getAttribute( 'fontSize' ))this.setFontSize( xmlnode.getAttribute( 'fontSize' )  );
  if(xmlnode.getAttribute( 'fontStyle' ))this.setFontStyle( xmlnode.getAttribute( 'fontStyle' )  );
  if(xmlnode.getAttribute( 'fontFamily' ))this.setFontFamily( xmlnode.getAttribute( 'fontFamily' ));
  if(xmlnode.getAttribute( 'fontWeigth' ))this.setFontWeight( xmlnode.getAttribute( 'fontWeight' )  );
  for( i = 0; i < childs.length; i++ ) {
    this.addField( childs[i].getAttribute( 'value' ) );
  }
}




/**
 * Updates the position of the super-component according
 * to the relative movement from its before position
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method updatePosition
 * @param {Number} incx Movement in the x axis
 * @param {Number} incy Movement in the y axis
 */
SuperComponent.prototype.updatePosition = function( incx, incy ) {
  SuperComponent.base.updatePosition.call( this, incx, incy );

  var i;
  for( i in this._childs ) {
    this._childs[i].updatePosition( incx, incy );
  }

}



/**
 * Adds a component to the super-component
 *
 * @author Martín Vega-leal Ordóñez / Alejandro Arrabal Hidalgo
 * @update 29/11/2010 / 08/08/2012
 *
 * @method addSubComponent
 * @param {Component} ncom New component of the element
 */
SuperComponent.prototype.addSubComponent = function( ncom ) {
  if( ncom instanceof Component ) {
    ncom.setParent( this );
	ncom.setFontFamily(this.getFontFamily());
	ncom.setFontColor(this.getFontColor());
	ncom.setFontSize(this.getFontSize());
	ncom.setFontStyle(this.getFontStyle());
	ncom.setFontWeight(this.getFontWeight());
    this._childs.push( ncom );
  }

}



/**
 * Deletes a component of the super-component, if exists
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method delSubComponent
 * @param {Component} dcom Component that will be remove
 */
SuperComponent.prototype.delSubComponent = function( dcom ) {

  var i;

  for( i in this._childs ) {
    if( this._childs[i] == dcom ) {
      this._childs.splice( i, 1 );
      break;
    }
  }
}



/**
 * Updates the position of the sub-components of the super-component
 *
 * @author Martín Vega-leal Ordóñez
 * @update 20/11/2010
 *
 * @method updateComponents
 */
SuperComponent.prototype.updateComponents = function() {

  if( this._visibleSubComponents ) {
    var width = 0;
    var height = 0;

    var i;
    for( i in this._childs ) {

			if(this._orientation){	//vertical orientation

		    if( this._childs[i].getHeight() > height )
		      height = this._childs[i].getHeight();

		    width += this._childs[i].getWidth();
			} else {

		    if( this._childs[i].getWidth() > width )
		      width = this._childs[i].getWidth();

		    height += this._childs[i].getHeight();
			}
    }

		if(this._orientation){	//vertical orientation
		  this.setWidth( width );
		  this.setHeight( height + this._getMargin() );
    } else {
		  this.setWidth( width + this._getMargin() );
		  this.setHeight( height );
		}

    var x = this._getMX();
    var y = this._getMY();

    for( i = 0; i < this._childs.length; i++ ) {
			if(this._orientation){	//vertical orientation
		    this._childs[i].setCoordinates( x, y );
		    x += this._childs[i].getWidth();
			} else {
		    this._childs[i].setCoordinates( x, y );
		    y += this._childs[i].getHeight();
			}
    }

  } else {
    this.setWidth( 1 );
    this.setHeight( 1 );
  }
}



/**
 * Checks that the super-component has been pressed in the given
 * coordinates and, in affirmative case, active the pressed component
 *
 * @author Martín Vega-leal Ordóñez
 * @update 4/11/2010
 *
 * @method select
 * @param {Number} x Coordinate x
 * @param {Number} y Coordinate y
 * @return {Boolean} If the point is over the component
 */
SuperComponent.prototype.select = function( x, y ) {

  if( this._visibleSubComponents ) {
    var i;

    for( i in this._childs ) {
      if( this._childs[i].select( x, y ) ) {
        this._activeChild = this._childs[i];

        return true;
      }
    }
  }
}



/**
 * Deselects the super-component and closes all opened dialog
 *
 * @author Martín Vega-leal Ordóñez
 * @update 4/11/2010
 *
 * @method deselect
 */
SuperComponent.prototype.deselect = function() {
  if( this._activeChild ) {
    this._activeChild.deselect();
    this._activeChild = null;
  }
}



/**
 * Draws the border of the component and its buttons
 *
 * @author Martín Vega-leal Ordóñez
 * @update 4/11/2010
 *
 * @method drawShape
 * @param {CanvasRenderingContext2D} context Context of the canvas element
 */
SuperComponent.prototype.drawShape = function( context ) {

	if(!this._visible)
		return;

  context.save();

  context.strokeStyle = '#aaaaaa';
  context.strokeRect( this.getPixelX(), this.getPixelY(), this.getWidth(), this.getHeight() );

  context.restore();

  if( this._visibleSubComponents ) {
    var i;
    for( i in this._childs ) {
      this._childs[i].drawShape( context );
    }
  }
}



/**
 * Receives the notification to raise the component a position and moves it to its new location
 *
 * @author Martín Vega-leal Ordóñez
 * @update 1/11/2010
 *
 * @method notifyToUp
 * @param {Component} elem Element to move to the new location
 */
SuperComponent.prototype.notifyToUp = function( elem ) {
  var i;

  var aux = elem;

  for( i = 0; i < this._childs.length; i++ ) {
    if( this._childs[i] == elem ) {
      if( i > 0 ) {
        this._childs[i] = this._childs[ i - 1 ];
        this._childs[ i - 1 ] = elem;
      }
      return;
    }
  }
}



/**
 * Receives the notification of go down the component a position and moves it to its new location
 *
 * @author Martín Vega-leal Ordóñez
 * @update 1/11/2010
 *
 * @method notifyToDown
 * @param {Component} elem Element to move to the new location
 */
SuperComponent.prototype.notifyToDown = function( elem ) {
  var i;

  var aux = elem;

  for( i = 0; i < this._childs.length - 1; i++ ) {
    if( this._childs[i] == elem ) {
      this._childs[i] = this._childs[ i + 1 ];
      this._childs[ i + 1 ] = elem;

      return;
    }
  }
}



/**
 * Notify to the parent element that must update and draw it
 *
 * @author Martín Vega-leal Ordóñez / Rafael Molina Linares
 * @update 1/11/2010 / 18/09/11
 *
 * @method notifyChange
 */
SuperComponent.prototype.notifyChange = function() {
  this.updateComponents();

  if( this._parent ) {
		if(this._parent instanceof SuperNode)
	    this._parent.notifyChange(true);
		else
	    this._parent.notifyChange();

		if(this._parent && this._parent._parent instanceof SuperNode)
			this._parent._parent.notifyChange(true);
  }
}



/**
 * Receives the notification to delete the child component and delete it
 *
 * @author Martín Vega-leal Ordóñez
 * @update 1/11/2010
 *
 * @method notifyDelete
 * @param {Component} dcomp Component that will be removed
 */
SuperComponent.prototype.notifyDelete = function( dcomp ) {

  this.delSubComponent( dcomp );
  this.updateComponents();
}



/**
 * Draws the super-component in the canvas element
 *
 * @author Martín Vega-leal Ordóñez
 * @update 4/11/2010
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Context of the canvas element
 */
SuperComponent.prototype.draw = function( context ) {

	if(!this._visible)
		return;

  if( this._visibleSubComponents ) {

    var i;

    for( i in this._childs ) {
      this._childs[i].draw( context );
    }
  }
}




/**
 * Modifies the supercomponent and his childs font size
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 02/08/2012
 *
 * @method _setFontSize
 * @param {fon-sizeCSS} font_size the font size to be set
 */
SuperComponent.prototype.setFontSize = function( font_size ) {
  this._font_size=font_size;

  var i;
  for( i in this._childs ) {
    this._childs[i].setFontSize( font_size );
  }

}




/**
 * Returns the supercomponent's font size
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 01/08/2012
 *
 * @method getFontSize
 * @return {font-sizeCSS} Current component's font size
 */
SuperComponent.prototype.getFontSize = function() {return this._font_size;}



/**
 *  Modifies the supercomponent and his childs font color
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 02/08/2012
 *
 * @method setFontColor
 * @param {colorCSS}  color that will be assigned to the component
 */
SuperComponent.prototype.setFontColor = function( color ) {
	this._font_color=color;
	  var i;
	  for( i in this._childs ) {
	    this._childs[i].setFontColor(color);
	  }
}




/**
 * Returns the component's font color
 *
 * @author Jose Maria Gomez Hernandez
 * @update 07/06/2012
 *
 * @method getFontColor
 * @return {colorCSS} Current component's font color
 */
SuperComponent.prototype.getFontColor = function() {return this._font_color;}



/**
 *  Modifies the supercomponent and his childs font family
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 02/08/2012
 *
 * @method setFontFamily
 * @param {font-familyCSS}  family that will be assigned to the component
 */
SuperComponent.prototype.setFontFamily = function( family ) {
	this._font_family=family;
	  var i;
	  for( i in this._childs ) {
	    this._childs[i].setFontFamily(family );
	  }
}




/**
 * Returns the supercomponent's font family
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 01/08/2012
 *
 * @method getFontFamily
 * @return {font-familyCSS} Current supercomponent's font family
 */
SuperComponent.prototype.getFontFamily = function() {return this._font_family;}



/**
 * Modifies the component's font style
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 05/08/2012
 *
 * @method setFontS
 * @param {font-styleCSS}  font style that will be assigned to the component
 */
SuperComponent.prototype.setFontStyle = function( font_style ) {
	this._font_style=font_style;
	  var i;
	  for( i in this._childs ) {
	    this._childs[i].setFontStyle(font_style);
	  }

}




/**
 * Returns the component's font style
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 05/08/2012
 *
 * @method getFontStyle
 * @return {font-styleCSS} Current component's font style
 */
SuperComponent.prototype.getFontStyle = function() {
	return this._font_style;
	}



/**
 * Modifies the component's font weight
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 08/08/2012
 *
 * @method setFontWeight
 * @param {font-weight CSS}  font weight  that will be assigned to the component
 */
SuperComponent.prototype.setFontWeight  = function( font_weight  ) {
	this._font_weight =font_weight ;
	  var i;
	  for( i in this._childs ) {
	    this._childs[i].setFontWeight (font_weight );
	  }

}




/**
 * Returns the component's font weight
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 08/08/2012
 *
 * @method getFontWeight
 * @return {font-weightCSS} Current component's font weight
 */
SuperComponent.prototype.getFontWeight  = function() {
	return this._font_weight ;
	}










/**
 * Text class constructor.
 * Creates a 'item' that controls a text's field not editable
 *
 * @author Martín Vega-leal Ordóñez / Alejandro Arrabal Hidalgo
 * @update 1/11/2010	/08/08/2012
 *
 * @class Text
 * @extends Component
 * @param {colorCSS} text_color color of the component's text
 * @param {font-familyCSS} text_family text family of the component's text
 * @param {font-sizeCSS} font_size size of the component's font
 * @param {font-styleCSS} font_style style of the component's font
 * @param {font-weightCSS} font_weight weight of the component's font
 * @param {String} text that will be set
 */
var Text = function( params ) {
  params = params || {};
  Text.baseConstructor.call( this, params );

  this.setFontColor(params.text_color || '#000000');
  this.setFontSize(params.font_size || '12');
  this._font_width=this.getFontSize()/1.5;
  this._line_height=parseInt(this.getFontSize())+1;
  this.setFontFamily(params.text_family || 'monospace');
  this.setFontStyle(params.font_style || 'normal');
  this.setFontWeight(params.font_weight || 'normal');
  this.setText( params.text || '' );
}
JSFun.extend( Text, Component );



/**
 * Modifies the  value of the object
 *
 * @author Martín Vega-leal Ordóñez
 * @update 4/11/2010
 *
 * @method setValue
 * @param {String} value Text that will be assigned to the object
 */
Text.prototype.setValue = function( value ) {
  this.setText( value );
}



/**
 * Returns the value of the object
 *
 * @author Martín Vega-leal Ordóñez
 * @update 4/11/2010
 *
 * @method getValue
 * @return {String} Text that contains the object
 */
Text.prototype.getValue = function() {
  return this._text;
}



/**
 * Modifica el texto almacenado en el objeto
 *
 * @author Martín Vega-leal Ordóñez / Rafael Molina Linares / Alejandro Arrabal Hidalgo
 * @update 4/11/2010 / 11/2011 / 02/08/2012
 *
 * @method setText
 * @param {String} newText New text that will contained the object
 */
Text.prototype.setText = function( newText ) {
  if( JSFun.isString( newText ) ) {

    this._text = newText;

    if( newText == "" ) {
      if(this._orientation)//vertical orientation
        this.setHeight( 50 );
      else
        this.setWidth( 50 );
    } else {
      if(this._orientation)//vertical orientation
        this.setHeight( this._text.length * this._font_width );
      else
        this.setWidth( this._text.length * this._font_width );
    }

    if(this._orientation)//vertical orientation
      this.setWidth( this._line_height );
    else
      this.setHeight( this._line_height );
  }
}



/**
 * Draws the text in the canvas element
 *
 * @author Martín Vega-leal Ordóñez / Rafael Molina Linares / Alejandro Arrabal Hidalgo
 * @update 4/11/2010 / 9/11/2011 / 27/08/2012
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Context of the canvas element
 */
Text.prototype.draw = function( context ) {
	if(!this._visible)
		return;

  context.save();
  context.font =this.getFontStyle() + " " + this.getFontWeight() + " "+ this.getFontSize() + "px " + this.getFontFamily();
  context.textBaseline = "middle";
  context.fillStyle = this.getFontColor();

  if(this._orientation){
    context.translate(this._getMX() + this._line_height / 2, this._getMY() );
    context.rotate((-90 * Math.PI)/180 );
    context.fillText( this._text, this._margin*2 - this.getHeight(), 0 );
  } else {
   if(this._text)context.fillText( this._text, this._getMX(),
                    this._getMY() + this._line_height / 2 );
  }


  context.restore();
}




/**
 * Modifies the component's font size and fit the line height
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 01/08/2012
 *
 * @method setFontSize
 * @param {font-sizeCSS}  font size that will be assigned to the component
 */
Text.prototype.setFontSize = function( font_size ) {
	this._font_size=font_size;
	this.resize();

}




/**
 * Returns the component's font size
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 01/08/2012
 *
 * @method getFontSize
 * @return {font-sizeCSS} Current component's font size
 */
Text.prototype.getFontSize = function() {return this._font_size;}



/**
 * Modifies the component's font color
 *
 * @author Jose Maria Gomez Hernandez
 * @update 03/04/2012
 *
 * @method setFontColor
 * @param {colorCSS}  color that will be assigned to the component
 */
Text.prototype.setFontColor = function( color ) {
	this._font_color=color;
}




/**
 * Returns the component's font color
 *
 * @author Jose Maria Gomez Hernandez
 * @update 07/06/2012
 *
 * @method getFontColor
 * @return {colorCSS} Current component's font color
 */
Text.prototype.getFontColor = function() {return this._font_color;}



/**
 * Modifies the component's font family
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 01/08/2012
 *
 * @method setFontFamily
 * @param {font-familyCSS}  font family that will be assigned to the component
 */
Text.prototype.setFontFamily = function( font_family ) {
	this._font_family=font_family;
}




/**
 * Returns the component's font family
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 01/08/2012
 *
 * @method getFontFamily
 * @return {font-familyCSS} Current component's font family
 */
Text.prototype.getFontFamily = function() {return this._font_family;}



/**
 * Re-size the component depending on his text and font-size
 *
 * @author  Alejandro Arrabal Hidalgo
 * @update 03/08/2012
 *
 * @method resize
 */
Text.prototype.resize = function( ) {
	this._line_height=parseInt(this.getFontSize(),10)+1;
	this._font_width=this.getFontSize()/1.5;
	var text = this.getValue() || "";

    if(  text == "" ) {
      if(this._orientation)//vertical orientation
        this.setHeight( 50 );
      else
        this.setWidth( 50 );
    } else {
      if(this._orientation)//vertical orientation
        this.setHeight( text.length * this._font_width );
      else
        this.setWidth( text.length * this._font_width );
    }

    if(this._orientation)//vertical orientation
      this.setWidth( this._line_height );
    else
      this.setHeight( this._line_height );
}




/**
 * Modifies the component's font style
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 05/08/2012
 *
 * @method setFontS
 * @param {font-styleCSS}  font style that will be assigned to the component
 */
Text.prototype.setFontStyle = function( font_style ) {
	this._font_style=font_style;
}




/**
 * Returns the component's font style
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 05/08/2012
 *
 * @method getFontStyle
 * @return {font-styleCSS} Current component's font style
 */
Text.prototype.getFontStyle = function() {
	return this._font_style;
	}




/**
 * Modifies the component's font weight
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 08/08/2012
 *
 * @method setFontWeight
 * @param {font-weightCSS}  font weight that will be assigned to the component
 */
Text.prototype.setFontWeight = function( font_weight ) {
	this._font_weight=font_weight;
}




/**
 * Returns the component's font weight
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 08/08/2012
 *
 * @method getFontWeight
 * @return {font-weightCSS} Current component's font weight
 */
Text.prototype.getFontWeight = function() {
	return this._font_weight;
	}



/**
 * Gets a XML node with the information of the component
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 30/08/2012
 *
 * @method getComponentXML
 * @param {DOMNode} parent Parent  node of the xml tree that will be generated
 * @return {DOMNode Node with the information of the component
 */
Text.prototype.getComponentXML = function( parent ) {
  var xmlcomp = parent.createElement( 'item' );

  if( this._id ) {
    xmlcomp.setAttribute( 'id', this._id );
  }

  if(this.getFontColor()!='#000000')xmlcomp.setAttribute( 'fontColor', this.getFontColor() );
  if(this.getFontSize()!='12') xmlcomp.setAttribute( 'fontSize', this.getFontSize() );
  if(this.getFontStyle()!='normal')xmlcomp.setAttribute( 'fontStyle', this.getFontStyle() );
  if(this.getFontFamily()!='monospace')xmlcomp.setAttribute( 'fontFamily', this.getFontFamily() );
  if(this.getFontWeight()!='normal')xmlcomp.setAttribute( 'fontWeight', this.getFontWeight() );
  xmlcomp.setAttribute( 'value', this.getValue() );
  return xmlcomp;
}

/**
 * Constructor de la clase TextBox
 * Un elemento TextBox, es un elemento que almacena una linea de texto
 * editable por el usuario mediante la interfaz gráfica
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @class TextBox
 * @extends Text
 */
var TextBox = function( params ) {

  params = params || {};
  TextBox.baseConstructor.call( this, params );

  this.selected = params.selected || false;
  this.deletable = false;

  if(params.width)
    this._width = params.width;
}
JSFun.extend( TextBox, Text );



/**
 * Permite que un super-componente que contiene el campo de texto lo elimine
 * de su interior
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method setDeleatable
 */
TextBox.prototype.setDeletable = function() {
  this.deletable = true;
}



/**
 * Comprueba que se ha pulsado sobre el componente y lanza las operaciones
 * pertinentes a la pulsación en caso de producirse
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method select
 * @param {Number} x Coordenada en el eje x de la pulsación
 * @param {Number} y Coordenada en el eje y de la pulsación
 * @return {Boolean} Si el punto está sobre el componente o no.
 */
TextBox.prototype.select = function( x, y ) {
  if( !this.selected && this.isOver( x, y ) ) {

    this.showDialog( x, y );
    return true;
  } else {
    return false;
  }
}



/**
 * Cierra la ventana de interaccion, en caso de encontrarse abierta y
 * paraliza la interacción con el componente por parte del usuario
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method deselect
 */
TextBox.prototype.deselect = function() {
  if( this.active ) {
    this.closeDialog();
    this.active = false;
  }
}



/**
 * Muestra un dialogo para modificar el texto del componente por
 * parte del usuario
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method showDialog
 * @protected
 */
TextBox.prototype.showDialog = function() {
  if( this.active ) {
    return;
  }

  var that = this;
  this.active = true;

  var div = document.createElement("div");
  var form = document.createElement("form");
  var textField = document.createElement("input");

  var ok = document.createElement("input");


  div.className = "ud_popup";

  textField.setAttribute( "type", "text" );
  textField.setAttribute( "value", this.decode( this.getValue() ) );

  ok.setAttribute( "type" , "submit" );
  ok.setAttribute( "value", "ok" );



  this.changeText = function ( event ) {
    if( that.active ) {
      that.setText( that.encode( textField.value ) );
      document.body.removeChild( div );
      that.active = false;
      that.notifyChange();
    }
  }



  this.closeDialog = function ( event ) {
    if( that.active ) {
      document.body.removeChild( div );
      that.active = false;
      that.notifyChange();
    }
  }

  form.onsubmit = function() { return false; }

  ok.addEventListener("click", this.changeText, false);

  form.appendChild( textField );
  form.appendChild( ok );

  if( this.deletable ) {
    var no = document.createElement("input");
    no.setAttribute( "type", "submit" );
    no.setAttribute( "value", "delete" );

    this.deleteDialog = function ( event ) {
      if( that.active ) {
        document.body.removeChild( div );
        that.active = false;
        that.notifyDelete();
        that.notifyChange();
      }
    }

    no.addEventListener("click", this.deleteDialog, false);
    form.appendChild( no );
  }

  div.appendChild( form );
  document.body.appendChild( div );

  textField.focus();

  div.style.top = (window.innerHeight - form.offsetHeight ) / 2 + "px";
  div.style.left = (window.innerWidth - form.offsetWidth) / 2 + "px";

}



/**
 * Dibuja la línea de contorno del componente
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method drawShape
 * @param {CanvasRenderingContext2D} context Contexto del elemento canvas
 */
TextBox.prototype.drawShape = function( context ) {
	if(!this._visible)
		return;

  context.save();
  context.strokeStyle = "#aaaaaa";
  context.strokeRect( this.getPixelX(), this.getPixelY(), this.getWidth(), this.getHeight() );
  context.restore();
}



/**
 * Dibuja el texto de componente y su fondo si se produce interacción con el mismo
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Contexto del elemento canvas
 */
TextBox.prototype.draw = function( context ) {
	if(!this._visible)
		return;

  context.save();

  if( this.active ) {
    context.fillStyle = "#ffc485";
    context.fillRect( this.getPixelX(),
                      this.getPixelY(),
                      this.getWidth(),
                      this.getHeight() );
  }

  context.restore();

  TextBox.base.draw.call( this, context );
}



/**
 * Codifica el texto del componente según se defina, para este componente concreto
 * no realiza ninguna acción sobre el valor del componente
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method encode
 * @protected
 * @return {String} Linea de texto del componente
 */
TextBox.prototype.encode = function( value ) {
  return value;
}



/**
 * Separa una cadena que contiene un texto en sus diferentes elementos
 * separados para mostrarlos en un dialogo al usuario, se devuelven
 * en un Array
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method decode
 * @protected
 * @param {String} Valor que se va decodificar según la lógica del componente
 * @return {Array} Elementos que componen el componente separados
 */
TextBox.prototype.decode = function( value ) {
  return value;
}



/**
 * Representa un conjunto de campos de texto editables por el usuario
 * y que tienen la propiedad de plegarse y ocultarse por el usuario
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @class CollapsibleFields
 * @extends SuperComponent
 * @param {Boolean} visible Determina si el elementos será visible o no por defecto
 */
var CollapsibleFields = function( params ) {
  params = params || {};
  CollapsibleFields.baseConstructor.call( this, params );

  this.setMinHeight( 10 );

  if( params.visibleSubComponents == false ) {
    this.changeVisibility();
  }

}
JSFun.extend( CollapsibleFields, SuperComponent );



/**
 * Añade un campo de texto al componente con el valor pasado
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method setValue
 * @param {String} value Valor del nuevo campo de texto
 */
/*
CollapsibleFields.prototype.setValue = function( value ) {
  this.addField( value );
}*/



/**
 * Permite añadir un campo de texto al componente con el valor pasado
 * como parámetro
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method addField
 * @param {String} value Valor del nuevo campo de texto
 */
CollapsibleFields.prototype.addField = function( value ) {
    var nt = this.newItem();
    nt.setDeletable();

    if( value ) {
      nt.setValue( value );
    }

    this.addSubComponent( nt );
    this.notifyChange();

}



/**
 * Define el tipo de elemento que contendrá el super-componente
 * en este caso será un objeto de tipo TextBox
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method newItem
 * @return {TextBox} Nuevo objeto del componente
 */
CollapsibleFields.prototype.newItem = function() {
  return new TextBox();
}



/**
 * Comprueba si el punto está sobre uno de los elementos de interacción
 * con el componente y en caso afirmativo, realizará las acciones pertinentes
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method select
 * @param {Number} x Coordenada X del punto de pulsación
 * @param {Number} y Coordenada Y del punto de pulsación
 * @return {Boolean} Si el punto está sobre alguno de los elementos
 */
CollapsibleFields.prototype.select = function( x, y ) {
  if( Math.abs( x - ( this._getX() + 5) ) <= 6
      && Math.abs( y - ( this._getY() + 5 ) ) <= 6 )
  {
    this.changeVisibility();
    this.notifyChange();
    return true;

  }else if( this.visibilitySubComponents() &&
      Math.abs( x - ( this._getX() + this.getSuperWidth() - 5) ) <= 6
      && Math.abs( y - ( this._getY() + 5 ) ) <= 6 )
  {
    this.addField();
    return true;
  }

  return CollapsibleFields.base.select.call( this, x, y );
}



/**
 * Dibuja el contorno y los elementos interactuables del componente
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method drawShape
 * @param {CanvasRenderingContext2D} context Contexto del elemento canvas
 */
CollapsibleFields.prototype.drawShape = function( context ) {

	if(!this._visible)
		return;

  CollapsibleFields.base.drawShape.call( this, context );


  var x = this.getPixelX();
  var y = this.getPixelY();

  context.save();
  context.fillStyle = '#ff0000';
  context.beginPath();

  if( this.visibilitySubComponents() ) {
    context.moveTo( x , y + 5 );
    context.lineTo( x + 10, y + 5 );
    context.lineTo( x + 5, y );
    context.closePath();
    context.fill();

    context.fillStyle = '#94dc91';
    context.beginPath();
    context.arc( this.getPixelX() + this.getSuperWidth() - 5 , this.getPixelY() + 5, 4, 0, Math.PI*2, true );
    context.closePath();
    context.fill();

    context.restore();

  } else {
    context.moveTo( x + 5 , y );
    context.lineTo( x + 5, y + 10 );
    context.lineTo( x + 10, y + 5 );
    context.closePath();
    context.fill();
    context.restore();
  }


}



/**
 * Dibuja el objeto en el elemento canvas
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Contexto del elemento canvas
 */
CollapsibleFields.prototype.draw = function( context ) {

	if(!this._visible)
		return;

  if( this.visibilitySubComponents() ) {
    context.save();

    context.beginPath();
    context.moveTo( this.getPixelX(), this.getPixelY() );
    context.lineTo( this.getPixelX() + this.getSuperWidth(), this.getPixelY() );

    context.stroke();
    context.restore();
  }

  CollapsibleFields.base.draw.call( this, context );

}







/**
 * Constructor de la clase AttributeItem
 * Crea un 'item' que controla un texto de tipo atributo de clase
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @class AttributeItem
 * @extends TextBox
 */
var AttributeItem = function( params ) {

  params = params || {};
  AttributeItem.baseConstructor.call( this, params );

  var expression = '^(?:\xAB([^\xAB\xBB:={}]+)\xBB)?'  //stereotype
                   + '([#|+|\-|~])?'                  //visibility
                   + '([\/])?'                        //derived
                   + '([^\xAB\xBB:={}]+)?'            //name
                   + '(?::([^\xAB\xBB:={}]+))?'       //type
                   + '(?:=([^\xAB\xBB:={}]+)?)?'      //default
                   + '(?:{([^\xAB\xBB:={}]+)})?$';     //restrictions


  this._parse = new RegExp( expression );

  this.setMinWidth( 40 );

}
JSFun.extend( AttributeItem, TextBox );



/**
 * Codifica el atributo resultante a partir de sus elementos separados
 * y devuelve el atributo compuesto
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method encode
 * @protected
 * @param {Array} values Elementos que componen el atributo
 * @return {String} Atributo que contiene
 */
AttributeItem.prototype.encode = function( values ) {

  var string = '';

  if( values[0] ) {
    string += '\xAB' + values[0] + '\xBB';
  }
  if( values[1] ) {
    string += values[1];
  }
  if( values[2] ) {
    string += values[2];
  }
  if( values[3] ) {
    string += values[3];
  }
  if( values[4] ) {
    string += ':' + values[4];
  }
  if( values[5] ) {
    string += '=' + values[5];
  }
  if( values[6] ) {
    string += '{' + values[6] + '}';
  }

  if( this._parse.exec( string ) ) {
    return string;
  } else {
    return 'wrong_attribute';
  }
}



/**
 * Separa una cadena que contiene el un atributo en sus diferentes partes
 * en función de la expresión regular que lo controla y devuelve las
 * partes en un array
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method decode
 * @param {String} attr Atributo completo en cadena de texto
 * @param {Array} Elementos que componen el atributo separados
 */
AttributeItem.prototype.decode = function( attr ) {

  var result = this._parse.exec( attr );

  if( result ) {
    result.shift();
    return result;
  } else {
    return [];
  }

}



/**
 * Muestra un dialogo para modificar los elementos del atributo por
 * parte del usuario
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method showDialog
 */
AttributeItem.prototype.showDialog = function() {
  if( this.active ) {
    return;
  }

  var that = this;
  this.active = true;

  var div = document.createElement("div");
  var form = document.createElement("form");
  var fields = [];


  /* Create form */
  var i;
  for( i = 0; i < 7; i++ ){
    fields.push( document.createElement("input") );
  }

  var sel;
  fields[1] = document.createElement('select');

  sel = document.createElement('option');
  sel.setAttribute( 'value', '' );
  sel.appendChild( document.createTextNode('(none)') );
  fields[1].appendChild( sel );

  sel = document.createElement('option');
  sel.setAttribute( 'value', '+' );
  sel.appendChild( document.createTextNode('+ (public)') );
  fields[1].appendChild( sel );

  sel = document.createElement('option');
  sel.setAttribute( 'value', '-' );
  sel.appendChild( document.createTextNode('- (private)') );
  fields[1].appendChild( sel );

  sel = document.createElement('option');
  sel.setAttribute( 'value', '#' );
  sel.appendChild( document.createTextNode('# (protected)') );
  fields[1].appendChild( sel );

  sel = document.createElement('option');
  sel.setAttribute( 'value', '~' );
  sel.appendChild( document.createTextNode('~ (package)') );
  fields[1].appendChild( sel );

  fields[2] = document.createElement('select');
  sel = document.createElement('option');
  sel.setAttribute( 'value', '' );
  sel.appendChild( document.createTextNode('no') );
  fields[2].appendChild( sel );
  sel = document.createElement('option');
  sel.setAttribute( 'value', '/' );
  sel.appendChild( document.createTextNode('yes') );
  fields[2].appendChild( sel );


  var ok = document.createElement("input");

  div.className = "ud_popup";


  var values = this.decode( this.getValue() );

  for( i = 0; i < fields.length; i++ ) {
    fields[i].setAttribute( 'type', 'text' );
    fields[i].setAttribute( 'value', values[i] || '' );
  }


  if( values[1] ) {
    var childs = fields[1].childNodes;
    for( i in childs ) {
      if( childs[i].value == values[1] ) {
        childs[i].setAttribute( 'selected', 'selected' );
      }
    }
  }
  if( values[2] ) {
    var childs = fields[2].childNodes;
    for( i in childs ) {
      if( childs[i].value == values[2] ) {
        childs[i].setAttribute( 'selected', 'selected' );
      }
    }
  }


  ok.setAttribute( "type" , "submit" );
  ok.setAttribute( "value", "ok" );



  this.changeText = function ( event ) {
    if( that.active ) {

      var values = [];

      var i;
      for( i = 0; i < fields.length; i++) {
        values.push( fields[i].value );
      }

      that.setText(  that.encode( values ) );

      document.body.removeChild( div );
      that.active = false;
      that.notifyChange();
    }
  }




  this.closeDialog = function ( event ) {
    if( that.active ) {
      document.body.removeChild( div );
      that.active = false;
      that.notifyChange();
    }
  }

  form.onsubmit = function() { return false; }

  ok.addEventListener("click", this.changeText, false);


  var labels = [ 'stereotype', 'visibility', 'derived', 'name', 'type', 'default', 'restrictions' ];

  var label;
  var divaux;

  for( i = 0; i < fields.length; i++ ) {
    divaux = document.createElement( 'div' );
    label = document.createElement( 'label' );
    label.appendChild( document.createTextNode( labels[i] ) );

    divaux.appendChild( label );
    divaux.appendChild( fields[i] );

    form.appendChild( divaux );
  }


  form.appendChild( ok );

  if( this.deletable ) {
    var no = document.createElement("input");
    no.setAttribute( "type", "submit" );
    no.setAttribute( "value", "delete" );

    this.deleteDialog = function ( event ) {
      if( that.active ) {
        document.body.removeChild( div );
        that.active = false;
        that.notifyDelete();
        that.notifyChange();
      }
    }

    no.addEventListener("click", this.deleteDialog, false);
    form.appendChild( no );
  }

  div.appendChild( form );
  document.body.appendChild( div );


  div.style.top = (window.innerHeight - form.offsetHeight ) / 2 + "px";
  div.style.left = (window.innerWidth - form.offsetWidth) / 2 + "px";


}



/**
 * Comprueba si se ha pulsado sobre una parte del atributo y ejectua
 * las acciones pertienentes
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method select
 * @param {Number} x Coordenada x de la pulsación
 * @param {Number} y Coordenada y de la pulsación
 * @return {Boolean} Si el punto está sobre el atributo o alguno de sus elementos
 */
AttributeItem.prototype.select = function( x, y ) {
  if( Math.abs( x - ( this.getPixelX() + this.getSuperWidth() - 20) ) <= 5
      && Math.abs( y - ( this.getPixelY() + 8.66 ) ) <= 5 )
  {
    this.notifyToUp();
    this.notifyChange();
    return true;
  } else if ( Math.abs( x - ( this.getPixelX() + this.getSuperWidth() - 30) ) <= 5
      && Math.abs( y - ( this.getPixelY() + 7.33 ) ) <= 5 )
  {
    this.notifyToDown();
    this.notifyChange();
    return true;

  }

  return AttributeItem.base.select.call( this, x, y );

}



/**
 * Dibuja la silueta del atributo, concretamente los botones para desplazar
 * los atributos verticalmente
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method drawShape
 * @param {CanvasRenderingContext2D} context Contexto del elemento canvas
 */
AttributeItem.prototype.drawShape = function( context ) {

	if(!this._visible)
	return;

  var x = this.getPixelX() + this.getSuperWidth() - 35;
  var y = this.getPixelY() + 3;

  context.save();

  context.fillStyle = "#0000aa";

  context.beginPath();
  context.moveTo( x, y );
  context.lineTo( x + 10, y );
  context.lineTo( x + 5, y + 7 );
  context.closePath();
  context.fill();


  x = x + 10;
  context.beginPath();
  context.moveTo( x + 5, y );
  context.lineTo( x, y + 7 );
  context.lineTo( x + 10, y + 7 );
  context.closePath();
  context.fill();


  context.restore();
}



/**
 * Constructor de la clase AttributeFields
 * Representa un conjunto de campos de atributos con las restricciones
 * que requiere, para un elemento de UML 2
 *
 * @author Martín Vega-leal Ordóñez
 * @update 4/11/2010
 *
 * @class AttributeFields
 * @extends CollapsibleFields
 */
var AttributeFields = function( params ) {
  params = params || {};
  AttributeFields.baseConstructor.call( this, params );

  this._default = params.text || 'new_attribute';
}
JSFun.extend( AttributeFields, CollapsibleFields );



/**
 * Define el tipo de elemento que contendrá el super-componente
 * en este caso será un objeto de tipo AttributeItem
 *
 * @author Martín Vega-leal Ordóñez
 * @update 4/11/2010
 *
 * @method newItem
 * @return {AttributeItem} Nuevo objeto del componente
 */
AttributeFields.prototype.newItem = function() {
  return new AttributeItem({ text: this._default });
}










/**
 * Constructor de la clase CircleSymbol
 * Representa una circunferencia de forma gráfica, es el símbolo
 * que define una clase de interfaz en UML 2
 *
 * @author Martín Vega-leal Ordóñez
 * @update 04/11/2010
 *
 * @class CircleSymbol
 * @extends Component
 */
var CircleSymbol = function( params ) {
  params = params || {};
  CircleSymbol.baseConstructor.call( this, params );

  this.setWidth( 15 );
  this.setHeight( 15 );
}

JSFun.extend( CircleSymbol, Component );



/**
 * Dibuja una circunferencia en el elemento canvas
 *
 * @author Martín Vega-leal Ordóñez
 * @update 4/11/2010
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Contexto del elemento canvas
 */
CircleSymbol.prototype.draw = function( context ) {

	if(!this._visible)
		return;

  context.save();
  context.strokeStyle = ComponentStyle.component_color;

  context.beginPath();
  context.arc(  this.getPixelX() + this._getMargin() + 7,
                this.getPixelY() + this._getMargin() + 7, 7, 0, Math.PI*2, true);
  context.stroke();

  context.restore();
}







/**
 * Constructor de la clase ComponentSymbol
 * Clase que dibuja la figura de un componente en UML
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @class ComponentSymbol
 * @extends Component
 */
var ComponentSymbol = function( params ) {
  params = params || {};
  ComponentSymbol.baseConstructor.call( this, params );

  this.setWidth( 15 );
  this.setHeight( 15 );
}
JSFun.extend( ComponentSymbol, Component );



/**
 * Dibuja la figura de um componente de UML 2 en el elemento canvas
 *
 * @author Martín Vega-leal Ordóñez
 * @update 4/11/2010
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Contexto del elemento canvas
 */
ComponentSymbol.prototype.draw = function( context ) {

	if(!this._visible)
		return;

  var x = this.getPixelX() + this._getMargin();
  var y = this.getPixelY() + this._getMargin();

  context.save();
  context.strokeStyle = ComponentStyle.component_color;

  context.strokeRect( x + 1, y + 2, 8, 4 );
  context.strokeRect( x + 1, y + 9, 8, 4 );
  context.beginPath();
  context.moveTo( x + 5, y + 2 );
  context.lineTo( x + 5, y );
  context.lineTo( x + 15, y );
  context.lineTo( x + 15, y + 15 );
  context.lineTo( x + 5, y + 15 );
  context.lineTo( x + 5, y + 13 );
  context.stroke();

  context.beginPath();
  context.moveTo( x + 5, y + 6 );
  context.lineTo( x + 5, y + 9 );
  context.stroke();

  context.restore();
}







/**
 * ConnectorItem class constructor, create 'item' that controls a text
 * of the connector element in the activity diagram
 *
 * @author Rafael Molina Linares
 * @update 19/8/2011
 *
 * @class ConnectorItem
 * @extends TextBox
 */
var ConnectorItem = function( params ) {

  params = params || {};
  ConnectorItem.baseConstructor.call( this, params );
}
JSFun.extend( ConnectorItem, TextBox );



/**
 * Modify the text stored in the object
 *
 * @author Rafael Molina Linares / Alejandro Arrabal Hidalgo
 * @update 19/8/2011 / 02/08/2012
 *
 * @method setText
 * @param {String} newText New text that will contained the object
 */

ConnectorItem.prototype.setText = function( newText ) {

  if( JSFun.isString( newText ) ) {

    this._text = newText;

		/*
			Sets the height/width of the component according
			to the width of the words of the text.
		*/
    if( newText == "" ) {

      if(this._orientation)
        this.setHeight( 14 );
      else //horizontal orientation
        this.setWidth( 14 );
    } else {

      if(this._orientation)
        this.setHeight( this._text.length * this._font_width );
      else //horizontal orientation
        this.setWidth( this._text.length * this._font_width );
    }

		/*
			Sets the height/width of the component according
			to the height of the words of the text.
		*/
    if(this._orientation)//vertical orientation
      this.setWidth(this._line_height );
    else
      this.setHeight( this._line_height );
  }
}



/**
 * Re-size the component depending on his text and font-size
 *
 * @author 	Alejandro Arrabal Hidalgo
 * @update 03/08/2012
 *
 * @method resize
 */
ConnectorItem.prototype.resize = function() {
	this._line_height=parseInt(this.getFontSize(),10)+1;
	this._font_width=this.getFontSize()/1.5;
	var aux=this.getValue();
	if(!aux)aux="";
		/*
			Sets the height/width of the component according
			to the width of the words of the text.
		*/
    if( aux == "" ) {

      if(this._orientation)
        this.setHeight( 14 );
      else //horizontal orientation
        this.setWidth( 14 );
    } else {

      if(this._orientation)
        this.setHeight( aux.length * this._font_width );
      else //horizontal orientation
        this.setWidth( aux.length * this._font_width );
    }

		/*
			Sets the height/width of the component according
			to the height of the words of the text.
		*/
    if(this._orientation)//vertical orientation
      this.setWidth(this._line_height );
    else
      this.setHeight( this._line_height );
}




/**
 * Gets the text stored in the object
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 05/09/2012
 *
 * @method getValue
 * @return {String} _text the text stored in the object
 */
ConnectorItem.prototype.getValue = function(){
	return this._text;
}






/**
 * DataStoreItem constructor class.
 * Creates a item of text to a datastore element of the activity diagram
 *
 * @author Rafael Molina Linares
 * @update 19/8/2011
 *
 * @class DataStoreItem
 * @extends TextBox
 */
var DataStoreItem = function( params ) {

  params = params || {};
  DataStoreItem.baseConstructor.call( this, params );

  this._parse = /^([a-zA-Z]*)(?:\[([^\[\]]*)\])?$/;
}
JSFun.extend( DataStoreItem, TextBox );



/**
 * Encodes the text of the operation resulting from its separate elements
 * and returns the encoded operation with the symbols corresponding
 *
 * @author Rafael Molina linares
 * @update 19/8/2011
 *
 * @method encode
 * @protected
 * @param {Array} values Elements that form the operation
 * @return {String} Operation resulting
 */
DataStoreItem.prototype.encode = function( values ) {

  var string = '';

  if( values[0] ) {
    string += values[0] ;
  }

  if( values[1] ) {
    string += '[' + values[1] + ']';
  }

  if( this._parse.exec( string ) ) {
    return string;
  } else {
    return 'wrong_operation';
  }
}



/**
 * Separates a chain that contains a operations in its differents
 * elements according to the regular expresion that controls it
 * and returns the separated parts in an array
 *
 * @author Rafael Molina Linares
 * @update 19/8/2011
 *
 * @method decode
 * @protected
 * @param {String} transition Operation in text's chain
 * @param {Array} Elements that form the 'transition' operation
 *
 */
DataStoreItem.prototype.decode = function( transition ) {

  var result = this._parse.exec( transition );

  if( result ) {
    result.shift();
    return result;
  } else {
    return [];
  }
}



/**
 * Shows a dialog to modify the elements of the operation
 * by the user
 *
 * @author Rafael Molina Linares
 * @update 19/8/2011
 *
 * @method showDialog
 */
DataStoreItem.prototype.showDialog = function() {

  if( this.active ) {
    return;
  }

  var that = this;

  this.active = true;

  var div = document.createElement("div");
  div.className = "ud_popup";

  var form = document.createElement("form");
  var fields = [];


  var i;
  for( i = 0; i < 2; i++ ){
    fields.push( document.createElement("input") );
  }

  var ok = document.createElement("input");
  ok.setAttribute( "type" , "submit" );
  ok.setAttribute( "value", "ok" );

  var values = this.decode( this.getValue() );

  for( i = 0; i < fields.length; i++ ) {
    fields[i].setAttribute( 'type', 'text' );
    fields[i].setAttribute( 'value', values[i] || '' );
  }

  this.changeText = function ( event ) {
    if( that.active ) {

      var values = [];

      var i;
      for( i = 0; i < fields.length; i++) {
        values.push( fields[i].value );
      }

      that.setText(  that.encode( values ) );

      document.body.removeChild( div );
      that.active = false;
      that.notifyChange();
    }
  }

  form.onsubmit = function() { return false; }

  ok.addEventListener("click", this.changeText, false);


  var labels = [ 'name', 'state'];

  var label;
  var divaux;

  for( i = 0; i < fields.length; i++ ) {
    divaux = document.createElement( 'div' );
    label = document.createElement( 'label' );
    label.appendChild( document.createTextNode( labels[i] ) );

    divaux.appendChild( label );
    divaux.appendChild( fields[i] );

    form.appendChild( divaux );
  }

  form.appendChild( ok );

  if( this.deletable ) {
    var no = document.createElement("input");
    no.setAttribute( "type", "submit" );
    no.setAttribute( "value", "delete" );

    this.deleteDialog = function ( event ) {
      if( that.active ) {
        document.body.removeChild( div );
        that.active = false;
        that.notifyDelete();
        that.notifyChange();
      }
    }

    no.addEventListener("click", this.deleteDialog, false);
    form.appendChild( no );
  }

  div.appendChild( form );

  document.body.appendChild( div );

  ok.focus();

  div.style.top = (window.innerHeight - form.offsetHeight ) / 2 + "px";
  div.style.left = (window.innerWidth - form.offsetWidth) / 2 + "px";
}

















var figureStyle = {
  border: '#294253'
}



/**
 * NodeFigure class constructor
 * Is the grafical representation of a node
 *
 * @author Martín Vega-leal Ordóñez / Molina Linares / Arrabal Hidalgo Alejandro
 * @update 29/11/2010 / 12/08/2011 / 30/07/2012
 *
 * @class NodeFigure
 * @param {String} color Object's color in your representation
 * @param {String} changeFigureColor If the figure's color can be modified (true) or not(false)
 * @param {String} changeFigureLineWidth If the figure's line width can be modified (true) or not(false)
 * @param {String} lineColor Object's color in your representation
 * @param {Number} lineWidth Object's line width in your representation
 */
var NodeFigure = function( params ) {
  params = params || {};
  this._changeFigureColor = (params.changeFigureColor == false) ? false : true;
  this._changeFigureLineWidth = (params.changeFigureLineWidth == false) ? false : true;
  if( params.color ) {
    this._color = params.color;
  } else {
    this._color = '#ffffff';
  }
  if( params.lineColor ) {
	  this._lineColor = params.lineColor;
  } else {
	  this._lineColor = '#294253';
  }
  if( params.lineWidth ) {
	  this._lineWidth = params.Width;
  } else {
	  this._lineWidth = 1;
  }
}


/**
 * Draw the element in the canvas with
 * the position and size given
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Context of the canvas element
 * @param {Number} x Coordinate x where the object is drawn
 * @param {Number} y Coordinate y where the object is drawn
 * @param {Number} width Width that will have the drawn object
 * @param {Number} height Height that will have the drawn object
 */
NodeFigure.prototype.draw = function( context, x, y, width, height ) {}



/**
 * Returns the object's color
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method draw
 * @protected
 * @return {String} Object's color with format of CSS2
 */
NodeFigure.prototype.getColor = function() {
  return this._color;
}


/**
 * Set the color of the object
 *
 * @author Rafael Molina Linares
 * @update 12/08/2011
 *
 * @method setColor
 * @protected
 * @params {String} color Object's color with the CSS2 format
 */
NodeFigure.prototype.setColor = function(color) {
  if(this._changeFigureColor && color)
		this._color = color;
}




/**
 * Set the line color of the object
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 30/07/2012
 *
 * @method setLineColor
 * @protected
 * @params {String} color Object's line color with the CSS2 format
 */
NodeFigure.prototype.setLineColor = function(color) {
  if(this._changeFigureColor && color)
		this._lineColor = color;
}




NodeFigure.prototype.getLineColor = function() {
  return this._lineColor;
}




/**
 * Set the line width of the object
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 30/07/2012
 *
 * @method setLineWidth
 * @protected
 * @params {Number} width Object's line width
 */
NodeFigure.prototype.setLineWidth = function(width) {
  if(this._changeFigureLineWidth && JSFun.isNumber(width))
		this._lineWidth = width;
}




NodeFigure.prototype.getLineWidth = function() {
  return this._lineWidth;
}




/**
 * StickmanFigure class constructor
 * Represents an object with form of stickman
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @class StickmanFigure
 * @extends NodeFigure
 */
var StickmanFigure = function() {}
JSFun.extend( StickmanFigure, NodeFigure );



/**
 * Draws a stickman in the canvas with
 * the position and size given
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Context of the canvas element
 * @param {Number} x Coordinate x where the object is drawn
 * @param {Number} y Coordinate y where the object is drawn
 * @param {Number} width Width that will have the drawn object
 * @param {Number} height Height that will have the drawn object
 */
StickmanFigure.prototype.draw = function( context, x, y, width, height ) {
  x = JSGraphic.toPixel( x );
  y = JSGraphic.toPixel( y );

  context.save();
  context.strokeStyle = '#000000';

  context.beginPath();
  context.arc( x + width / 2, y + width / 4, width / 4, 0, Math.PI*2, true );

  context.moveTo( x+width/2 , y+width/2 );
  context.lineTo( x+width/2 , y+width/2+height/3 );
  context.lineTo( x , y+height );

  context.moveTo( x+width/2, y+width/2+height/3 );
  context.lineTo( x+width, y+height );

  context.moveTo( x, y+height/2 );
  context.lineTo( x+width, y+height/2 );

  context.stroke();
  context.restore();
}



/**
 * EllipseFigure class constructor
 * Represents an objet with form of ellipse
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @class EllipseFigure
 * @extends NodeFigure
 */
var EllipseFigure = function( params ) {
  params = params || {};
  EllipseFigure.baseConstructor.call( this, params );
}
JSFun.extend( EllipseFigure, NodeFigure );



/**
 * Draws an ellipse in the canvas with /
 * the position and size given
 *
 * @author Martín Vega-leal Ordóñez / 	Alejandro Arrabal Hidalgo
 * @update 29/11/2010	/	30/07/2012
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Context of the canvas element
 * @param {Number} x Coordinate x where the object is drawn
 * @param {Number} y Coordinate y where the object is drawn
 * @param {Number} width Width that will have the drawn object
 * @param {Number} height Height that will have the drawn object
 */
EllipseFigure.prototype.draw = function( context, x, y, width, height ) {
  var sw = width / 2;
  var sh = height / 2;

  context.save();
  context.shadowOffsetX = 2;
  context.shadowOffsetY = 2;
  context.shadowBlur = 2;
  context.shadowColor = 'rgba(0, 0, 0, 0.5)';


  context.strokeStyle =  this.getLineColor();
  context.lineWidth = this.getLineWidth();
  JSGraphic.ellipse( context, x + sw, y + sh, sw, sh );
  context.stroke();
  context.restore();

  context.save();
  context.fillStyle = this.getColor();
  JSGraphic.ellipse( context, x + sw, y  + sh, sw, sh );
  context.fill();
  context.restore();

}



/**
 * HalfFilledEllipseFigure class constructor
 * Represent an object with the ellipse form and a smaller ellipse inside
 *
 * @author Rafael Molina Linares
 * @update 29/05/2011
 *
 * @class HalfFilledEllipseFigure
 * @extends NodeFigure
 */
var HalfFilledEllipseFigure = function( params ) {
  params = params || {};
  HalfFilledEllipseFigure.baseConstructor.call( this, params );
}
JSFun.extend( HalfFilledEllipseFigure, EllipseFigure );



/**
 * Draw an ellipse in the canvas, and within this, a smaller ellipse fills
 * with the position and size given.
 *
 * @author Rafael Molina Linares / Alejandro Arrabal Hidalgo
 * @update 29/05/2011 /	30/07/2012
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Context of the canvas elemento
 * @param {Number} x left upper x coordenate where object is drawn
 * @param {Number} y left upper y coordenate where object is drawn
 * @param {Number} width width of the object
 * @param {Number} height height of  the object
 */
HalfFilledEllipseFigure.prototype.draw = function( context, x, y, width, height ) {
  var sw = width / 2;
  var sh = height / 2;

  context.save();
  context.shadowOffsetX = 2;
  context.shadowOffsetY = 2;
  context.shadowBlur = 2;
  context.shadowColor = 'rgba(0, 0, 0, 0.5)';

  context.save();
  context.fillStyle = this.getColor();
  JSGraphic.ellipse( context, x + sw, y  + sh, sw, sh );
  context.fill();
  context.restore();

  context.strokeStyle =  this.getLineColor();
  context.lineWidth = this.getLineWidth();
  JSGraphic.ellipse( context, x + sw, y + sh, sw, sh );
  context.stroke();
  context.restore();

  context.save();
  context.fillStyle = '#000000';
  JSGraphic.ellipse( context, x + sw, y  + sh, sw*0.5, sh*0.5 );
  context.fill();
  context.restore();
}



/**
 * CrossEllipseFigure class constructor
 * Represent an object with the ellipse form and a cross within this.
 *
 * @author Rafael Molina Linares
 * @update 29/05/2011
 *
 * @class CrossEllipseFigure
 * @extends NodeFigure
 */
var CrossEllipseFigure = function( params ) {
  params = params || {};
  CrossEllipseFigure.baseConstructor.call( this, params );

}
JSFun.extend( CrossEllipseFigure, EllipseFigure );



/**
 * Draw an ellipse in the canvas, and within this, a cross
 * with the position and size given.
 *
 * @author Rafael Molina Linares /	Alejandro Arrabal Hidalgo
 * @update 29/05/2011 / 30/07/2012
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Context of the canvas elemento
 * @param {Number} x left upper x coordenate where object is drawn
 * @param {Number} y left upper y coordenate where object is drawn
 * @param {Number} width width of the object
 * @param {Number} height height of  the object
 */
CrossEllipseFigure.prototype.draw = function( context, x, y, width, height ) {
  var sw = width / 2;
  var sh = height / 2;

  var punto = (Math.sqrt((width)*(width) + (height)*(height)) - (sw*2))/2;
  context.save();
  context.shadowOffsetX = 2;
  context.shadowOffsetY = 2;
  context.shadowBlur = 2;
  context.shadowColor = 'rgba(0, 0, 0, 0.5)';

  context.fillStyle = this.getColor();
  JSGraphic.ellipse( context, x + sw, y  + sh, sw, sh );
  context.fill();

  context.strokeStyle =  this.getLineColor();
  context.lineWidth = this.getLineWidth();
  JSGraphic.ellipse( context, x + sw, y + sh, sw, sh );

  context.moveTo(x+punto,y+punto);
  context.lineTo(x+width-punto,y+height-punto);
  context.moveTo(x+width-punto,y+punto);
  context.lineTo(x+punto,y+height-punto);

  context.stroke();
  context.restore();
}



/**
 * CrossEllipseFigure class constructor
 * Represent an object with the ellipse form and a cross within this.
 *
 * @author Rafael Molina Linares
 * @update 29/05/2011
 *
 * @class CrossFigure
 * @extends NodeFigure
 */
var CrossFigure = function( params ) {

  params = params || {};
  CrossFigure.baseConstructor.call( this, params );
}
JSFun.extend( CrossFigure, NodeFigure );



/**
 * Draw an ellipse in the canvas, and within this, a cross.
 *
 * @author Rafael Molina Linares / Alejandro Arrabal Hidalgo
 * @update 29/05/2011 / 30/07/2012
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Context of the canvas elemento
 * @param {Number} x left upper x coordinate where object is drawn
 * @param {Number} y left upper y coordinate where object is drawn
 * @param {Number} width width of the object
 * @param {Number} height height of  the object
 */
CrossFigure.prototype.draw = function( context, x, y, width, height ) {

  context.save();
  context.shadowOffsetX = 2;
  context.shadowOffsetY = 2;
  context.shadowBlur = 2;
  context.shadowColor = 'rgba(0, 0, 0, 0.5)';

  context.strokeStyle =  this.getLineColor();
  context.lineWidth = this.getLineWidth();

  context.beginPath();
  context.moveTo(x,y);
  context.lineTo(x+width,y+height);
  context.moveTo(x+width,y);
  context.lineTo(x,y+height);

  context.closePath();
  context.stroke();
  context.restore();
}



/**
 * RhombusFigure class constructor
 * Represents an object with rhombus form
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @class RhombusFigure
 * @extends NodeFigure
 */
var RhombusFigure = function(params) {
	params = params || {};
	RhombusFigure.baseConstructor.call( this, params );
}
JSFun.extend( RhombusFigure, NodeFigure );



/**
 * Draws a rhombus in the canvas with
 * the position and size give
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Context of the canvas element
 * @param {Number} x Coordinate x where the object is drawn
 * @param {Number} y Coordinate y where the object is drawn
 * @param {Number} width Width that will have the drawn object
 * @param {Number} height Height that will have the drawn object
 */
RhombusFigure.prototype.draw = function( context, x, y, width, height ) {
  context.save();
  context.fillStyle = '#ffffff';
  context.strokeStyle =  this.getLineColor();
  context.lineWidth = this.getLineWidth();
  JSGraphic.rhombus( context, x, y, width, height );
  context.fill();
  context.stroke();
  context.restore();
}



/**
 * RectangleFigure class constructor
 * Represents an object with rectangle form
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @class RectangleFigure
 * @extends NodeFigure
 */
var RectangleFigure = function( params ) {
  params = params || {};
  RectangleFigure.baseConstructor.call( this, params );
}
JSFun.extend( RectangleFigure, NodeFigure );



/**
 * Draws a rectangle in the canvas with
 * the position and size given
 *
 * @author Martín Vega-leal Ordóñez / Alejandro Arrabal Hidalgo
 * @update 29/11/2010 / 30/07/2012
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Context of the canvas element
 * @param {Number} x Coordinate x where the object is drawn
 * @param {Number} y Coordinate y where the object is drawn
 * @param {Number} width Width that will have the drawn object
 * @param {Number} height Height that will have the drawn object
 */
RectangleFigure.prototype.draw = function( context, x, y, width, height ) {

  var xp = JSGraphic.toPixel( x );
  var yp = JSGraphic.toPixel( y );

  context.save();
  context.shadowOffsetX = 2;
  context.shadowOffsetY = 2;
  context.shadowBlur = 2;
  context.shadowColor = 'rgba(0, 0, 0, 0.5)';

  context.fillStyle = this.getColor();
  context.fillRect( x , y, width, height );
  context.restore();

  context.strokeStyle =  this.getLineColor();
  context.lineWidth = this.getLineWidth();
  context.strokeRect( xp, yp, width, height );

}



/**
 * ExpansionNodeFigure class constructor
 * Represents an object with small rectangle form
 *
 * @author Rafael Molina Linares
 * @update 29/10/2011
 *
 * @class ExpansionNodeFigure
 * @extends NodeFigure
 */
var ExpansionNodeFigure = function( params ) {
  params = params || {};
  ExpansionNodeFigure.baseConstructor.call( this, params );
}
JSFun.extend( ExpansionNodeFigure, NodeFigure );



/**
 * Draws a small rectagle in the canvas with
 * the position and size given
 *
 * @author Rafael Molina Linares / Alejandro Arrabal Hidalgo
 * @update 29/10/2011 / 30/07/2012
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Context of the canvas element
 * @param {Number} x Coordinate x where the object is drawn
 * @param {Number} y Coordinate y where the object is drawn
 * @param {Number} width Width that will have the drawn object
 * @param {Number} height Height that will have the drawn object
 */
ExpansionNodeFigure.prototype.draw = function( context, x, y, width, height ) {

  var xp = JSGraphic.toPixel( x );
  var yp = JSGraphic.toPixel( y );

  context.save();

  context.shadowOffsetX = 2;
  context.shadowOffsetY = 2;
  context.shadowBlur = 2;
  context.shadowColor = 'rgba(0, 0, 0, 0.5)';

  context.fillStyle = this.getColor();
  context.fillRect( x , y, width, height );

  context.beginPath();

  if(width < height){

    context.moveTo(xp, JSGraphic.toPixel(y + height/4));
    context.lineTo(xp + width, yp + JSGraphic.toPixel(height/4));

    context.moveTo(xp, JSGraphic.toPixel(yp + 2* (height/4)));
    context.lineTo(xp + width, JSGraphic.toPixel(yp +  2 * (height/4)));

    context.moveTo(xp, JSGraphic.toPixel(yp + 3* (height/4)));
    context.lineTo(xp + width, JSGraphic.toPixel(yp + 3* (height/4)));
  } else {

    context.moveTo(JSGraphic.toPixel(x + width/4), yp );
    context.lineTo( xp + JSGraphic.toPixel(width/4), yp + height);

    context.moveTo( JSGraphic.toPixel(xp + 2* (width/4)), yp);
    context.lineTo( JSGraphic.toPixel(xp +  2 * (width/4)), yp + height);

    context.moveTo( JSGraphic.toPixel(xp + 3* (width/4)), yp);
    context.lineTo( JSGraphic.toPixel(xp + 3* (width/4)), yp + height);
  }

  context.closePath();
  context.stroke();

  context.restore();

  context.strokeStyle =  this.getLineColor();
  context.lineWidth = this.getLineWidth();
  context.strokeRect( xp, yp, width, height );
}



/**
 * RoundedRectangleFigure class Constructor
 * Represent an object with rounded rectangle form.
 *
 * @author Rafael Molina Linares
 * @update 29/05/2011
 *
 * @class RoundedRectangleFigure
 * @extends NodeFigure
 */
var RoundedRectangleFigure = function( params ) {

  params = params || {};
  RoundedRectangleFigure.baseConstructor.call( this, params );
}
JSFun.extend( RoundedRectangleFigure, NodeFigure );



/**
 * Draw a rounded rectangle in the canvas
 * with the position and size given
 *
 * @author Rafael Molina Linares / Alejandro Arrabal Hidalgo
 * @update 29/05/2011 / 30/07/2012
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Context of the canvas elemento
 * @param {Number} x left upper x coordenate where object is drawn
 * @param {Number} y left upper y coordenate where object is drawn
 * @param {Number} width width of the object
 * @param {Number} height height of  the object
 */
RoundedRectangleFigure.prototype.draw = function( context, x, y, width, height ) {

  var x = JSGraphic.toPixel( x );
  var y = JSGraphic.toPixel( y );
  var radius = 4;

  context.save();
  context.shadowOffsetX = 2;
  context.shadowOffsetY = 2;
  context.shadowBlur = 2;
  context.shadowColor = 'rgba(0, 0, 0, 0.5)';

  context.fillStyle = this.getColor();


  context.beginPath();
  context.moveTo(x+radius,y);
  context.lineTo(x+width-radius, y);
  context.quadraticCurveTo(x+width,y,x+width,y+radius);

  context.lineTo(x+width, y+height-radius);
  context.quadraticCurveTo(x+width,y+height,x+width-radius,y+height);

  context.lineTo(x+radius, y+height);
  context.quadraticCurveTo(x,y+height,x,y+height-radius);

  context.lineTo(x, y+radius);
  context.quadraticCurveTo(x,y,x+radius,y);
  context.closePath();

  context.fill();

  context.restore();

  context.save();

  context.strokeStyle =  this.getLineColor();
  context.lineWidth = this.getLineWidth();

  context.beginPath();
  context.moveTo(x+radius,y);
  context.lineTo(x+width-radius, y);
  context.quadraticCurveTo(x+width,y,x+width,y+radius);

  context.lineTo(x+width, y+height-radius);
  context.quadraticCurveTo(x+width,y+height,x+width-radius,y+height);

  context.lineTo(x+radius, y+height);
  context.quadraticCurveTo(x,y+height,x,y+height-radius);

  context.lineTo(x, y+radius);
  context.quadraticCurveTo(x,y,x+radius,y);

  context.stroke();

  context.restore();
}



/**
 * RegionFigure class Constructor
 * Represent an object with rounded rectangle form that
 * contains a tab and a vertical line.
 *
 * @class RegionFigure
 * @extends NodeFigure
 */
var RegionFigure = function( params ) {
  params = params || {};
  RegionFigure.baseConstructor.call( this, params );
}
JSFun.extend( RegionFigure, NodeFigure );



/**
 * Draw a rounded rectangle with a tab in the canvas
 * with the position and size given
 *
 * @author Rafael Molina Linares / Alejandro Arrabal Hidalgo
 * @update 29/05/2011 / 30/07/2012
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Context of the canvas elemento
 * @param {Number} x left upper x coordenate where object is drawn
 * @param {Number} y left upper y coordenate where object is drawn
 * @param {Number} width width of the object
 * @param {Number} height height of  the object
 */
RegionFigure.prototype.draw = function( context, x, y, width, height, heightSmallRectangle, widthSmallRectangle, Xmovement) {

  heightSmallRectangle = heightSmallRectangle || 15;
  widthSmallRectangle = widthSmallRectangle || 75;
  Xmovement = Xmovement || 15;

  var radius = 4;
  var x = JSGraphic.toPixel( x );
  var y = JSGraphic.toPixel( y );

  context.save();
  context.shadowOffsetX = 2;
  context.shadowOffsetY = 2;
  context.shadowBlur = 2;
  context.shadowColor = 'rgba(0, 0, 0, 0.5)';
  context.fillStyle = this.getColor();

  context.beginPath();
  context.fillRect( x + 15 , y , widthSmallRectangle, heightSmallRectangle );

  y+= heightSmallRectangle;
  height-= heightSmallRectangle;

  context.moveTo(x+radius,y);
  context.lineTo(x+width-radius, y);
  context.quadraticCurveTo(x+width,y,x+width,y+radius);

  context.lineTo(x+width, y+height-radius);
  context.quadraticCurveTo(x+width,y+height,x+width-radius,y+height);

  context.lineTo(x+radius, y+height);
  context.quadraticCurveTo(x,y+height,x,y+height-radius);

  context.lineTo(x, y+radius);
  context.quadraticCurveTo(x,y,x+radius,y);
  context.closePath();
  context.fill();
  context.restore();

  y-= heightSmallRectangle;
  height+= heightSmallRectangle;

  context.save();
  context.strokeStyle =  this.getLineColor();
  context.lineWidth = this.getLineWidth();

  context.beginPath();

  context.strokeRect( x + 15 , y , widthSmallRectangle, heightSmallRectangle );
  y+= heightSmallRectangle;
  height-= heightSmallRectangle;

  context.moveTo(x+radius,y);
  context.lineTo(x+width-radius, y);
  context.quadraticCurveTo(x+width,y,x+width,y+radius);

  context.lineTo(x+width, y+height-radius);
  context.quadraticCurveTo(x+width,y+height,x+width-radius,y+height);

  context.lineTo(x+radius, y+height);
  context.quadraticCurveTo(x,y+height,x,y+height-radius);

  context.lineTo(x, y+radius);
  context.quadraticCurveTo(x,y,x+radius,y);

  context.stroke();
  context.restore();
}



/**
 * PackageFigure class constructor
 * Represents an object with packect form of UML
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @class PackageFigure
 * @extends NodeFigure
 */
var PackageFigure = function( params ) {
  params = params || {};
  PackageFigure.baseConstructor.call( this, params );
}
JSFun.extend( PackageFigure, NodeFigure );



/**
 * Draw a rectangle with a tab in the canvas
 * with the position and size given
 *
 * @author Rafael Molina Linares / Alejandro Arrabal Hidalgo
 * @update 29/05/2011
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Context of the canvas elemento
 * @param {Number} x left upper x coordenate where object is drawn
 * @param {Number} y left upper y coordenate where object is drawn
 * @param {Number} width width of the object
 * @param {Number} height height of  the object
 */
PackageFigure.prototype.draw = function( context, x, y, width, height ) {
  context.save();
  context.shadowOffsetX = 2;
  context.shadowOffsetY = 2;
  context.shadowBlur = 2;
  context.shadowColor = 'rgba(0, 0, 0, 0.5)';
  context.fillStyle = this.getColor();
  context.fillRect( x , y , 60, 15 );
  context.fillRect( x , y + 15 , width, height - 15 );
  context.restore();

  context.strokeStyle =  this.getLineColor();
  context.lineWidth = this.getLineWidth();
  context.strokeRect( x + 0.5, y + 0.5, 60, 15 );
  context.strokeRect( x + 0.5, y + 15.5, width, height - 15 );
}



/**
 * NoteFigure class constructor
 * Represents an object with note form of UML
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @class NoteFigure
 * @extends NodeFigure
 */
var NoteFigure = function( params ) {
  params = params || {};
  NoteFigure.baseConstructor.call( this, params );
}
JSFun.extend( NoteFigure, NodeFigure );



/**
 * Draw a rectangle in the canvas
 * with the position and size given
 *
 * @author Rafael Molina Linares / Alejandro Arrabal Hidalgo
 * @update 29/05/2011 / 30/07/2012
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Context of the canvas elemento
 * @param {Number} x left upper x coordenate where object is drawn
 * @param {Number} y left upper y coordenate where object is drawn
 * @param {Number} width width of the object
 * @param {Number} height height of  the object
 */
NoteFigure.prototype.draw = function( context, x, y, width, height ) {
  x = JSGraphic.toPixel( x );
  y = JSGraphic.toPixel( y );

  context.save();
  context.shadowOffsetX = 2;
  context.shadowOffsetY = 2;
  context.shadowBlur = 2;
  context.shadowColor = 'rgba(0, 0, 0, 0.5)';
  context.fillStyle = this.getColor();


  context.beginPath();
  context.moveTo( x, y );
  context.lineTo( x + width - 15, y );
  context.lineTo( x + width, y + 15 );
  context.lineTo( x + width, y + height );
  context.lineTo( x, y + height );
  context.closePath();

  context.fill();
  context.restore();


  context.save();
  context.strokeStyle =  this.getLineColor();
  context.lineWidth = this.getLineWidth();
  context.stroke();

  context.beginPath();
  context.moveTo( x + width - 15, y );
  context.lineTo( x + width - 15, y + 15 );
  context.lineTo( x + width, y + 15 );
  context.stroke();

  context.restore();
}




/**
 * FromImageFigure class constructor
 * Draws an extern image on the canvas
 *
 * @author Martín Vega-leal Ordóñez / Rafael Molina Linares
 * @update 29/11/2010 / 20/10/2011
 *
 * @class FromImageFigure
 * @extends NodeFigure
 * @params {String} route Path of the image
 */
var FromImageFigure = function( params ) {
  params = params || {};
  NoteFigure.baseConstructor.call( this, params );

	if(params.route){
		this.route = params.route;
		this.load = true;
		this.image = new Image();
		this.image.setAttribute( 'src', this.route );
	}
	this._associatedStereotypes = [];
}
JSFun.extend( FromImageFigure, NodeFigure );



/**
 * Adds an object Stereotype as associated stereotype of the figure
 * to indicate that this object uses that figure to the graphic
 * representation of the elements UML that have among their
 * stereotypes label to the object
 *
 * @author Rafael Molina Linares
 * @update 20/10/2011
 *
 * @method addAssociatedStereotype
 * @param {Stereotype} stereotype Object Stereotype for which the image has been created
 */
FromImageFigure.prototype.addAssociatedStereotype = function( stereotype ){
	this._associatedStereotypes.push( stereotype );
}



/**
 * Deletes an object Stereotype as associated stereotype of the figure
 *
 * @author Rafael Molina Linares
 * @update 20/10/2011
 *
 * @method delAssociatedStereotype
 * @param {Stereotype} stereotype Object Stereotype for which the image has been created
 */
FromImageFigure.prototype.delAssociatedStereotype = function( stereotype ){

	for(var i=0;i<this._associatedStereotypes.length;i++){
		if(this._associatedStereotypes[i] == stereotype){
			this._associatedStereotypes.splice(i,1);
			break;
		}
	}
}



/**
 * Searchs the object Stereotype passed as parameter
 * between the stereotypes associated to this figure
 *
 * @author Rafael Molina Linares
 * @update 20/10/2011
 *
 * @method foundInAssociatedStereotypes
 * @param {Stereotype} stereotype Object Stereotype for which the image has been created
 */
FromImageFigure.prototype.foundInAssociatedStereotypes = function( stereotype ){
	for(var i=0;i<this._associatedStereotypes.length;i++)
		if(this._associatedStereotypes[i] == stereotype)
			return true;
	return false;
}



/**
 * Draws the image, if this is loaded
 *
 * @author Rafael Molina Linares
 * @update 20/10/2011
 *
 * @method foundInAssociatedStereotypes
 * @param {Stereotype} stereotype Object Stereotype for which the image has been created
 */
FromImageFigure.prototype.draw = function( context, x, y, width, height ) {

  if( this.load ) {

		/*
			Catch the call to the drawImage so that the call
			of this method with a image that has a invalid
			route don't produce a general failure of the system
		*/
		try{
	    context.drawImage( this.image, x, y, width, height );
		}
		catch(err){
		}
  }
}



/**
 * LifelineFigure class constructor
 * Represents an object with life line form of UML
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @class LifelineFigure
 * @extends NodeFigure
 */
var LifelineFigure = function( params ) {
  params = params || {};
  LifelineFigure.baseConstructor.call( this, params );
}
JSFun.extend( LifelineFigure, NodeFigure );



/**
 * Draw a rectangle with a vertical line in the canvas
 * with the position and size given
 *
 * @author Martín Vega-Leal Ordóñez / Rafael Molina Linares / Alejandro Arrabal Hidalgo
 * @update 29/11/2010 / 29/05/2011 / 30/07/2012
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Context of the canvas elemento
 * @param {Number} x left upper x coordenate where object is drawn
 * @param {Number} y left upper y coordenate where object is drawn
 * @param {Number} width width of the object
 * @param {Number} height height of  the object
 */
LifelineFigure.prototype.draw = function( context, x, y, width, height, heightSmallRectangle) {

  heightSmallRectangle = heightSmallRectangle || 25;
  var xline = JSGraphic.toPixel( x + width / 2 );

  context.save();
  context.shadowOffsetX = 2;
  context.shadowOffsetY = 2;
  context.shadowBlur = 2;
  context.shadowColor = 'rgba(0, 0, 0, 0.5)';
  context.fillStyle = this.getColor();
  context.fillRect( x , y , width, heightSmallRectangle );
  context.restore();

  context.save();
  context.strokeStyle =  this.getLineColor();
  context.lineWidth = this.getLineWidth();
  context.strokeRect( x + 0.5 , y + 0.5 , width, heightSmallRectangle );
  context.restore();

  JSGraphic.dashedLine( context,  xline, y + heightSmallRectangle, xline, y + height, 10 );
}



/**
 * LifelineFigure class constructor
 * Represents an object with accept event action form of UML
 *
 * @author Rafael Molina Linares
 * @update 29/10/2011
 *
 * @class AcceptEventActionFigure
 * @extends NodeFigure
 */
var AcceptEventActionFigure = function( params ) {
  params = params || {};
  AcceptEventActionFigure.baseConstructor.call( this, params );
}
JSFun.extend( AcceptEventActionFigure, NodeFigure );



/**
 * Draw an object with the form of an accept event action UML
 * with the position and size given
 *
 * @author Rafael Molina Linares / Alejandro Arrabal Hidalgo
 * @update 29/10/2011 / 30/07/2012
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Context of the canvas elemento
 * @param {Number} x left upper x coordenate where object is drawn
 * @param {Number} y left upper y coordenate where object is drawn
 * @param {Number} width width of the object
 * @param {Number} height height of  the object
 */
AcceptEventActionFigure.prototype.draw = function( context, x, y, width, height) {

  var x = JSGraphic.toPixel( x );
  var y = JSGraphic.toPixel( y );

  context.save();
  context.shadowOffsetX = 2;
  context.shadowOffsetY = 2;
  context.shadowBlur = 2;
  context.shadowColor = 'rgba(0, 0, 0, 0.5)';
  context.fillStyle = this.getColor();

  context.beginPath();

  context.moveTo(x,y);
  context.lineTo(x + width, y);
  context.lineTo(x + width, y + height);
  context.lineTo(x, y + height);
  context.lineTo(x + 25, y + height/2);

  context.closePath();
  context.fill();
	context.restore();

	context.save();
  context.strokeStyle =  this.getLineColor();
  context.lineWidth = this.getLineWidth();
  context.beginPath();

  context.moveTo(x,y);
  context.lineTo(x + width, y);
  context.lineTo(x + width, y + height);
  context.lineTo(x, y + height);
  context.lineTo(x + 25, y + height/2);
  context.lineTo(x,y);

  context.stroke();
  context.restore();
}


/**
 * TimeEventFigure class constructor
 * Represents a object with form of time event UML
 *
 * @author Rafael Molina Linares
 * @update 29/10/2011
 *
 * @class TimeEventFigure
 * @extends NodeFigure
 */
var TimeEventFigure = function( params ) {
  params = params || {};
  TimeEventFigure.baseConstructor.call( this, params );
}
JSFun.extend( TimeEventFigure, NodeFigure );



/**
 * Draw an time event UML
 * with the position and size given
 *
 * @author Rafael Molina Linares / Alejandro Arrabal Hidalgo
 * @update 29/10/2011 / 30/07/2012
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Context of the canvas elemento
 * @param {Number} x left upper x coordenate where object is drawn
 * @param {Number} y left upper y coordenate where object is drawn
 * @param {Number} width width of the object
 * @param {Number} height height of  the object
 */
TimeEventFigure.prototype.draw = function( context, x, y, width, height) {

  var x = JSGraphic.toPixel( x );
  var y = JSGraphic.toPixel( y );

  context.save();
  context.shadowOffsetX = 2;
  context.shadowOffsetY = 2;
  context.shadowBlur = 2;
  context.shadowColor = 'rgba(0, 0, 0, 0.5)';
  context.strokeStyle = figureStyle.border;
  context.fillStyle = this.getColor();

  context.beginPath();

  context.moveTo(x,y);
  context.lineTo(x + width, y);
  context.lineTo(x + width/2, y + height/2);

  context.closePath();
  context.fill();

  context.beginPath();

  context.moveTo(x,y + height);
  context.lineTo(x + width,y + height);
  context.lineTo(x + width/2, y + height/2);

  context.closePath();
  context.fill();

  context.restore();

  context.save();
  context.strokeStyle =  this.getLineColor();
  context.lineWidth = this.getLineWidth();

  context.beginPath();

  context.moveTo(x,y);
  context.lineTo(x + width, y);
  context.lineTo(x + width/2, y + height/2);
  context.lineTo(x,y);

  context.stroke();

  context.beginPath();

  context.moveTo(x,y + height);
  context.lineTo(x + width,y + height);
  context.lineTo(x + width/2, y + height/2);
  context.lineTo(x,y + height);

  context.stroke();

  context.restore();
}



/**
 * SendSignalActionFigure class constructor
 * Represents an object with form of send signal action of UML
 *
 * @author Rafael Molina Linares
 * @update 29/10/2011
 *
 * @class SendSignalActionFigure
 * @extends NodeFigure
 */
var SendSignalActionFigure = function( params ) {
  params = params || {};
  SendSignalActionFigure.baseConstructor.call( this, params );
}
JSFun.extend( SendSignalActionFigure, NodeFigure );



/**
 * Draw a send signal action of UML
 * with the position and size given
 *
 * @author Rafael Molina Linares / Alejandro Arrabal Hidalgo
 * @update 29/10/2011 / 30/07/2012
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Context of the canvas elemento
 * @param {Number} x left upper x coordenate where object is drawn
 * @param {Number} y left upper y coordenate where object is drawn
 * @param {Number} width width of the object
 * @param {Number} height height of  the object
 */
SendSignalActionFigure.prototype.draw = function( context, x, y, width, height) {

  var x = JSGraphic.toPixel( x );
  var y = JSGraphic.toPixel( y );

  context.save();
  context.shadowOffsetX = 2;
  context.shadowOffsetY = 2;
  context.shadowBlur = 2;
  context.shadowColor = 'rgba(0, 0, 0, 0.5)';
  context.fillStyle = this.getColor();

  context.beginPath();
  context.moveTo(x,y);
  context.lineTo(x + width - 25, y);
  context.lineTo(x + width, y + height/2);
  context.lineTo(x + width - 25, y + height);
  context.lineTo(x, y + height);

  context.closePath();
  context.fill();

  context.restore();

	context.save();
	context.strokeStyle =  this.getLineColor();
	context.lineWidth = this.getLineWidth();

  context.beginPath();
  context.moveTo(x,y);
  context.lineTo(x + width - 25, y);
  context.lineTo(x + width, y + height/2);
  context.lineTo(x + width - 25, y + height);
  context.lineTo(x, y + height);
  context.lineTo(x,y);

  context.stroke();
  context.restore();
}


/**
 * LifelineFigure class constructor
 * Represents an object with form of a horizontal swimlane UML
 *
 * @author Rafael Molina Linares
 * @update 29/10/2011
 *
 * @class SwimlaneFigure
 * @extends NodeFigure
 */
var SwimlaneFigure = function( params ) {
  params = params || {};
  SwimlaneFigure.baseConstructor.call( this, params );
}
JSFun.extend( SwimlaneFigure, NodeFigure );



/**
 * Draw a horizontal swimlane UML
 * with the position and size given
 *
 * @author Rafael Molina Linares
 * @update 29/10/2011
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Context of the canvas elemento
 * @param {Number} x left upper x coordenate where object is drawn
 * @param {Number} y left upper y coordenate where object is drawn
 * @param {Number} width width of the object
 * @param {Number} height height of  the object
 */
SwimlaneFigure.prototype.draw = function( context, x, y, width, height) {

  var x = JSGraphic.toPixel( x );
  var y = JSGraphic.toPixel( y );

  context.save();
  context.lineWidth = 2.5;
  context.shadowOffsetX = 2;
  context.shadowOffsetY = 2;
  context.shadowBlur = 2;
  context.shadowColor = 'rgba(0, 0, 0, 0.5)';
  context.fillStyle = this.getColor();

  context.beginPath();
  context.moveTo(x + width,y);
  context.lineTo(x, y);
  context.lineTo(x, y + height);
  context.lineTo(x + width, y + height);

  context.stroke();
  context.restore();
}



/**
 * VerticalSwimlaneFigure class constructor
 * Represents an object with form of a vertical swimlane UML
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @class LifelineFigure
 * @extends NodeFigure
 */
var VerticalSwimlaneFigure = function( params ) {
  params = params || {};
  VerticalSwimlaneFigure.baseConstructor.call( this, params );
}
JSFun.extend( VerticalSwimlaneFigure, NodeFigure );



/**
 * Draw a vertical swimlane UML
 * with the position and size given
 *
 * @author Rafael Molina Linares
 * @update 29/10/2011
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Context of the canvas elemento
 * @param {Number} x left upper x coordenate where object is drawn
 * @param {Number} y left upper y coordenate where object is drawn
 * @param {Number} width width of the object
 * @param {Number} height height of  the object
 */
VerticalSwimlaneFigure.prototype.draw = function( context, x, y, width, height) {

  var x = JSGraphic.toPixel( x );
  var y = JSGraphic.toPixel( y );


  context.save();
  context.lineWidth = 2.5;
  context.shadowOffsetX = 2;
  context.shadowOffsetY = 2;
  context.shadowBlur = 2;
  context.shadowColor = 'rgba(0, 0, 0, 0.5)';
  context.fillStyle = this.getColor();


  context.beginPath();

  context.moveTo(x,y + height);
  context.lineTo(x, y);
  context.lineTo(x + width, y);
  context.lineTo(x + width, y + height);

  context.stroke();

  context.restore();
}



/**
 * TriangleFigure class constructor
 * Represents an object with triangle form
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 28/08/2012
 *
 * @class TriangleFigure
 * @extends NodeFigure
 *
 * @param {Number} direction Clockwise direction(0: Up,1:Rigth,2:Down,3:Left)
 */
var TriangleFigure = function(params) {
	  params = params || {};
	  if(params.direction && JSFun.isNumber(params.direction))this.setDirection(params.direction);
	  TriangleFigure.baseConstructor.call( this, params );
	}
JSFun.extend( TriangleFigure, NodeFigure );



/**
 * Draws a triangle in the canvas with
 * the position and size give
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 28/08/2012
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Context of the canvas element
 * @param {Number} x Coordinate x where the object is drawn
 * @param {Number} y Coordinate y where the object is drawn
 * @param {Number} width Width that will have the drawn object
 * @param {Number} height Height that will have the drawn object
 */
TriangleFigure.prototype.draw = function( context, x, y, width, height) {
  context.save();
  context.fillStyle = '#ffffff';
  context.strokeStyle =  this.getLineColor();
  context.lineWidth = this.getLineWidth();
  JSGraphic.triangle( context, x, y, width, height,this.getDirection() );
  context.fill();
  context.stroke();
  context.restore();
}




/**
 * Set a triangle direction
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 28/08/2012
 *
 * @method setDirection
 * @param {Number} direction Clockwise direction(0: Up,1:Rigth,2:Down,3:Left)
 */
TriangleFigure.prototype.setDirection = function( direction) {
	if(JSFun.isNumber(direction))this._direction=direction;
}



/**
 * Get the triangle direction
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 28/08/2012
 *
 * @method getDirection
 * @return {Number} direction Clockwise direction(0: Up,1:Rigth,2:Down,3:Left)
 */
TriangleFigure.prototype.getDirection = function() {
	if(JSFun.isNumber(this._direction))return this._direction;
	return 0;
}



var NodeStyle = {
  shape_color: 'rgb( 0, 0, 0 )',
	control: ''
}


/**
 * Node class constructor, creates a node of a diagram
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @class Node
 * @extends Element
 * @param {Number} x Coordinate x of the node's position
 * @param {Number} y Coordinate y of the node's position
 */
var Node = function( params ) {
  params = params || {};

  this._id = 0;
  this._type = 'untyped';

  this._x = params.x || 0;
  this._y = params.y || 0;

  this._prex = this._x;
  this._prey = this._y;

  this._relx = 0;
  this._rely = 0;

  this._width = 10;
  this._height = 10;
  this._minHeight = 5;
  this._minWidth = 5;

  this._selected = false;
  this._selectedBefore = false;
  this._resizing = false;
  this._moved = false;

  this._moveable = false;
  this._proportional = false;
  this._container = false;
  this._alone = false;

  this._figures = [];
  this._components = [];
  this._activeComponent = null;

  this._diagram = null;
  this._parent = null;

  this._nodeChilds = [];
  this._relationChilds = [];
  this._relations = [];

  this._menu = [];

	this._tagValues = [];

	this._selectedFigure = 0;

	/*
		Keeps information about the before component that store
		the name of the node. It is used when the shown figure is changed by
		another given by an object stereotype
	*/
	this._beforeNameComponent = null;

	this._visible = true;

	/*
		Saves the values of the node's size. It is used when the shown figure
		is changed by another given by an object stereotype, and after,
		the before values want to be recovered
	*/
	this._beforeHeight = 0;
	this._beforeWidth = 0;
}
JSFun.extend( Node, Element );


/**
 * Set the value true to the attribute 'alone' so that
 * the node can not be contained within another container node
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method setAlone
 */

Node.prototype.setAlone = function() {
  this._alone = true;
}



/**
 * Return if the node can be contained within
 * another container node or not
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method isAlone
 * @return {Boolean} If the node can be contained within a container node
 */
Node.prototype.isAlone = function() {
  return this._alone;
}



/**
 * Assign to the node a number of id between a diagram
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method setId
 * @param {String} value Chain of id
 */
Node.prototype.setId = function( value ) {
  this._id = this.getType() + '_' + value;
}



/**
 * Returns the id of the node
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method getId
 * @return {String} id's chain between the diagram
 */
Node.prototype.getId = function() {
  return this._id;
}



/**
 * Assigns a type of the node, this type will be how to
 * determine the name of the object's class
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method setType
 * @param {String} value node's type, identifies the class that comes
 */
Node.prototype.setType = function( value ) {
  if( this._type == 'untyped' && JSFun.isString( value ) ) {
    this._type = value;
  }
}



/**
 * Returns the node's type
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method getType
 * @return {String} type of the node
 */
Node.prototype.getType = function() {
  return this._type;
}



/**
 * Generates a XML node with the information of the node
 *
 * @author Martín Vega-leal Ordóñez  /  Rafael Molina Linares / Alejandro Arrabal Hidalgo
 * @update 28/11/2010							   /  19/09/2011			/ 30/08/2012
 *
 * @method getElementXML
 * @param {DOMNode} parent Parent node of the xml tree that is generated
 * @return {DOMNode} XML node with the information of the object
 */
Node.prototype.getElementXML = function( parent ) {

  var xmlnode = parent.createElement( this.getType() );
	var tagValues = [];
  var i;

	/*
		If the selected figure is another than 0, the figure 0 is
		established to recover the size(width/height) that
		the node had before
	*/
	if(this._selectedFigure){
	 	this.setSelectedFigure( 0 );
	}

  xmlnode.setAttribute( 'id', this.getId() );
  xmlnode.setAttribute( 'x', this.getX() );
  xmlnode.setAttribute( 'y', this.getY() );
  xmlnode.setAttribute( 'width', this.getWidth() );
  xmlnode.setAttribute( 'height', this.getHeight() );
  xmlnode.setAttribute( 'backgroundColor', this.getBackgroundColor() );
  if(this.getLineColor() )xmlnode.setAttribute( 'lineColor', this.getLineColor() );
  if(this.getLineWidth())xmlnode.setAttribute( 'lineWidth', this.getLineWidth() );
  if(this.getFontColor())xmlnode.setAttribute( 'fontColor', this.getFontColor() );
  if(this.getFontFamily())xmlnode.setAttribute( 'fontFamily', this.getFontFamily() );
  if(this.getFontSize()) xmlnode.setAttribute( 'fontSize', this.getFontSize() );
  if(this.getFontStyle())xmlnode.setAttribute( 'fontStyle', this.getFontStyle() );
  if(this.getFontWeight())xmlnode.setAttribute( 'fontWeight', this.getFontWeight() );


	for(i=0; i<this._tagValues.length; i++)
		tagValues.push(this._tagValues[i][0] + ':' + this._tagValues[i][1]);

  xmlnode.setAttribute( 'tagValues', tagValues );


  for( i in this._components ) {
    if( this._components[i].getId() ) {
      xmlnode.appendChild( this._components[i].getComponentXML( parent ) );
    }
  }

  for( i in this._nodeChilds ) {
    xmlnode.appendChild( this._nodeChilds[i].getElementXML( parent ) );
  }

  for( i in this._relationChilds ) {
    xmlnode.appendChild( this._relationChilds[i].getElementXML( parent ) );
  }

  return xmlnode;
}



/**
 * Receives a xml node with the information of the node and get it back
 *
 * @author Martín Vega-leal Ordóñez  /  Rafael Molina Linares / Alejandro Arrabal Hidalgo
 * @update 28/11/2010							   /  19/09/2011			/ 09/08/2012
 *
 * @method setElementXML
 * @param {DOMNode} xmlnode Xml node with the information of the node
 */
Node.prototype.setElementXML = function( xmlnode ) {

  this.setPosition( parseInt( xmlnode.getAttribute( 'x' ) ),
                    parseInt( xmlnode.getAttribute( 'y' ) )
                  );
  this.resetMovement();

  this.setWidth( parseInt( xmlnode.getAttribute( 'width' ) ) );
  this.setHeight( parseInt( xmlnode.getAttribute( 'height' ) ) );
  this.setBackgroundColor( xmlnode.getAttribute( 'backgroundColor' )  );
  if(xmlnode.getAttribute( 'lineColor' ))this.setLineColor( xmlnode.getAttribute( 'lineColor' )  );
  if(xmlnode.getAttribute( 'lineWidth' ))this.setLineWidth( parseInt(xmlnode.getAttribute( 'lineWidth' ) ));
  if(xmlnode.getAttribute( 'fontColor' ))this.setFontColor( xmlnode.getAttribute( 'fontColor' )  );
  if(xmlnode.getAttribute( 'fontFamily' ))this.setFontFamily( xmlnode.getAttribute( 'fontFamily' )  );
  if(xmlnode.getAttribute( 'fontSize' ))this.setFontSize( xmlnode.getAttribute( 'fontSize' )  );
  if(xmlnode.getAttribute( 'fontStyle' ))this.setFontStyle( xmlnode.getAttribute( 'fontStyle' )  );
  if(xmlnode.getAttribute( 'fontWeight' ))this.setFontWeight( xmlnode.getAttribute( 'fontWeight' )  );

	var chainTagValues = xmlnode.getAttribute( 'tagValues' );
	var tagValues = [];
	var indexColon;

	/*
		Searchs the matchs with the character ',', that is
		responsible for separating the various objects, and
		stored each tag value in an array
	*/
	while(chainTagValues != ""){

		indexColon = chainTagValues.indexOf(',');
		if(indexColon == -1){

			tagValues.push(chainTagValues);
			chainTagValues = "";
		} else {

			tagValues.push(chainTagValues.substring(0,indexColon));
			chainTagValues = chainTagValues.substring(indexColon+1);
		}
	}

	this.setTagValues(tagValues);

  var i;
  var childs = xmlnode.childNodes;

  for( i = 0; i < childs.length; i++ ) {
      var j;
      for( j in this._components ) {
        if( this._components[j].getId() == childs[i].getAttribute( 'id' ) ) {
          this._components[j].setComponentXML( childs[i] );
          this.updateComponents();
        }
      }
    }
  this.notifyDraw();
}



/**
 * Modifies the value of a node's component, if exists
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method setValue
 * @param {String} id Id of the component between of the node
 * @param {String} value Text that will be assigned to the component
 */
Node.prototype.setValue = function( id, value ) {
  var i;

  for( i in this._components ) {

    if( !( this._components[i] instanceof SuperComponent ) && this._components[i].getId() == id ) {

      this._components[i].setValue( value );
      this.updateComponents();
      return true;
    }
  }

  return false;
}



/**
 * Adds a value to a node's component, if exists, this
 * component should be able to contain multiple values
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method addValue
 * @param {String} id Id of the component between of the node
 * @param {String} value Text that will be added to the component
 */
Node.prototype.addValue = function( id, value ) {
  var i;

  for( i in this._components ) {
    if( this._components[i] instanceof SuperComponent && this._components[i].getId() == id ) {
      this._components[i].addField( value );

      this.updateComponents();
      return true;
    }
  }

  return false;
}



/**
 * Adds a child to the current node, is kept
 * a reference to propagate changes in the node
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method addChild
 * @param {Element} elem New child of the node
 */
Node.prototype.addChild = function( elem ) {

  if( elem instanceof Node ) {
    this._nodeChilds.push( elem );
    elem.setParent( this );

  } else if( elem instanceof Relation ) {
    this._relationChilds.push( elem );
    elem.setParent( this );
  }
}



/**
 * Deletes a element as child of the node
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method delChild
 * @param {Element} elem Element that will be remove as child
 */
Node.prototype.delChild = function( elem ) {
  var i;

  if( elem instanceof Node ) {
    for( i in this._nodeChilds ) {
      if( this._nodeChilds[i] == elem ) {
        this._nodeChilds.splice( i, 1 );

        elem.setParent();

        break;
      }
    }

  } else if( elem instanceof Relation ) {
    for( i in this._relationChilds ) {
      if( this._relationChilds[i] == elem ) {

        this._relationChilds.splice( i, 1 );
        elem.setParent();

        break;
      }
    }
  }
}



/**
 * Is added a relation to the node, this means that the
 * node has started to be part of a relation and
 * stores a reference to propagates changes
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method addRelation
 * @param {Relation} rel New relation of the node
 */
Node.prototype.addRelation = function( rel ) {
  if( rel instanceof Relation ) {
    this._relations.push( rel );
  }
}



/**
 * Is remove a relation of the node, the node has left to be part of the relation and
 * no need to continue to store your information
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method delRelation
 * @param {Element} rel Relation that will be remove to the node
 */
Node.prototype.delRelation = function( rel ) {
  var i;

  for( i in this._relations ) {
    if( this._relations[i] == rel ) {
      this._relations.splice( i, 1 );
      break;
    }
  }

}



/**
 * Stored a reference to the diagram to which it belong
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method setDiagram
 * @param {Diagram} ndiagram Diagram to which belong
 */
Node.prototype.setDiagram = function( ndiagram ) {
  if( ndiagram instanceof Diagram ) {
    this._diagram = ndiagram;
  }
}



/**
 * Notifies the node that should be drawn because some
 * of the elements which it relates has changed
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method notifyDraw
 */
Node.prototype.notifyDraw = function() {
  if( this._diagram ) {
    this._diagram.draw();
  }
}



/**
 * Notify to the node that a change has been produced,
 * some relationed element has changed and can affect it
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method notifyChange
 */
Node.prototype.notifyChange = function() {

  this._resizing = true;

  if( this._container ) {

    this.updateContainer();

    if( this._parent ) {

			var superNode = this._parent.getParent();
			while(superNode){
				if( superNode instanceof SuperNode){
					superNode.notifyChange(true);
					superNode = null;
				} else {
					superNode = superNode._parent;
				}
			}
		}
  } else {

    this.updateComponents();
    if( this._parent ) {

	  	this._parent.updateContainer();
			var superNode = this._parent.getParent();
			while(superNode){
				if( superNode instanceof SuperNode){
					superNode.notifyChange(true);
					superNode = null;
				} else {
					superNode = superNode._parent;
				}
			}
    }
  }

  this._resizing = false;
}



/**
 * Return the x coordinate of the node's position
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method getX
 * @return {Number} Coordinate x of the node's position
 */
Node.prototype.getX = function() {
    return this._x;
}



/**
 * Returns the coordinate y of the node's position
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method getY
 * @return {Number} Coordinate y of the node's position
 */
Node.prototype.getY = function() {
    return this._y;
}



/**
 * Modifies the width of the element and updates the
 * related elements of the node
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method width
 * @param {Number} value New width of the element
 * @param {Boolean} If the change has been produced
 */
Node.prototype.width = function( value ) {
  if( JSFun.isNumber( value ) ) {
    this.setWidth( value );
    this.notifyChange();
    return true;
  }

  return false;
}



/**
 * Modifies the height of the element and updates the
 * related elements with the node
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method height
 * @param {Number} value New height of the element
 * @param {Boolean} If the change has been produced
 */
Node.prototype.height = function( value ) {
  if( JSFun.isNumber( value ) ) {
    this.setHeight( value );
    this.notifyChange();
    return true;
  }

  return false;
}



/**
 * Modifies the position of the element and udpates
 * the related elements with the node
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method position
 * @param {Number} x Coordinate x of the new position
 * @param {Number} y Coordinate y of the new position
 * @param {Boolean} If the change has been produced
 */
Node.prototype.position = function( x, y ) {
  if( JSFun.isNumber( x ) && JSFun.isNumber( y ) ) {
    this.setPosition( x, y );
    this.updatePosition();
    this.resetMovement();

    return true;
  }

  return false;
}



/**
 * Modifies the position of the element
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method setPosition
 * @param {Number} x Coordinate x of the new position
 * @param {Number} y Coordinate y of the new position
 */
Node.prototype.setPosition = function( x, y ) {
  if( JSFun.isNumber( x ) && JSFun.isNumber( y ) ) {

    this._x = x;
    this._y = y;
  }
}



/**
 * Returns the movement that has performed the
 * node from your last position
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method getMovement
 * @return {Point} Movement of the node
 */
Node.prototype.getMovement = function() {
  return new Point( this._x - this._prex, this._y - this._prey );
}



/**
 * Set to 0 the movement performed by the node
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method resetMovement
 */
Node.prototype.resetMovement = function() {
  this._prex = this._x;
  this._prey = this._y;
}



/**
 * Deselects the node and close all openned dialog
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method deselect
 */
Node.prototype.deselect = function() {
  this.deselectComponent();

  this._selectedBefore = false;
  this._selected = false;
}



/**
 * Deselects a component and closes all openned dialog
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method deselectComponent
 * @private
 */
Node.prototype.deselectComponent = function() {
  if( this._activeComponent ) {
    this._activeComponent.deselect();
    this._activeComponent = null;
  }
}



/**
 * Check if the element has been pressed,
 * and in affirmative case, is activated different flags
 *
 * @author Martín Vega-leal Ordóñez   /  Rafael Molina Linares
 * @update 28/11/2010								  /  19/09/2011
 *
 * @method select
 * @param {Number} x Coordinate x
 * @param {Number} y Coordinate y
 * @return {Boolean} If the point is over the node or some of its components
 */
Node.prototype.select = function( x, y ) {


	if(!this._visible)
		return false;

	this.deselectComponent();

	/*
		If the contextual menu is active or visible in the diagram
		and click has been done on the same node, the contextual menu is removed
	*/
	if(this._diagram._activeMenu){
	 this.removeContextualMenu();
	}

  if(this._diagram._pressMouse == true){

	  if( this._selected ) {
	    if( this._moveable
	        && Math.abs( x - ( this._x + this._width + 2.5 ) ) <= 5
	        && Math.abs( y - ( this._y + this._height + 2.5 ) ) <= 5 )
	    {
	      this._resizing = true;
	      return true;
	    }

	  }


	  if( this._selected ) {

	    if( this.isOverComponent( x, y ) ) {
	      this._relx = x - this._x;
	      this._rely = y - this._y;


	      this._selectedBefore = true;

	      return true;
	    }
	  }

		/*
			If you press on some part of the node
			where there aren't any component, the node
			is selected.
		*/
	  if( this.isOver( x, y ) ) {
	    this._relx = x - this._x;
	    this._rely = y - this._y;

	    this._selectedBefore = this._selected;
	    this._selected = true;

 	    return true;
	  } else {
	    return false;
	  }
  } else if(this._diagram._pressMouseRight == true){

		/*
			If the right button has been pressed, and therefore,
			the contextual menu is activated
		 */
	   if( this.isOver( x, y ) ) {

 	  	  document.oncontextmenu = function (){ return false; };

				/*
					Captures the movement of the scroll bar making into account
					that Chrome and Opera browsers support the document.documentElement
					element and Firefox and IE browsers support the document.body element.
				*/
				var scroll = document.documentElement.scrollTop || document.body.scrollTop;

		    x = x + this._diagram._div.offsetLeft;
		    y = (scroll) ? (y - scroll + this._diagram._div.offsetTop) : (y + this._diagram._div.offsetTop) ;

		    this.showContextualMenu(x,y);

		    return true;
	  } else {
		    return false;
	  }
  }
}



/**
 * Show contextual menu of a Node
 *
 * @author Rafael Molina Linares
 * @update 8/06/2011
 *
 * @method showContextualMenu
 * @param {Number} x represents the upper left x coordinate of the contextual menu
 * @param {Number} y represents the upper left y coordinate of the contextual menu
 *
 */
Node.prototype.showContextualMenu = function(x,y){

	if(this._diagram._activeMenu || !this._menu.length){
		return;
	}

	this._diagram._activeMenu = true;

	var div = document.createElement('div');
	div.className = "ud_contextualMenu";
	div.style.cursor = 'pointer';

	for(var i=0;i<this._menu.length;i++)
	   this.addItem(this._menu[i],div);

	document.body.appendChild(div);

	this._diagram._divMenu = div;

	div.style.top = y + "px";
	div.style.left = x + "px";
}



/**
 * Remove contextual menu of a html document
 *
 * @author Rafael Molina Linares
 * @update 8/06/2011
 *
 * @method removeContextualMenu
 */

Node.prototype.removeContextualMenu = function(){

	if(this._diagram._activeMenu){

   	document.body.removeChild( this._diagram._divMenu );

		this._diagram._activeMenu = false;
   	this.notifyDraw();
	}
}


/**
 * Add a item to the contextual menu
 *
 * @author Rafael Molina Linares
 * @update 8/06/2011
 *
 * @method addItem
 * @param {array} item Array whose position 0 represents the actions to perfom when the item is pressed,
											 and the position 1 represents the text that appears in the contextual menu
 * @param {div} divContainer Represents the div that contains all items of the contextual menu.
 *
 */

Node.prototype.addItem = function(item, divContainer){

	var div = document.createElement('div');
	div.className = "ud_contextualMenuItem";

	var span = document.createElement('span');
	span.appendChild(document.createTextNode(item[1]));

	div.appendChild(span);
	divContainer.appendChild(div);

	div.addEventListener('mouseup', item[0] , false);
}


/**
 * Show the dialog for changing the background-color of the Node.
 *
 * @author  Alejandro Arrabal Hidalgo
 * @update 15/10/2012
 *
 * @method showStyleDialog
 *
 */

Node.prototype.showStyleDialog = function( params ) {

	var that = params.that || this;

	var colorBackgroundBackup = that._Backgroundcolor;
	var colorLineBackup=that._lineColor;
	var colorTextBackup=that._textColor;

	var numHex = that._Backgroundcolor.split('#')[1];

	var defaultColor = new Array( parseInt(numHex.slice(0,2),16),
				     									  parseInt(numHex.slice(2,4),16),
				     										parseInt(numHex.slice(4,6),16));

	var _divContainer = document.createElement('div');
	_divContainer.className = "ud_popupStyle";

	var _divBlock1 = document.createElement('div');
	_divBlock1.setAttribute('id','divBlock1');

	var _divBlock2 = document.createElement('div');
	_divBlock2.setAttribute('id','divBlock2');

	var _divRGB = document.createElement('div');
	_divRGB.setAttribute('id','colorHtml');
	_divRGB.style.color = '#ffffff';

	var _divR = document.createElement('div');
	_divR.setAttribute('id','red');

	var canvasR = document.createElement('canvas');
	canvasR.setAttribute('id','R');
	canvasR.width = 150;
	canvasR.height = 20;

	_divR.appendChild(canvasR);
	var contextR = canvasR.getContext('2d');

	var _divG = document.createElement('div');
	_divG.setAttribute('id','green');

	var canvasG = document.createElement('canvas');
	canvasG.setAttribute('id','G');
	canvasG.width = 150;
	canvasG.height = 20;

	_divG.appendChild(canvasG);
	var contextG = canvasG.getContext('2d');

	var _divB = document.createElement('div');
	_divB.setAttribute('id','blue');

	var canvasB = document.createElement('canvas');
	canvasB.setAttribute('id','B');
	canvasB.width = 150;
	canvasB.height = 20;

	_divB.appendChild(canvasB);
	var contextB = canvasB.getContext('2d');

	var _divColor = document.createElement('div');
	_divColor.setAttribute('id','divSelectColor');

	var canvasColor = document.createElement('canvas');
	canvasColor.setAttribute('id','selectColor');
	canvasColor.width = 90;
	canvasColor.height = 90;

	_divColor.appendChild(canvasColor);
	var contextColor = canvasColor.getContext('2d');


	var form = document.createElement("form");

	var _divRadio = document.createElement('div');
	_divRadio.setAttribute("id","divRadio");

  var label_background= document.createElement("label");
  label_background.innerHTML="background color";
  var radio_background = document.createElement("input");
  radio_background.setAttribute("id","radio_background");
  radio_background.setAttribute("type","radio");
  radio_background.setAttribute("name","radio");
  radio_background.setAttribute("value","background");
  radio_background.setAttribute("checked","true");
  label_background.appendChild(radio_background);

  var label_line= document.createElement("label");
  label_line.innerHTML="line color";
  var radio_line = document.createElement("input");
  radio_line.setAttribute("id","radio_line");
  radio_line.setAttribute("type","radio");
  radio_line.setAttribute("name","radio");
  radio_line.setAttribute("value","line");
  label_line.appendChild(radio_line);

  var label_text= document.createElement("label");
  label_text.innerHTML="text color";
  var radio_text = document.createElement("input");
  radio_text.setAttribute("id","radio_text");
  radio_text.setAttribute("type","radio");
  radio_text.setAttribute("name","radio");
  radio_text.setAttribute("value","text");
  label_text.appendChild(radio_text);

  _divRadio.appendChild(label_line);
  _divRadio.appendChild(label_text);
  _divRadio.appendChild(label_background);
  var radio=[radio_background,radio_line,radio_text];

  var _divFont = document.createElement('div');
  _divFont.setAttribute("id","divFont");
  var number_size = document.createElement("input");
  number_size.setAttribute( "type", "number" );
  number_size.setAttribute("name","size");
  number_size.setAttribute( "value", parseInt(that._fontSize) || "12" );
  number_size.setAttribute("style","width: 35px");
  var label_size= document.createElement("label");
  label_size.innerHTML="font size";
  label_size.setAttribute("for","size");

  var text_family=document.createElement("input");
  text_family.setAttribute("type","text");
  text_family.setAttribute("name","family");
  text_family.setAttribute("value", that._fontFamily || "monospace")
  text_family.setAttribute("style","width: 65px");
  var label_family= document.createElement("label");
  label_family.innerHTML="font family";
  label_family.setAttribute("for","family");


  var number_width = document.createElement("input");
  number_width.setAttribute( "type", "number" );
  number_width.setAttribute("name","width");
  number_width.setAttribute( "value", that._lineWidth || "2" );
  number_width.setAttribute("style","width: 35px");
  var label_width= document.createElement("label");
  label_width.innerHTML="line width";
  label_width.setAttribute("for","width");

  _divFont.appendChild(label_family);
  _divFont.appendChild(text_family);
  _divFont.appendChild(label_size);
  _divFont.appendChild(number_size);
  _divFont.appendChild(label_width);
  _divFont.appendChild(number_width);

  var select_weight = document.createElement("select");
  select_weight.setAttribute("name","weight");
  var value= that._fontWeight || 'normal';
  select_weight.add(new Option('Normal', 'normal'));
  select_weight.add(new Option('Bold', 'bold'));
  select_weight.add(new Option('Bolder', 'bolder'));
  for(i=0;i<select_weight.length;i++){
	  if(select_weight.options[i].value==value)select_weight.options[i].selected=true;
  }
  select_weight.setAttribute("style","width: 85px");
  var label_weight= document.createElement("label");
  label_weight.innerHTML="text weight";
  label_weight.setAttribute("for","weight");

  var select_style = document.createElement("select");
  select_style.setAttribute("name","style");
  value= that._fontStyle || 'normal';
  select_style.add(new Option('Normal', 'normal'));
  select_style.add(new Option('Italic', 'italic'));
  select_style.add(new Option('Oblique', 'oblique'));
  for(i=0;i<select_style.length;i++){
	  if(select_style.options[i].value==value)select_style.options[i].selected=true;
  }
  select_style.setAttribute("style","width: 85px");
  var label_style= document.createElement("label");
  label_style.innerHTML="text style";
  label_style.setAttribute("for","style");
  var button_close = document.createElement("input");
  button_close.setAttribute( "type", "submit" );
  button_close.setAttribute( "value", "ok" );

  var button_cancel = document.createElement("input");
  button_cancel.setAttribute( "type", "submit" );
  button_cancel.setAttribute( "value", "cancel" );


  var closeWindow = function ( event ) {
	  that.setFontFamily(text_family.value);
	  that.setFontSize( parseInt(number_size.value,10));
	  that.setLineWidth(parseFloat(number_width.value,10));
	  that.setFontStyle(select_style.options[select_style.selectedIndex].value);
	  that.setFontWeight(select_weight.options[select_weight.selectedIndex].value);
		that.notifyDraw();

		/*
			Removes the element div that contains the
			dialog to change the color of the node
		*/
    document.body.removeChild( _divContainer );
  }

  var cancelWindow = function ( event ) {
		that.setBackgroundColor(colorBackgroundBackup);
		that.setLineColor(colorLineBackup);
		that.setFontColor(colorTextBackup);
    document.body.removeChild( _divContainer );//elimina el div que contiene la informacion xml de los diagramas
  }

  var changeColorOption = function( event ) {
  		var current=getCheckedColor();
  		if(!current)current='#000000';
  		drawCurrentColor(current);
  		current=current.split('#')[1];
  		var defaultColor = new Array( parseInt(current.slice(0,2),16),
			  parseInt(current.slice(2,4),16),
				parseInt(current.slice(4,6),16));
  		drawColor( canvasR, contextR, defaultColor[0], '#ff0000');
  		drawColor( canvasG, contextG, defaultColor[1], '#00ff00');
  		drawColor( canvasB, contextB, defaultColor[2], '#0000ff');
  }

	radio_background.addEventListener('click', changeColorOption, false );
	radio_line.addEventListener('click', changeColorOption, false );
	radio_text.addEventListener('click', changeColorOption, false );
	button_close.addEventListener('click', closeWindow, false );
	button_cancel.addEventListener('click', cancelWindow, false );

  form.onsubmit = function() { return false; }

	button_close.focus();

	form.appendChild(_divRadio);
	form.appendChild(document.createElement('hr'));
	form.appendChild(_divFont);
	form.appendChild(label_style);
	form.appendChild(select_style);
	form.appendChild(label_weight);
	form.appendChild(select_weight);
	form.appendChild(document.createElement('br'));
	form.appendChild(button_close);
	form.appendChild(button_cancel);

	_divBlock1.appendChild(_divRGB);
	_divBlock1.appendChild(_divR);
	_divBlock1.appendChild(_divG);
	_divBlock1.appendChild(_divB);
	_divBlock1.appendChild(form);
	_divContainer.appendChild(_divBlock1);


	_divBlock2.appendChild(_divColor);
	_divBlock2.appendChild(document.createElement('div'));
	_divContainer.appendChild(_divBlock2);


	/**
	 * Draws in the canvas a rectangle with a circle whose
	 * position represents a color level between 0 and 255.
	 *
	 * @author Rafael Molina Linares
	 * @update 13/06/2011
	 *
	 * @method drawColor
	 * @param {div} canvas 		Div that contains to the canvas element
	 * @param {CanvasRenderingContext2D} 	cxt 		Context of the canvas element
	 * @param {string} 	defaultColor 	hexadecimal color that determines the position of the circle
	 * @param {string} 	color 		    represents the color uses to draw the rectangle
	 */

	var drawColor = function( canvas,cxt,defaultColor,color){

		if(defaultColor == 0)
			defaultColor = 0.1;
		else if(defaultColor == 120)
			defaultColor = 119.9;


		cxt.save();
		cxt.font = '12px' + ' monospace';
		cxt.textBaseline = 'middle';
		cxt.fillStyle = '#ffffff';
			cxt.fillText( canvas.getAttribute('id'), 0, canvas.height/2 );
		cxt.restore();


		cxt.save();
		cxt.beginPath();
		cxt.fillStyle= color;
		cxt.fillRect(20,0,parseInt(canvas.width)- 50,canvasR.height);
		cxt.closePath();
		cxt.restore();

		cxt.fillStyle = '#000000';
		cxt.beginPath();
		cxt.arc( 20 + (defaultColor*100)/255, parseInt(canvas.height)/2 ,4 , 0 , Math.PI*2, true );
		cxt.closePath();
		cxt.fill();


		cxt.save();
		cxt.font = '12px' + ' monospace';
		cxt.textBaseline = 'middle';
		cxt.fillStyle = '#ffffff';
			cxt.fillText( parseInt(defaultColor), 125, canvas.height/2 );
		cxt.restore();

	}

	/**
	 * Draw a rectangle with the color pass like parameter.
	 * Represent the combination color  of the three primary colors.
	 *
	 * @author Rafael Molina Linares
	 * @update 13/06/2011
	 *
	 * @method drawCurrentColor
	 * @param {string} color represents the color uses to draw the rectangle
	 */
	var drawCurrentColor = function(color){
		contextColor.save();
		contextColor.beginPath();
		contextColor.fillStyle= color;
		contextColor.fillRect(20,20,80,80);
		contextColor.closePath();
		contextColor.restore();
	}

	/**
	 * Convert a decimal number to hexadecimal code, set this color
	 * like background-color of the Node and this is written in '_divRGB' div.
	 *
	 * @author Rafael Molina Linares / Alejandro Arrabal Hidalgo
	 * @update 13/06/2011 / 31/07/2012
	 *
	 * @method colorHex
	 * @param {array} defaultColor 	keep the color RGB in hexadecimal code,
	 *															where each position represents a primary color.
	 */

	var colorHex = function(defaultColor){

		var dec2hex = function (dec){
			var Char_hexadecimales = "0123456789ABCDEF";
			var low = parseInt(dec) % 16;
			var high = (parseInt(dec) - low)/16;

			hex = "" + Char_hexadecimales.charAt(high) + Char_hexadecimales.charAt(low);
			return hex;
		}


		var color = dec2hex(defaultColor[0]) + dec2hex(defaultColor[1]) + dec2hex(defaultColor[2]);
		while(_divRGB.hasChildNodes()){
			_divRGB.removeChild(_divRGB.lastChild);
		}

		_divRGB.appendChild(document.createTextNode('#'));
		_divRGB.appendChild(document.createTextNode(color));

		setCheckedColor('#' + color);

	}

	/**
	 * Method that modify the hexadecimal color of the Node
	 * when it is pressed on one of the rectangles
	 *
	 * @author Rafael Molina Linares  / Alejandro Arrabal hidalgo
	 * @update 13/06/2011 / 31/07/2012
	 *
	 * @method selectColor
	 */

	var selectColor = function( event ){

		var mousex = event.pageX - _divContainer.offsetLeft - this.offsetLeft;
		var mousey = event.pageY - this.offsetTop;

		if(this.getAttribute('id') == "red"){
			defaultColor[0]=((mousex - 20)*255)/100;
			if(defaultColor[0] > 255) defaultColor[0]=255;
			if(defaultColor[0] < 0) defaultColor[0]=0;
			contextR.clearRect(0,0,parseInt(canvasR.width),canvasR.height);
			drawColor( canvasR, contextR, defaultColor[0], '#ff0000');
		}
		if(this.getAttribute('id') == "green"){
			defaultColor[1]=((mousex-20)*255)/100;
			if(defaultColor[1] > 255) defaultColor[1]=255;
			if(defaultColor[1] < 0) defaultColor[1]=0;
			contextG.clearRect(0,0,parseInt(canvasG.width),canvasG.height);
			drawColor( canvasG, contextG, defaultColor[1], '#00ff00');
		}
		if(this.getAttribute('id') == "blue"){
			defaultColor[2]=((mousex-20)*255)/100;

			if(defaultColor[2] > 255) defaultColor[2]=255;
			if(defaultColor[2] < 0) defaultColor[2]=0;

			contextB.clearRect(0,0,parseInt(canvasB.width),canvasB.height);
			drawColor( canvasB, contextB, defaultColor[2], '#0000ff');
		}
		colorHex(defaultColor);
		drawCurrentColor(getCheckedColor());
	}

	  /**
	   * return  the radio's checked color
	   *
	   * @author Alejandro Arrabal Hidalgo
	   * @update 31/07/2012
	   *
	   * @method getCheckedRadioValue
	   * @return {colorCSS} The radio's checked color
	   */
	  var getCheckedColor= function(){
	  	for(var i = 0; i < radio.length; i++)
		  	if(radio[i].checked)break;
	  	switch(radio[i].value){
	  	case "background":
	  		return that.getBackgroundColor();
	  		break;
	  	case "line":
	  		return that.getLineColor();
	  		break;
	  	case "text":
	  		return that.getFontColor();
	  		break;
	  	}
	  	return that.getBackgroundColor();
	  }




	  /**
	   * Set the color according to the chosen option
	   *
	   * @author Alejandro Arrabal Hidalgo
	   * @update 31/07/2012
	   *
	   * @method setCheckedRadioValue
	   * @param {colorCSS} The color to be set
	   */
	  var setCheckedColor= function(color){
	  	for(var i = 0; i < radio.length; i++) {
	  	if(radio[i].checked) break;
	  		}
	  	switch(radio[i].value){
	  	case "background":
	  		that.setBackgroundColor(color);
	  		break;
	  	case "line":
	  		that.setLineColor(color);
	  		break;
	  	case "text":
	  		that.setFontColor(color);
	  		break;
	  	}
	  }




	drawColor( canvasR, contextR, defaultColor[0], '#ff0000');
	drawColor( canvasG, contextG, defaultColor[1], '#00ff00');
	drawColor( canvasB, contextB, defaultColor[2], '#0000ff');

    drawCurrentColor(that._Backgroundcolor);


	colorHex(defaultColor);



	_divR.addEventListener('mousedown', selectColor, false);
	_divG.addEventListener('mousedown', selectColor, false);
	_divB.addEventListener('mousedown', selectColor, false);


	document.body.appendChild(_divContainer);


  _divContainer.style.top = (window.innerHeight - parseInt(_divContainer.offsetHeight) ) / 2 + "px";
  _divContainer.style.left = (window.innerWidth - parseInt(_divContainer.offsetWidth) ) / 2 + "px";
}



/**
 * Set the tag values contained inside the node because of a profile
 *
 * @author Rafael Molina Linares
 * @update 12/10/2011
 *
 * @method setTagValues
 * @param {Array} tagValues array that contains the tag values
 */

Node.prototype.setTagValues = function( tagValues ){

	if(!JSFun.isArray( tagValues ))
		return false;

	var name_tag = '';
	var value_tag = '';
	var indexEnd;

	for(var i=0;i<tagValues.length;i++){

		indexEnd = tagValues[i].indexOf(':');

		if(indexEnd == -1){
			name_tag = tagValues[i].substring(0);
		}	else {//If has been found
			name_tag = tagValues[i].substring(0,indexEnd);
			value_tag = tagValues[i].substring(indexEnd+1);
		}

		if(!this.foundInTagValues(this._tagValues,name_tag))
			this._tagValues.push([name_tag,value_tag]);
	}

	return true;
}


/**
 * Searchs the name of a tag value between an array of tag values
 *
 * @author Rafael Molina Linares
 * @update 12/10/2011
 *
 * @method foundInTagValues
 * @param {Array} array    Array of tag values
 * @param {Array} tagValue Name of the a tag value
 */

Node.prototype.foundInTagValues = function( array, tagValue  ){
	for(var i=0;i<array.length;i++)
		if(array[i][0] == tagValue)
			return true;
	return false;
}



/**
 * Set the menu of the node with the different options
 * that the contextual menu of node has, as well as
 * the actions associated with each option. The passed
 * array is contained by pairs [actions,name], where name is
 * the name that will have the option in the menu, and actions
 * are the actions that will be performed when this option be
 * pressed
 *
 * @author Rafael Molina Linares
 * @update 8/06/2011
 *
 * @method setMenu
 * @param {Array} items contain at the contextual menu
 */

Node.prototype.setMenu = function(items){
	if(items instanceof Array){
		this._menu = items;
	}
}


/**
 * Retuns the array that contains the information
 * about the contextual menu of the node
 *
 * @author Rafael Molina Linares
 * @update 8/06/2011
 *
 * @method getMenu
 * @return {Array} Information about the node's menu
 */

Node.prototype.getMenu = function(){
	return this._menu;
}


/**
 * Perfom the neccesary actions when the mouse
 * is dragged by the user
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method drag
 * @param {Number} x Coordinate x of the new position
 * @param {Number} y Coordinate y of the new position
 */

Node.prototype.drag = function( x, y ) {

  if( this._resizing ) {

    var px = x - this._x;
    var py = y - this._y;

    px = Math.round( px );
    px = px - px % 5;
    py = Math.round( py );
    py = py - py % 5;


    var width = px;
    var height = py;

    if( this._proportional ) {
      var prop = this._width / this._height;

      if( width > height ) {
        height = width / prop;
      } else {
        width = height * prop;
      }

    }

    this.setWidth( width );
    this.setHeight( height );

  } else if ( this._selected ) {

    var px = x - this._relx;
    var py = y - this._rely;

    px = Math.round( px );
    px = px - px % 5;
    py = Math.round( py );
    py = py;

    this.setPosition( px, py );
    this._moved = true;
  }
}



/**
 * Performs the necessary actions when the user
 * releases the mouse's button that had pressed
 *
 * @author Martín Vega-leal Ordóñez	/ Rafael Molina Linares
 * @update 28/11/2010 							/ 22/08/2011
 *
 * @method drop
 * @param {Number} x Coordinate x of the position
 * @param {Number} y Coordinate y of the position
 */

Node.prototype.drop = function( x, y ) {

  if ( this._moved ) {
    if( !this._alone ) {
      this._diagram.checkForParent( this );
    }


    this.updatePosition();

    if( this._parent ) {

  		this._parent.updateContainer();

			/*
				if the node is contained within a supernode, all regions
				of the supernode and the own supernode must be updated
			*/
			var superNode = this._parent.getParent();
			while(superNode){
				if( superNode instanceof SuperNode){
					superNode.notifyChange(true);
					superNode = null;
				} else {
					superNode = superNode._parent;
				}
			}
    }

  } else if( this._resizing ) {

		/*
			when the node has relation to self, the call of
			this method is necessary to update the position of relation
		*/
    this.updatePosition();

		if(this instanceof SuperNode){
			var recall = true;
			var resize = true;
	    this.notifyChange(recall, resize);
		}
		else
	    this.notifyChange();

    if( this._parent ) {
  		this._parent.updateContainer();

			/*
				if the node is contained within a supernode, all regions
				of the supernode and the own supernode must be updated
			*/
			var superNode = this._parent.getParent();
			while(superNode){
				if( superNode instanceof SuperNode){
					superNode.notifyChange(true,true);
					superNode = null;
				} else {
					superNode = superNode._parent;
				}
			}
    }

  } else if( this._selectedBefore ) {
    this.selectComponent( x, y );
  }

  this._moved = false;
  this._resizing = false;
}



/**
 * Assign the property to contain other nodes within it
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method setContainer
 */

Node.prototype.setContainer = function() {
  this._container = true;
}



/**
 * Returns if the node is container or not
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method isContainer
 * @return {Boolean} If the node is or not a container node
 */

Node.prototype.isContainer = function() {
  if( this._container )
    return true;
  else
    return false;
}



/**
 * Checks if the node is child of the given node or is
 * below it in the hierarchy of nodes
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method isChildOf
 * @param {Node} comParent Node that is checked if is the parent
 */

Node.prototype.isChildOf = function( comParent ) {
  if( this._parent == null )
    return false;
  else if( this._parent == comParent )
    return true;
  else
    return this._parent.isChildOf( comParent );
}



/**
 * Assign to the node the passed parameter as parent
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method setParent
 * @param {Node} newParent New parent of the node
 */

Node.prototype.setParent = function( newParent ) {
  if( newParent instanceof Node && newParent._container ) {
    this._parent = newParent;
  } else {
    this._parent = null;
  }
}



/**
 * Return the parent of the ndoe, if has
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method getParent
 * @return {Node} Parent node, if has assigned it
 */

Node.prototype.getParent = function() {
  return this._parent;
}



/**
 * If the node that call to the function, is container, checks
 * your minimal size taking in account the element and
 * components that contains
 *
 * @author Martín Vega-leal Ordóñez			/ Rafael Molina Linares
 * @update 28/11/2010   								/ 20/08/2011
 *
 * @method updateContainer
 * @param {boolean} recall If the parent's method is called
 */

Node.prototype.updateContainer = function(recall) {

  if(!(recall == false || recall == true))
	  recall = true;

  if( this._container ) {

    var i;

    var lx = this._x;
    var ly = this._y;

    var rx = this._x;
    var ry = this._y;

    var elem;
    var elemRigthX, elemRigthY, elemLeftX, elemLeftY;

		/*
			Stores the coordinates of the extreme right,
			left, bottom and top of the child nodes
		*/
    for( i in this._nodeChilds ) {

      elem = this._nodeChilds[i];

			if(elem._visible){
		    elemLeftX = elem._x;
		    elemLeftY = elem._y;
		    elemRigthX = elem._x + elem._width;
		    elemRigthY = elem._y + elem._height;


		    if( elemRigthX > rx )
		      rx = elemRigthX;
		    if( elemRigthY > ry )
		      ry = elemRigthY;

		    if( elemLeftX < lx )
		      lx = elemLeftX;
		    if( elemLeftY < ly )
		      ly =elemLeftY;
			}
    }

		/*
			Update the size, minimal size and position of the node
			taking in account the coordinates calculate previously
		*/
    if( lx < this._x || ly < this._y ) {
      this.setWidth( this._x - lx + this._width );
      this.setHeight( this._y - ly + this._height );

      this._x = lx;
      this._y = ly;

      this.setMinWidth( rx - lx );
      this.setMinHeight( ry - ly );
    } else {

      this.setMinWidth( rx - this._x );
      this.setMinHeight( ry - this._y );
    }

    this._prex = this._x;
    this._prey = this._y;

    this.updateComponents();

    if( this._parent && recall) {
      this._parent.updateContainer();
		}
	}
}



/**
 * Updates the elememt's position regarding the movement indicated
 * by the parameters and transmits it to its child elements
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method updatePosition
 * @param {Number}  movx Movement in the x axis
 * @param {Number}  movy Movement in the y axis
 * @param {Boolean} displacementRegion Indicates that this method has been called because of a region's displacement
 */

Node.prototype.updatePosition = function( movx, movy, displacementRegion ) {
  var i, comp;

	displacementRegion = displacementRegion || false;

  if( movx == undefined || movy == undefined ) {
		/*
			If the movement is given as a point, this
			movement is passed to its x,y coordinates
		*/
    var mov = this.getMovement();
    var movx = mov.getX();
    var movy = mov.getY();

    for( i in this._relations ) {
      this._relations[i].updatePosition();
    }
  } else {
    this._x += movx;
    this._y += movy;
  }

  this.resetMovement();

  for( i in this._components ) {
    this._components[i].updatePosition( movx, movy );
  }

  for( i in this._relations ) {

		var parentRel = this._relations[i].getParent();

    /*
      If the parent of the node and the relation's parent are different
      or the call to the method has been produced by the displacement
      of the a region of a super-node
    */
    if( ( parentRel != this._parent &&
				!(parentRel instanceof SuperNode && parentRel == this._parent._parent)) ||
				(displacementRegion) ) {
      this._relations[i].notifyChange();
    }
  }

  if( this._container ) {

    for( i in this._nodeChilds ) {
      this._nodeChilds[i].updatePosition( movx, movy );
    }

    for( i in this._relationChilds ) {
      this._relationChilds[i].updatePosition( movx, movy );
    }
  }
}



/**
 * Receives a y coordinate and the node returns the
 * horizontal limits of the figure in this region
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method getParticularWidth
 * @param {Number} y Position 'y' where the width is checked
 * @return {Array} Limits of the figure in the given height
 */

Node.prototype.getParticularWidth = function( y ) {
  if( y >= this._y && y <= this._y + this._height ) {
    return [ this._x, this._width ];
  }

  return [ 0, 0 ];
}


/**
 * Receives a x coordinate and the node returns the vertical limits
 * of the figure in this position
 *
 * @author Rafael Molina Linares
 * @update 3/8/2011
 *
 * @method getParticularHeight
 * @param {Number} x Position 'x' where the width will be checked
 * @return {Array} Limits of the figures in the indicated width
 */

Node.prototype.getParticularHeight = function( x ) {
  if( x >= this._x && x <= this._x + this._width ) {
    return [ this._y, this._height ];
  }

  return [ 0, 0 ];
}



/**
 * Checks if the given point is over a node's component
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method isOverComponent
 * @private
 * @param {Number} x Coordinate x of the point to check
 * @param {Number} y Coordinate y of the point to check
 * @return {Boolean} If the point is over the component
 */

Node.prototype.isOverComponent = function( x, y ) {

  var i;

  for( i = 0; i < this._components.length; i += 1 ) {

    if( this._components[i].isOver( x, y ) ) {
      return true;
    }
  }

  return false;
}



/**
 * Checks if the given point is over a node's component and
 * in affirmative case, selects it
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method selectComponent
 * @private
 * @param {Number} x Coordinate x of point to check
 * @param {Number} y Coordinate y of point to check
 */

Node.prototype.selectComponent = function( x, y ) {
  var i;

  for( i = 0; i < this._components.length; i += 1 ) {

    if( this._components[i].select( x, y ) ) {
      this._activeComponent = this._components[i];
      return;
    }
  }
}



/**
 * The grafical style of the node is defined, adding an object of type
 * NodeFigure that draws an grafic in the node's position
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method addFigure
 * @param {NodeFigure} newFig New figure that is added to the node
 */

Node.prototype.addFigure = function( newFig ) {
  if( newFig instanceof NodeFigure ) {
		if(!(newFig instanceof FromImageFigure))
	    this.setBackgroundColor(newFig._color);
		this.setLineWidth(newFig._lineWidth);
		this.setLineColor(newFig._lineColor);
    this._figures.push( newFig );
  }
}


/**
 * The grafical style of the node is remove, deleting an object of type
 * NodeFigure passed as parameter
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method delFigure
 * @param {NodeFigure} fig Figure that must be remove
 */

Node.prototype.delFigure = function( fig ) {

  if( fig instanceof NodeFigure ) {
		for(var i=1;i<this._figures.length;i++){
			if(this._figures[i] == fig){
				if(this._selectedFigure == i)
					this.setSelectedFigure(0);
				this._figures.splice(i,1);
				break;
			}
		}
  }
}



/**
 * Set the RGB color to the Node element for drawing it
 *
 * @author Rafael Molina Linares
 * @update 7/06/2011
 *
 * @method setBackgroundColor
 * @param {char} color RGB color to be established to the Node
 */

Node.prototype.setBackgroundColor = function( color ) {
    this._Backgroundcolor = color;
    for(var i=0;i<this._figures.length;i++)
    	this._figures[i].setColor(color);
}



/**
 * Get the RGB color to the Node element
 *
 * @author Rafael Molina Linares
 * @update 7/06/2011
 *
 * @method getBackgroundColor
 *
 */

Node.prototype.getBackgroundColor = function( ) {
    return this._Backgroundcolor;
}


/**
 * Set the figure that will be drawn and if the
 * figure to draw is a image, the components of
 * the node are hidden
 *
 * @author Rafael Molina Linares
 * @update 17/10/2011
 *
 * @method setSelectedFigure
 * @param {Number} numFig Position of the figure's array that will be drawn
 *
 */

Node.prototype.setSelectedFigure = function( numFig ){

	if(JSFun.isNumber( numFig ) && numFig > -1 && numFig < this._figures.length){


		if(this._selectedFigure == numFig)
			return false;


		this._selectedFigure = numFig;

		if(this._figures[numFig] instanceof FromImageFigure){

			for(var i=0;i<this._components.length;i++){

				if(this._components[i]._id == 'name'){

					if(!this._beforeNameComponent){

						this._beforeNameComponent = this._components[i];

						var text = this._beforeNameComponent._text;
						var text_color= this._beforeNameComponent._font_color;
						var text_family= this._beforeNameComponent._font_family;
						var font_size= this._beforeNameComponent._font_size;
						var font_weight=this._beforeNameComponent._font_weight;
						var selected = this._beforeNameComponent.selected;

						/*
							A new component is created and put in place of the name's component.
							It takes into account whether the before component (now stored in
							this._beforeNameComponent) was a TextArea or TextBox
						*/
						if(this._beforeNameComponent instanceof TextArea)
							this._components[i] = new TextArea({ id:'name',text: text.join('\n'),text_color: text_color,text_family: text_family,font_size: font_size,font_weight: font_weight,selected: selected,position: Component.Bottom, margin: 3});
						if(this._beforeNameComponent instanceof TextBox)
							this._components[i] = new TextBox({ id:'name',text: text,text_color: text_color,text_family: text_family,font_size: font_size,font_weight: font_weight,selected: selected,position: Component.Bottom, margin: 3});
						this._components[i].setParent(this);
					}
				} else {
					this._components[i].setVisibility(false);
				}
			}

			this._beforeHeight = this._height;
			this._beforeWidth = this._width;

			for(i=0;i<this._nodeChilds.length;i++){
				this._nodeChilds[i].setVisibility( false );
			}
		} else {//If the figure selected for drawing isn't a image

			for(var i=0;i<this._components.length;i++){

				if(this._components[i]._id == 'name' ){

					if(this._beforeNameComponent){

						if(this._beforeNameComponent instanceof TextArea)
							this._beforeNameComponent.setText( this._components[i]._text.join('\n') );
						else if(this._beforeNameComponent instanceof TextBox)
							this._beforeNameComponent.setText( this._components[i]._text );

						this._components[i] = this._beforeNameComponent;

						this._beforeNameComponent = null;
					}
				} else {

					if( !(this._components[i] instanceof SpecificationItem) ||
					    this._components[i] instanceof SpecificationItem && this._components[i].getValue() != ''){

						this._components[i].setVisibility(true);
					}
				}
			}

			for(i=0;i<this._nodeChilds.length;i++){
				this._nodeChilds[i].setVisibility( true );
			}

			this.setHeight(this._beforeHeight);
			this.setWidth(this._beforeWidth);

			this.notifyChange(true);

			this._diagram._sortNodesByArea();
		}
		this.updateComponents();
	}
	return true;
}


/**
 * Set the node's visibility, so such to its components and its child nodes
 *
 * @author Rafael Molina Linares
 * @update 17/10/2011
 *
 * @method setVisibility
 * @private
 * @param {Boolean} bool Visibility to apply to the node
 */

Node.prototype.setVisibility = function( bool ){

	this._visible = bool;
	var _setVisibility = true;

	/*
		If the node is drawn with a image because of the existence of a stereotype object,
		and the node going to be made visible, should be taken in account that only
		has to be visible the component that shows the node's name
	*/
	if(this._selectedFigure && bool)
		_setVisibility = false;

	for(var i=0;i<this._components.length;i++){
		if( _setVisibility || ( !_setVisibility && this._components[i]._id == 'name'))
			this._components[i].setVisibility(bool);
	}

	if(this._container && _setVisibility){
		for(i=0;i<this._nodeChilds.length;i++){
			this._nodeChilds[i].setVisibility( bool );
		}
	}
}


/**
 * Draws the figures that the node has
 *
 * @author Martín Vega-leal Ordóñez  /  Rafael Molina Linares
 * @update 28/11/2010								 /  17/10/2011
 *
 * @method drawFigures
 * @private
 * @param {CanvasRenderingContext2D} context Context of the canvas element
 */

Node.prototype.drawFigures = function( context ) {
  var i;
  for( i = 0; i < this._figures.length; i += 1 ) {

		if(i == this._selectedFigure){
			this._figures[i].draw( context, this._x, this._y, this._width, this._height );
		}
  }
}



/**
 * Adds a component to the node, to add funcionality
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method addComponent
 * @param {Component} newCom New component of the node
 */

Node.prototype.addComponent = function( newCom ) {

  if( newCom instanceof Component ) {

    newCom.setParent( this );
    this._components.push( newCom );
    this.updateComponents();
  }
}



/**
 * Calculates the minimal size of the node taking
 * in account the size of its components, do
 * not reduce the size beyond which occupy
 *
 * @author Martín Vega-leal Ordóñez 		/ Rafael Molina Linares
 * @update 28/11/2010										/ 13/09/2011
 *
 * @method calculateSize
 * @protected
 */

Node.prototype.calculateSize = function() {

  if( this._components.length > 0 ) {
    var comp;
    var maxWidth = 0;
    var maxHeight = 0;
	var widthComp;
	var foundInvisibleComp = false;

    var i;

    for( i in this._components ) {
      comp = this._components[i];

			if( comp._visible && !(comp instanceof RegionLine) && (comp.getPosition() == Component.Float || (comp.getPosition() == Component.BottomLeft && comp._visible) || comp.getPosition() == Component.BottomRight || comp.getPosition() == Component.Xmovement) ) {

				if(comp._orientation){

					maxWidth += comp.getWidth();

					if( !(comp instanceof RegionLine) && comp.getHeight() > maxHeight ){
					  maxHeight = comp.getHeight();
					}
				} else {//If the component has a horizontal orientation

					maxHeight += comp.getHeight();

					widthComp = (comp.getPosition() == Component.Xmovement) ? (comp.getWidth() + 2* comp._parent._Xmovement) : comp.getWidth();


					if( !(comp instanceof RegionLine) && widthComp > maxWidth ){
					  maxWidth = widthComp;
					}
				}
			} else if(!comp._visible){
				foundInvisibleComp = true;
			}
    }

		/*
			If not found any visible component, and therefore
			the maximum height is 0, the maximum height is
			put to 20
		*/
		if(maxHeight == 0 && foundInvisibleComp == true)
			maxHeight = 20;

		/*
			If not found any visible component, and therefore
			the maximum width is 0, the maximum height is
			put to 20
		*/
		if(maxWidth == 0 && foundInvisibleComp == true)
			maxWidth = 20;

    if( this._container && !this._selectedFigure ) {

      if( maxHeight > this._minHeight )
        this.setMinHeight( maxHeight );

      if( maxWidth > this._minWidth )
        this.setMinWidth( maxWidth );

    } else {//If isn't a container node or uses a another figure than the default figure
      if( maxHeight > 0 )
        this.setMinHeight( maxHeight );

      if( maxWidth > 0 )
        this.setMinWidth( maxWidth );
    }
  }
}



/**
 * We define a box where you insert the components within
 * the node then updates the positions of the components
 * based on these values
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method insertComponents
 * @protected
 * @param {Number} x Coordinate x
 * @param {Number} y Coordinate y
 * @param {Number} width Width of the box
 * @param {Number} height Height of the box
 */

Node.prototype.insertComponents = function( x, y, width, height ) {

  var i;
  var comp;

	var ytop  = -1;
	var ybottom = -1;
	var yleft  = -1;
	var yright = -1;

	var topComponents = [];

	/*
		Coordinates for each components are stablished to your type of position
		between the node
	*/
  for( i = 0; i < this._components.length; i++ ) {
    comp = this._components[i];

    if( comp instanceof Separator ) {

      if(comp._orientation) {
        var values = this.getParticularHeight( x );
        comp.setCoordinates( x, values[0] );
        comp.setHeight( values[1] - 2*comp._margin );
      }
      else {
        var values = this.getParticularWidth( y );
        comp.setCoordinates( values[0], y );
        comp.setWidth( values[1] );
      }

    } else if( comp.isCentered() ) {
      if(comp._orientation)
        comp.setCoordinates( x , y + height / 2 - comp.getHeight() / 2 );
      else
        comp.setCoordinates( x  + width / 2 - comp.getWidth() / 2, y );

    } else if( comp.getPosition() == Component.TopRight ) {

      comp.setCoordinates( x + width - comp.getWidth(), this._y );

    } else if( comp.getPosition() == Component.TopLeft ) {

      comp.setCoordinates( x, this._y );

    } else if( comp.getPosition() == Component.Top && comp._visible ) {

			topComponents.push(comp);

    } else if( comp.getPosition() == Component.Bottom  && comp._visible) {

			if(ybottom == -1) ybottom = this._y + this._height;
      comp.setCoordinates( this._x + this._width / 2 - comp.getWidth() / 2, ybottom  );
			ybottom += comp.getHeight();

    } else if( comp.getPosition() == Component.Left && comp._visible ) {

			if(yleft == -1) yleft = this._y + this._height / 2 - comp.getHeight() / 2;
      comp.setCoordinates( this._x - comp.getWidth(), yleft  );
			yleft += comp.getHeight();

    } else if( comp.getPosition() == Component.Right && comp._visible ) {

			if(yright == -1) yright = this._y + this._height / 2 - comp.getHeight() / 2;
      comp.setCoordinates( this._x + this._width, yright  );
			yright += comp.getHeight();

    }else if( comp.getPosition() == Component.BottomLeft ) {

      comp.setCoordinates( this._x , this._y + this._height - comp.getHeight() );

    } else if( comp.getPosition() == Component.BottomRight ) {

      comp.setCoordinates( this._x + this._width - comp.getWidth(), this._y + this._height - comp.getHeight() );

    } else if( comp.getPosition() == Component.Xmovement ) {

      comp.setCoordinates( x + this._Xmovement, y );

    } else {
      comp.setCoordinates( x , y );
      comp.setSuperWidth( this._width );
    }

		/*
			If the component is of type Float or Xmovement, the
			x or y coordinate(according to the orientation of
			the component) is increased for the next components
		*/
    if( comp.getPosition() == Component.Float || comp.getPosition() == Component.Xmovement ) {
      if(comp._orientation)
        x += comp.getWidth();
      else
        y += comp.getHeight();
    }

    if( comp instanceof SuperComponent ) {
      comp.updateComponents();
    }

  }

	for(i=topComponents.length-1;i>-1;i--){

		if(ytop == -1) ytop = this._y - topComponents[i].getHeight();
    topComponents[i].setCoordinates( this._x + this._width / 2 - topComponents[i].getWidth() / 2, ytop  );
		if(i!=0)
			ytop -= topComponents[i-1].getHeight();

    if( topComponents[i] instanceof SuperComponent ) {
      topComponents[i].updateComponents();
    }
	}
}



/**
 * Updates the position of the node's components
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method updateComponents
 * @param {Boolean} recall If your value is true, notifies changes in the relations of the node
 * @private
 */

Node.prototype.updateComponents = function(recall) {

  recall = (recall == undefined) ? true : recall;

  if( this._components.length > 0 ) {
    this.calculateSize();
    this.insertComponents( this._x, this._y, this._width, this._height );
  }

  if(recall){
    var i;
    for( i in this._relations ) {
      this._relations[i].notifyChange();
    }
  }
}



/**
 * Draws the different components of the node
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method drawComponents
 * @private
 * @param {CanvasRenderingContext2D} context Context of the canvas element
 */

Node.prototype.drawComponents = function( context ) {
  var i;

  for( i = 0; i < this._components.length; i += 1 ){
    this._components[i].draw( context );
    }
}



/**
 * Draws the shapes and the active elements of the components
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method drawComponentsShape
 * @private
 * @param {CanvasRenderingContext2D} context Context of the canvas element
 */
Node.prototype.drawComponentsShape = function( context ) {
  var i;

  for( i = 0; i < this._components.length; i += 1 )
    this._components[i].drawShape( context );
}



/**
 * Assigns to the node the property of be rezising by the user
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method setMoveable
 */
Node.prototype.setMoveable = function() {
  this._moveable = true;
}



/**
 * Assigns to the node the property of be proportional, ie,
 * when the user change your size, this change will
 * maintain the size ratio width/height
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method setProportional
 */
Node.prototype.setProportional = function() {
  this._proportional = true;
}



/**
 * Assigns the width of the node
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method setWidth
 * @param {Number} width New width of the node
 */
Node.prototype.setWidth = function( width ) {
  if( width < this._minWidth )
    width = this._minWidth;
  this._width = width;
}



/**
 * Assigns the height of the node
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method setHeight
 * @param {Number} width New height of the node
 */
Node.prototype.setHeight = function( height ) {
  if( height < this._minHeight )
    height = this._minHeight;

  this._height = height;
}



/**
 * Assigns the minimal width that can have the node
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method setMinWidth
 * @param {Number} width New minimal width of the node
 */
Node.prototype.setMinWidth = function( mw ) {
  if( mw < 0 )
    this._minWidth = 0;
  else
    this._minWidth = mw;

  if( this._width < this._minWidth ) {
    this._width = this._minWidth;
  }
}



/**
 * Assigns the minimal height that can have the node
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method setMinHeight
 * @param {Number} width New minimal height of the node
 */
Node.prototype.setMinHeight = function( mh ) {
  if( mh < 0 )
    this._minHeight = 0;
  else
    this._minHeight = mh;

  if( this._height < this._minHeight ) {
    this._height = this._minHeight;
  }
}



/**
 * Returns the width of the node
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method getWidth
 */
Node.prototype.getWidth = function() {
  return this._width;
}



/**
 * Returns the height of the node
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method getHeight
 */
Node.prototype.getHeight = function() {
  return this._height;
}



/**
 * Draws fully the node in the canvas element,
 * calls to the drawing sub-functions to draw
 * all components and figures of the node
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Context of the canvas element
 */
Node.prototype.draw = function( context ) {

	if(!this._visible)
		return;

  context.save();
  context.fillStyle = NodeStyle.shape_color;

  if( this._moveable && this._selected ) {
    context.fillRect( parseInt( this._x + this._width ), parseInt( this._y + this._height ), 5, 5 );
  }
  context.restore();

  this.drawFigures( context );

  this.drawComponents( context );

  if( this._selected ) {
    this.drawComponentsShape( context );
  }
}



/**
 * Checks if the given point is over the node or
 * some of its components
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method isOver
 * @param {Number} x Coordinate x of the point to check
 * @param {Number} y Coordinate y of the point to check
 * @return {Boolean} If the point is over the node
 */
Node.prototype.isOver = function( x, y ) {
  if( x instanceof Point ) {
    y = x.getY();
    x = x.getX();
  }
  if(  x >= this._x && x <= this._x + this._width && y >= this._y && y <= this._y + this._height ) {
    return true;
  }
  return false;
}


/**
 * Checks if the given point like parameter is over the position before of the node or
 * some of your components, and the x coordinate of point is over the current position of the node
 *
 * @author Rafael Molina Linares
 * @update 28/08/2011
 *
 * @method isOverBeforePosition
 * @param {Number} x Coordinate of point to check
 * @param {Number} y Coordinate of point to check
 * @return {Boolean} If the point is over the node
 */

Node.prototype.isOverBeforePosition = function( x, y ) {
  if( x instanceof Point ) {
    y = x.getY();
    x = x.getX();
  }
	if(    x >= this._prex && x <= this._prex + this._width && y >= this._prey && y <= this._prey + this._height
			&& x >= this._x && x <= this._x + this._width){
    return true;
  }
  return false;
}


/**
 * Returns the area occupied by the node
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method getArea
 * @return {Number} Area occupied by the node
 */
Node.prototype.getArea = function() {
  return this._width * this._height;
}



/**
 * Receives the deleting notification of a child component and delete it
 *
 * @author Rafael Molina Linares
 * @update 1/11/2010
 *
 * @method notifyDelete
 * @param {Component} dcomp Component that will be remove
 */
Node.prototype.notifyDelete = function( dcomp ) {
  if(this._parent instanceof SuperNode){

    var i;

    for( i in this._components ) {
      if( this._components[i] == dcomp ) {
        this._components.splice( i, 1 );
        break;
      }
    }

    this.updateComponents();

  }
}


/**
 * Draw the node's shape
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method drawShape
 * @param {CanvasRenderingContext2D} context Contexto del elemento canvas
 */
Node.prototype.drawShape = function( context ) {
  context.save();
  context.lineWidth = 2.5;
  context.strokeStyle = NodeStyle.shape_color;
  context.strokeRect( JSGraphic.toPixel( this._x ), JSGraphic.toPixel( this._y ), this._width, this._height);
  context.restore();

}



/**
 * Returns the central point of the node
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method getCentralPoint
 * @return {Point} Coordinates of the central point
 */
Node.prototype.getCentralPoint = function() {
  return new Point( this._x + this._width/2, this._y + this._height/2 );
}


/**
 * Returns the insection point between the given by x,y parameters
 * and the node's form
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method getLinkCentered
 * @param {Number} x Coordinate x of the point
 * @param {Number} y Coordinate y of the point
 * @return {Point} Intersection's point with the edyes of the node
 */
Node.prototype.getLinkCentered = function( x, y ) {
  if( x instanceof Point ) {
    y = x.getY();
    x = x.getX();
  }

  var incx = 0;
  var incy = 0;

  var width = this._width / 2;
  var height = this._height /2;

  var cx = this._x + width;
  var cy = this._y + height;

  if( x - cx != 0 ) {
    var m = ( y - cy ) / ( x - cx );
    incx = Math.abs( height / m );
    incy = Math.abs( width * m );
  } else {
    incx = 0;
    incy = height;
  }

  if( incx > width ) incx = width;
  if( incy > height ) incy = height;

  if( x < cx ) incx = - incx;
  if( y < cy ) incy = - incy;

  return new Point( cx + incx, cy + incy );
}


/**
 * Returns the insection point between the given by x,y parameters
 * and the cx,cy parameters
 *
 * @author Rafael Molina Linares
 * @update 10/09/2011
 *
 * @method getLink
 * @param {Number} x Coordinate x of first point
 * @param {Number} y Coordinate y of first point
 * @param {Number} x Coordinate x of second point
 * @param {Number} y Coordinate y of second point
 * @return {Point} Intersection point with the node's borders
 */
Node.prototype.getLink = function( x, y, cx, cy ) {

	if(!cx || !cy)
		return this.getLinkCentered(x, y);


  var incx = 0;
  var incy = 0;

  var width = cx - this._x;
  var height = cy - this._y;

	if(x > cx) width =  this._width - width;
	if(y > cy) height = this._height - height;

  if( x - cx != 0 ) {
    var m = ( y - cy ) / ( x - cx );

    incx = Math.abs( height / m );
    incy = Math.abs( width * m );
  } else {
    incx = 0;
    incy = height;
  }

  if( incx > width ) incx = width;
  if( incy > height ) incy = height;

  if( x < cx ) incx = - incx;
  if( y < cy ) incy = - incy;

  return new Point( cx + incx, cy + incy );
}



/**
 * Delete the given relation, this has been removed,
 * and therefore, the node should delete
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method notifyDeleted
 * @return {Relation} Relation that has been removed
 */
Node.prototype.notifyDeleted = function( rel ) {
  var i;

  for( i in this._relations ) {
    if( this._relations[i] == rel ) {
      this._relations.splice( i, 1 );
    }
  }
}


/**
 * Deletes the element and all elements that have relation with him, and
 * meaningless without the existence, as child nodes or relations
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method remove
 */
Node.prototype.remove = function() {
  var i;

  while( this._relations[0] ) {
    ( this._relations.pop() ).remove();
  }

  if( this._parent ) {
    var parent = this._parent;
    this._parent.delChild( this );
    parent.updateContainer();
  }

  if( this._container ) {
    while( this._nodeChilds[0] ) {
      ( this._nodeChilds.pop() ).remove();
    }
  }

  this._diagram.notifyDeleted( this );
}



/**
 * Returns a string identifying the kind of element
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method toString
 * @return {String} Name identifying the item class
 */
Node.prototype.toString = function() {
  return "Node" ;
}




/**
 * Get the current node line width
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 30/03/2012	/	04/08/2012
 *
 * @method getLineWidth
 * @return {number} current line width
 */

Node.prototype.getLineWidth = function() {
	return this._lineWidth;
}




/**
 * Set the line width to the Node element for drawing it
 *
 * @author Jose Maria Gomez Hernandez	/	Alejandro Arrabal Hidalgo
 * @update 30/03/2012	/	30/07/2012
 *
 * @method setLineWidth
 * @param {number} width line to be established to the Node
 */

Node.prototype.setLineWidth = function( width ) {
	this._lineWidth=width;
    for ( var i=0; i<this._figures.length; i++)		this._figures[i].setLineWidth(width);
}




/**
 * Get the  line color  to the Node element
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 31/07/2012
 *
 * @method getLineColor
 * @return {colorCSS} the current node's line color
 */

Node.prototype.getLineColor = function( ) {
    return this._lineColor;
}


/**
 * Set the line color to the Node element for drawing it
 *
 * @author Jose Maria Gomez Hernandez	/	Alejandro Arrabal Hidalgo
 * @update 30/03/2012	/	30/07/2012
 *
 * @method setLineColor
 * @param {char} color RGB color to be established to the line of the Node
 */

Node.prototype.setLineColor = function( color ) {
	this._lineColor = color;
    for(var i=0;i<this._figures.length;i++)
    	this._figures[i].setLineColor(color);
}




/**
 * get the Node's current font family
 *
 * @author  Alejandro Arrabal Hidalgo
 * @update 04/08/2012
 *
 * @method getFontFamily
 * @param {family} current node's font family
 */

Node.prototype.getFontFamily = function(){
	return this._fontFamily;
}



/**
 * Modifies the Node's font family
 *
 * @author Jose Maria Gomez Hernandez / Alejandro Arrabal Hidalgo
 * @update 03/04/2012 / 02/08/2012
 *
 * @method setFontFamily
 * @param {family} font's family to stablish
 */

Node.prototype.setFontFamily = function( family ) {
	var i;
	this._fontFamily = family;
	for( i in this._components ){
		this._components[i].setFontFamily(family);
	}
}




/**
 * Get the font color  to the Node element
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 02/08/2012
 *
 * @method getFontColor
 * @return {colorCSS}the current component's font color
 */

Node.prototype.getFontColor = function( ) {
    return this._fontColor;
}




/**
 * Modifies the Node's font color
 *
 * @author Jose Maria Gomez Hernandez / Alejandro Arrabal Hidalgo
 * @update 03/04/2012 / 02/08/2012
 *
 * @method setFontColor
 * @param {color} font's color to stablish
 */

Node.prototype.setFontColor = function( color ) {
	var i;
	this._fontColor=color;
	for( i in this._components ){
		this._components[i].setFontColor(color);
	}
}



/**
 * Get the font size  to the Node element
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 03/08/2012
 *
 * @method getFontSize
 * @return {number}the current component's font size
 */

Node.prototype.getFontSize = function( ) {
    return this._fontSize;
}




/**
 * Modifies the Node's font size
 *
 * @author  Alejandro Arrabal Hidalgo
 * @update  03/08/2012
 *
 * @method setFontSize
 * @param {number} size of the font to stablish
 */

Node.prototype.setFontSize = function( size ) {
	var i;
	this._fontSize=size;
	for( i in this._components )this._components[i].setFontSize(size);
	var recall = true;
	var resize = true;
	this.notifyChange(recall, resize);
}



/**
 * get the Node's font style
 *
 * @author  Alejandro Arrabal Hidalgo
 * @update  08/08/2012
 *
 * @method getFontStyle
 * @return {cssFont-Style} the current font style
 */

Node.prototype.getFontStyle = function( ) {
		return this._fontStyle;
}




/**
 * Modifies the Node's font style
 *
 * @author  Alejandro Arrabal Hidalgo
 * @update  05/08/2012
 *
 * @method setFontStyle
 * @param {cssFont-Style} style of the font to stablish
 */

Node.prototype.setFontStyle = function( style ) {
	var i;
	this._fontStyle=style;
	for( i in this._components ){
		this._components[i].setFontStyle(style);
	}

}




/**
 * get the Node's font weight
 *
 * @author  Alejandro Arrabal Hidalgo
 * @update  08/08/2012
 *
 * @method getFontStyle
 * @return {cssFont-Weight} the current font weight
 */

Node.prototype.getFontWeight = function( ) {
		return this._fontWeight;
}




/**
 *	Modifies the Node's font weight
 *
 * @author  Alejandro Arrabal Hidalgo
 * @update  08/08/2012
 *
 * @method setFontWeight
 * @param {cssFont-Weight} font weight to stablish
 */

Node.prototype.setFontWeight = function( weight ) {
	var i;
	this._fontWeight=weight;
	for( i in this._components ){
		this._components[i].setFontWeight(weight);
	}
}



/**
 * Show the dialog for changing the background-color of the Node.
 *
 * @author Rafael Molina Linares
 * @update 8/06/2011
 *
 * @method showColorDialog
 *
 */

Node.prototype.showColorDialog = function( params ) {

	var that = params.that || this;

	var colorBackup = that._Backgroundcolor;

	var numHex = that._Backgroundcolor.split('#')[1];

	var defaultColor = new Array( parseInt(numHex.slice(0,2),16),
				     									  parseInt(numHex.slice(2,4),16),
				     										parseInt(numHex.slice(4,6),16));

	var _divContainer = document.createElement('div');
	_divContainer.className = "ud_popupColor";

	var _divBlock1 = document.createElement('div');
	_divBlock1.setAttribute('id','divBlock1');

	var _divBlock2 = document.createElement('div');
	_divBlock2.setAttribute('id','divBlock2');

	var _divRGB = document.createElement('div');
	_divRGB.setAttribute('id','colorHtml');
	_divRGB.style.color = '#ffffff';

	var _divR = document.createElement('div');
	_divR.setAttribute('id','red');

	var canvasR = document.createElement('canvas');
	canvasR.setAttribute('id','R');
	canvasR.width = 150;
	canvasR.height = 20;

	_divR.appendChild(canvasR);
	var contextR = canvasR.getContext('2d');

	var _divG = document.createElement('div');
	_divG.setAttribute('id','green');

	var canvasG = document.createElement('canvas');
	canvasG.setAttribute('id','G');
	canvasG.width = 150;
	canvasG.height = 20;

	_divG.appendChild(canvasG);
	var contextG = canvasG.getContext('2d');

	var _divB = document.createElement('div');
	_divB.setAttribute('id','blue');

	var canvasB = document.createElement('canvas');
	canvasB.setAttribute('id','B');
	canvasB.width = 150;
	canvasB.height = 20;

	_divB.appendChild(canvasB);
	var contextB = canvasB.getContext('2d');

	var _divColor = document.createElement('div');
	_divColor.setAttribute('id','divSelectColor');

	var canvasColor = document.createElement('canvas');
	canvasColor.setAttribute('id','selectColor');
	canvasColor.width = 90;
	canvasColor.height = 90;

	_divColor.appendChild(canvasColor);
	var contextColor = canvasColor.getContext('2d');


	var form = document.createElement("form");
  var button_close = document.createElement("input");
  button_close.setAttribute( "type", "submit" );
  button_close.setAttribute( "value", "ok" );

  var button_cancel = document.createElement("input");
  button_cancel.setAttribute( "type", "submit" );
  button_cancel.setAttribute( "value", "cancel" );

  var closeWindow = function ( event ) {

		that.notifyDraw();

		/*
			Removes the element div that contains the
			dialog to change the color of the node
		*/
    document.body.removeChild( _divContainer );
  }

  var cancelWindow = function ( event ) {
		that.setBackgroundColor(colorBackup);
    document.body.removeChild( _divContainer );//elimina el div que contiene la informacion xml de los diagramas
  }

	button_close.addEventListener('click', closeWindow, false );
	button_cancel.addEventListener('click', cancelWindow, false );

  form.onsubmit = function() { return false; }

	button_close.focus();

	form.appendChild(button_close);
	form.appendChild(button_cancel);

	_divBlock1.appendChild(_divRGB);
	_divBlock1.appendChild(_divR);
	_divBlock1.appendChild(_divG);
	_divBlock1.appendChild(_divB);
	_divBlock1.appendChild(form);
	_divContainer.appendChild(_divBlock1);


	_divBlock2.appendChild(_divColor);
	_divBlock2.appendChild(document.createElement('div'));
	_divContainer.appendChild(_divBlock2);


	/**
	 * Draws in the canvas a rectangle with a circle whose
	 * position represents a color level between 0 and 255.
	 *
	 * @author Rafael Molina Linares
	 * @update 13/06/2011
	 *
	 * @method drawColor
	 * @param {div} canvas 		Div that contains to the canvas element
	 * @param {CanvasRenderingContext2D} 	cxt 		Context of the canvas element
	 * @param {string} 	defaultColor 	hexadecimal color that determines the position of the circle
	 * @param {string} 	color 		    represents the color uses to draw the rectangle
	 */

	var drawColor = function( canvas,cxt,defaultColor,color){

		if(defaultColor == 0)
			defaultColor = 0.1;
		else if(defaultColor == 120)
			defaultColor = 119.9;


		cxt.save();
		cxt.font = '12px' + ' monospace';
		cxt.textBaseline = 'middle';
		cxt.fillStyle = '#ffffff';
			cxt.fillText( canvas.getAttribute('id'), 0, canvas.height/2 );
		cxt.restore();


		cxt.save();
		cxt.beginPath();
		cxt.fillStyle= color;
		cxt.fillRect(20,0,parseInt(canvas.width)- 50,canvasR.height);
		cxt.closePath();
		cxt.restore();

		cxt.fillStyle = '#000000';
		cxt.beginPath();
		cxt.arc( 20 + (defaultColor*100)/255, parseInt(canvas.height)/2 ,4 , 0 , Math.PI*2, true );
		cxt.closePath();
		cxt.fill();


		cxt.save();
		cxt.font = '12px' + ' monospace';
		cxt.textBaseline = 'middle';
		cxt.fillStyle = '#ffffff';
			cxt.fillText( parseInt(defaultColor), 125, canvas.height/2 );
		cxt.restore();

	}

	/**
	 * Draw a rectangle with the color pass like parameter.
	 * Represent the combination color  of the three primary colors.
	 *
	 * @author Rafael Molina Linares
	 * @update 13/06/2011
	 *
	 * @method drawCurrentColor
	 * @param {string} color represents the color uses to draw the rectangle
	 */
	var drawCurrentColor = function(color){

		contextColor.save();
		contextColor.beginPath();
		contextColor.fillStyle= color;
		contextColor.fillRect(20,20,80,80);
		contextColor.closePath();
		contextColor.restore();
	}

	/**
	 * Convert a decimal number to hexadecimal code, set this color
	 * like background-color of the Node and this is written in '_divRGB' div.
	 *
	 * @author Rafael Molina Linares
	 * @update 13/06/2011
	 *
	 * @method colorHex
	 * @param {array} defaultColor 	keep the color RGB in hexadecimal code,
	 *															where each position represents a primary color.
	 */

	var colorHex = function(defaultColor){

		var dec2hex = function (dec){
			var Char_hexadecimales = "0123456789ABCDEF";
			var low = parseInt(dec) % 16;
			var high = (parseInt(dec) - low)/16;

			hex = "" + Char_hexadecimales.charAt(high) + Char_hexadecimales.charAt(low);
			return hex;
		}


		var color = dec2hex(defaultColor[0]) + dec2hex(defaultColor[1]) + dec2hex(defaultColor[2]);
		while(_divRGB.hasChildNodes()){
			_divRGB.removeChild(_divRGB.lastChild);
		}

		_divRGB.appendChild(document.createTextNode('#'));
		_divRGB.appendChild(document.createTextNode(color));

		that.setBackgroundColor('#' + color);


	}

	/**
	 * Method that modify the hexadecimal color of the Node
	 * when it is pressed on one of the rectangles
	 *
	 * @author Rafael Molina Linares
	 * @update 13/06/2011
	 *
	 * @method selectColor
	 */

	var selectColor = function( event ){

		var mousex = event.pageX - _divContainer.offsetLeft - this.offsetLeft;
		var mousey = event.pageY - this.offsetTop;


		if(this.getAttribute('id') == "red"){
			defaultColor[0]=((mousex - 20)*255)/100;
			if(defaultColor[0] > 255) defaultColor[0]=255;
			if(defaultColor[0] < 0) defaultColor[0]=0;
			contextR.clearRect(0,0,parseInt(canvasR.width),canvasR.height);
			drawColor( canvasR, contextR, defaultColor[0], '#ff0000');
		}
		if(this.getAttribute('id') == "green"){
			defaultColor[1]=((mousex-20)*255)/100;
			if(defaultColor[1] > 255) defaultColor[1]=255;
			if(defaultColor[1] < 0) defaultColor[1]=0;
			contextG.clearRect(0,0,parseInt(canvasG.width),canvasG.height);
			drawColor( canvasG, contextG, defaultColor[1], '#00ff00');
		}
		if(this.getAttribute('id') == "blue"){
			defaultColor[2]=((mousex-20)*255)/100;

			if(defaultColor[2] > 255) defaultColor[2]=255;
			if(defaultColor[2] < 0) defaultColor[2]=0;

			contextB.clearRect(0,0,parseInt(canvasB.width),canvasB.height);
			drawColor( canvasB, contextB, defaultColor[2], '#0000ff');
		}
		colorHex(defaultColor);
		drawCurrentColor(that._Backgroundcolor);
	}


	drawColor( canvasR, contextR, defaultColor[0], '#ff0000');
	drawColor( canvasG, contextG, defaultColor[1], '#00ff00');
	drawColor( canvasB, contextB, defaultColor[2], '#0000ff');

	drawCurrentColor(that._Backgroundcolor);


	colorHex(defaultColor);



	_divR.addEventListener('mousedown', selectColor, false);
	_divG.addEventListener('mousedown', selectColor, false);
	_divB.addEventListener('mousedown', selectColor, false);


	document.body.appendChild(_divContainer);


  _divContainer.style.top = (window.innerHeight - parseInt(_divContainer.offsetHeight) ) / 2 + "px";
  _divContainer.style.left = (window.innerWidth - parseInt(_divContainer.offsetWidth) ) / 2 + "px";

}




/**
 * Returns the node's childs
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 27/10/2012
 *
 * @method getNodeChilds
 * @return {Array} childs of the node
 */
Node.prototype.getNodeChilds = function() {
  return this._nodeChilds;
}



/**
 * Returns the node's components
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 27/10/2012
 *
 * @method getComponents
 * @return {Array} components of the node
 */
Node.prototype.getComponents = function() {
  return this._components;
}












/**
 * Define la forma gráfica la linea de la relación
 *
 * @author Martín Vega-leal Ordóñez
 * @update 30/11/2010
 *
 * @class RelationLine
 */
var RelationLine = function() {}



/**
 * Dibuja la forma del trazado de la relación
 *
 * @author Martín Vega-leal Ordóñez
 * @update 30/11/2010
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Contexto del elemento canvas
 * @param {Array} points Vector que contiene los puntos de la relación
 * @param {String} color Color de la linea en formato definido por CSS2
 */
RelationLine.prototype.draw = function( context, points, color ) {}



/**
 * Define una linea de trazo continuo
 *
 * @author Martín Vega-leal Ordóñez
 * @update 30/11/2010
 *
 * @class SolidLine
 * @extends RelationLine
 */
var SolidLine = function() {}
JSFun.extend( SolidLine, RelationLine );



SolidLine.prototype.draw = function( context, points, color,width ) {
  var i;

  context.save();
  context.strokeStyle = color;
  context.lineWidth = width;

  context.beginPath();

  context.moveTo( points[0].pixelX(),  points[0].pixelY()  );

  for( i = 1; i < points.length; i++ )
    context.lineTo( points[i].pixelX(), points[i].pixelY() );
  context.stroke();

  context.restore();
}



/**
 * Define una linea de trazo discontinuo
 *
 * @author Martín Vega-leal Ordóñez
 * @update 30/11/2010
 *
 * @class DashedLine
 * @extends RelationLine
 */
var DashedLine = function() {}
JSFun.extend( DashedLine, RelationLine );

DashedLine.prototype.draw = function( context, points, color,width ) {
  var i;

  context.save();
  context.strokeStyle = color;
  context.lineWidth = width;

  for( i = 0; i < points.length - 1; i++ ) {
    JSGraphic.dashedLine( context,
                          points[i].pixelX(),
                          points[i].pixelY(),
                          points[i+1].pixelX(),
                          points[i+1].pixelY(),
                          10 );
  }

  context.restore();

}






/**
 * Define la forma gráfica del final de una relación
 *
 * @author Martín Vega-leal Ordóñez
 * @update 30/11/2010
 *
 * @class RelationEnd
 */
var RelationEnd = function() {}




/**
 * Dibuja la forma del final de la relación
 *
 * @author Martín Vega-leal Ordóñez
 * @update 30/11/2010
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Contexto del elemento canvas
 * @param {Number} x Coordenada x del punto
 * @param {Number} y Coordenada y del punto
 * @param {Number} angle Ángulo de giro a la dirección de la relación
 * @param {String} color Color opcional del objeto en formato valido de CSS2
 */
RelationEnd.prototype.draw = function( context, x, y, angle, color ) {}



/**
 * Define un final de punta de flecha cerrada
 *
 * @author Martín Vega-leal Ordóñez
 * @update 30/11/2010
 *
 * @class CloseTip
 * @extends RelationEnd
 */
var CloseTip = function(params) {

	params = params || {};
	this._color = params.color || '#ffffff';
}
JSFun.extend( CloseTip, RelationEnd );

CloseTip.prototype.draw = function( context, x, y, angle, color ) {

  context.save();

  context.strokeStyle = color;
  context.fillStyle = this._color;//"#ffffff";

  context.translate( x, y );
  context.rotate( angle );
  context.beginPath();
  context.moveTo( 0, 0 );
  context.lineTo( -8.5, 5.5 );
  context.lineTo( -8.5, -5.5 );
  context.closePath();
  context.fill();
  context.stroke();
  context.restore();

}



/**
 * Define un final de punta de flecha abierta
 *
 * @author Martín Vega-leal Ordóñez
 * @update 30/11/2010
 *
 * @class OpenTip
 * @extends RelationEnd
 */
var OpenTip = function() {}
JSFun.extend( OpenTip, RelationEnd );

OpenTip.prototype.draw = function( context, x, y, angle, color ) {

  context.save();

  context.strokeStyle = color;
  context.fillStyle = "#ffffff";

  context.translate( x, y );
  context.rotate( angle );
  context.beginPath();
  context.moveTo( -8.5, 5.5 );
  context.lineTo( 0, 0 );
  context.lineTo( -8.5, -5.5 );
  context.stroke();
  context.restore();

}



/**
 * Define un final con la forma de una agregación, con forma
 * de rombo
 *
 * @author Martín Vega-leal Ordóñez
 * @update 30/11/2010
 *
 * @class AggregationEnd
 * @extends RelationEnd
 */
var AggregationEnd = function() {}
JSFun.extend( AggregationEnd, RelationEnd );

AggregationEnd.prototype.draw = function( context, x, y, angle, color ) {

  context.save();

  context.strokeStyle = color;
  context.fillStyle = "#ffffff";

  context.translate( x, y );
  context.rotate( angle );
  context.beginPath();
  context.moveTo( 0, 0 );
  context.lineTo( -7, -5 );
  context.lineTo( -14, 0 );
  context.lineTo( -7, 5 );
  context.closePath();
  context.fill();
  context.stroke();
  context.restore();

}



/**
 * Define un final con la forma de una composición, con forma
 * de rombo
 *
 * @author Martín Vega-leal Ordóñez
 * @update 30/11/2010
 *
 * @class CompositionEnd
 * @extends RelationEnd
 */
var CompositionEnd = function() {}
JSFun.extend( CompositionEnd, RelationEnd );

CompositionEnd.prototype.draw = function( context, x, y, angle, color ) {

  context.save();

  context.fillStyle = '#000000';

  context.translate( x, y );
  context.rotate( angle );
  context.beginPath();
  context.moveTo( 0, 0 );
  context.lineTo( -7, -5 );
  context.lineTo( -14, 0 );
  context.lineTo( -7, 5 );
  context.closePath();
  context.fill();
  context.restore();

}





var InterfaceUsage = function() {}
JSFun.extend( InterfaceUsage, RelationEnd );

InterfaceUsage.prototype.draw = function( context, x, y, angle, color ) {

  context.save();

  context.strokeStyle = color;

  context.translate( x, y );
  context.rotate( angle );

  context.beginPath();
  context.arc( 8, 0, 12, Math.PI/2, Math.PI*1.5, false );
  context.stroke();
  context.restore();
}
/*
var CrossEnd = function() {}
JSFun.extend( CrossEnd, RelationEnd );

CrossEnd.prototype.draw = function( context, x, y, angle, color ) {

  context.save();

  context.strokeStyle = color;
  context.fillStyle = "#ffffff";

  context.translate( x, y );
  context.rotate( angle );
  context.beginPath();
  context.moveTo( -8.5, 8.5 );
  context.lineTo( 8.5, -8.5 );
  context.moveTo( 8.5, 8.5 );
  context.lineTo( -8.5, -8.5 );
  context.stroke();
  context.restore();

}*/




/**
 * Define un final con la forma de una agregación, con forma
 * de rombo
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 17/10/2012
 *
 * @class OpenTipAggregationEnd
 * @extends RelationEnd
 */
var OpenTipAggregationEnd = function() {}
JSFun.extend( OpenTipAggregationEnd, RelationEnd );

OpenTipAggregationEnd.prototype.draw = function( context, x, y, angle, color ) {

  context.save();

  context.strokeStyle = color;
  context.fillStyle = "#ffffff";

  context.translate( x, y );
  context.rotate( angle );
  context.beginPath();
  context.moveTo( 0, 0 );
  context.lineTo( -7, -5 );
  context.lineTo( -14, 0 );
  context.lineTo( -7, 5 );
  context.lineTo( 0, 0 );
  context.fill();
  context.moveTo( -22.5, 5.5 );
  context.lineTo( -14, 0 );
  context.lineTo( -22.5, -5.5 );
  context.stroke();
  context.restore();


}




/**
 * Define un final con la forma de una agregación, con forma
 * de rombo
 *
 * @author Martín Vega-leal Ordóñez
 * @update 17/10/2012
 *
 * @class OpenTipCompositionEnd
 * @extends RelationEnd
 */
var OpenTipCompositionEnd = function() {}
JSFun.extend( OpenTipCompositionEnd, RelationEnd );

OpenTipCompositionEnd.prototype.draw = function( context, x, y, angle, color ) {

  context.save();

  context.strokeStyle = color;
  context.fillStyle = '#000000';

  context.translate( x, y );
  context.rotate( angle );
  context.beginPath();
  context.moveTo( 0, 0 );
  context.lineTo( -7, -5 );
  context.lineTo( -14, 0 );
  context.lineTo( -7, 5 );
  context.lineTo( 0, 0 );
  context.fill();
  context.moveTo( -22.5, 5.5 );
  context.lineTo( -14, 0 );
  context.lineTo( -22.5, -5.5 );
  context.stroke();
  context.restore();


}



var RelationStyle = {
  shape_color: '#000000'
}



/**
 * Class that represent a relation between two elements of the diagram
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @class Relation
 * @extends Element
 * @param {Element} a First element of the relation
 * @param {Element} b Second element of the relation
 */
var Relation = function( params ) {
  params = params || {};

  this._id = 0;
  this._type = 'untyped';
  this._line_color= '#000000';
  this._line_width=1.25;
  this._points = [ new Point(), new Point() ];

  this._selected = -1;
  this._selectedBefore = false;
  this._moved = false;
  this._activeComponent = null;


  this._selectedLine = false;
  this._selectedPoint = false;

  /* defined if use
  this._line = null;
  this._end = null;
  this._start = null;
  */
  this._components = [];
  this._relations = [];
  /* defined if use
  this._name = null;
  this._stereotype = null;
  this._roleA = null;
  this._roleB = null;
  this._multiA = null;
  this._multiB = null;
  */
  this._diagram = null;
  this.setElements( params.a, params.b );

}
JSFun.extend( Relation, Element );



/**
 * Define the elements of the relation.
 * It is used when the elements hasn't given in the constructor.
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method setElements
 * @param {Element} elemA First element of the relation
 * @param {Element} elemB Second element of the relation
 * @return {Boolean} If the assign of the new elements has been produced
 */
Relation.prototype.setElements = function( elemA, elemB ) {
  if( elemA instanceof Element && elemB instanceof Element ) {

    if( elemA instanceof Relation && elemB instanceof Relation ) {
      return false;
    }

    if( this._elemA ) {
      this._elemA.delRelation( this );
    }
    if( this._elemB ) {
      this._elemB.delRelation( this );
    }

    this._elemA = elemA;
    this._elemB = elemB;

    this._elemA.addRelation( this );
    this._elemB.addRelation( this );

    this.updateParent();
    this._calculateLineEnds();



    return true;

  } else {
    return false;
  }
}



/**
 * Defines the first elemet of the relation
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/12/2010
 *
 * @method setElementA
 * @param {Element} elem First element of the relation
 * @return {Boolean} If the assign of the new element has been produced
 */
Relation.prototype.setElementA = function( elem ) {

  if( elem instanceof Element ) {

    if( elem instanceof Relation && this._elemB instanceof Relation ) {
      return false;
    }

    if( this._elemA ) {
      this._elemA.delRelation( this );
    }

    this._elemA = elem;
    this._elemA.addRelation( this );
    this.updateParent();

    return true;
  } else {
    return false;
  }
}



/**
 * Defines the second element of the relation
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/12/2010
 *
 * @method setElementB
 * @param {Element} elem Second element of the relation
 * @return {Boolean} if the assign of the new element has been produced
 */
Relation.prototype.setElementB = function( elem ) {

  if( elem instanceof Element ) {

    if( elem instanceof Relation && this._elemA instanceof Relation ) {
      return false;
    }

    if( this._elemB ) {
      this._elemB.delRelation( this );
    }

    this._elemB = elem;
    this._elemB.addRelation( this );
    this.updateParent();


    return true;

  } else {
    return false;
  }
}



/**
 * Modify the component's value of the relation, if exists
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method setValue
 * @param {String} id Id of the component within the relation
 * @param {String} value Text that will be assigned to the component
 */
Relation.prototype.setValue = function( id, value ) {
  var i;

  for( i in this._components ) {
    if( this._components[i].getId() == id ) {
      this._components[i].setValue( value );

      this._updateComponents();
      return;
    }
  }

}



/**
 * Adds a value to component of the relation, if exist. This component
 * should can container multiple values
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method setValue
 * @param {String} id Id of the component within the relation
 * @param {String} value Text that will be added to the component
 */
Relation.prototype.addValue = function( id, value ) {
  var i;

  for( i in this._components ) {
    if( this._components[i] instanceof SuperComponent && this._components[i].getId() == id ) {
      this._components[i].addField( value );

      this._updateComponents();
      return;
    }
  }


}



/**
 * Generates a XML node with the information of the relation
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method getElementXML
 * @param {DOMNode} parent Parent node of the xml tree that will be generated
 * @return {DOMNode Node with the information of the relation
 */
Relation.prototype.getElementXML = function( parent ) {

  var xmlnode = parent.createElement( this.getType() );
  xmlnode.setAttribute( 'id', this.getId() );
  xmlnode.setAttribute( 'side_A', this._elemA.getId() );
  xmlnode.setAttribute( 'side_B', this._elemB.getId() );

  var i;
  for( i = 0; i < this._points.length; i++ ) {
    var pointnode = parent.createElement( 'point' );
    pointnode.setAttribute( 'x', this._points[i].getX() );
    pointnode.setAttribute( 'y', this._points[i].getY() );
    xmlnode.appendChild( pointnode );
  }

  for( i in this._components ) {
    if( this._components[i].getId() ) {
      xmlnode.appendChild( this._components[i].getComponentXML( parent ) );
    }
  }
  if(this.getLineColor()!= '#000000')xmlnode.setAttribute( 'color', this.getLineColor() );
  if(this.getLineWidth()!= 1.25)xmlnode.setAttribute( 'width', this.getLineWidth() );
  if(this._lineStyleChanged)xmlnode.setAttribute( 'style', this.getLineStyle() );
  if(this.getDirection()!='none')xmlnode.setAttribute( 'direction', this.getDirection() );
  return xmlnode;
}



/**
 * Receives a xml node with the information of the relation and get it back
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method setElementXML
 * @param {DOMNode} xmlnode XML node with the information of the relation
 * @param {Array} ids Array with the references to the objects of the diagram
 */
Relation.prototype.setElementXML = function( xmlnode, ids ) {

  var idElemA = xmlnode.getAttribute( 'side_A' );
  var idElemB = xmlnode.getAttribute( 'side_B' );

  this.setElements( ids[ idElemA ], ids[ idElemB ] );


  var i;
  var childs = xmlnode.childNodes;

  var p = 0;
  for( i = 0; i < childs.length; i++ ) {
    if( childs[i].nodeName == 'point' ) {
      this._points[p] = new Point( parseInt( childs[i].getAttribute( 'x' ) ),
                                   parseInt( childs[i].getAttribute( 'y' ) )
                                  );
      p++;
    }
  }

  for( i = 0; i < childs.length; i++ ) {
    if( childs[i].nodeName == 'item' ) {
      this.setValue( childs[i].getAttribute( 'id' ), childs[i].getAttribute( 'value' ) );

    } else if( childs[i].nodeName == 'superitem' ) {

      var j;
      for( j in this._components ) {
        if( this._components[j].getId() == childs[i].getAttribute( 'id' ) ) {
          this._components[j].setComponentXML( childs[i] );
        }
      }
    }

  }
  var color=xmlnode.getAttribute( 'color');
  if( color)this.setLineColor(color);
  var width=xmlnode.getAttribute('width');
  if(width)this.setLineWidth(width);
  var style=xmlnode.getAttribute( 'style');
  if(style){
	  this.setLineStyle(style);
  }
  var direction=xmlnode.getAttribute( 'direction');
  if(direction)this.setDirection(direction);
  this._updateComponents();

}



/**
 * Assigns a id number to the relation within a diagram
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method setId
 * @param {String} value Chain of id
 */
Relation.prototype.setId = function( value ) {
  this._id = this.getType() + '_' + value;
}



/**
 * Returns the id of the relation
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method getId
 * @return {String} Chain of id of the relation within the diagram
 */
Relation.prototype.getId = function() {
  return this._id;
}



/**
 * Assigns a type to the relation. This type will be the way to
 * determine the class ame of the relation
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method setType
 * @param {String} value Type of the relation. Identifies the class of the relation
 */
Relation.prototype.setType = function( value ) {
  if( this._type == 'untyped' && JSFun.isString( value ) ) {
    this._type = value;
  }
}



/**
 * Returns the type of the relation
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method getType
 * @return {String} Type of the relation. Identifies the class of the relation
 */
Relation.prototype.getType = function() {
  return this._type;
}



/**
 * Adds a relation to the element
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method addRelation
 * @param {Relation} rel Relation to which belong
 */
Relation.prototype.addRelation = function( rel ) {
  if( rel instanceof Relation ) {
    this._relations.push( rel );
  }
}



/**
 * Deletes a relation to which this belonged
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method delRelation
 * @param {Relation} rel Relation that will be remove
 */
Relation.prototype.delRelation = function( rel ) {
  var i;

  for( i in this._relations ) {
    if( this._relations[i] == rel ) {
      this._relations.splice( i, 1 );
      break;
    }
  }

}



/**
 * Stored a reference to the diagram to which the relation belong
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method setDiagram
 * @param {Diagram} ndiagram Diagram to which the relation belong
 */
Relation.prototype.setDiagram = function( ndiagram ) {
  if( ndiagram instanceof Diagram ) {
    this._diagram = ndiagram;
  }
}



/**
 * Adds a component to the relatio
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method _addComponent
 * @param {Component} ncomp New component for the relation
 */
Relation.prototype._addComponent = function( ncomp ) {
  ncomp.setParent( this );
  this._components.push( ncomp );
  this._updateComponents();

}



/**
 * Delete a component of the relation
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method _delComponent
 * @param {Component} dcomp Component that will be remove
 */
Relation.prototype._delComponent = function( dcomp ) {
  var i;

  for( i in this._components ) {
    if( this._components[i] == dcomp ) {
      this._components.splice( i, 1 );
      break;
    }
  }

}



/**
 * Sets a new name for the relation. For this, this name will
 * be assigned to the specified component for this function
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method setComponentName
 * @param {String} newName New name for the relation
 */
Relation.prototype.setComponentName = function( newName ) {
  if( !this._name ) {
    this._name = new TextBox({ id: 'name', text: newName });
    this._addComponent( this._name );
  } else {
    this._name.setText( newName );
  }
}



/**
 * Sets a new stereotypes for the relation
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method setStereotype
 * @param {String} stereotype New stereotypes for the relation
 */
Relation.prototype.setStereotype = function( stereotype ) {

  this._stereotype = new Text({ id: 'stereotype', text: stereotype });
  this._addComponent( this._stereotype );
}



/**
 * Adds a component Stereotype to the relation
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method addComponentStereotype
 * @param {String} stereotype New stereotype for the relation
 */
Relation.prototype.addComponentStereotype = function( stereotype ) {
  if( !this._stereotype ) {

    this._stereotype = new StereotypeFields({ id: 'stereotype', width: 100, text: stereotype });
    this._addComponent( this._stereotype );
  }
}



/**
 * Assigns the value of the rol for the first element of the relation
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method setComponentRoleA
 * @param {String} rol New rol of the relation
 */
Relation.prototype.setComponentRoleA = function( rol ) {
  if( !this._roleA ) {
    this._roleA = new RoleItem({ id: 'roleA', text: rol, margin: 4 });
    this._addComponent( this._roleA );
  } else {
    this._roleA.setText( rol );
  }
}



/**
 * Assigns the value of the rol for the second element of the relation
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method setComponentRoleB
 * @param {String} rol New rol of the relation
 */
Relation.prototype.setComponentRoleB = function( rol ) {
  if( !this._roleB ) {
    this._roleB = new RoleItem({ id: 'roleB', text: rol, margin: 4 });
    this._addComponent( this._roleB );
  } else {
    this._roleB.setText( rol );
  }
}



/**
 * Assigns the value of multiplicity for the first element of the relation
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method setComponentMultiplicityA
 * @param {String} multi New value of multiplicity of the relation
 */
Relation.prototype.setComponentMultiplicityA = function( multi ) {
  if( !this._multiA ) {
    this._multiA = new TextBox({ id: 'multiplicityA', text: multi, margin: 4 });
    this._addComponent( this._multiA );
  } else {
    this._multiA.setText( multi );
  }
}



/**
 * Assigns the value of multiplicity for the second element of the relation
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method setComponentMultiplicityB
 * @param {String} multi New value of multiplicity of the relation
 */
Relation.prototype.setComponentMultiplicityB = function( multi ) {
  if( !this._multiB ) {
    this._multiB = new TextBox({ id: 'multiplicityB', text: multi, margin: 4 });
    this._addComponent( this._multiB );
  } else {
    this._multiB.setText( multi );
  }
}



/**
 * Updates the position of the components of the relation, if exist.
 * This components can be the name, stereotypes, roles and
 * multiplicities of the relation
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method _updateComponents
 * @private
 */
Relation.prototype._updateComponents = function() {
  if( ! ( this._elemA && this._elemB ) ) {
    return;
  }

  var len = this._points.length;
  var central = parseInt( len / 2 ) - 1;

  if( this._roleA ) {
    var ax = this._points[0].getX();
    var ay = this._points[0].getY();
    var bx = this._points[1].getX();
    var by = this._points[1].getY();

    if( this._elemA instanceof Relation ) {
      this._roleA.setCoordinates( ax, ay - this._roleA.getHeight() );

    } else {

      var angle = Math.atan2( by - ay, bx - ax );
      var tang = Math.tan( angle );

      var width = this._roleA.getWidth()
      var height = this._roleA.getHeight();

      var movx;
      var movy;
      if( ax == this._elemA.getX() ) {
        movx = - width;

        if( by < ay ) {
          movy = - height - tang * width;
        } else {
          movy = - height;
        }

      } else if( ax == this._elemA.getX() + this._elemA.getWidth() ) {
        movx = 0;
        if( by < ay ) {
          movy = - height + tang * width;
        } else {
          movy = - height;
        }

      } else if( ay == this._elemA.getY() ) {
        movy = - height;
        if( bx < ax ) {
          movx = - width - height / tang;
        } else {
          movx = - width;
        }

      } else if( ay == this._elemA.getY() + this._elemA.getHeight() ) {
        movy = 0;
        if( bx < ax ) {
          movx = - width + height / tang;
        } else {
          movx = - width;
        }
      }

      this._roleA.setCoordinates( ax + movx, ay + movy );

    }
  }


  if( this._roleB ) {

    var ax = this._points[ len - 1 ].getX();
    var ay = this._points[ len - 1 ].getY();
    var bx = this._points[ len - 2 ].getX();
    var by = this._points[ len - 2 ].getY();


    if( this._elemB instanceof Relation ) {
      this._roleB.setCoordinates( ax, ay - this._roleB.getHeight() );

    } else {

      var angle = Math.atan2( by - ay, bx - ax );
      var tang = Math.tan( angle );

      var width = this._roleB.getWidth()
      var height = this._roleB.getHeight();

      var movx;
      var movy;

      if( ax == this._elemB.getX() ) {
        movx = - width;

        if( by < ay ) {
          movy = - height - tang * this._roleB.getWidth();
        } else {
          movy = - height;
        }

      } else if( ax == this._elemB.getX() + this._elemB.getWidth() ) {
        movx = 0;
        if( by < ay ) {
          movy = - height + tang * this._roleB.getWidth();
        } else {
          movy = - height;
        }

      } else if( ay == this._elemB.getY() ) {
        movy = - height;
        if( bx < ax ) {
          movx = - width - this._roleB.getHeight() / tang;
        } else {
          movx = - width;
        }

      } else if( ay == this._elemB.getY() + this._elemB.getHeight() ) {
        movy = 0;
        if( bx < ax ) {
          movx = - width + this._roleB.getHeight() / tang;
        } else {
          movx = - width;
        }
      }

      this._roleB.setCoordinates( ax + movx, ay + movy );
    }

  }



  if( this._multiA ) {

    var ax = this._points[0].getX();
    var ay = this._points[0].getY();
    var bx = this._points[1].getX();
    var by = this._points[1].getY();


    if( this._elemA instanceof Relation ) {
      this._multiA.setCoordinates( ax, ay);

    } else {

      var angle = Math.atan2( by - ay, bx - ax );
      var tang = Math.tan( angle );

      var width = this._multiA.getWidth()
      var height = this._multiA.getHeight();

      var movx = 0;
      var movy = 0;

      var cx = this._elemA.getX() + this._elemA.getWidth() / 2;
      var cy = this._elemA.getY() + this._elemA.getHeight() / 2;

      var relx = ax - cx;
      var rely = ay - cy;
      var m = ( this._elemA.getHeight() / this._elemA.getWidth() );


      if( relx < 0 ) {
        if( rely < 0 ) {
          if( rely > m * relx ) {
            movx = - width;
            movy = 0;

          } else {
            movx = 0;
            movy = - height;
          }

        } else {
          if( rely >  ( - m ) * relx ) {
            movx = 0;
            movy = 0;
          } else {
            movx = - width;
            movy =  - tang * width;
          }
        }

      } else {

        if( rely < 0 ) {
          if( rely <  ( - m ) * relx ) {
            movx = - height / tang;
            movy = - height;
          } else {
            movx = 0;
            movy = 0;
          }
        } else {
          if( rely <  m * relx ) {
            movx = 0;
            movy = tang * width;
          } else {
            movx = height / tang;
            movy = 0;
          }
        }

      }

      this._multiA.setCoordinates( ax + movx, ay + movy );

    }

  }


  if( this._multiB ) {

    var ax = this._points[ len - 1 ].getX();
    var ay = this._points[ len - 1 ].getY();
    var bx = this._points[ len - 2 ].getX();
    var by = this._points[ len - 2 ].getY();


    if( this._elemB instanceof Relation ) {
      this._multiB.setCoordinates( ax, ay);

    } else {

      var angle = Math.atan2( by - ay, bx - ax );
      var tang = Math.tan( angle );

      var width = this._multiB.getWidth()
      var height = this._multiB.getHeight();

      var movx = 0;
      var movy = 0;

      var cx = this._elemB.getX() + this._elemB.getWidth() / 2;
      var cy = this._elemB.getY() + this._elemB.getHeight() / 2;

      var relx = ax - cx;
      var rely = ay - cy;
      var m = ( this._elemB.getHeight() / this._elemB.getWidth() );


      if( relx < 0 ) {
        if( rely < 0 ) {
          if( rely > m * relx ) {
            movx = - width;
            movy = 0;

          } else {
            movx = 0;
            movy = - height;
          }

        } else {
          if( rely >  ( - m ) * relx ) {
            movx = 0;
            movy = 0;
          } else {
            movx = - width;
            movy =  - tang * width;
          }
        }

      } else {

        if( rely < 0 ) {
          if( rely <  ( - m ) * relx ) {
            movx = - height / tang;
            movy = - height;
          } else {
            movx = 0;
            movy = 0;
          }
        } else {
          if( rely <  m * relx ) {
            movx = 0;
            movy = tang * width;
          } else {
            movx = height / tang;
            movy = 0;
          }
        }

      }

      this._multiB.setCoordinates( ax + movx, ay + movy );

    }
  }



  var ax = this._points[central].getX();
  var ay = this._points[central].getY();
  var bx = this._points[central + 1].getX();
  var by = this._points[central + 1].getY();

  if( len % 2 != 0 ) {
    var cx = bx;
    var cy = by;
  } else {
    var cx = (ax + bx ) / 2;
    var cy = (ay + by ) / 2 ;
  }


  if( this._stereotype ) {
    if( ax > bx && ay < by || bx > ax && by < ay ) {
      if( this._name ) {
        this._stereotype.setCoordinates( cx - this._stereotype.getWidth(), cy - this._stereotype.getHeight() - this._name.getHeight() );
      } else {
        this._stereotype.setCoordinates( cx - this._stereotype.getWidth(), cy - this._stereotype.getHeight() );
      }
    } else {
      if( this._name ) {
        this._stereotype.setCoordinates( cx , cy - this._stereotype.getHeight() - this._name.getHeight() );
      } else {
        this._stereotype.setCoordinates( cx , cy - this._stereotype.getHeight() );
      }
    }


    if( this._stereotype instanceof SuperComponent ) {
      this._stereotype.updateComponents();
    }

  }

  if( this._name ) {
    if( ax > bx && ay < by || bx > ax && by < ay ) {
      this._name.setCoordinates( cx - this._name.getWidth(), cy - this._name.getHeight() );
    } else {
      this._name.setCoordinates( cx , cy - this._name.getHeight() );
    }
  }

}



/**
 * Draws the value of the components of the relation in the canvas element
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method _drawComponents
 * @private
 * @param {CanvasRenderingContext2D} context Context of draw of the canvas element
 */
Relation.prototype._drawComponents = function( context ) {
  var i;

  for( i = 0; i < this._components.length; i++ ) {
    this._components[i].draw( context );
  }
}



/**
 * Draws the border of the components of the relation in the canvas element.
 * This method is normally used for the movement of the element
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method _drawComponentsShape
 * @private
 * @param {CanvasRenderingContext2D} context Context of draw of the canvas element
 */
Relation.prototype._drawComponentsShape = function( context ) {
  var i;

  for( i = 0; i < this._components.length; i++ ) {
    this._components[i].drawShape( context );
  }
}



/**
 * Checks if the element belong the relation
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method isLinked
 * @param {Element} obj Element that will be checked
 * @return {Boolean} If the element belong the relation or not
 */
Relation.prototype.isLinked = function( obj ) {
  if( obj instanceof Element && ( this._elemA == obj || this._elemB == obj ) )
    return true;
  else
    return false;
}



/**
 * Checks if the given point is found between two point of the relation
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method _selectLine
 * @private
 * @param {Point} pointA A point of the relation
 * @param {Point} pointB The next poit of the relation
 * @param {Number} x Coordinate x of point to check
 * @param {Number} y Coordinate y of point to check
 * @param {Number} margin Margin around of the line
 * @return {Boolean} If the point is within the line
 */
Relation.prototype._selectLine = function( pointA, pointB, x, y, margin ) {

  if( !(pointA instanceof Point && pointB instanceof Point) )
    return false;


  var margin = margin || 5;

  var x1 = pointA.getX();
  var y1 = pointA.getY();
  var x2 = pointB.getX();
  var y2 = pointB.getY();

  var maxx, maxy, minx, miny;

  if( x1 > x2 ) {
    maxx = x1;
    minx = x2;
  } else {
    maxx = x2;
    minx = x1;
  }

  if( y1 > y2 ) {
    maxy = y1;
    miny = y2;
  } else {
    maxy = y2;
    miny = y1;
  }

  if( x1 == x2 ) {
    if( y <= maxy && y >= miny && x >= minx - margin && x <= minx + margin ) {
      return true;
    }

  } else {

    var m, angle, ampx, ampy;

    m = ( y2 - y1 ) / ( x2 - x1 );
    angle = Math.atan( ( y2 - y1 ) / ( x2 - x1 ) );
    ampx = Math.abs( Math.sin( angle ) * margin );
    ampy = Math.abs( Math.cos( angle ) * margin );

    if( x >= minx - ampx && x <= maxx + ampx && y >= miny - ampy && y <= maxy + ampy ) {
      var diff, gap;

      diff = ( x - x1 ) * m + y1;
      gap = Math.abs( y - diff );
      gap = Math.cos( angle ) * gap;

      if( gap <= margin ) {
        return true;
      }

    }
  }

  return false;
}



/**
 * Checks if the given point is over a component of the relation
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method _isOverComponent
 * @private
 * @param {Number} x Coordinate x of point to check
 * @param {Number} y Coordinate y of poit to check
 * @return {Boolean} If the point is over the component
 */
Relation.prototype._isOverComponent = function( x, y ) {
  var i;

  for( i = 0; i < this._components.length; i++ ) {
    if( this._components[i].isOver( x, y ) ) {
      return true;
    }
  }

  return false;
}



/**
 * Deselects a component so that closes all opened dialog
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method _deselectComponent
 * @private
 */
Relation.prototype._deselectComponent = function() {
  if( this._activeComponent ) {
    this._activeComponent.deselect();
    this._activeComponent = null;
  }
}



/**
 * Checks if the given point is over a component of the relation and,
 * in affirmative case, selects it
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method _selectComponent
 * @private
 * @param {Number} x Coordinate x of the point to check
 * @param {Number} y Coordinate y if the point to check
 */
Relation.prototype._selectComponent = function( x, y ) {
  var i;

  for( i = 0; i < this._components.length; i++ ) {
    if( this._components[i].select( x, y ) ) {
      this._activeComponent = this._components[i];
      return;
    }
  }

}



/**
 * Checks if the given point is over the line of the relation
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method isOver
 * @param {Number} x Coordiate x of point to check
 * @param {Number} y Coordinate y of point to check
 * @return {Boolean} If the point is over the relation
 */
Relation.prototype.isOver = function( x, y ) {
  var i;

  for( var i = 0; i < this._points.length - 1; i++ ) {
    if( this._selectLine( this._points[i], this._points[i+1], x, y, 10 ) ) {
      return true;
    }
  }

  return false;
}



/**
 * Checks if the given point is over some element of the relation and,
 * in affirmative case, selects it to interact with the relation
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method select
 * @param {Number} x Coordinate x of the point to check
 * @param {Number} y Coordinate y of the point to check
 * @return {Boolean} If the point is over some element
 */
Relation.prototype.select = function( x, y ) {
  this._deselectComponent();

  /*
	If the contextual menu is active or visible in the diagram
	and click has been done on the same element, the contextual menu is removed
*/
if(this._diagram._activeMenu){
this.removeContextualMenu();
}


  if(this._diagram._pressMouseRight == true){
		/*
			If the right button has been pressed, and therefore,
			the contextual menu is activated
		 */
	   if( this.isOver( x, y ) ) {
	    	this._diagram._pressMouseRight =  false;

	  	  document.oncontextmenu = function (){ return false; };

				/*
					Captures the movement of the scroll bar making into account
					that Chrome and Opera browsers support the document.documentElement
					element and Firefox and IE browsers support the document.body element.
				*/
				var scroll = document.documentElement.scrollTop || document.body.scrollTop;

		    x = x + this._diagram._div.offsetLeft;
		    y = (scroll) ? (y - scroll + this._diagram._div.offsetTop) : (y + this._diagram._div.offsetTop) ;

		    this.showContextualMenu(x,y);

		    return true;
	  } else {
		    return false;
	  }
}

  for( i = 0; i < this._points.length; i++ ) {
    if( Math.abs(x - this._points[i].getX() ) <= 4 && Math.abs(y - this._points[i].getY() ) <= 4 ) {

      if( this._selected > -1 )
        this._selectedBefore = true;

      this._selected = i;
      this._selectedPoint = true;
      return true;
    }
  }
    if( this._selected > -1 ) {
      if( this._isOverComponent( x, y ) ) {
        this._selectedBefore = true;
        return true;
      }
   }

    for( var i = 0; i < this._points.length - 1; i++ ) {
      if( this._selectLine( this._points[i], this._points[i+1], x, y ) ) {

        if( this._selected > -1 )
          this._selectedBefore = true;

        this._selected = i;
        this._selectedLine = true;

        this._points.splice( this._selected + 1, 0, new Point(x,y) );

        return true;
      }
    }



  return false;
}



/**
 * Perfoms the actions necessary for a movement of the mouse to the
 * given position by the parameters
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method drag
 * @param {Number} x Coordinate x of the point to check
 * @param {Number} y Coordinate y of the point to check
 */
Relation.prototype.drag = function( x, y ) {
  if( this._selectedLine ) {
		if(this._elemA == this._elemB){
			this._selected = 2;
	    this._points[ this._selected ].setPoint(x, y);
		} else {
	    this._points[ this._selected + 1 ].setPoint(x, y);
		}
    this._moved = true;

  } else if( this._selectedPoint ) {

		if(this._elemA == this._elemB){

			if(this._selected == 1)
			  this._points[ this._selected ].setY(y);
			else 	if(this._selected == 3)
			  this._points[ this._selected ].setX(x);
			else
			  this._points[ this._selected ].setPoint(x, y);
		} else {
		  this._points[ this._selected ].setPoint(x, y);
		}
    this._moved = true;
  }

}



/**
 * Checks if exists some compatible element in the given point and,
 * in affirmative case, adds it to the relation, after removal of
 * the old element
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method _checkForNewNodes
 * @private
 * @param {Number} x Coordinate x of the possible element
 * @param {Number} y Coordinate y of the possible element
 */
Relation.prototype._checkForNewNodes = function( x, y ) {

  if( this._selectedPoint && ( this._selected == 0 || this._selected == this._points.length -1 ) ) {

    var newElem = this._diagram.reassignRelationTo( this, x, y );

    if( newElem != this ) {

      if( this._selected == 0 ) {

        this.setElementA( newElem );
      } else {

        this.setElementB( newElem );
      }

    }
  }

}



/**
 * Reacts to the event of release the button by
 * the user in the given coordinates
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method drop
 * @param {Number} x Coordinate x of the point
 * @param {Number} y Coordinate y of the point
 */
Relation.prototype.drop = function( x, y ) {
  if( this._moved ) {
    this._checkForNewNodes( x, y );
  } else if( this._selectedBefore ) {
    this._selectComponent( x, y );
  }

  this._selectedLine = false;
  this._selectedPoint = false
  this._moved = false;

  this._delUselessPoints();
  this.notifyChange();

}



/**
 * Notifies to the relation what a change in some
 * of its components or nodes has been produced
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method notifyChange
 */
Relation.prototype.notifyChange = function() {

  this._delUselessPoints();
  this.updateParent();

  this._calculateLineEnds();
  this._updateComponents();


  for( var i in this._relations ) {
    this._relations[i].notifyChange();
  }

}



/**
 * Notifies to the relation that must re-draw to
 * self because some element has changed
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method notifyDraw
 */
Relation.prototype.notifyDraw = function() {
  if( this._diagram ) {
    this._diagram.draw();
  }
}



/**
 * Reacts to the deselect by the diagram. An action of the user
 * normally closes all opened dialog
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method deselect
 */
Relation.prototype.deselect = function() {
  this._deselectComponent();

  this._selectedBefore = false;
  this._selected = -1;
}



/**
 * Calculates the final points of the relation
 * that are in contact with the nodes
 *
 * @author Martín Vega-leal Ordóñez / Rafael Molina Linares
 * @update 28/11/2010 / 27/09/2011
 *
 * @method _calculateLineEnds
 * @private
 */
Relation.prototype._calculateLineEnds = function( ) {

  var pointA, pointB;
  var npoints = this._points.length;


  if( this._elemA == this._elemB ) {

		var center = this._elemA.getCentralPoint();
    var cx = center.getX();
    var cy = center.getY();

		var x = (this._points[2]) ? this._points[2]._x : (this._elemA._x + this._elemA._width);
		var y = (this._points[2]) ? this._points[2]._y : (this._elemA._y + this._elemA._height);
		var heightPoints;
		var widthPoints;

		if(this._selected == 2 || this._selected == 0 || this._selected == npoints-1 ||
		   (this._selected == -1 && !this._elemA._moved) || this._elemA._resizing){

			if((x - cx) > 0){
				if((y-cy) > 0){	//Fourthy quadrant

					pointA = this._elemA.getLinkCentered( cx, cy + this._elemA.getHeight()/2 );
					pointB = this._elemA.getLinkCentered( cx + this._elemA.getWidth()/2, cy );

					heightPoints = y - pointA.getY();
					heightPoints = (heightPoints < 20) ? 20 : heightPoints;
					widthPoints  = x - pointB.getX();
					widthPoints  = (widthPoints < 20) ? 20 : widthPoints;

					this._points[1] = new Point( cx, pointA.getY() + heightPoints );
					this._points[2] = new Point( pointB.getX() + widthPoints, pointA.getY() + heightPoints );
					this._points[3] = new Point( pointB.getX() + widthPoints, cy );
				} else {	//First quadrant

					pointA = this._elemA.getLinkCentered( cx, cy - this._elemA.getHeight()/2 );
					pointB = this._elemA.getLinkCentered( cx + this._elemA.getWidth()/2, cy );

					heightPoints = pointA.getY() - y;
					heightPoints = (heightPoints < 20) ? 20 : heightPoints;
					widthPoints  = x - pointB.getX();
					widthPoints  = (widthPoints < 20) ? 20 : widthPoints;

					this._points[1] = new Point( cx, pointA.getY() - heightPoints );
					this._points[2] = new Point( pointB.getX() + widthPoints, pointA.getY() - heightPoints );
					this._points[3] = new Point( pointB.getX() + widthPoints, cy );
				}
			} else {

				if((y-cy) > 0){	//Third quadrant

					pointA = this._elemA.getLinkCentered( cx, cy + this._elemA.getHeight()/2 );
					pointB = this._elemA.getLinkCentered( cx - this._elemA.getWidth()/2, cy );

					heightPoints = y - pointA.getY();
					heightPoints = (heightPoints < 20) ? 20 : heightPoints;
					widthPoints  = pointB.getX() - x;
					widthPoints  = (widthPoints < 20) ? 20 : widthPoints;

					this._points[1] = new Point( cx, pointA.getY() + heightPoints );
					this._points[2] = new Point( pointB.getX() - widthPoints, pointA.getY() + heightPoints );
					this._points[3] = new Point( pointB.getX() - widthPoints, cy );
				} else {	//Second quadrant

					pointA = this._elemA.getLinkCentered( cx, cy - this._elemA.getHeight()/2 );
					pointB = this._elemA.getLinkCentered( cx - this._elemA.getWidth()/2, cy );
					heightPoints = pointA.getY() - y;
					heightPoints = (heightPoints < 20) ? 20 : heightPoints;
					widthPoints  = pointB.getX() - x;
					widthPoints  = (widthPoints < 20) ? 20 : widthPoints;

					this._points[1] = new Point( cx, pointA.getY() - heightPoints );
					this._points[2] = new Point( pointB.getX() - widthPoints, pointA.getY() - heightPoints );
					this._points[3] = new Point( pointB.getX() - widthPoints, cy );
				}
			}
		} else if(this._selected == 3){

			x = this._points[3]._x;
			y = this._points[3]._y;

			pointA = this._elemA.getLinkCentered( cx, this._points[0]._y  );

			if((x - cx) > 0){

				pointB = this._elemA.getLinkCentered( cx + this._elemA.getWidth()/2, cy );
				widthPoints  = x - pointB.getX();
				widthPoints  = (widthPoints < 20) ? 20 : widthPoints;
				this._points[2].setX(pointB.getX() + widthPoints );
				this._points[3] = new Point( pointB.getX() + widthPoints, cy );
			} else {

				pointB = this._elemA.getLinkCentered( cx - this._elemA.getWidth()/2, cy );
				widthPoints  = pointB.getX() - x;
				widthPoints  = (widthPoints < 20) ? 20 : widthPoints;
				this._points[2].setX(pointB.getX() - widthPoints );
				this._points[3] = new Point( pointB.getX() - widthPoints, cy );
			}
		} else if(this._selected == 1){

			x = this._points[1]._x;
			y = this._points[1]._y;

			pointB = this._elemA.getLinkCentered( this._points[4]._x, cy );

			if((y - cy) > 0){

				pointA = this._elemA.getLinkCentered( cx, cy + this._elemA.getHeight()/2 );
				heightPoints  = y - pointA.getY();
				heightPoints  = (heightPoints < 20) ? 20 : heightPoints;
				this._points[1] = new Point( cx, pointA.getY() + heightPoints );
				this._points[2].setY(pointA.getY() + heightPoints );
			} else {

				pointA = this._elemA.getLinkCentered( cx, cy - this._elemA.getHeight()/2 );
				heightPoints  = pointA.getY() - y;
				heightPoints  = (heightPoints < 20) ? 20 : heightPoints;
				this._points[1] = new Point( cx, pointA.getY() - heightPoints );
				this._points[2].setY(pointA.getY() - heightPoints);
			}
		} else if(this._selected == -1){

			var movX = 0;
			var movY = 0;
			if(this._elemA._moved){

				var movX = (this._elemA._x - this._elemA._prex)/2;
				var movY = (this._elemA._y - this._elemA._prey)/2;

				this._points[0].setPoint(this._points[0]._x + movX, this._points[0]._y + movY );
				this._points[4].setPoint(this._points[4]._x + movX, this._points[4]._y + movY );

				pointA = this._points[0];
				pointB = this._points[4];

				this._points[1].setPoint(this._points[1]._x + movX, this._points[1]._y + movY );
				this._points[2].setPoint(this._points[2]._x + movX, this._points[2]._y + movY );
				this._points[3].setPoint(this._points[3]._x + movX, this._points[3]._y + movY );
			}
		}

		this._points[0] = pointA;
	  this._points[4] = pointB;

		while(this._points[5])
			this._points.pop();

  } else {

    if( npoints > 2 ) {
      pointA = this._elemA.getLinkCentered( this._points[1] );
      pointB = this._elemB.getLinkCentered( this._points[ npoints - 2 ] );

      this._points[0] = pointA;
      this._points[ npoints - 1 ] = pointB;

    } else {

      pointA = this._elemA.getLinkCentered( this._elemB.getCentralPoint() );
      pointB = this._elemB.getLinkCentered( this._elemA.getCentralPoint() );

      this._points[0] = pointA;
      this._points[1] = pointB;
    }
  }
}



/**
 * The relation and its components are drawn with the defined style
 *
 * @author Martín Vega-leal Ordóñez	/ Alejandro Arrabal Hidalgo
 * @update 28/11/2010	/ 22/09/2012
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Context of the canvas
 */
Relation.prototype.draw = function( context ) {
  var npoints = this._points.length;
  if( this._line ) {
	  this._line.draw( context, this._points, this.getLineColor(),this.getLineWidth() );
  }

  if( this._end ) {
    var ax = this._points[ npoints - 2 ].getX();
    var ay = this._points[ npoints - 2 ].getY();
    var bx = this._points[ npoints - 1 ].getX();
    var by = this._points[ npoints - 1 ].getY();
    var angle = Math.atan2( by - ay , bx - ax );

    this._end.draw( context, bx, by, angle, this.getLineColor() );
  }

  if( this._start ) {
    var bx = this._points[0].getX();
    var by = this._points[0].getY();
    var ax = this._points[1].getX();
    var ay = this._points[1].getY();
    var angle = Math.atan2( by - ay , bx - ax );

    this._start.draw( context, bx, by, angle, this.getLineColor() );

  }

  /* Drawing points only*/
  if( this._selected >= 0 ) {
    var i;

    for( i = 0; i < this._points.length; i++ ) {
      context.fillRect( parseInt(this._points[i].getX()) - 3, parseInt(this._points[i].pixelY()) - 3, 6, 6 );
    }
  }

  if( this._selected > -1 ) {
    this._drawComponentsShape( context );
  }
  this._drawComponents( context );

}


/**
 * The lie of the relation is drawn
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method drawShape
 * @param {CanvasRenderingContext2D} context Contexto del liendo de dibujo
 */
Relation.prototype.drawShape = function( context ) {
  if( !( this._selectedPoint && this._selected == 0 || this._selected == this._points.length -1 ) ) {
    this._calculateLineEnds();
  }

  context.save();
  context.lineWidth = 2;
  context.strokeStyle = RelationStyle.shape_color;

  context.beginPath();
  context.moveTo( this._points[0].pixelX(), this._points[0].pixelY() );

  var i;
  for( var i = 1; i < this._points.length; i++ ) {
    context.lineTo( this._points[i].pixelX(), this._points[i].pixelY() );
  }

  context.stroke();
  context.restore();
}



/**
 * Keeps the reference to a top node in which the relation is
 * contained to move the points of the relation if the
 * parent node changes your position
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method setParent
 * @param {Node} nparent Parent node to which the relation belong
 */
Relation.prototype.setParent = function( nparent ) {
  if( nparent instanceof Node ) {
    this._parent = nparent;
  } else {
    this._parent = null;
  }
}



/**
 * Checks if the relations is container in a container node. This
 * is produced when its two elements are contained within the same node
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method updateParent
 */
Relation.prototype.updateParent = function() {
  if( this._parent ) {
    this._parent.delChild( this );
    this._parent = null;
  }

  if( this._elemA && this._elemB ) {

    if( this._elemA.getParent() != null && this._elemA.getParent() == this._elemB.getParent() ) {
      ( this._elemA.getParent() ).addChild( this );
    } else if(   this._elemA._parent && this._elemB._parent && this._elemA._parent._parent instanceof SuperNode
							&& this._elemB._parent._parent instanceof SuperNode && this._elemA._parent._parent == this._elemB._parent._parent){
      ( this._elemA.getParent().getParent() ).addChild( this );
		}
  }

}



/**
 * Updates the points of the relation according to
 * the relative movement to the current position
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method updatePosition
 * @param {Number} movx Relative movement in the x axis
 * @param {Number} movy Relative movement in the y axis
 */
Relation.prototype.updatePosition = function( movx, movy ) {
  var i;

  if( movx == undefined && movy == undefined ) {

    this.notifyChange();

  } else {
    for( i = 0; i < this._points.length; i++ ) {

        this._points[i].setPoint( this._points[i].getX() + movx, this._points[i].getY() + movy );
    }

    for( i in this._components ) {
      this._components[i].updatePosition( movx, movy );
    }

    for( i in this._relations ) {
      if( this._relations[i]._parent != this._parent ) {
        this._relations[i].notifyChange();
      }
    }
  }
}




/**
 * The grafical style of the relations's lines is defined
 * by an object of type RelationLine that draws the lines
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method setLine
 * @param {RelationLine} nline Object that defines the style of the lines
 */
Relation.prototype.setLine = function( nline ) {
  if( nline instanceof RelationLine ) {
    this._line = nline;
  }
}



/**
 * The grafical style of the line's end is defined by an
 * object of type RelationEnd that draws it
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method setEnd
 * @param {RelationEnd} nline Objet that defines the end's style of the relation
 */
Relation.prototype.setEnd = function( nend ) {
  if( nend instanceof RelationEnd ) {
    this._end = nend;
  }
}



/**
 * Teh grafical style of the relation's start is defined by an
 * object of type RelationEnd that drawn it
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method setStart
 * @param {RelationEnd} nline Objet that defines the start's style of the relation
 */
Relation.prototype.setStart = function( nstart ) {
  if( nstart instanceof RelationEnd ) {
    this._start = nstart;
  }
}



/**
 * Returns the element Node that contains the
 * relation, if has a parent
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method getParent
 * @return {Node} Element that contains to the relation
 */
Relation.prototype.getParent = function() {
  return this._parent;
}



/**
 * Deletes the points that are superfluous for the relation.
 * For example, the points that are between other two points
 * and form a straight line
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method _delUselessPoints
 * @private
 */
Relation.prototype._delUselessPoints = function() {
  var ultimo = this._points.length - 1;

  if( this._elemA != this._elemB ) {
    if( this._elemA instanceof Node ) {
      if( this._points[1] != this._points[ ultimo ] && this._elemA.isOver( this._points[1] ) ) {
        this._points.shift();
        ultimo -= 1;
      }
    }

    if( this._elemB instanceof Node ) {
      if( this._points[ ultimo - 1] != this._points[0] && this._elemB.isOver( this._points[ ultimo - 1 ] ) ) {
        this._points.pop();
      }
    }
  }

  var i;
  for( i = 1; i < this._points.length-1; i++ ) {
    if( this._selectLine( this._points[i-1],
                          this._points[i+1],
                          this._points[i].getX(),
                          this._points[i].getY(), 10 ) )
    {
      this._points.splice(i, 1);
    }
  }

}



/**
 * Returns the central point of the relation
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method getCentralPoint
 * @return {Point} Central point of the relation
 */
Relation.prototype.getCentralPoint = function() {
  var central = parseInt( this._points.length / 2 ) - 1;
  var ax = this._points[central].getX();
  var ay = this._points[central].getY();
  var bx = this._points[central + 1].getX();
  var by = this._points[central + 1].getY();

  return new Point( (ax + bx ) / 2, (ay + by ) / 2 );
}



/**
 * Returns the central point of the relation
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method getLinkCentered
 * @return {Point} Central point of the relation
 */
Relation.prototype.getLinkCentered = function( x, y ) {
  return this.getCentralPoint();
}



/**
 * Don't perfom any action
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method notifyDeleted
 * @return {Element} Element that has been remove
 */
Relation.prototype.notifyDeleted = function( elem ) {}



/**
 * Deletes the element and all element make no sense
 * to maintain by its relation with himself
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method remove
 */
Relation.prototype.remove = function( ) {
  var i;

  while( this._relations[0] ) {
    ( this._relations.pop() ).remove();
  }

  this._elemA.notifyDeleted( this );
  this._elemB.notifyDeleted( this );

  if( this._parent ) {
    this._parent.delChild( this );
  }
  if(this._diagram)  this._diagram.notifyDeleted( this );
}



/**
 * Returns a identifying strig of the element's class
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method toString
 * @return {String} Identifying name of the element's class
 */
Relation.prototype.toString = function() {
  return 'Relation';
}





/**
 * The grafical style of the relations's lines is defined as style
 *
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 22/09/2012
 *
 * @method setLine
 * @param {String} string that defines the style of the lines
 * @return {Boolean} If the style could be set
 */
Relation.prototype.setLineStyle = function(style) {
	if(style.toLowerCase()=='solid'){
		if(this.getLineStyle()!='solid' && !this._lineStyleChanged)
			{
			  this._lineStyleChanged=true;
			}
		else if(this.getLineStyle()!='solid' && this._lineStyleChanged)this._lineStyleChanged=false;

		this.setLine( new SolidLine() );
		return true;
	}
	else if(style.toLowerCase()=='dashed'){
		this._lineStyle='dashed';
		if(this.getLineStyle()!='dashed' && !this._lineStyleChanged)
			{
			  this._lineStyleChanged=true;
			}
		else if(this.getLineStyle()!='dashed' && this._lineStyleChanged)this._lineStyleChanged=false;

		this.setLine( new DashedLine() );
		return true;
	}
	return false;
}









/**
 * Get the grafical style of the relations's lines
 *
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 30/09/2012
 *
 *
 * @method setLine
 * @return {String} string that defines the style of the lines
 */
Relation.prototype.getLineStyle = function() {
	if(this._line instanceof SolidLine){
		return "solid";
	}
	else if(this._line instanceof DashedLine){
		return "dashed";
	}
	return "";
}




/**
 * The color of the relations's lines is defined as color
 *
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 22/09/2012
 *
 * @method setLineColor
 * @param {CSSColor} string that defines the color of the lines
 */
Relation.prototype.setLineColor = function(color) {
	this._line_color=color;
}





/**
 * Return color of the relations's lines
 *
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 22/09/2012
 *
 * @method getLineColor
 * @return {CSSColor} string with the color of the lines
 */
Relation.prototype.getLineColor = function() {
	return this._line_color;
}





/**
 * The width of the relations's lines is defined as width
 *
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 22/09/2012
 *
 * @method setLineWidth
 * @param {Number} number that defines the width of the lines
 */
Relation.prototype.setLineWidth = function(width) {
	this._line_width=width;
}



/**
 * Return width of the relations's lines
 *
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 22/09/2012
 *
 * @method getLineWidth
 * @return {Number} The width of the lines
 */
Relation.prototype.getLineWidth = function() {
	return this._line_width;
}



/**
 * Show contextual menu of a Relation
 *
 * @author Rafael Molina Linares
 * @update 8/06/2011
 *
 * @method showContextualMenu
 * @param {Number} x represents the upper left x coordinate of the contextual menu
 * @param {Number} y represents the upper left y coordinate of the contextual menu
 *
 */
Relation.prototype.showContextualMenu = function(x,y){

	if(this._diagram._activeMenu || !this._menu.length){
		return;
	}

	this._diagram._activeMenu = true;

	var div = document.createElement('div');
	div.className = "ud_contextualMenu";
	div.style.cursor = 'pointer';

	for(var i=0;i<this._menu.length;i++)
	   this.addItem(this._menu[i],div);

	document.body.appendChild(div);

	this._diagram._divMenu = div;

	div.style.top = y + "px";
	div.style.left = x + "px";
}



/**
 * Remove contextual menu of a html document
 *
 * @author Rafael Molina Linares
 * @update 8/06/2011
 *
 * @method removeContextualMenu
 */

Relation.prototype.removeContextualMenu = function(){

	if(this._diagram._activeMenu){

   	document.body.removeChild( this._diagram._divMenu );

		this._diagram._activeMenu = false;
   	this.notifyDraw();
	}
}


/**
 * Add a item to the contextual menu
 *
 * @author Rafael Molina Linares
 * @update 8/06/2011
 *
 * @method addItem
 * @param {array} item Array whose position 0 represents the actions to perfom when the item is pressed,
											 and the position 1 represents the text that appears in the contextual menu
 * @param {div} divContainer Represents the div that contains all items of the contextual menu.
 *
 */

Relation.prototype.addItem = function(item, divContainer){

	var div = document.createElement('div');
	div.className = "ud_contextualMenuItem";

	var span = document.createElement('span');
	span.appendChild(document.createTextNode(item[1]));

	div.appendChild(span);
	divContainer.appendChild(div);

	div.addEventListener('mouseup', item[0] , false);
}


/**
 * Show the dialog for changing the background-color of the Node.
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 13/08/2012
 *
 * @method showStyleDialog
 *
 */

Relation.prototype.showStyleDialog = function( params ) {

	var that = params.that || this;

	var colorLineBackup=that.getLineColor();

	var numHex = that.getLineColor().split('#')[1];

	var defaultColor = new Array( parseInt(numHex.slice(0,2),16),
				     									  parseInt(numHex.slice(2,4),16),
				     										parseInt(numHex.slice(4,6),16));

	var _divContainer = document.createElement('div');
	_divContainer.className = "ud_popupLineStyle";

	var _divBlock1 = document.createElement('div');
	_divBlock1.setAttribute('id','divBlock1');

	var _divBlock2 = document.createElement('div');
	_divBlock2.setAttribute('id','divBlock2');

	var _divRGB = document.createElement('div');
	_divRGB.setAttribute('id','colorHtml');
	_divRGB.style.color = '#ffffff';

	var _divR = document.createElement('div');
	_divR.setAttribute('id','red');

	var canvasR = document.createElement('canvas');
	canvasR.setAttribute('id','R');
	canvasR.width = 150;
	canvasR.height = 20;

	_divR.appendChild(canvasR);
	var contextR = canvasR.getContext('2d');

	var _divG = document.createElement('div');
	_divG.setAttribute('id','green');

	var canvasG = document.createElement('canvas');
	canvasG.setAttribute('id','G');
	canvasG.width = 150;
	canvasG.height = 20;

	_divG.appendChild(canvasG);
	var contextG = canvasG.getContext('2d');

	var _divB = document.createElement('div');
	_divB.setAttribute('id','blue');

	var canvasB = document.createElement('canvas');
	canvasB.setAttribute('id','B');
	canvasB.width = 150;
	canvasB.height = 20;

	_divB.appendChild(canvasB);
	var contextB = canvasB.getContext('2d');

	var _divColor = document.createElement('div');
	_divColor.setAttribute('id','divSelectColor');

	var canvasColor = document.createElement('canvas');
	canvasColor.setAttribute('id','selectColor');
	canvasColor.width = 90;
	canvasColor.height = 90;

	_divColor.appendChild(canvasColor);
	var contextColor = canvasColor.getContext('2d');


	var form = document.createElement("form");


  var _divLine = document.createElement('div');
  _divLine.setAttribute("id","divLine");

  var number_width = document.createElement("input");
  number_width.setAttribute( "type", "number" );
  number_width.setAttribute("name","width");
  number_width.setAttribute( "value", that.getLineWidth() || "1" );
  number_width.setAttribute("style","width: 58px");
  var label_width= document.createElement("label");
  label_width.innerHTML="line width";
  label_width.setAttribute("for","width");

  _divLine.appendChild(number_width);
  _divLine.appendChild(label_width);

  var select_style = document.createElement("select");
  select_style.setAttribute("name","style");
  value= that.getLineStyle() || 'solid';
  select_style.add(new Option('Solid', 'solid'));
  select_style.add(new Option('Dashed', 'dashed'));
  for(i=0;i<select_style.length;i++){
	  if(select_style.options[i].value==value)select_style.options[i].selected=true;
  }
  select_style.setAttribute("style","width: 85px");
  var label_style= document.createElement("label");
  label_style.innerHTML="line style";
  label_style.setAttribute("for","style");

  var button_close = document.createElement("input");
  button_close.setAttribute( "type", "submit" );
  button_close.setAttribute( "value", "ok" );
  button_close.setAttribute("style","bottom: 15px");

  var button_cancel = document.createElement("input");
  button_cancel.setAttribute( "type", "submit" );
  button_cancel.setAttribute( "value", "cancel" );
  button_cancel.setAttribute("style","bottom: 15px");

  var closeWindow = function ( event ) {
	  that.setLineWidth(parseFloat(number_width.value,10));
	  that.setLineStyle(select_style.options[select_style.selectedIndex].value);
		that.notifyDraw();

		/*
			Removes the element div that contains the
			dialog to change the color of the node
		*/
    document.body.removeChild( _divContainer );
  }

  var cancelWindow = function ( event ) {
	that.setLineColor(colorLineBackup);
    document.body.removeChild( _divContainer );//elimina el div que contiene la informacion xml de los diagramas
  }

  var changeColorOption = function( event ) {
  		var current=that.getLineColor();
  		if(!current)current='#000000';
  		drawCurrentColor(current);
  		current=current.split('#')[1];
  		var defaultColor = new Array( parseInt(current.slice(0,2),16),
			  parseInt(current.slice(2,4),16),
				parseInt(current.slice(4,6),16));
  		drawColor( canvasR, contextR, defaultColor[0], '#ff0000');
  		drawColor( canvasG, contextG, defaultColor[1], '#00ff00');
  		drawColor( canvasB, contextB, defaultColor[2], '#0000ff');
  }

	button_close.addEventListener('click', closeWindow, false );
	button_cancel.addEventListener('click', cancelWindow, false );

  form.onsubmit = function() { return false; }

	button_close.focus();

	form.appendChild(_divLine);
	form.appendChild(select_style);
	form.appendChild(label_style);
	form.appendChild(document.createElement('br'));
	form.appendChild(button_close);
	form.appendChild(button_cancel);

	_divBlock1.appendChild(_divRGB);
	_divBlock1.appendChild(_divR);
	_divBlock1.appendChild(_divG);
	_divBlock1.appendChild(_divB);
	_divBlock1.appendChild(form);
	_divContainer.appendChild(_divBlock1);


	_divBlock2.appendChild(_divColor);
	_divBlock2.appendChild(document.createElement('div'));
	_divContainer.appendChild(_divBlock2);


	/**
	 * Draws in the canvas a rectangle with a circle whose
	 * position represents a color level between 0 and 255.
	 *
	 * @author Rafael Molina Linares
	 * @update 13/06/2011
	 *
	 * @method drawColor
	 * @param {div} canvas 		Div that contains to the canvas element
	 * @param {CanvasRenderingContext2D} 	cxt 		Context of the canvas element
	 * @param {string} 	defaultColor 	hexadecimal color that determines the position of the circle
	 * @param {string} 	color 		    represents the color uses to draw the rectangle
	 */

	var drawColor = function( canvas,cxt,defaultColor,color){

		if(defaultColor == 0)
			defaultColor = 0.1;
		else if(defaultColor == 120)
			defaultColor = 119.9;


		cxt.save();
		cxt.font = '12px' + ' monospace';
		cxt.textBaseline = 'middle';
		cxt.fillStyle = '#ffffff';
			cxt.fillText( canvas.getAttribute('id'), 0, canvas.height/2 );
		cxt.restore();


		cxt.save();
		cxt.beginPath();
		cxt.fillStyle= color;
		cxt.fillRect(20,0,parseInt(canvas.width)- 50,canvasR.height);
		cxt.closePath();
		cxt.restore();

		cxt.fillStyle = '#000000';
		cxt.beginPath();
		cxt.arc( 20 + (defaultColor*100)/255, parseInt(canvas.height)/2 ,4 , 0 , Math.PI*2, true );
		cxt.closePath();
		cxt.fill();


		cxt.save();
		cxt.font = '12px' + ' monospace';
		cxt.textBaseline = 'middle';
		cxt.fillStyle = '#ffffff';
			cxt.fillText( parseInt(defaultColor), 125, canvas.height/2 );
		cxt.restore();

	}

	/**
	 * Draw a rectangle with the color pass like parameter.
	 * Represent the combination color  of the three primary colors.
	 *
	 * @author Rafael Molina Linares
	 * @update 13/06/2011
	 *
	 * @method drawCurrentColor
	 * @param {string} color represents the color uses to draw the rectangle
	 */
	var drawCurrentColor = function(color){
		contextColor.save();
		contextColor.beginPath();
		contextColor.fillStyle= color;
		contextColor.fillRect(20,20,80,80);
		contextColor.closePath();
		contextColor.restore();
	}

	/**
	 * Convert a decimal number to hexadecimal code, set this color
	 * like background-color of the Node and this is written in '_divRGB' div.
	 *
	 * @author Rafael Molina Linares / Alejandro Arrabal Hidalgo
	 * @update 13/06/2011 / 31/07/2012
	 *
	 * @method colorHex
	 * @param {array} defaultColor 	keep the color RGB in hexadecimal code,
	 *															where each position represents a primary color.
	 */

	var colorHex = function(defaultColor){

		var dec2hex = function (dec){
			var Char_hexadecimales = "0123456789ABCDEF";
			var low = parseInt(dec) % 16;
			var high = (parseInt(dec) - low)/16;

			hex = "" + Char_hexadecimales.charAt(high) + Char_hexadecimales.charAt(low);
			return hex;
		}


		var color = dec2hex(defaultColor[0]) + dec2hex(defaultColor[1]) + dec2hex(defaultColor[2]);
		while(_divRGB.hasChildNodes()){
			_divRGB.removeChild(_divRGB.lastChild);
		}

		_divRGB.appendChild(document.createTextNode('#'));
		_divRGB.appendChild(document.createTextNode(color));
		that.setLineColor('#' + color);
	}

	/**
	 * Method that modify the hexadecimal color of the Node
	 * when it is pressed on one of the rectangles
	 *
	 * @author Rafael Molina Linares  / Alejandro Arrabal hidalgo
	 * @update 13/06/2011 / 31/07/2012
	 *
	 * @method selectColor
	 */

	var selectColor = function( event ){

		var mousex = event.pageX - _divContainer.offsetLeft - this.offsetLeft;
		var mousey = event.pageY - this.offsetTop;

		if(this.getAttribute('id') == "red"){
			defaultColor[0]=((mousex - 20)*255)/100;
			if(defaultColor[0] > 255) defaultColor[0]=255;
			if(defaultColor[0] < 0) defaultColor[0]=0;
			contextR.clearRect(0,0,parseInt(canvasR.width),canvasR.height);
			drawColor( canvasR, contextR, defaultColor[0], '#ff0000');
		}
		if(this.getAttribute('id') == "green"){
			defaultColor[1]=((mousex-20)*255)/100;
			if(defaultColor[1] > 255) defaultColor[1]=255;
			if(defaultColor[1] < 0) defaultColor[1]=0;
			contextG.clearRect(0,0,parseInt(canvasG.width),canvasG.height);
			drawColor( canvasG, contextG, defaultColor[1], '#00ff00');
		}
		if(this.getAttribute('id') == "blue"){
			defaultColor[2]=((mousex-20)*255)/100;

			if(defaultColor[2] > 255) defaultColor[2]=255;
			if(defaultColor[2] < 0) defaultColor[2]=0;

			contextB.clearRect(0,0,parseInt(canvasB.width),canvasB.height);
			drawColor( canvasB, contextB, defaultColor[2], '#0000ff');
		}
		colorHex(defaultColor);
		drawCurrentColor(that.getLineColor());
	}




	drawColor( canvasR, contextR, defaultColor[0], '#ff0000');
	drawColor( canvasG, contextG, defaultColor[1], '#00ff00');
	drawColor( canvasB, contextB, defaultColor[2], '#0000ff');

    drawCurrentColor(that.getLineColor());


	colorHex(defaultColor);



	_divR.addEventListener('mousedown', selectColor, false);
	_divG.addEventListener('mousedown', selectColor, false);
	_divB.addEventListener('mousedown', selectColor, false);


	document.body.appendChild(_divContainer);


  _divContainer.style.top = (window.innerHeight - parseInt(_divContainer.offsetHeight) ) / 2 + "px";
  _divContainer.style.left = (window.innerWidth - parseInt(_divContainer.offsetWidth) ) / 2 + "px";
}



/**
 * Set the menu of the node with the different options
 * that the contextual menu of node has, as well as
 * the actions associated with each option. The passed
 * array is contained by pairs [actions,name], where name is
 * the name that will have the option in the menu, and actions
 * are the actions that will be performed when this option be
 * pressed
 *
 * @author Rafael Molina Linares
 * @update 8/06/2011
 *
 * @method setMenu
 * @param {Array} items contain at the contextual menu
 */

Relation.prototype.setMenu = function(items){
	if(items instanceof Array){
		this._menu = items;
	}
}


/**
 * Retuns the array that contains the information
 * about the contextual menu of the node
 *
 * @author Rafael Molina Linares
 * @update 8/06/2011
 *
 * @method getMenu
 * @return {Array} Information about the node's menu
 */

Relation.prototype.getMenu = function(){
	return this._menu;
}



/**
 * Show the dialog for changing the background-color of the Node.
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 13/08/2012
 *
 * @method showDirectionDialog
 *
 */

Relation.prototype.showDirectionDialog = function( params ) {
	params=params || {}
	var that = params.that || this;


	var _divContainer = document.createElement('div');
	_divContainer.className = "ud_popupDirection";

	var _divNavegability = document.createElement('div');
	_divNavegability.setAttribute('id','divNavegability');


	var form = document.createElement("form");


  var select_direction = document.createElement("select");
  select_direction.setAttribute("name","direction");
  value=that.getDirection();
  select_direction.add(new Option('none', 'none'));
  select_direction.add(new Option('a<-b', 'a'));
  select_direction.add(new Option('a->b', 'b'));
  select_direction.add(new Option('a<->b', 'ab'));
  for(i=0;i<select_direction.length;i++){
	  if(select_direction.options[i].value==value)select_direction.options[i].selected=true;
  }
  select_direction.setAttribute("style","width: 85px");

  var header_direction= document.createElement("h5");
  header_direction.innerHTML="Navegability:";


  var button_close = document.createElement("input");
  button_close.setAttribute( "type", "submit" );
  button_close.setAttribute( "value", "ok" );

  var button_cancel = document.createElement("input");
  button_cancel.setAttribute( "type", "submit" );
  button_cancel.setAttribute( "value", "cancel" );


  var closeWindow = function ( event ) {
	  that.setDirection(select_direction.options[select_direction.selectedIndex].value);
		that.notifyDraw();

		/*
			Removes the element div that contains the
			dialog to change the color of the node
		*/
    document.body.removeChild( _divContainer );
  }

  var cancelWindow = function ( event ) {
    document.body.removeChild( _divContainer );//elimina el div que contiene la informacion xml de los diagramas
  }


	button_close.addEventListener('click', closeWindow, false );
	button_cancel.addEventListener('click', cancelWindow, false );

  form.onsubmit = function() { return false; }

	button_close.focus();

	form.appendChild(select_direction);
	form.appendChild(document.createElement("br"));
	form.appendChild(button_close);
	form.appendChild(button_cancel);

	_divNavegability.appendChild(form);
	_divContainer.appendChild(header_direction);
	_divContainer.appendChild(_divNavegability);

	document.body.appendChild(_divContainer);


  _divContainer.style.top = (window.innerHeight - parseInt(_divContainer.offsetHeight) ) / 2 + "px";
  _divContainer.style.left = (window.innerWidth - parseInt(_divContainer.offsetWidth) ) / 2 + "px";
}



/**
 * The direction of the relations's line is defined
 * by an string(a,b or ab direction)
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 13/10/2012
 *
 * @method setDirection
 * @param {String} direction String that define the direction of the relation
 */
Relation.prototype.setDirection = function( direction ) {
	direction=direction.toLowerCase();
	switch(direction) {
	case 'a':
		 this.setDirectionToA(true);
		 this.setDirectionToB(false);
		 break;
	case 'b':
		this.setDirectionToA(false);
		this.setDirectionToB(true);
		break;
	case 'ab':
		this.setDirectionToA(true);
		this.setDirectionToB(true);
		break;
	case 'none':
		this.setDirectionToA(false);
		this.setDirectionToB(false);
		break;
  }
}




/**
 * Set if the relation is directed to A elem or not
 *
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 16/10/2012
 *
 * @method setDirectionToA
 * @param {Boolean}directed If the relation is directed to A elem or not
 */
Relation.prototype.setDirectionToA = function(directed) {
	this._directionA=directed;
	if(directed==true){
		this.setStart(new OpenTip());
	}
	else{
		if(this._start instanceof OpenTip)this._start=null;
	}
}




/**
 * Set if the relation is directed to B elem or not
 *
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 16/10/2012
 *
 * @method setDirectionToA
 * @param {Boolean}directed If the relation is directed to B elem or not
 */
Relation.prototype.setDirectionToB = function(directed) {
	this._directionB=directed;
	if(directed==true){
		this.setEnd(new OpenTip());
	}
	else{
		if(this._end instanceof OpenTip)this._end=null;
	}
}




/**
 * Get the relation direction to A elem.
 *
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 16/10/2012
 *
 * @method getDirectionToA
 * @return {Boolean}If the relation is directed to A elem or not
 */
Relation.prototype.getDirectionToA = function() {
	return this._directionA;
}




/**
 * Get the relation direction to B elem.
 *
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 16/10/2012
 *
 * @method getDirectionToB
 * @return {Boolean}If the relation is directed to B elem or not
 */
Relation.prototype.getDirectionToB = function() {
	return this._directionB;
}





/**
 * Return the direction of the relations's line defined
 * by an string(a,b or ab direction)
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 16/10/2012
 *
 * @method getDirection
 * @return {String} direction String that define the direction of the relation
 */
Relation.prototype.getDirection = function() {

	if(this.getDirectionToA() && this.getDirectionToB()){
		return 'ab';
	}
	else if(this.getDirectionToA()){
		return 'a';
	}
	else if(this.getDirectionToB()){
		return 'b';
	}
	return 'none';
}




/**
 * Get the object found under the first point of Message
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 27/10/2012
 *
 * @method getElementA
 * @return {Element} first element of Relation
 */

Relation.prototype.getElementA = function() {
  return this._elemA;
}




/**
 * Get the object found under the second point of Message
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 27/10/2012
 *
 * @method getElementB
 * @param {Element} Second element of Relation
 */

Relation.prototype.getElementB = function() {
  return this._elemB;
}














/**
 * Representa un conjunto de campos de texto editables por el usuario
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @class TextFields
 * @extends SuperComponent
 */
var TextFields = function( params ) {
  params = params || {};
  TextFields.baseConstructor.call( this, params );

  this.setMinHeight( 10 );
  this.setMinWidth( 25 );
}
JSFun.extend( TextFields, SuperComponent );



/*
TextFields.prototype.setValue = function( value ) {
  this.addField( value );
}*/



/**
 * Comprueba si el punto indicado está sobre el componente
 *
 * @author Martín Vega-leal Ordóñez
 * @update 30/11/2010
 *
 * @method isOver
 * @param {Number} x Coordenada x del punto a comprobar
 * @param {Number} y Coordenada y del punto a comprobar
 * @return {Boolean} Si el punto está sobre el componente
 */
TextFields.prototype.isOver = function( x, y ) {
  if( this._visible &&
			this.visibilitySubComponents() &&
      Math.abs( x - ( this._getX() + this.getWidth() - 5) ) <= 6
      && Math.abs( y - ( this._getY() + 5 ) ) <= 6 )
  {
    return true;
  } else {
    return TextFields.base.isOver.call( this, x, y );
  }
}



/**
 * Comprueba que se ha pulsado sobre el componente en las coordenadas
 * indicadas y en caso afirmativo activa las acciones pertinentes
 *
 * @author Martín Vega-leal Ordóñez
 * @update 4/11/2010
 *
 * @method select
 * @param {Number} x Coordenada x
 * @param {Number} y Coordenada y
 * @return {Boolean} Si el punto está sobre el componente
 */
TextFields.prototype.select = function( x, y ) {
	var compX = (this._orientation) ? (this._getX() + 5) : (this._getX() + this.getWidth() - 5);
	var compY = (this._orientation) ? (this._getY() + this.getHeight() - 5) : (this._getY() + 5);
  if( this.visibilitySubComponents() &&
      Math.abs( x - compX  ) <= 6
      && Math.abs( y - compY ) <= 6 )
  {

    this.addField();
    return true;
  } else {
    return TextFields.base.select.call( this, x, y );
  }
}



/**
 * Define el tipo de elemento que contendrá el super-componente
 * en este caso será un objeto de tipo TextBox
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method newItem
 * @return {TextBox} Nuevo objeto del componente
 */
TextFields.prototype.newItem = function() {
  return new TextBox();
}



/**
 * Permite añadir un campo de texto al componente con el valor pasado
 * como parámetro
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method addField
 * @param {String} text Valor del nuevo campo de texto
 */
TextFields.prototype.addField = function( text ) {
    var nt = this.newItem();
    nt.setDeletable();
    nt.setValue( text );
    this.addSubComponent( nt );
    this.notifyChange();
}



/**
 * Dibuja el contorno y los elementos interactuables del componente
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method drawShape
 * @param {CanvasRenderingContext2D} context Contexto del elemento canvas
 */
TextFields.prototype.drawShape = function( context ) {

	if(!this._visible)
		return;

  TextFields.base.drawShape.call( this, context );

  if( this.visibilitySubComponents() ) {
    context.save();

    context.fillStyle = '#94dc91';
    context.beginPath();
		if(this._orientation)
	    context.arc( this.getPixelX() + 5 , this.getPixelY() + this.getHeight() - 5, 4, 0, Math.PI*2, true );
		else
	    context.arc( this.getPixelX() + this.getWidth() - 5 , this.getPixelY() + 5, 4, 0, Math.PI*2, true );
    context.closePath();
    context.fill();

    context.restore();
  }

}










/**
 * Constructor de la clase StereotypeItem
 * Crea un 'item' que controla un estereotipo de UML 2
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @class StereotypeItem
 * @extends TextBox
 */
var StereotypeItem = function( params ) {
  params = params || {};
  StereotypeItem.baseConstructor.call( this, params );

  this._parse = /^\xAB(.*)\xBB$/;

	if(this._orientation)//vertical orientation
	  this.setMinHeight( 40 );
	else
	  this.setMinWidth( 40 );
}
JSFun.extend( StereotypeItem, TextBox );



/**
 * Codifica el texto del componente para un estereotipo
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method encode
 * @protected
 * @param {String} value Cadena con el valor del estereotipo sin codificación
 * @return {String} Linea de texto del componente
 */
StereotypeItem.prototype.encode = function( value ) {
  var string = '';

  if( value ) {
    string += '\xAB' + value + '\xBB';
  }

  if( this._parse.exec( string ) ) {
    return string;
  } else {
    return 'wrong_stereotype';
  }
}



/**
 * Separa una cadena que contiene un texto en sus diferentes elementos
 * separados para mostrarlos en un dialogo al usuario
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method decode
 * @protected
 * @param {String} Valor que se va decodificar según la lógica del estereotipo
 * @return {String} Valor del estereotipo sin formato
 */
StereotypeItem.prototype.decode = function( string ) {

  var result = this._parse.exec( string );

  if( result ) {
    result.shift();
    return result[0];
  } else {
    return '';
  }

}





/**
 * Constructor de la clase StereotypeFields
 * Representa un conjunto de campos de texto editables por el usuario
 * con la representación de un estereotipo
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @class StereotypeFields
 * @extends TextFields
 */
var StereotypeFields = function( params ) {
  params = params || {};
  StereotypeFields.baseConstructor.call( this, params );

  this.setMinHeight( 1 );
  this.setMinWidth( 1 );
  this.setHeight( 1 );
  this.setWidth( 1 );

}

JSFun.extend( StereotypeFields, TextFields );



/**
 * Define el tipo de elemento que contendrá el super-componente
 * en este caso será un objeto de tipo StereotypeItem
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method newItem
 * @return {StereotypeItem} Nuevo objeto del componente
 */
StereotypeFields.prototype.newItem = function() {
  return new StereotypeItem({ text: '\xABstereotype\xBB', orientation : this._orientation || 0 });
}




/**
 * Region Class Constructor, creates a region of a supernode
 *
 * @author Rafael Molina Linares
 * @update 19/8/2011
 *
 * @class Region
 * @extends Node
 *
 */
var Region = function( params ) {

  params = params || {};
  Region.baseConstructor.call(this,params);
  this.setType('Region');

  this._parent = params.parent || null;

	this.setContainer();

  if(params.addComponent != false)
    this.addComponents();
}
JSFun.extend( Region, Node );



/**
 * Adds the components to the region according to
 * the orientation of the supernode that
 * contains that region
 *
 * @author Rafael Molina Linares
 * @update 20/08/2011
 *
 * @method addComponents
 * @params {Boolean} changeablePosition Indicates that the size and position of the current
 *																		  region and the before region can't be changed. It is
 *																		  used when the method is called from importation method
 *																		  that don't want to modify the position and size pass
 *																		  like parameters. A value 'false' not allow to modify the
 *																		  position.
 *
 */

Region.prototype.addComponents = function( changeablePosition ){

  var changeablePosition = (JSFun.isBoolean( changeablePosition )) ? changeablePosition : true;

	var nodeChilds = this._parent._nodeChilds;
	var len = nodeChilds.length;
  var index;

	/*
		If the region is the first added to the supernode, the width/height
		is the same that the width/height of the supernode
	*/
  if(len == 0){
    if(this._parent._orientation)
      this.setWidth(this._parent._width);
    else//horizontal orientation
      this.setHeight(this._parent._height);
  }

	if(this._parent._orientation){

		/*
		  If the last added region hasn't been the first of the supernode,
			the width of the second last node is halved and the last node is
			posicionated in the second half. When the position and size of
			the before region not want to be modified, the
			'changeablePosition' parameter is used
		*/
		if(len > 0 && changeablePosition){

			nodeChilds[len - 1].setWidth( nodeChilds[len - 1].getWidth()/2);
			this._x = nodeChilds[len - 1].getX() + nodeChilds[len - 1].getWidth();
			this.setWidth(this._parent.getX() + this._parent.getWidth() - this._x);
		}

		if(!(this._parent instanceof Alternative) && !(this._parent instanceof HierarchicalSwimlane ) && this._parent._includeComponentByRegion ){
			this.addComponent( new StereotypeFields({ id: 'stereotypes', centered: true}) );
			this.addComponent( new TextBox({ id: 'name_node', text: 'region', margin: 3, centered: true }) );
	  }

		if(len > 0) {

			var width = 1;
			var height = this._parent.getHeight() - this._parent._components[0]._height - this._parent._components[1]._height;

			var heightSmallRectangle = this._parent._heightSmallRectangle || 15;
			nodeChilds[ len - 1].addComponent( new RegionLine({ id: 'region', margin: 0 ,width: width, height: height, position: Component.TopRight, orientation: 1}) );
		  }
	}
	else{//horizontal orientation

		/*
		  If the last added region hasn't been the first of the supernode,
			the width of the second last node is halved and the last node is
			posicionated in the second half. When the position and size of
			the before region not want to be modified, the
			'changeablePosition' parameter is used
		*/
	  if(len > 0 && changeablePosition){

			nodeChilds[len - 1].setHeight( nodeChilds[len - 1].getHeight()/2);
			this._y = nodeChilds[len - 1].getY() + nodeChilds[len - 1].getHeight();
		  this.setHeight(this._parent.getY() + this._parent.getHeight() - this._y);
	  }

	  if(this._parent instanceof Alternative){
			this.addComponent( new StereotypeFields({ id: 'stereotypes'}) );
			this.addComponent( new GuardItem({ id: 'description', text: '[]', margin: 1}) );
	  }

	  if(!(this._parent instanceof Alternative) && !(this._parent instanceof HierarchicalSwimlane ) && this._parent._includeComponentByRegion ){
			this.addComponent( new StereotypeFields({ id: 'stereotypes', centered: true}) );
			this.addComponent( new TextBox({ id: 'name_node', text: 'region', margin: 3, centered: true }) );
	  }

	  if(len > 0) {
			var height = 1;
			var width = this._parent.getWidth();

			nodeChilds[ len - 1].addComponent( new RegionLine({ id: 'region', margin: 0 , width: width, height: height, position: Component.BottomLeft, orientation: 0}) );
	  }
	}
}



/**
 * If the node that call to the function, is container, checks
 * your minimal size taking in account the element and
 * components that contains
 *
 * @author Rafael Molina Linares
 * @update 20/08/2011
 *
 * @method updateContainer
 * @param {boolean} recall If the parent's method is called
 */
Region.prototype.updateContainer = function(recall) {

  if(!(recall == false || recall == true))
	  recall = true;

  if( this._container ) {

    var i;

    var lx = this._x;
    var ly = this._y;

    var rx = this._x;
    var ry = this._y;

    var elem;
    var elemRigthX, elemRigthY, elemLeftX, elemLeftY;

		/*
			Store the coordinates of the extreme right,
			left, bottom and top of the child nodes
		*/
    for( i in this._nodeChilds ) {

      elem = this._nodeChilds[i];

			if(elem._visible){
		    elemLeftX = elem._x;
		    elemLeftY = elem._y;
		    elemRigthX = elem._x + elem._width;
		    elemRigthY = elem._y + elem._height;


		    if( elemRigthX > rx )
		      rx = elemRigthX;
		    if( elemRigthY > ry )
		      ry = elemRigthY;

		    if( elemLeftX < lx )
		      lx = elemLeftX;
		    if( elemLeftY < ly )
		      ly =elemLeftY;
			}
    }

    /*
			Is added a separation's space between the region line
			component and the region.
		*/
		for(i=this._components.length; i--;)
			if(this._components[i] instanceof RegionLine)
				break;

		if(i != -1){
	    if(this.getParent()._orientation)
				rx += this._components[i]._width + 2;
	    else//horizontal orientation
				ry += this._components[i]._height + 2;
		}


    var beforeNodeIndex = -1
    var nextNodeIndex = -1

    if(this.getParent()._orientation){

      if( (lx < this._x) || (rx > (this._x + this._width)) ) {

				var newWidth;

				for(i = 0; i<this.getParent()._nodeChilds.length; i++){
					var nod = this.getParent()._nodeChilds[i];

					if((nod.getX() + nod.getWidth()) > lx){
						if(beforeNodeIndex == -1)
							beforeNodeIndex = i;
					}
					if( (nod.getX() ) < rx)
						nextNodeIndex = i;
				}

				/*
					Update the width of the supernode and the left upper x coordinate
					of this region if some child node has its left x
					coordinate out the region
				*/
				if( (beforeNodeIndex != -1) && (lx < this._x)){
					newWidth = this._x - lx + this.getParent().getWidth();
					this.getParent()._x = this.getParent()._x - (this._x - lx);
					this.getParent().setWidth(newWidth);
				}

				/*
					Update the width of the supernode if some child
					node has its right x coordinate out the region
				*/
				if(rx > (this._x + this._width)) {
					newWidth = rx - this._x - this._width + this.getParent().getWidth();
					this.getParent().setWidth(newWidth);
				}
			}
		}
		else { //horizontal orientation of the Region line

			if( (ly < this._y) || (ry > (this._y + this._height)) ) 	{
				for(i = 0; i<this.getParent()._nodeChilds.length; i++){
					var nod = this.getParent()._nodeChilds[i];

					if((nod.getY() + nod.getHeight()) > ly){
						if(beforeNodeIndex == -1)
							beforeNodeIndex = i;
					}
					if( (nod.getY() ) < ry)
						nextNodeIndex = i;
				}

				/*
					Update the height of the supernode and the left upper
  				y position of this region if some child node has
					its top y coordinate out the region
				*/
				var newHeight;
				if( (beforeNodeIndex != -1) && (ly < this._y)){
					newHeight = this._y - ly + this.getParent().getHeight();
					this.getParent()._y = this.getParent()._y - (this._y - ly);
					this.getParent().setHeight(newHeight);
				}

				/*
					Update the height of the supernode if some child
					node has its bottom y coordinate out the region
				*/
				if(ry > (this._y + this._height)) {
					newHeight = ry - this._y - this._height + this.getParent().getHeight();
					this.getParent().setHeight(newHeight);
				}
    	}
		}

    if( lx < this._x || ly < this._y ) {
      this.setWidth( this._x - lx + this._width );
      this.setHeight( this._y - ly + this._height );

      this._x = lx;
      this._y = ly;

      this.setMinWidth( rx - lx );
      this.setMinHeight( ry - ly );
    } else {

      this.setMinWidth( rx - this._x );
      this.setMinHeight( ry - this._y );
    }

    this._prex = this._x;
    this._prey = this._y;

    this.updateComponents();

    if( this._parent && recall) {
      this._parent.updateContainer();
		}
	}
}



/**
 * Checks if the given point is over a region line of region
 *
 * @author Rafael Molina Linares
 * @update 19/09/2011
 *
 * @method isOverRegionLine
 * @private
 * @param {Number} x Coordinate x of point to check
 * @param {Number} y Coordinate y of point to check
 * @return {Boolean} If the point is over the region line
 */
Region.prototype.isOverRegionLine = function( x, y ) {

  var i;

  for( i = 0; i < this._components.length; i += 1 ) {

    if( this._components[i] instanceof RegionLine && this._components[i].isOver( x, y ) ) {
      return true;
    }
  }

  return false;
}




/**
 * Class responsible for managing the elements of a generic diagram capturing
 * the events relevant to the interaction between nodes and their relationships
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @class Diagram
 * @param {HTMLID} id Id of the <div> element that contains the diagram
 * @param {CSSColor} background Color for the background of the draw canvas
 * @param {Number} width Width of the drawing canvas
 * @param {Number} height Height of the drawing canvas
 * @param {CSSColor} backgroundNodes Color for the background of the nodes of the diagram
 */
var Diagram = function( params ) {

  this._alone = false;
  this._width = 0;
  this._height = 0;
  this._background =  '#ffffff';

  this._div = null;
  this._mainContext = null;
  this._motionContext = null;


  this._nodes = [];
  this._relations = [];

  this._pressMouse = false;
  this._pressMouseRight = false;
  this._pressKey = false;

  this._validElements = [];
  this._items = [];
  this._id;
  this._type = 'untyped';

  this._activeMenu = false;
	this._visible = true;

  this._name = new Tab({ text: 'Diagram name', margin: 6 });
  
  this._name.setCoordinates( 0, 0 );
  this._name.setParent( this );
      


  if( params ) {
		if( params.backgroundNodes ){
      this._backgroundNodes = params.backgroundNodes;
		}

		/*
		  If the diagram is not invoked from the application layer,
		  it generates the structure of <canvas> elements
			with information passed in the background,
			id,width and height parameters
		*/

    if( params.background ) {
      this._background = params.background;
    }

		if(params.id){
	    this._alone = true;
  	  this._generateStructure( params.id, params.width, params.height );
		}
  }

	/*
		Attributes that represent the current and previous element with
		which the user has had interaction(used in the _defineDragAndDrop method)
	*/
  this._element = null;
  this._lastElement = null;

  this._defineDragAndDrop();

	/*
		Attribute that notifies if the dinamiv rezising of
		the canvas's height is performed or not
	*/
	this._updateCanvas = false;
}



/**
 * Generates the elements needed to draw and animate the diagram
 * and the values ​​assigned to attributes that apply. It is used
 * when the diagram is not contained in any application
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method generateStructure
 * @private
 * @param {String} divId Name of the 'id' property of div that will contained the diagram
 * @param {Number} width Width of the drawing canvas
 * @param {Number} height Height of the drawin canvas
 */
Diagram.prototype._generateStructure = function( div, width, height ) {

  if( !width || width < 0 ) {
    width = 300;
  }
  if( !height || height < 0 ) {
    height = 100;
  }

  this._width = width;
  this._height = height;

  
  div.setAttribute( 'class', 'ud_diagram_div' );
  div.style.width = width + 'px';
  div.style.height = height + 'px';
  this._div = div;


  var canvas = document.createElement('canvas');
  canvas.setAttribute( 'class', 'ud_diagram_canvas' );
  canvas.width = width;
  canvas.height = height;
  this._mainContext = canvas.getContext('2d');
  div.appendChild( canvas );

  canvas = document.createElement('canvas');
  canvas.setAttribute( 'class', 'ud_diagram_canvas' );;
  canvas.width = this._width;
  canvas.height = this._height;
  canvas.onmousedown = function () { return false; }
  this._motionContext = canvas.getContext('2d');
  div.appendChild( canvas );

  return true;
}



/**
 * Initializes the diagram's values by the extern application, and re-writes
 * the possible initial values
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method initialize
 * @param {Number} id Number of diagram's id
 * @param {DOMNode} div Node of <div> type that contains the drawin canvas element
 * @param {CanvasRenderingContext2D} mainContext Context of the main drawing canvas
 * @param {CanvasRenderingContext2D} motionContext Context where is drawn the movement of the element
 * @param {Number} width Width of the drawing canvas
 * @param {Number} height Height of the drawing canvas
 * @return {Boolean} If the diagram has been initialized correctly, in other case return false
 */
Diagram.prototype.initialize = function( id, div, mainContext, motionContext, width, height ) {

  if( JSFun.isNumber( id ) &&
      div.nodeName == 'DIV' &&
      mainContext instanceof CanvasRenderingContext2D &&
      motionContext instanceof CanvasRenderingContext2D &&
      width > 0 &&
      height > 0 )
  {
    this._id = id;
    this._div = div;
    this._mainContext = mainContext;
    this._motionContext = motionContext;
    this._width = width;
    this._height = height;

    return true;
  } else {
    return false;
  }
}



/**
 * Returns the id's number assigns to the diagram by the application
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method getId
 * @return {Number} Number of the id
 */
Diagram.prototype.getId = function() {
  return this._id;
}



/**
 * Assignss to the diagram a number of id whitin of the application
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method setId
 * @param {Number} value Number of id
 */
Diagram.prototype.setId = function( value ) {
  this._id = value;
}



/**
 * Returns the name assigns to the diagram
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method getName
 * @return {String} Name of the diagram
 */
Diagram.prototype.getName = function() {
  return this._name.getValue();
}



/**
 * Assigns to the diagram the given name as parameter
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method setName
 * @param {String} value Name of the diagram
 */
Diagram.prototype.setName = function( value ) {
  if( JSFun.isString( value ) ) {
    // this._name.setValue( value );
  }
}



/**
 * Assign a diagram's type that identifies the diagram's type that contains
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method setType
 * @param {String} value Diagram's type
 */
Diagram.prototype.setType = function( value ) {
  if( this._type == 'untyped' && JSFun.isString( value ) ) {
    this._type = value;
  }
}



/**
 * Returns the diagram's type that contains the object
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method getType
 * @return {String} Diagram's type
 */
Diagram.prototype.getType = function() {
  return this._type;
}



/**
 * Notifies to the object that should refresh the drawing canvas.
 * The call of this method will be done by an object of the diagram
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 *
 * @method notifyDraw
 */
Diagram.prototype.notifyDraw = function() {
  this.draw();
}



/**
 * Notifies to the object that some components has changed your value.
 * An example is the tab's name that identifies to the diagram in an external application
 *
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method notifyChange
 */

Diagram.prototype.notifyChange = function() {
  this.draw();
}



/**
 * Adds a element to the list of nodes or relation according to your type,
 * without performs any check over your state or update about yourself
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method _addElementOnly
 * @private
 * @param {Element} elem New element to the diagram
 */
Diagram.prototype._addElementOnly = function( elem ) {

  if( elem instanceof Node ) {
    elem.setDiagram( this );
    this._nodes.push( elem );

  } else if( elem instanceof Relation ) {
    elem.setDiagram( this );
    this._relations.push( elem );
  }

}



/**
 * Adds a element to the list of nodes or relation according to your type,
 * performs any check over your state or update about yourself
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method addElement
 * @param {Element} elem Nuevo elemento del diagrama
 * @return {Boolean} Si el elemento ha sido añadido al diagrama o no
 */
Diagram.prototype.addElement = function( elem ) {

  if( !elem || ! (elem instanceof Element) ) {
    return false;
  }

  var i;

  for( i in this._validElements ) {
    if( elem.getType() == this._validElements[i] ) {
      if( elem instanceof Node ) {

        this._addNode( elem );
        return true;
      } else if( elem instanceof Relation ) {

        this._addRelation( elem );
        return true;
      }
    }
  }

  return false;
}



/**
 * Adds a element of type Node to the list of nodes, and
 * accordingly updates this place and its components
 *
 * @author Martín Vega-leal Ordóñez		/  Rafael Molina Linares
 * @update 28/11/2010									/  9/11/2011
 *
 * @method addElement
 * @param {Node} newNode Node that will be added to the diagram
 */

Diagram.prototype._addNode = function( newNode ) {

  if( newNode instanceof Node ) {

    newNode.setDiagram( this );

    if(newNode instanceof SuperNode){
      for(var i=0;i<newNode._nodeChilds.length;i++)
				newNode._nodeChilds[i].setDiagram(this);
    }

    this._nodes.push( newNode );

		if(this._backgroundNodes)
			newNode.setBackgroundColor(this._backgroundNodes);

    if( !newNode.isAlone() ) {
      this.checkForParent( newNode );
    }

    newNode.updatePosition();

    if( newNode.getParent() ){

      newNode._parent.updateContainer();

			var superNode = newNode._parent.getParent();
			while(superNode){
				if( superNode instanceof SuperNode){
					superNode.notifyChange(true);
					superNode = null;
				} else {
					superNode = superNode._parent;
				}
			}
		}

    this._sortNodesByArea();

  }

}

/**
 * Set the background-color that will be used to draws the nodes of the diagram
 *
 * @author Rafael Molina Linares
 * @update 5/10/2011
 *
 * @method setBackgroundNodes
 * @param {colorCSS} color Backgroun-color used to draws the nodes of the diagram
 *
 */

Diagram.prototype.setBackgroundNodes = function( color ){

	if(color)
		this._backgroundNodes = color;
}


/**
 * Deletes the element to the diagram
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method delElement
 * @param {Element} elem Element that going to be remove
 * @return {Boolean} If the element has been remove of the diagram
 */

Diagram.prototype.delElement = function( elem ) {
  var i;

  for( i in this._nodes ) {
    if( this._nodes[i] == elem ) {
      elem.remove();
      return true;
    }
  }

  for( i in this._relations ) {
    if( this._relations[i] == elem ) {
      elem.remove();
      return true;
    }
  }

  return false;
}



/**
 * Notifies to the diagram that the delete of the some
 * element so that be remove of the diagram
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method notifyDeleted
 * @param {Element} element Elements that notifies that has been remove
 */

Diagram.prototype.notifyDeleted = function( element ) {
  var i;

  if( element instanceof Relation ) {
    for( i in this._relations ) {
      if( this._relations[i] == element ) {
        this._relations.splice( i, 1 );
        return;
      }
    }

  } else if( element instanceof Node ) {
    for( i in this._nodes ) {
      if( this._nodes[i] == element ) {
        this._nodes.splice( i, 1 );
        return;
      }
    }
  }
}



/**
 * Adds a element of type Relation to the list of relations,
 * and accordingly updates the state of the diagram
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method _addRelation
 * @private
 * @param {Relation} newRelation Relation that is added to the diagram
 */
Diagram.prototype._addRelation = function( newRelation ) {

  if( newRelation instanceof Relation ) {
    newRelation.setDiagram( this );
    this._relations.push( newRelation );
  }
}



/**
 * Checks the existence of two nodes in the given coordinates, and in affirmative case,
 * is assigned the relation to the selected elements
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method addRelationFromPoints
 * @param {Relation} newRelation Relation that is added to the diagram
 * @param {Number} x1 Coordinate x of the first point
 * @param {Number} y1 Coordinate y of the first point
 * @param {Number} x2 Coordinate x of the second point
 * @param {Number} y2 Coordinate y of the second point
 * @return {Boolean} if the relation has been added
 */
Diagram.prototype.addRelationFromPoints = function( newRelation, x1, y1, x2, y2 ) {

  var elem1 = this.getElementByPoint( x1, y1 );
  var elem2 = this.getElementByPoint( x2, y2 );

  if( elem1 && elem2 ) {
    if( newRelation.setElements( elem1, elem2 ) ) {
      newRelation.notifyChange();
      return this.addElement( newRelation );
    }
  }
  return false;
}



/**
 * Clear the drawing canvas, deleting all visible element
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method _clearMain
 * @private
 */
Diagram.prototype._clearMain = function() {
  this._mainContext.clearRect(0, 0, this._width, this._height );

  this._mainContext.save();
  this._mainContext.fillStyle = this._background;
  this._mainContext.fillRect( 0, 0, this._width, this._height );
  this._mainContext.restore();
}



/**
 * Clear the drawing canvas that represents the motion of the elements
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method _clearMotion
 * @private
 */
Diagram.prototype._clearMotion = function() {
  this._motionContext.clearRect(0, 0, this._width, this._height );
}



/**
 * Draws all the elements of the diagram in the main drawing canvas
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method draw
 */

Diagram.prototype.draw = function() {

	this._clearMain();

	this.updateHeightCanvas();

	this._name.draw( this._mainContext );


	for( i = this._nodes.length - 1; i >= 0; i-=1 ) {
		this._nodes[i].draw( this._mainContext );
	}

	for( i in this._relations ) {
		this._relations[i].draw( this._mainContext );
	}
}


/**
 * Update the height of the canvas element of diagram so that there aren't any element out
 *
 * @author Rafael Molina Linares
 * @update 23/09/2011
 *
 * @method updateHeightCanvas
 */

Diagram.prototype.updateHeightCanvas = function(){

	if(!this._updateCanvas)
		return;

	var i;

	var maxHeight = 0;
	for( i = this._nodes.length - 1; i >= 0; i-=1 ) {
		if( (this._nodes[i]._y + this._nodes[i]._height + 10) > maxHeight)
			maxHeight = this._nodes[i]._y + this._nodes[i]._height + 10;
	}

	if(maxHeight > this._height){

		this._div.style.height = maxHeight + 'px';

		this._div.childNodes[0].height = maxHeight;
		this._div.childNodes[1].height = maxHeight;
		this._mainContext.canvas.height = maxHeight;
		this._motionContext.canvas.height = maxHeight;

		this._clearMotion();

		this._height = maxHeight;
	} else {

		/*
			If the maximum y coordinate is less than the current height,
			the height is reducing provided that not less than 580
		*/
		maxHeight = (maxHeight > 580) ? maxHeight : 580;

		this._div.style.height = maxHeight + 'px';

		this._div.childNodes[0].height = maxHeight;
		this._div.childNodes[1].height = maxHeight;
		this._mainContext.canvas.height = maxHeight;
		this._motionContext.canvas.height = maxHeight;

		this._clearMotion();

		this._height = maxHeight;
	}
}

/**
 * Choose if the dinamical redimension of canvas's height is activated/desactivated
 *
 * @author Rafael Molina Linares
 * @update 23/09/2011
 *
 * @method setUpdateHeightCanvas
 * @private
 * @param {Boolean} bool Value that set to activated/desactivated the automatic redimension of canvas's height
 */

Diagram.prototype.setUpdateHeightCanvas = function(bool){
	this._updateCanvas = bool;
}


/**
 * Draws the movement of the given element, drawing your shape
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method _drawMotion
 * @private
 * @param {Element} element Elemento a dibujar
 */
Diagram.prototype._drawMotion = function( element ) {
  this._clearMotion();
  element.drawShape( this._motionContext );
}



/**
 * Sorts the nodes of the diagram by your area in sort ascendant
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method _sortNodesByArea
 * @private
 */
Diagram.prototype._sortNodesByArea = function() {
  this._nodes.sort(
    function( a, b ) {
      var area1 = a.getArea();
      var area2 = b.getArea();

      if( area1 < area2 )
        return -1;
      else if( area1 == area2 )
        return 0;
      else
        return 1;

  });
}



/**
 * Checks the existence of a diagram's element in the given coordinates
 * and returns it in affirmative case
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method getElementByPoint
 * @param {Number} x Coordinate x of the element to search
 * @param {Number} y Coordinate y of the element to search
 * @return {Element} element found or null in your default
 */
Diagram.prototype.getElementByPoint = function( x, y ) {
  var i,j;

  for( i in this._relations ) {
    if( this._relations[i].isOver( x, y ) ) {
      return this._relations[i];
    }
  }

  for( i = 0; i < this._nodes.length; i++ ) {

    if( this._nodes[i].isOver( x, y ) ) {
      return this._nodes[i];
    }
  }

  return null;
}



/**
 * Is searched a element in the given coordinates and if if exists, this is returned
 *
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method reassignRelationTo
 * @param {Relation} rel Relation that will allocated
 * @param {number} x Coordinate x of the element to assign
 * @param {Number} y Coordinate y of the element to assign
 * @return {Element} element allocated in given coordinates
 */
Diagram.prototype.reassignRelationTo = function( rel, x, y ) {
  var i;

  for(i in this._relations ) {
    if( this._relations[i] != rel &&  this._relations[i].isOver( x, y ) ) {
      return this._relations[i];
    }
  }

  for( i = 0; i < this._nodes.length; i++ ) {
    if( this._nodes[i].isOver( x, y ) ) {
      return this._nodes[i];
    }
  }

  return null;
}



/**
 * Checks the hierarchy of elements whitin the diagram and the relative position of the passed element as parameter,
 * reassigns it in your correct position on parents
 *
 * @author Martín Vega-leal Ordóñez		/ Rafael Molina Linares
 * @update 28/11/2010									/ 20/08/2011
 *
 * @method checkForParent
 * @param {Element} element Elemento para comprobar jerarquía
 */

Diagram.prototype.checkForParent = function( element ) {
  if( element instanceof Node ) {

    var i;
    var newParent;
    var nodeParent;
    var found = false;
    var foundNode = false;

    var lastParent = element.getParent();

    for( i = 0; i < this._nodes.length && !found; i++  ) {

      newParent = this._nodes[i];

      if(newParent instanceof SuperNode){
				for(var j=0; j< newParent._nodeChilds.length && !found; j++){

					nodeParent = newParent._nodeChilds[j];

					if(   nodeParent.isContainer()
						 && nodeParent != element
						 && nodeParent.isOver( element.getCentralPoint() )
						 && ( !element.isContainer() || ( element.isContainer() && !nodeParent.isChildOf( element ) ) ) ){
							found = true;
							newParent = nodeParent;
							break;
	        }
				}
      }
      else { //If the new parent isn't a supernode

				if(   newParent.isContainer()
					 && newParent != element
					 && newParent.getArea() > element.getArea()
					 && newParent.isOver( element.getCentralPoint() )
					 && ( !element.isContainer() || ( element.isContainer() && !newParent.isChildOf( element ) ) ) ){
						found = true;
						break;
				}
      }
    }


    if( found ) {

      if( newParent == lastParent ) {
      } else if( lastParent ) {
        lastParent.delChild( element );
        lastParent.updateContainer();
        newParent.addChild( element );
      } else {
        newParent.addChild( element );
      }

    } else {

      if( lastParent ) {

        lastParent.delChild( element );
        lastParent.updateContainer();

				/*
					If the element is contained in a supernode's region, first
					all supernode's regions must be updated and then, the
					supernode must be updated
				*/
				var superNode = lastParent.getParent();
				if( superNode instanceof SuperNode){
					superNode.notifyChange(true);
				}
      }
    }
  }
}




/**
 * Generates the necessary functions for the management of the interaction with the user,
 * including the calls to the select/drag/drop methods to the different elements
 * of the diagram
 *
 * @author Martín Vega-leal Ordóñez		/ Rafael Molina Linares
 * @update 28/11/2010								 	/ 20/09/2011
 *
 * @method _defineDragAndDrop
 * @private
 */
Diagram.prototype._defineDragAndDrop = function() {
  var that = this;
  this._element = null;
  this._lastElement = null;

  /**
   * Catch the coordinates of mouse's pulsation and checks if some
	 * element is found in this coordinates, in affirmative case,
   * a signal is send via the select() function so that the element
	 * will act accordingly
   *
   * @author Martín Vega-leal Ordóñez
   * @update 28/11/2010
   *
   * @method _selectElement
   * @private
   * @param {Event} event Javascript event
   */
  this._selectElement = function( event ) {
    
    if( event.button != 0 ){
    	if(event.button == 2){

    		that._pressMouseRight = true;
    	}
    	else{
    		that._pressKey = true;
    		return;
    	}
    } else {
      that._pressMouse = true;
    }

    var mousex = event.offsetX; // event.pageX - that._div.offsetLeft;
    var mousey = event.offsetY; // event.pageY - that._div.offsetTop;
    

    var found = false;
    var i;

    if( that._lastElement instanceof Relation ) {
      if( that._lastElement.select( mousex, mousey ) ) {
        that._element = that._lastElement;
        found = true;
      }
    }

    for( i = 0; i < that._relations.length && !found; i++ ) {
      if( that._relations[i].select( mousex, mousey ) ) {
        that._element = that._relations[i];
        found = true;
      }
    }

    for( i = 0; i < that._nodes.length && !found; i++ ) {
      if( that._nodes[i].select( mousex, mousey ) ) {

        that._element = that._nodes[i];
        found = true;
      }
    }


    if( that._alone ) {
      that._name.deselect();
      if( !found && that._name.select( mousex, mousey ) ) {
        found = true;
      }
    }

    if( that._lastElement && that._lastElement != that._element ) {
      that._lastElement.deselect();
      that._lastElement = null;
    }

}


  /**
   * If a element has been selected in the selection function
	 * and the mouse is moving, the element receives a call advising
	 * of the coordinates by the drag() function, and so, acts to
	 * your movement accordingly
   *
   * @author Martín Vega-leal Ordóñez
   * @update 28/11/2010
   *
   * @method _dragElement
   * @private
   * @param {Event} event Javascript event
   */
  this._dragElement = function( event ) {


    if( !( event.button == 0 && that._pressMouse ) ){
      return;
    }

    if( that._element ) {
      var mousex = event.offsetX; // event.pageX - that._div.offsetLeft;
    var mousey = event.offsetY; // event.pageY - that._div.offsetTop;

      if( mousex < 0 )
        mousex = 0;
      if( mousey < 0 )
        mousey = 0;
      if( mousex >= that._width )
        mousex = that._width;
      if( mousey >= that._height )
        mousey = that._height;

      that._div.style.cursor = 'pointer';
      that._element.drag( mousex, mousey );

      that._drawMotion( that._element );
    }

  }



  /**
   * If a element has been selected in the selection function and the
	 * mouse has been left of pressed, the element receives a call
	 * adviseing of the coordinates by the drop() function, and so,
	 * acts to the event accordingly
   *
   * @author Martín Vega-leal Ordóñez
   * @update 28/11/2010
   *
   * @method _dropElement
   * @private
   * @param {Event} Javascript event
   */
  this._dropElement = function( event ) {
    if( !( event.button == 0 && that._pressMouse ) )
      return;

    if( that._element ) {

      that._div.style.cursor = 'default';
      that._clearMotion();


      var mousex = event.offsetX; // event.pageX - that._div.offsetLeft;
    var mousey = event.offsetY; // event.pageY - that._div.offsetTop;

      that._element.drop( mousex, mousey );

      that._lastElement = that._element;
      that._element = null;

      that._sortNodesByArea();

      that.draw();

    } else {
      that.draw();
    }

    that._pressMouse = false;
  }



  /**
   * If a element has been selected in the selection function
	 * and is pressed the delete key, the element will be remove
	 * of the diagram
   *
   * @author Martín Vega-leal Ordóñez
   * @update 28/11/2010
   *
   * @method _suprElement
   * @private
   * @param {Event} event Javascript event
   */
  this._suprElement = function( event ) {
    if( event.keyCode != 46 ) {
      return;
    }

    if( that._lastElement /*&&
        window.confirm( '¿Está seguro de que desea elminiar el objeto '' +
                        lastElement.getType() +
                        ''?\n\nUna vez borrado no podrá recuperarlo' )*/ )
      {
      that.delElement( that._lastElement );
      that._lastElement = null;

      that.draw();
    }

  }



  /**
   * Causes a advise to the elements that are in motion to leave their state and put to rest
   *
   * @author Martín Vega-leal Ordóñez
   * @update 28/11/2010
   *
   * @method stopEvents
   */
  this.stopEvents = function() {
    this._name.deselect();

    if( that._lastElement ) {
      that._lastElement.deselect();
      that._lastElement = null;
    }
  }

}


/**
 * Set the visibility to the diagram to true or false
 *
 * @author Rafael Molina Linares
 * @update 29/11/2011
 *
 * @method setVisibility
 * @param {Boolean} bool value of visibility of the diagram
 */
Diagram.prototype.setVisibility = function( bool ) {

  this._visible = bool;

	if(!bool)
		this.interaction(false);
}



/**
 * Indicates if the diagram is visible
 *
 * @author Rafael Molina Linares
 * @update 29/11/2011
 *
 * @method isVisible
 * @return {Boolean} If the diagram is visible or not
 */
Diagram.prototype.isVisible = function( ) {

  return this._visible;
}



/**
 * Activates or desactivates the interaction with the user
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method interaction
 * @param {Boolean} activate Activate/desactivate the interaction with the user
*/

Diagram.prototype.interaction = function( activate ) {

  if( activate ){
    this._div.addEventListener('mousedown', this._selectElement, false);
    this._div.addEventListener('mousemove',    this._dragElement , false);
    this._div.addEventListener('mouseup',      this._dropElement , false);

		// this._div.addEventListener("touchstart", this._selectElement, false);
		// window.addEventListener("touchmove", this._dragElement, false);
		// window.addEventListener("touchend", this._dropElement, false);

  } else {
    this.stopEvents();
    this._div.removeEventListener('mousedown', this._selectElement, false);
    window.removeEventListener('mousemove', this._dragElement, false);
    window.removeEventListener('mouseup', this._dropElement, false);
  }
}


/**
 * Assigns a only id number to each element of the diagram
 *
 * @author Martín Vega-leal Ordóñez		/  Rafael Molina Linares
 * @update 28/11/2010									/  28/08/2011
 *
 * @method _enumerateElements
 * @private
*/
Diagram.prototype._enumerateElements = function() {
  var i;
  var j=0;
  var id = 0;

  for( i = 0; i < this._nodes.length; i++ ) {

		if(i > id) id = i;
    this._nodes[i].setId( id );


    if(this._nodes[i] instanceof SuperNode){
			for( j=id+1;j< this._nodes[i]._nodeChilds.length + id + 1; j++){
		    this._nodes[i]._nodeChilds[j - id -1].setId( j );
			}
			id = j;
    } else if(i != id){
			id = id + 1;
		}
  }

  for( i = 0; i < this._relations.length; i++ ) {
    this._relations[i].setId( i );
  }

}



/**
 * Generates a tree with all element of the diagram in xml format
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method getXML
 * @param {DOMNode} parent Parent node of xml tree
 * @return {DOMNode} Generated node with the overall diagram
*/
Diagram.prototype.getXML = function( parent ) {
  this._enumerateElements();

  this._sortNodesByArea();


  if( this._alone ) {
    var parent = (new DOMParser()).parseFromString( '<' + this.getType() + '/>', 'text/xml');
    var diagram = parent.getElementsByTagName( this.getType() )[0];
  } else {
    var diagram = parent.createElement( this.getType() );
  }

  diagram.setAttribute( 'name', this._name.getValue() );

	if(this._backgroundNodes)
	  diagram.setAttribute( 'backgroundNodes', this._backgroundNodes );

  var node;
  var i;
  for(i = this._nodes.length - 1; i >= 0; i-- ) {
    if( this._nodes[i].getParent() == null && this._nodes[i]._action == undefined) {
      diagram.appendChild( this._nodes[i].getElementXML( parent ) );
    }
  }

  var relation;
  for( i = 0; i < this._relations.length; i++ ) {
    if( ! this._relations[i].getParent() ) {
      diagram.appendChild( this._relations[i].getElementXML( parent ) );
    }
  }

  return diagram;
}


/**
 * Generates the tree of diagram in xml and it is passed to a chain of characters
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method getXMLString
 * @return {String} Chain with the xml diagram
*/
Diagram.prototype.getXMLString = function() {
  return ( new XMLSerializer() ).serializeToString( this.getXML() );
}



/**
 * Generates the diagram from a tree with the elements in xml
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method setXML
 * @param {DOMNode} xml document's node that contains the diagram
 * @return {Boolean} If a bug has been found, is returned false
*/
Diagram.prototype.setXML = function( xml ) {

  var ids = [];

  if( this._alone ) {

    var diagram = xml.getElementsByTagName( this.getType() )[0];

    if( !diagram ) {
      return false;
    }
  } else {
    var diagram = xml;
  }

  this._name.setValue( diagram.getAttribute( 'name' ) );

	if(diagram.getAttribute( 'backgroundNodes' ))
		this._backgroundNodes = diagram.getAttribute( 'backgroundNodes' );

  var xmlnodes = diagram.childNodes;


  var i;

  for( i = 0; i < xmlnodes.length; i++ ) {
    this._instantiateElements( xmlnodes[i], ids );
  }


  for( i = 0; i < xmlnodes.length; i++ ) {
    this._addElementXML( xmlnodes[i], ids );
  }


  for( i = 0; i < this._relations.length; i++ ) {
    this._relations[i].notifyChange();
  }

  this._sortNodesByArea();

  return true;
}



/**
 * Functions that changes a chain with the diagram in xml, in a tree for your processing
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method setXMLString
 * @param {String} stringDiagram Chain with the diagram in xml
 * @param {Boolean} Returns false if a bug has been found in the chain
*/
Diagram.prototype.setXMLString = function( stringDiagram ) {
  if( !stringDiagram || !JSFun.isString( stringDiagram ) ) {
    return false;
  }

  stringDiagram = stringDiagram.replace( /\n/gi, '' );

  var xml = (new DOMParser()).parseFromString( stringDiagram, 'text/xml' )
  if( xml == null ) {
    return null;
  }

  return this.setXML( xml );
}



/**
 * From the retrieved information in the XML tree recovers the values ​​
 * of attributes of each node, passing the information, added to the
 * diagram and his father is assigned
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *

 * @method _addElementXML
 * @private
 * @param {DOMNode} xmlnode DOM node of the elements
 * @param {Array} ids Ids of references a each instantiated element
 * @param {Node} parent Checks the validity of a chain and its correspondence with an object accepted by the diagram, in which case the request and returnsParent node of the element that is initialized
*/

Diagram.prototype._addElementXML = function( xmlnode, ids, parent ) {

	var parent = parent || null;
  var obj = ids[ xmlnode.getAttribute( 'id') ];

  if( obj ){

		if(parent instanceof SuperNode && obj instanceof Region)
			obj.addComponents(false);

    obj.setElementXML( xmlnode, ids );

		/*
			If obj is a region, mustn't be added to the 'nodes' array
			of the diagram via the _addElementOnly method, so the
			user can't move this region separately from the
			supernode and can only move the entire supernode
		*/
    if(parent instanceof SuperNode && obj instanceof Node){
      obj.setDiagram( this );

			if(obj instanceof Region ){
				var nod = obj._parent._nodeChilds;
				var len = nod.length;
				if(len > 0){
					if(obj._parent._orientation)
						nod[len - 1].setWidth( obj._x - nod[len-1]._x);
					else
						nod[len - 1].setHeight( obj._y - nod[len-1]._y);

					nod[len - 1].updateComponents();
				}
			}
		}
    else
      this._addElementOnly( obj );

    if( parent && obj instanceof Node ) {
      parent.addChild( obj );
			if(obj instanceof Swimlane )
				obj._parent.updateSizeComponentSwimlane();
		  parent.updateContainer(false);
			if(parent._parent instanceof SuperNode)
				parent._parent.updateContainer(false);
    }

    for(var i = 0; i < xmlnode.childNodes.length; i++ ) {
			this._addElementXML( xmlnode.childNodes[i], ids, obj);
    }

  }
}

/**
 * Instantiates the passed element and all its childs,
 * and related it with your id
 *
 * @author Martín Vega-leal Ordóñez			/ Rafael Molina Linares
 * @update 28/11/2010										/ 15/08/11
 *
 * @method _instantiateElements
 * @private
 * @param {DOMNode} xmlnode XML information of the element that is instantiated
 * @param {Array} ids Is saves a reference a each element instantiated together your id
 * @param {Node} parent Parent node of element that is initialize
*/

Diagram.prototype._instantiateElements = function( xmlnode, ids, parent ) {

  parent = parent || null;

  var obj = this._instantiateObjectFromString( xmlnode.nodeName, parent );

  if( obj ) {

    ids[ xmlnode.getAttribute( 'id' ) ] = obj;
    var i;

    for(i = 0; i < xmlnode.childNodes.length; i++ ) {
      if(obj instanceof SuperNode && xmlnode.childNodes[i].nodeName == 'Region' )
				this._instantiateElements( xmlnode.childNodes[i], ids, obj );
			else
				this._instantiateElements( xmlnode.childNodes[i], ids );
    }
  }
}

/**
 * Defined the valid elements's types that are accepted by the diagram
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method setValidElements
 * @param {Array} types Valid Element for the diagram
*/
Diagram.prototype.setValidElements = function( types ) {
  this._validElements = [];

  var i;

  for( i in types ) {
    if( JSFun.isString( types[i] ) ) {
      this._validElements.push( types[i] );
    }
  }

}



/**
 * Returns the accepted objects by the diagram
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method getValidElements
 * @return {Array} Elements accepted in the diagram
*/
Diagram.prototype.getValidElements = function() {
  if( this._validElements ) {
    return this._validElements;
  }
}



/**
 * Checks the validity of a chain and its correspondence with
 * an object accepted by the diagram, in which case the request and returns
 *
 * @author Martín Vega-leal Ordóñez
 * @update 28/11/2010
 *
 * @method _instantiateObjectFromString
 * @private
 * @param {string} elemName Name of the element to instantiate
 * @return {Element} Element instantiated
*/

Diagram.prototype._instantiateObjectFromString = function( elemName, parent ) {
  if( JSFun.isString( elemName ) ) {

    parent = parent || null;

    var i;

    for( i in this._validElements ) {

      if( elemName == this._validElements[i] ) {

				if(elemName == 'UMLAlternative' || elemName == 'UMLHorizontalRegion' || elemName == 'UMLVerticalRegion' || elemName == 'UMLCompositeState'){

					var setElementXml = true;
					return eval( 'new ' + this._validElements[i] + '({ setElementXml: ' + setElementXml + '})' );
				} else {

					if(parent){
						return (new window[this._validElements[i]]( { addComponent : false, parent: parent }) );
					}	else {
						return eval( 'new ' + this._validElements[i] + '()' );
					}
				}
			}
    }
  } else {
    return null;
  }

}





/**
 * Dialog constructor class. Defines functions to show
 * dialogs's text to the user in differents situations
 *
 * @author Rafael Molina linares
 * @update 5/09/2011
 *
 * @class Dialog
 *
 */

var Dialog = function(params) {
	params = params || {};

	this._text = params.text || '';
	this._cancelable = params.cancelable || false;
	this._active = false;
}



/**
 * Shows a dialog that notify to the user some actions to perform.
 * This actions must be confirmed by the user.
 *
 * @author Rafael Molina Linares
 * @update 5/09/2011
 *
 * @method show
 * @params {Function} fn Actions to apply when the user press the button 'ok'
 * @params {String} nameInput Indicates the text that must be included in a element 'input',
															whose value can be changed and used by the actions of the parameter 'fn'
 */

Dialog.prototype.show = function(fn, nameInput) {

	var nameInput = nameInput || null;

	if( this._active ) {
	  return;
	}

	this._active = true;

	if(!(typeof this._text === 'string'))
		return false;

	that = this;

	var div = document.createElement("div");
	div.className = "ud_popup";

	var form = document.createElement("form");

	var ok = document.createElement("input");
	ok.setAttribute( "type" , "submit" );
	ok.setAttribute( "value", "ok" );

	var elem;
	var divaux;

  divaux = document.createElement( 'div' );

	divaux.appendChild( document.createTextNode( this._text ) );

	if(nameInput){
		var divInput = document.createElement( 'div' );
		var form = document.createElement( 'form' );
		var input;
		input = document.createElement("input");
    input.setAttribute( 'type', 'text' );
    input.setAttribute( 'value', nameInput);
		divInput.appendChild( input );
		form.appendChild( divInput);
	}

	this.acceptText = function ( event ) {

	  document.body.removeChild( div );

		(nameInput) ? fn(input.value) :	fn();

		that._active = false;
	}
	ok.addEventListener("click", this.acceptText, false);

	form.onsubmit = function() { return false; }
	form.appendChild( ok );

	if( this._cancelable ) {

	  var no = document.createElement("input");
	  no.setAttribute( "type", "submit" );
	  no.setAttribute( "value", "cancel" );

	  this.deleteDialog = function ( event ) {
      document.body.removeChild( div );
			that._active = false;
	  }

	  no.addEventListener("click", this.deleteDialog, false);
	  form.appendChild( no );
	}

	div.appendChild( divaux );
	div.appendChild( form );
	document.body.appendChild( div );

	ok.focus();

	div.style.top = (window.innerHeight - form.offsetHeight ) / 2 + "px";
	div.style.left = (window.innerWidth - form.offsetWidth) / 2 + "px";

	return true;
}









/**
 * Constructor de la clase Elliptical
 * Define un nodo con el comportamiento y la forma de una elipse
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @class Elliptical
 * @extends Node
 */
var Elliptical = function( params ) {
  params = params || {};
  Elliptical.baseConstructor.call( this, params );
}

JSFun.extend( Elliptical, Node );



/**
 * Comprueba si el punto indicado está sonbre la elipse o alguno de
 * sus componentes
 *
 * @author Martín Vega-leal Ordóñez
 * @update 30/11/2010
 *
 * @method isOver
 * @param {Number} x Coordenada x del punto a comprobar
 * @param {Number} y Coordenada y del punto a comprobar
 * @return {Boolean} Si el punto está sobre el nodo
 */
Elliptical.prototype.isOver = function( x, y ) {
  if( x instanceof Point ) {
    y = x.getY();
    x = x.getX();
  }

  var haxis = this.getWidth() / 2;
  var vaxis = this.getHeight() / 2;

  var dx = Math.abs(x - this.getX() - haxis );
  var dy = Math.abs(y - this.getY() - vaxis);

  if( dx <= haxis ) {
    if( Math.abs(Math.sqrt( (1 - (dx*dx) / (haxis*haxis) ) * vaxis*vaxis )) >= dy ) {
      return true;
    }
  }

}



/**
 * Recibe un coordenada 'y' y el nodo devuelve los límites horizontales
 * de la figura en esa posición.
 *
 * @author Martín Vega-leal Ordóñez
 * @update 30/11/2010
 *
 * @method getParticularWidth
 * @param {Number} y Posición y donde se comprobará el ancho
 * @return {Array} Límites de la figura en la altura indicada
 */
Elliptical.prototype.getParticularWidth = function( y ) {
  if( y >= this.getY() && y <= this.getY() + this.getHeight() ) {
    var a = this.getWidth() / 2;
    var b = this.getHeight() / 2;
    var ny = this.getY() + b - y;
    var cx = this.getX() + a;

    var incx = a * Math.sqrt( 1 - ( ny * ny ) / ( b * b ) );
    var aux = 1 - ( y * y ) / ( b * b );

    return [ cx - incx, 2 * incx ];
  }

  return [ 0, 0 ];
}



/**
 * Devuelve el punto de intersección entre el indicado por parámetros
 * y la silueta de la elipse
 *
 * @author Martín Vega-leal Ordóñez
 * @update 30/11/2010
 *
 * @method getLinkCentered
 * @param {Number} x Coordenada x del punto
 * @param {Number} y Coordenada y del punto
 * @return {Point} Punto de intersección con los bordes de la elipse
 */
Elliptical.prototype.getLinkCentered = function( x, y ) {
  if( x instanceof Point ) {
    y = x.getY();
    x = x.getX();
  }

  var a = this.getWidth() / 2;
  var b = this.getHeight() / 2;

  var px = this.getX() + a;
  var py = this.getY() + b;

  return JSGraphic.ellipseIntersection( px, py, a, b, x, y );
}



/**
 * Calcula el tamaño mínimo de la elipse en función de sus componentes
 * no permitiendo reducir el tamaño más allá de lo que ocupan
 *
 * @author Martín Vega-leal Ordóñez
 * @update 30/11/2010
 *
 * @method calculateSize
 * @protected
 */
Elliptical.prototype.calculateSize = function() {
  var comp;
  var maxWidth = 0;
  var maxHeight = 0;
  var i;

	var foundInvisibleComp = false;

  for( i = 0; i < this._components.length; i++ ) {
    comp = this._components[i];

		if( comp._visible ){

		  if( comp.getPosition() == Component.Float ) {
		    maxHeight += comp.getHeight();

		    if( comp.getWidth() > maxWidth )
		      maxWidth = comp.getWidth();
		  }
		} else if(!comp._visible){
			foundInvisibleComp = true;
		}
  }

	/*
		If not found any visible component, and therefore
		the maximum height is 0, the maximum height is
		put to 20
	*/
	if(maxHeight == 0 && foundInvisibleComp == true)
		maxHeight = 20;

	/*
		If not found any visible component, and therefore
		the maximum width is 0, the maximum height is
		put to 20
	*/
	if(maxWidth == 0 && foundInvisibleComp == true)
		maxWidth = 20;

  if( maxHeight > 0 )
    this.setMinHeight( maxHeight * 1.447716 );

  if( maxWidth > 0 )
    this.setMinWidth( maxWidth * 1.447716 );
}



/**
 * Actualiza la posición de los componentes del nodo elipse
 *
 * @author Martín Vega-leal Ordóñez
 * @update 30/11/2010
 *
 * @method updateComponents
 * @private
 */
Elliptical.prototype.updateComponents = function() {
  if( this._components.length > 0 ) {
    this.calculateSize();

    var ax = this.getX();
    var ay = this.getY();
    var a = this.getWidth() / 2;
    var b = this.getHeight() / 2;
    var cx = ax + a;
    var cy = ay + b;

    var p = JSGraphic.ellipseIntersection( cx, cy, a, b, ax, ay );

    this.insertComponents( p.getX(),
                           p.getY(),
                           this.getWidth() - 2 *( p.getX() - this.getX() ),
                           this.getHeight() - 2 *( p.getY() - this.getHeight() )
                         );

    var i;
    for( i in this._relations ) {
      this._relations[i].notifyChange();
    }

  }

}












/**
 * Constructor de la clase TextArea
 * Crea un 'item' que muestra un texto con saltos de linea
 * editable por el usuario
 *
 * @author Martín Vega-leal Ordóñez	/	Alejandro Arrabal Hidalgo
 * @update 29/11/2010	/ 08/08/2012
 *
 * @class TextArea
 * @extends Component
 *
 * @param {colorCSS} text_color color of the component's text
 * @param {font-familyCSS} text_family text family of the component's text
 * @param {font-sizeCSS} font_size size of the component's font
 * @param {font-styleCSS} font_style style of the component's font
 * @param {font-weightCSS} font_weight weight of the component's font
 * @param {String} text Texto por defecto que contendrá el componente desde su creación
 */
var TextArea = function( params ) {
  params = params || {};
  TextArea.baseConstructor.call( this, params );

  this.setText( params.text || '' );
  this._active = false;
  this.setFontColor(params.text_color || '#000000');
  this.setFontSize(params.font_size || '12');
  this._font_width=this.getFontSize()/1.5;
  this.line_height=parseInt(this.getFontSize())+1;
  this.setFontFamily(params.text_family || 'monospace');
  this.setFontStyle(params.font_style || 'normal');
  this.setFontWeight(params.font_weight || 'normal');
}
JSFun.extend( TextArea, Component );



/**
 * Muestra un dialogo para modificar el texto del componente por
 * parte del usuario
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method showDialog
 * @protected
 */
TextArea.prototype.showDialog = function() {
  var that = this;
  this._active = true;

  var div = document.createElement('div');
  var form = document.createElement('form');
  var textArea = document.createElement('textarea');

  var ok = document.createElement('input');
  var no = document.createElement('input');

  div.className = 'ud_popup';

  textArea.setAttribute( 'rows', 5 );
  textArea.setAttribute( 'cols', 30 );
  textArea.value = this._text.join('\n');

  ok.setAttribute( 'type' , 'submit' );
  ok.setAttribute( 'value', 'ok' );

  no.setAttribute( 'type', 'submit' );
  no.setAttribute( 'value', 'no' );

  this.changeText = function ( event ) {
    if( that._active ) {
      that.setText( textArea.value );
      document.body.removeChild( div );
      that._active = false;
      that.notifyChange();
    }
  }

  this.closeDialog = function ( event ) {
    if( that._active ) {
      document.body.removeChild( div );
      that._active = false;
      that.notifyChange();
    }
  }

  form.onsubmit = function() { return false; }

  ok.addEventListener('click', this.changeText, false);
  no.addEventListener('click', this.closeDialog, false);

  form.appendChild( textArea );
  form.appendChild( ok );
  form.appendChild( no );
  div.appendChild( form );
  document.body.appendChild( div );

  textArea.focus();

  div.style.top = (window.innerHeight - form.offsetHeight ) / 2 + 'px';
  div.style.left = (window.innerWidth - form.offsetWidth) / 2 + 'px';
}



/**
 * Modifica el texto que contiene el componente
 * @author Martín Vega-leal Ordóñez	/	Alejandro Arrabal Hidalgo
 * @update 29/11/2010	/ 02/08/2012
 *
 * @method setText
 * @protected
 * @param {String} newText Cadena que contiene el nuevo texto
 */
TextArea.prototype.setText = function( newText ) {
  if( JSFun.isString( newText ) ) {
    var i, width = 0;
    var aux = newText.split('\n');

    for( i = 0; i < aux.length; i++ ) {
      if( aux[i].length > width )
        width = aux[i].length;
    }

    this._text = aux;


    if( newText == '' ) {
      this.setWidth( 40 );
    } else {
      this.setWidth( width * this._font_width );
    }

    this.setHeight( this._text.length * this._line_height );
  }
}



/**
 * Modifica el valor que contiene el componente, en este caso
 * el texto que contiene modificando los saltos de linea por ';'
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method setValue
 * @param {String} value Nueva texto que contendrá el componente
 */
TextArea.prototype.setValue = function( value ) {
  value = value.replace( /;/gi, '\n' );
  this.setText( value );
}



/**
 * Devuelve el texto que conteiene en el componente
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method getValue
 * @return {String} Texto contenido en el componente
 */
TextArea.prototype.getValue = function() {
  return this._text.join(';');
}



/**
 * Compureba si se a pulsado sobre el componente y en caso de ser así
 * se muestra la ventana para modificar su valor
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method select
 * @param {Number} x Coordenada del eje x del diagrama
 * @param {Number} y Coordenada del eje y del diagrama
 * @return {Boolean} Si el punto está sobre el componente o no.
 */
TextArea.prototype.select = function( x, y ) {
  if(  !this._active && this.isOver( x, y ) ) {
    this.showDialog( x, y );
    return true;
  } else {
    return false;
  }
}



/**
 * Dibuja el texto de componente y su fondo si se produce interacción con el mismo
 *
 * @author Martín Vega-leal Ordóñez	/	Alejandro Arrabal Hidalgo
 * @update 29/11/2010 / 02/08/2012
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Contexto del elemento canvas
 */
TextArea.prototype.draw = function( context ) {
	if(!this._visible)
		return;

  context.save();

  if( this._active ) {
    context.fillStyle = '#ffc485';
    context.fillRect( this._getX(), this._getY(), this.getWidth(), this.getHeight() );
  }
  context.font =this.getFontStyle() + " " + this.getFontWeight() + " "+ this.getFontSize() + "px " + this.getFontFamily();
  context.textBaseline = 'middle';
  context.fillStyle = this.getFontColor();

  var x = this._getMX();
  var y = this._getMY() + this._line_height / 2;
  var w = this.getWidth() - 2 * this._getMargin();
  var ax = 0;

  var i;

  for( i = 0; i < this._text.length; i++ ) {
    ax = x + w / 2 - ( this._text[i].length * this._font_width ) / 2;
    context.fillText( this._text[i], ax, y );
    y += this._line_height;
  }
  context.restore();
}



/**
 * Dibuja la línea de contorno del componente
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method drawShape
 * @param {CanvasRenderingContext2D} context Contexto del elemento canvas
 */
TextArea.prototype.drawShape = function( context ) {

	if(!this._visible)
		return;

  context.save();

  context.strokeStyle = '#aaaaaa';
  context.strokeRect( this.getPixelX(), this.getPixelY(), this.getWidth(), this.getHeight() );

  context.restore();
}



/**
 * Cierra la ventana de interaccion, en caso de encontrarse abierta y
 * para la interacción con el componente por parte del usuario
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method deselect
 */
TextArea.prototype.deselect = function() {
  if( this._active ) {
    this.closeDialog();
    this._active = false;
  }
}



/**
 * Modifies the component's font size and fit the line height
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 01/08/2012
 *
 * @method setFontSize
 * @param {font-sizeCSS}  font size that will be assigned to the component
 */
TextArea.prototype.setFontSize = function( font_size ) {
	this._font_size=font_size;
	this.resize();
}




/**
 * Returns the component's font size
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 01/08/2012
 *
 * @method getFontSize
 * @return {font-sizeCSS} Current component's font size
 */
TextArea.prototype.getFontSize = function() {return this._font_size;}



/**
 * Modifies the component's font color
 *
 * @author Jose Maria Gomez Hernandez
 * @update 03/04/2012
 *
 * @method setFontColor
 * @param {colorCSS}  color that will be assigned to the component
 */
TextArea.prototype.setFontColor = function( color ) {
	this._font_color=color;
}




/**
 * Returns the component's font color
 *
 * @author Jose Maria Gomez Hernandez
 * @update 07/06/2012
 *
 * @method getFontColor
 * @return {colorCSS} Current component's font color
 */
TextArea.prototype.getFontColor = function() {return this._font_color;}



/**
 * Modifies the component's font family
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 01/08/2012
 *
 * @method setFontFamily
 * @param {font-familyCSS}  font family that will be assigned to the component
 */
TextArea.prototype.setFontFamily = function( font_family ) {
	this._font_family=font_family;
}




/**
 * Returns the component's font family
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 01/08/2012
 *
 * @method getFontFamily
 * @return {font-familyCSS} Current component's font family
 */
TextArea.prototype.getFontFamily = function() {return this._font_family;}



/**
 * Re-size the component depending on his text and font-size
 *
 * @author 	Alejandro Arrabal Hidalgo
 * @update 03/08/2012
 *
 * @method resize
 */
TextArea.prototype.resize = function() {
	this._line_height=parseInt(this.getFontSize(),10)+1;
	this._font_width=this.getFontSize()/1.5;
    var i, width = 0;
    var aux = this.getValue().split('\n') || "" ;

    for( i = 0; i < aux.length; i++ ) {
      if( aux[i].length > width )
        width = aux[i].length;
    }


    if( aux == '' ) {
      this.setWidth( 40 );
    } else {
      this.setWidth( width * this._font_width );
    }

    this.setHeight( aux.length * this._line_height );
}




/**
 * Modifies the component's font style
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 05/08/2012
 *
 * @method setFontS
 * @param {font-styleCSS}  font style that will be assigned to the component
 */
TextArea.prototype.setFontStyle = function( font_style ) {
	this._font_style=font_style;
}




/**
 * Returns the component's font style
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 05/08/2012
 *
 * @method getFontStyle
 * @return {font-styleCSS} Current component's font style
 */
TextArea.prototype.getFontStyle = function() {
	return this._font_style;
	}



/**
 * Modifies the component's font weight
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 08/08/2012
 *
 * @method setFontWeight
 * @param {font-weightCSS}  font weight that will be assigned to the component
 */
TextArea.prototype.setFontWeight = function( font_weight ) {
	this._font_weight=font_weight;
}




/**
 * Returns the component's font weight
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 08/08/2012
 *
 * @method getFontWeight
 * @return {font-weightCSS} Current component's font weight
 */
TextArea.prototype.getFontWeight = function() {
	return this._font_weight;
	}



/**
 * Gets a XML node with the information of the component
 *
 * @author Alejandro Arrabal Hidalgo
 * @update 30/08/2012
 *
 * @method getComponentXML
 * @param {DOMNode} parent Parent  node of the xml tree that will be generated
 * @return {DOMNode Node with the information of the component
 */
TextArea.prototype.getComponentXML = function( parent ) {
  var xmlcomp = parent.createElement( 'item' );

  if( this._id ) {
    xmlcomp.setAttribute( 'id', this._id );
  }

  if(this.getFontColor()!='#000000')xmlcomp.setAttribute( 'fontColor', this.getFontColor() );
  if(this.getFontSize()!='12') xmlcomp.setAttribute( 'fontSize', this.getFontSize() );
  if(this.getFontStyle()!='normal')xmlcomp.setAttribute( 'fontStyle', this.getFontStyle() );
  if(this.getFontFamily()!='monospace')xmlcomp.setAttribute( 'fontFamily', this.getFontFamily() );
  if(this.getFontWeight()!='normal')xmlcomp.setAttribute( 'fontWeight', this.getFontWeight() );
  xmlcomp.setAttribute( 'value', this.getValue() );
  return xmlcomp;
}


/**
 * GuardItem Class Constructor
 * Creates a 'item' that controls the text of a guard UML 2.
 *
 * @author Rafael Molina linares
 * @update 19/8/2011
 *
 * @class GuardItem
 * @extends TextArea
 */
var GuardItem = function( params ) {

  params = params || {};
  GuardItem.baseConstructor.call( this, params );

  this._parse = /^(?:\[([^\[\]\;]*)\])?$/;

  this.setMinWidth( 15 );
}
JSFun.extend( GuardItem, TextArea );



/**
 * Encodes the text of the operation resulting from its separate elements
 * and returns the encoded operation with the symbols corresponding
 *
 * @author Rafael Molina linares
 * @update 19/8/2011
 *
 * @method encode
 * @protected
 * @param {Array} value Element that form the text of the guard
 * @return {String} Elements encoded in a only string
 */
GuardItem.prototype.encode = function( value ) {

  var string = '[]';

  if( value ) {
    string = '[' + value + ']';
  }


  if( this._parse.exec( string ) ) {
    return string;
  } else {
    return 'wrong_operation';
  }
}



/**
 * Separates a chain that contains a operations in its differents
 * elements according to the regular expresion that controls it
 * and returns the separated parts in an array
 *
 * @author Rafael Molina Linares
 * @update 19/8/2011
 *
 * @method decode
 * @protected
 * @param {String} guard Operation in text's chain
 * @param {Array} Elements that form the 'guard' operation
 *
 */
GuardItem.prototype.decode = function( guard ) {
  var result = this._parse.exec( guard );

  if( result ) {
    result.shift();
    return result;
  } else {
    return [];
  }
}



/**
 * Shows a dialog to modify the elements of the operation
 * by the user
 *
 * @author Rafael Molina Linares
 * @update 19/8/2011
 *
 * @method showDialog
 *
 */
GuardItem.prototype.showDialog = function() {

  var that = this;

  if( this.active ) {
    return;
  }

  this._active = true;

  var div = document.createElement('div');
  div.className = 'ud_popup';

  var form = document.createElement('form');
  var textArea = document.createElement('textarea');
  textArea.setAttribute( 'rows', 5 );
  textArea.setAttribute( 'cols', 30 );

  var ok = document.createElement('input');
  ok.setAttribute( 'type' , 'submit' );
  ok.setAttribute( 'value', 'ok' );

  var no = document.createElement('input');
  no.setAttribute( 'type', 'submit' );
  no.setAttribute( 'value', 'no' );

  textArea.value = this.decode( this._text.join('\n') );

  this.changeText = function ( event ) {
    if( that._active ) {
      that.setText( that.encode(textArea.value) );
      document.body.removeChild( div );
      that._active = false;
      that.notifyChange();
    }
  }

  this.closeDialog = function ( event ) {
    if( that._active ) {
      document.body.removeChild( div );
      that._active = false;
      that.notifyChange();
    }
  }

  form.onsubmit = function() { return false; }

  ok.addEventListener('click', this.changeText, false);
  no.addEventListener('click', this.closeDialog, false);

  form.appendChild( textArea );
  form.appendChild( ok );
  form.appendChild( no );
  div.appendChild( form );
  document.body.appendChild( div );

  textArea.focus();

  div.style.top = (window.innerHeight - form.offsetHeight ) / 2 + 'px';
  div.style.left = (window.innerWidth - form.offsetWidth) / 2 + 'px';
}



/**
 * Draws the component's text and your background if the interaction is produced
 *
 * @author Rafael Molina Linares / Alejandro Arrabal Hidalgo
 * @update 19/8/2011 / 08/08/2012
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Context of the canvas element
 */
GuardItem.prototype.draw = function( context ) {

	if(!this._visible)
		return;

  context.save();

  if( this._active ) {
    context.fillStyle = '#ffc485';
    context.fillRect( this._getX(), this._getY(), this.getWidth(), this.getHeight() );
  }

  context.font =this.getFontStyle() + " " + this.getFontWeight() + " "+ this.getFontSize() + "px " + this.getFontFamily();
  context.textBaseline = "middle";
  context.fillStyle = this.getFontColor();

  var x = this._getMX();
  var y = this._getMY() + this._line_height / 2;
  var w = this.getWidth() - 2 * this._getMargin();

  var i;

  for( i = 0; i < this._text.length; i++ ) {
    context.fillText( this._text[i], x, y );
    y += this._line_height;
  }
  context.restore();
}










/**
 * Constructor de la clase Tab
 * Representa una pestaña para contener el nombre de un paquete en UML 2
 *
 * @author Martín Vega-leal Ordóñez
 * @update 04/11/2010
 *
 * @class Tab
 * @extends TextBox
 */
var Tab = function( params ) {
  params = params || {};
  Tab.baseConstructor.call( this, params );

}

JSFun.extend( Tab, TextBox );




/**
 * Dibuja el borde de la pestaña y su contenido
 *
 * @author Martín Vega-leal Ordóñez
 * @update 04/11/2010
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Contexto del elemento canvas
 */
Tab.prototype.draw = function( context ) {
    return;
	if(!this._visible)
		return;

  Tab.base.draw.call( this, context );

  var x = this.getPixelX();
  var y = this.getPixelY();

  context.beginPath();
  context.moveTo( x, y + this.getHeight() );
  context.lineTo( x + this.getWidth() - 4, y + this.getHeight() );
  context.lineTo( x + this.getWidth(), y );
  context.stroke();

}



/**
 * LoopItem constructor class. Creates a item of text
 * for a loop element of the sequence diagram
 *
 * @author Rafael Molina Linares
 * @update 19/8/2011
 *
 * @class LoopItem
 * @extends Tab
 */
var LoopItem = function( params ) {

  params = params || {};

  LoopItem.baseConstructor.call( this, params );

  this._parse = /^LOOP(?:[\(]?([0-9 ]*)[\,]?)(?:([0-9 ]*)[\)]?)?$/;
}
JSFun.extend( LoopItem, Tab );



/**
 * Encodes the text of the operation resulting from
 * its separate elements and returns the encoded
 * operation with the symbols corresponding
 *
 * @author Rafael Molina linares
 * @update 19/8/2011
 *
 * @method encode
 * @protected
 * @param {Array} values Elements that form the operation
 * @return {String} Operation resulting
 */

LoopItem.prototype.encode = function( values ) {

  var string = 'LOOP';

  if(values[0] ) {
    string += '(' + values[0];
  }

  if(values[1] ) {
		if(!values[0])
			string += '(' + 0;
    string += ',' + values[1] + ')';
  } else if(values[0]){
		string += ')';
	}

  if( this._parse.exec( string ) ) {
    return string;
  } else {
    return 'wrong_operation';
  }
}



/**
 * Separates a chain that contains a operations in its
 * differents elements according to the regular expresion
 * that controls it and returns the separated parts
 * in an array
 *
 * @author Rafael Molina Linares
 * @update 19/8/2011
 *
 * @method decode
 * @protected
 * @param {String} transition Operation in text's string
 * @param {Array} Elements that form the 'transition' operation
 */

LoopItem.prototype.decode = function( transition ) {

  var result = this._parse.exec( transition );

  if( result ) {
    result.shift();
    return result;
  } else {
    return [];
  }
}



/**
 * Shows a dialog to modify the elements of the operation
 * by the user
 *
 * @author Rafael Molina Linares
 * @update 19/8/2011
 *
 * @method showDialog
 */


LoopItem.prototype.showDialog = function() {

  if( this.active ) {
    return;
  }

  var that = this;

  this.active = true;

  var div = document.createElement("div");
  div.className = "ud_popup";

  var form = document.createElement("form");
  var fields = [];


  var i;
  for( i = 0; i < 2; i++ ){
    fields.push( document.createElement("input") );
  }

  var ok = document.createElement("input");
  ok.setAttribute( "type" , "submit" );
  ok.setAttribute( "value", "ok" );

  var values = this.decode( this.getValue() );

  for( i = 0; i < fields.length; i++ ) {
    fields[i].setAttribute( 'type', 'text' );
    fields[i].setAttribute( 'value', values[i] || '' );
  }


  this.changeText = function ( event ) {
    if( that.active ) {

      var values = [];

      var i;
      for( i = 0; i < fields.length; i++) {
        values.push( fields[i].value );
      }

      that.setText(  that.encode( values ) );

      document.body.removeChild( div );

      that.active = false;
      that.notifyChange();
    }
  }

  form.onsubmit = function() { return false; }

  ok.addEventListener("click", this.changeText, false);

  var labels = [ 'initial value', 'end value'];

  var label;
  var divaux;

  for( i = 0; i < fields.length; i++ ) {
    divaux = document.createElement( 'div' );
    label = document.createElement( 'label' );
    label.appendChild( document.createTextNode( labels[i] ) );

    divaux.appendChild( label );
    divaux.appendChild( fields[i] );

    form.appendChild( divaux );
  }


  form.appendChild( ok );

  if( this.deletable ) {
    var no = document.createElement("input");
    no.setAttribute( "type", "submit" );
    no.setAttribute( "value", "delete" );

    this.deleteDialog = function ( event ) {
      if( that.active ) {
        document.body.removeChild( div );
        that.active = false;
        that.notifyDelete();
        that.notifyChange();
      }
    }

    no.addEventListener("click", this.deleteDialog, false);
    form.appendChild( no );
  }

  div.appendChild( form );
  document.body.appendChild( div );

  ok.focus();

  div.style.top = (window.innerHeight - form.offsetHeight ) / 2 + "px";
  div.style.left = (window.innerWidth - form.offsetWidth) / 2 + "px";
}









/**
 * ObjectItem class constructor. Creates a 'item' that
 * controls a text that contains information about a
 * object element of a activity diagram
 *
 * @author Rafael Molina Linares
 * @update 19/8/2011
 *
 * @class ObjectItem
 * @extends TextBox
 */
var ObjectItem = function( params ) {

  params = params || {};

  ObjectItem.baseConstructor.call( this, params );

  this._parse = /^([a-zA-Z]*)(?:\:([^\:\{\}]*))?(?:\{([a-zA-Z]*)\})?$/;
}
JSFun.extend( ObjectItem, TextBox );



/**
 * Encodes the text of operation resulting from its
 * separate elements and returns the encoded
 * operations with the simbols corresponding
 *
 * @author Rafael Molina Linares
 * @update 19/8/2011
 *
 * @method encode
 * @protected
 * @param  {Array}  values Elements of the operation
 * @return {String} Operation resulting
 *
 */
ObjectItem.prototype.encode = function( values ) {

  var string = '';

  if( values[0] ) {
    string += values[0] ;
  }

  if( values[1] ) {
    string += ':' + values[1];
  }

  if( values[2] ) {
    string += '{' + values[2] + '}';
  }


  if( this._parse.exec( string ) ) {
    return string;
  } else {
    return 'wrong_operation';
  }
}



/**
 * Separates a string that contains the operation with
 * its different parts according to the regular
 * expresion that controls it and returns the separate
 * parts in an array
 *
 * @author Rafael Molina Linares
 * @update 19/8/2011
 *
 * @method decode
 * @protected
 * @param {String} value Operation in text's chain
 * @param {Array} Separate elements of the operation
 */
ObjectItem.prototype.decode = function( value ) {
  var result = this._parse.exec( value );

  if( result ) {
    result.shift();
    return result;
  } else {
    return [];
  }
}



/**
 * Shows a dialog to modify the elements of the
 * operation by the user
 *
 * @author Rafael Molina Linares
 * @update 19/8/2011
 *
 * @method showDialog
 *
 */
ObjectItem.prototype.showDialog = function() {

  if( this.active ) {
    return;
  }

  var that = this;

  this.active = true;

  var div = document.createElement("div");
  div.className = "ud_popup";

  var form = document.createElement("form");
  var fields = [];

  var i;
  for( i = 0; i < 3; i++ ){
    fields.push( document.createElement("input") );
  }

  var ok = document.createElement("input");
  ok.setAttribute( "type" , "submit" );
  ok.setAttribute( "value", "ok" );

  var values = this.decode( this.getValue() );

  for( i = 0; i < fields.length; i++ ) {
    fields[i].setAttribute( 'type', 'text' );
    fields[i].setAttribute( 'value', values[i] || '' );
  }

  this.changeText = function ( event ) {
    if( that.active ) {

      var values = [];

      var i;
      for( i = 0; i < fields.length; i++) {
        values.push( fields[i].value );
      }

      that.setText(  that.encode( values ) );

      document.body.removeChild( div );
      that.active = false;
      that.notifyChange();
    }
  }

  this.closeDialog = function ( event ) {
    if( that.active ) {
      document.body.removeChild( div );
      that.active = false;
      that.notifyChange();
    }
  }

  form.onsubmit = function() { return false; }

  ok.addEventListener("click", this.changeText, false);

  var labels = [ 'name', 'class', 'state'];

  var label;
  var divaux;

  for( i = 0; i < fields.length; i++ ) {
    divaux = document.createElement( 'div' );
    label = document.createElement( 'label' );
    label.appendChild( document.createTextNode( labels[i] ) );

    divaux.appendChild( label );
    divaux.appendChild( fields[i] );

    form.appendChild( divaux );
  }

  form.appendChild( ok );

  if( this.deletable ) {

    var no = document.createElement("input");
    no.setAttribute( "type", "submit" );
    no.setAttribute( "value", "delete" );

    this.deleteDialog = function ( event ) {
      if( that.active ) {
        document.body.removeChild( div );
        that.active = false;
        that.notifyDelete();
        that.notifyChange();
      }
    }

    no.addEventListener("click", this.deleteDialog, false);

    form.appendChild( no );
  }

  div.appendChild( form );
  document.body.appendChild( div );

  ok.focus();

  div.style.top = (window.innerHeight - form.offsetHeight ) / 2 + "px";
  div.style.left = (window.innerWidth - form.offsetWidth) / 2 + "px";
}














/**
 * Constructor de la clase OperationItem
 * Crea un 'item' que controla un texto de tipo operación de una clase
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @class OperationItem
 * @extends TextBox
 */
var OperationItem = function( params ) {
  params = params || {};
  OperationItem.baseConstructor.call( this, params );

  this._parse = /^([#|+|\-|~])?([^:()]+)(?:\(([^()]+)?\))(?::([^:()]+))?$/;

  this.setMinWidth( 100 );
}
JSFun.extend( OperationItem, TextBox );



/**
 * Codifica el texto de la operación resultante a partir de sus elementos
 * separados y devuelve la operación codificada con los símbolos pertinentes
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method encode
 * @protected
 * @param {Array} values Elementos que componen la operación
 * @return {String} Operación que representa
 */
OperationItem.prototype.encode = function( values ) {

  var string = '';

  if( values[0] ) {
    string += values[0] ;
  }
  if( values[1] ) {
    string += values[1];
  }

  if( values[2] ) {
    string += '(' + values[2] + ')';
  } else {
    string += '()';
  }

  if( values[3] ) {
    string += ':' + values[3];
  }


  if( this._parse.exec( string ) ) {
    return string;
  } else {
    return 'wrong_operation';
  }
}



/**
 * Separa una cadena que contiene el una operación en sus diferentes partes
 * en función de la expresión regular que la controla y devuelve las
 * partes separadas en un array
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method decode
 * @protected
 * @param {String} operation Operación en cadena de texto
 * @param {Array} Elementos que componen la operación separados
 */
OperationItem.prototype.decode = function( operation ) {
  var result = this._parse.exec( operation );

  if( result ) {
    result.shift();
    return result;
  } else {
    return [];
  }

}



/**
 * Muestra un dialogo para modificar los elementos de la operación por
 * parte del usuario
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method showDialog
 */
OperationItem.prototype.showDialog = function() {
  if( this.active ) {
    return;
  }

  var that = this;
  this.active = true;

  var div = document.createElement("div");
  var form = document.createElement("form");
  var fields = [];


  /* Create form */
  var i;
  for( i = 0; i < 4; i++ ){
    fields.push( document.createElement("input") );
  }

  fields[0] = document.createElement('select');
  var sel = document.createElement('option');
  sel.setAttribute( 'value', '' );
  sel.appendChild( document.createTextNode('(none)') );
  fields[0].appendChild( sel );
  sel = document.createElement('option');
  sel.setAttribute( 'value', '+' );
  sel.appendChild( document.createTextNode('+ (public)') );
  fields[0].appendChild( sel );
  sel = document.createElement('option');
  sel.setAttribute( 'value', '-' );
  sel.appendChild( document.createTextNode('- (private)') );
  fields[0].appendChild( sel );
  sel = document.createElement('option');
  sel.setAttribute( 'value', '#' );
  sel.appendChild( document.createTextNode('# (protected)') );
  fields[0].appendChild( sel );
  sel = document.createElement('option');
  sel.setAttribute( 'value', '~' );
  sel.appendChild( document.createTextNode('~ (package)') );
  fields[0].appendChild( sel );


  var ok = document.createElement("input");
  div.className = "ud_popup";

  var values = this.decode( this.getValue() );

  for( i = 0; i < fields.length; i++ ) {
    fields[i].setAttribute( 'type', 'text' );
    fields[i].setAttribute( 'value', values[i] || '' );
  }


  if( values[0] ) {
    var childs = fields[0].childNodes;
    for( i in childs ) {
      if( childs[i].value == values[0] ) {
        childs[i].setAttribute( 'selected', 'selected' );
      }
    }
  }

  ok.setAttribute( "type" , "submit" );
  ok.setAttribute( "value", "ok" );



  this.changeText = function ( event ) {
    if( that.active ) {

      var values = [];

      var i;
      for( i = 0; i < fields.length; i++) {
        values.push( fields[i].value );
      }

      that.setText(  that.encode( values ) );

      document.body.removeChild( div );
      that.active = false;
      that.notifyChange();
    }
  }



  this.closeDialog = function ( event ) {
    if( that.active ) {
      document.body.removeChild( div );
      that.active = false;
      that.notifyChange();
    }
  }

  form.onsubmit = function() { return false; }

  ok.addEventListener("click", this.changeText, false);


  var labels = [ 'visibility', 'name', 'parameters', 'return' ];

  var label;
  var divaux;

  for( i = 0; i < fields.length; i++ ) {
    divaux = document.createElement( 'div' );
    label = document.createElement( 'label' );
    label.appendChild( document.createTextNode( labels[i] ) );

    divaux.appendChild( label );
    divaux.appendChild( fields[i] );

    form.appendChild( divaux );
  }


  form.appendChild( ok );

  if( this.deletable ) {
    var no = document.createElement("input");
    no.setAttribute( "type", "submit" );
    no.setAttribute( "value", "delete" );

    this.deleteDialog = function ( event ) {
      if( that.active ) {
        document.body.removeChild( div );
        that.active = false;
        that.notifyDelete();
        that.notifyChange();
      }
    }

    no.addEventListener("click", this.deleteDialog, false);
    form.appendChild( no );
  }

  div.appendChild( form );
  document.body.appendChild( div );


  div.style.top = (window.innerHeight - form.offsetHeight ) / 2 + "px";
  div.style.left = (window.innerWidth - form.offsetWidth) / 2 + "px";

}



/**
 * Comprueba si se ha pulsado sobre una parte de la operación y ejectua
 * las acciones pertienentes
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method select
 * @param {Number} x Coordenada x de la pulsación
 * @param {Number} y Coordenada y de la pulsación
 * @return {Boolean} Si el punto está sobre la opración o alguno de sus elementos
 */
OperationItem.prototype.select = function( x, y ) {
  if( Math.abs( x - ( this.getPixelX() + this.getSuperWidth() - 20) ) <= 5
      && Math.abs( y - ( this.getPixelY() + 8.66 ) ) <= 5 )
  {
    this.notifyToUp();
    this.notifyChange();
    return true;
  } else if ( Math.abs( x - ( this.getPixelX() + this.getSuperWidth() - 30) ) <= 5
      && Math.abs( y - ( this.getPixelY() + 7.33 ) ) <= 5 )
  {
    this.notifyToDown();
    this.notifyChange();
    return true;

  }

  return OperationItem.base.select.call( this, x, y );
}



/**
 * Dibuja la silueta del atributo, concretamente los botones para desplazar
 * las operaciones verticalmente
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method drawShape
 * @param {CanvasRenderingContext2D} context Contexto del elemento canvas
 */
OperationItem.prototype.drawShape = function( context ) {

	if(!this._visible)
		return;

  var x = this.getPixelX() + this.getSuperWidth() - 35;
  var y = this.getPixelY() + 3;

  context.save();

  context.fillStyle = "#0000aa";

  context.beginPath();
  context.moveTo( x, y );
  context.lineTo( x + 10, y );
  context.lineTo( x + 5, y + 7 );
  context.closePath();
  context.fill();


  x = x + 10;
  context.beginPath();
  context.moveTo( x + 5, y );
  context.lineTo( x, y + 7 );
  context.lineTo( x + 10, y + 7 );
  context.closePath();
  context.fill();


  context.restore();
}



/**
 * Constructor de la clase OperationFields
 * Representa un conjunto de campos de operación con las restricciones
 * que requiere, para un elemento de UML 2
 *
 * @author Martín Vega-leal Ordóñez
 * @update 4/11/2010
 *
 * @class OperationFields
 * @extends CollapsibleFields
 */
var OperationFields = function( params ) {
  params = params || {};
  OperationFields.baseConstructor.call( this, params );
}
JSFun.extend( OperationFields, CollapsibleFields );



/**
 * Define el tipo de elemento que contendrá el super-componente
 * en este caso será un objeto de tipo OperationItem
 *
 * @author Martín Vega-leal Ordóñez
 * @update 4/11/2010
 *
 * @method newItem
 * @return {OperationItem} Nuevo objeto del componente
 */
OperationFields.prototype.newItem = function() {
  return new OperationItem({ text: 'new_operation()' });
}










/**
 * Constructor de la clase Rectangular
 * Define un nodo con el comportamiento y la forma de un rectángulo
 *
 * @author Martín Vega-leal Ordóñez
 * @update 7/11/2010
 *
 * @class Rectangular
 * @extends Node
 */
var Rectangular = function( params ) {
  params = params || {};
  Rectangular.baseConstructor.call( this, params );
}

JSFun.extend( Rectangular, Node );


Rectangular.prototype.setElementXML = function( xmlnode ) {
	Rectangular.base.setElementXML.call(this ,xmlnode);
}










/**
 * Constructor de la clase Separator
 * Componente que dibuja una linea de separación entre otros componentes
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @class Separator
 * @extends Component
 */
var Separator = function( params ) {
  params = params || {};
  Separator.baseConstructor.call( this, params );

  this._setPosition( Component.Static );

  if(this._orientation)
    this.setWidth( params.width || 1 );
  else
    this.setHeight( params.height || 1 );


}
JSFun.extend( Separator, Component );



/**
 * Dibuja una linea de separación horizontal
 *
 * @author Martín Vega-leal Ordóñez
 * @update 4/11/2010
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Contexto del elemento canvas
 */
Separator.prototype.draw = function( context ) {

	if(!this._visible)
		return;

  context.save();

  context.lineWidth = (this._orientation) ? (this._width - 2*this._margin) : (this._height - 2*this._margin);
  context.strokeStyle = ComponentStyle.component_color;

  context.beginPath();
  if(this._orientation){
    context.moveTo( this.getPixelX(), this.getPixelY() );
    context.lineTo( this.getPixelX(), this.getPixelY() + this.getHeight() );
  } else {
    context.moveTo( this.getPixelX(), this.getPixelY() );
    context.lineTo( this.getPixelX() + this.getWidth(), this.getPixelY() );
  }
  context.stroke();

  context.restore();
}








/**
 * RegionLine Class Constructor
 * Components that draws a line between two region.
 *
 * @author Rafael Molina Linares
 * @update 19/9/2011
 *
 * @class RegionLine
 * @extends Component
 */

var RegionLine = function( params ) {

  params = params || {};
  RegionLine.baseConstructor.call( this, params );

  this._setPosition( params.position || Component.BottomLeft );

	/*
		Set the position of the component
		according to your orientation
	*/

  if(params.orientation){

		this.setHeight( params.height || 100 );
		this.setWidth(params.width || 1);
  } else {

		this.setHeight( params.height || 1 );
		this.setWidth(params.width || 100);
  }
}
JSFun.extend( RegionLine, Component );



/**
 * Check if the region line has been pressed,
 * and in affirmative case, is activated different flags
 *
 * @author Rafael Molina Linares
 * @update 10/10/2011
 *
 * @class select
 * @param {Number} x Coordinate x
 * @param {Number} y Coordinate y
 * @return {Boolean} If the point is on the region line
 */

RegionLine.prototype.select = function( x, y ) {


	var beforeX = this._getX();
	var beforeY = this._getY();
	var NodeNextIndex = -1;
	var NodeBeforeIndex = -1;


  if( !this.selected && this.isOver( x, y ) ) {

		var that = this;


		/**
		 * Catch the region before and next to the region of the current
		 * region, and later, will this information will be used by
		 * the dragComponent and dropComponent functions
		 *
		 * @author Rafael Molina Linares
		 * @update 10/10/2011
		 *
		 * @method _selectComponent
		 * @private
		 * @param {Event} event Javascript event
		 */

		this._selectComponent = function( event ) {


			that.getParent()._diagram.interaction(false);

			var superNode = that.getParent().getParent();

			/*
				Get the indices of the upper and lower
				nodes to the current node according to
				the orientation of the superNode
			*/

			if(superNode._orientation){

				for(var i=0; i< superNode._nodeChilds.length;i++){

				  if(superNode._nodeChilds[i].getX() < that.getParent().getX()){
						NodeBeforeIndex = i;
				  }

				  if(superNode._nodeChilds[i].getX() > that._getX()){
						if(NodeNextIndex == -1)
							NodeNextIndex = i;
				  }
				}
			} else { //Horizontal orientation

				for(var i=0; i< superNode._nodeChilds.length;i++){

				  if(superNode._nodeChilds[i].getY() < that.getParent().getY()){
						NodeBeforeIndex = i;
				  }

				  if(superNode._nodeChilds[i].getY() > that._getY()){
						if(NodeNextIndex == -1)
							NodeNextIndex = i;
				  }
				}
			}
		}


		/**
		 * If a region line has been selected and the mouse
     * is being moving, this method captures the x and y
		 * coordinates of the component and act on the
     * produced movement.
		 *
		 * @author Rafael Molina Linares
		 * @update 10/10/2011
 		 *
		 * @method _dragComponent
		 * @private
		 * @param {Event} event Javascript event
     *
		 */

		this._dragComponent = function( event ) {

			/*
				Avoid that actions be performed if the mouse's
				drag isn't done with the rigth button
			*/
			if( !( event.button == 0 && that.getParent()._diagram._pressMouse )){
		    return;
		  }

		  var mousex = event.pageX - that.getParent()._diagram._div.offsetLeft;
		  var mousey = event.pageY - that.getParent()._diagram._div.offsetTop;

		  if( mousex < 0 )
				mousex = 0;
		  if( mousey < 0 )
				mousey = 0;
		  if( mousex >= that.getParent()._diagram._width )
				mousex = that.getParent()._diagram._width;
		  if( mousey >= that.getParent()._diagram._height )
				mousey = that.getParent()._diagram._height;

		  that.getParent()._diagram._div.style.cursor = 'pointer';

		  var px = mousex - that.getParent()._relx;
		  var py = mousey - that.getParent()._rely;

		  var superNode = that.getParent().getParent();

			/*
				Sets the new position of the component
				according to the orientation of the supernode
			 */

		  if(superNode._orientation){

		    var rightLimitX = that.getParent()._diagram._width;
		    var leftLimitX = that.getParent()._x + that.getParent()._minWidth;

		    if( (mousex > leftLimitX ) && ( mousex < rightLimitX) )
			    that._x = mousex;

	    } else {	//Horizontal orientation

		    var bottomLimitY = that.getParent()._diagram._height;
				var topLimitY = that.getParent()._y + that.getParent()._minHeight;

		    if( (mousey > topLimitY ) && ( mousey < bottomLimitY) )
			    that._y = mousey;
	    }

	    that.getParent()._diagram._drawMotion( that );
		}

		/**
		 * If a region line has been selected and the
		 * mouse has been released, this method update
		 * the position of supernode and childs nodes
		 *
		 * @author Rafael Molina Linares
		 * @update 10/10/2011
		 *
		 * @method _dropComponent
		 * @private
		 * @param {Event} event Javascript event
 		 *
		 */

		this._dropComponent = function( event ) {

			/*
				Avoid that actions be performed if the mouse's
				drop isn't done with the rigth button
			*/
			if( !( event.button == 0 && that.getParent()._diagram._pressMouse ) )
		    return;

			/*
				Calculate the new height and width of the
				region that contains the region line
			*/
		  var finalX = that._getX() - beforeX;
		  var finalY = that._getY() - beforeY;

			/*
		  	Update width of the region that contains the
				region line and the position of the before
				and next region(if neccesary) according to the
				orientation of the supernode
			*/

			if(that.getParent().getParent()._orientation){

			  var nextNode = that.getParent().getParent()._nodeChilds[NodeNextIndex];

				/*
					Set the position x of the component to the
					value before to the movement of the component
				*/
			  that._x  = that._x - finalX;

			  if(finalX > 0){
					that.getParent().setWidth(that.getParent().getWidth() + finalX);
			  }
	 	    else{


					var currentNode = that.getParent();
					var beforeWidth = that.getParent().getWidth() + finalX;
					that.getParent().setWidth(that.getParent().getWidth() + finalX);

					if(NodeNextIndex != -1){
						nextNode._x = nextNode._x + finalX;
						nextNode.setWidth(nextNode.getWidth() - finalX);
					}
			  }
			}
		  else {//horizontal orientation

			  var nextNode = that.getParent().getParent()._nodeChilds[NodeNextIndex];

				/*
					Set the position of the component to the
					value before to the movement of the component
				*/
			  that._y  = that._y - finalY;

			  if(finalY > 0){

					that.getParent().setHeight(that.getParent().getHeight() + finalY);
			  }
		    else{ //If the region line has been moved to up

					var currentNode = that.getParent();
					var beforeHeight = that.getParent().getHeight() + finalY;
					that.getParent().setHeight(that.getParent().getHeight() + finalY);

					if( NodeNextIndex != -1 ){

						nextNode._y = nextNode._y + finalY;
						nextNode.setHeight(nextNode.getHeight() - finalY);
					}
			  }
		  }

		  that.getParent()._diagram._div.style.cursor = 'default';

		  that.getParent()._diagram._clearMotion();

			that.getParent()._resizing = false;
			that.getParent()._selected = true;
		  that.getParent().getParent()._selected = true;


			var	resize = false;
			var recall = true;
			var	movementLine = true;

		  that.getParent().getParent().notifyChange(recall,resize, movementLine);

		  that.getParent()._diagram.draw();


		  window.removeEventListener('mousedown', that._selectComponent, false);
		  window.removeEventListener('mousemove', that._dragComponent, false);
		  window.removeEventListener('mouseup', that._dropComponent, false);

		  that.getParent()._diagram.interaction(true);

      that.getParent()._diagram._lastElement = that.getParent()._diagram._element;
      that.getParent()._diagram._element = null;


		  NodeNextIndex = -1;
		  NodeBeforeIndex = -1;

		  that.getParent()._diagram._pressMouse = false;
		}

		window.addEventListener('mousedown', this._selectComponent, false);
		window.addEventListener('mousemove', this._dragComponent, false);
		window.addEventListener('mouseup', this._dropComponent, false);

		return true;
  } else {
    return false;
  }
}


/**
 * Check if the given point is over the component
 *
 * @author Rafael Molina Linares
 * @update 10/10/2011
 *
 * @method isOver
 * @param {Number} x Represents the x coordinate of the point to check
 * @param {Number} y Represents the y coordinate of the point to check
 * @return {Boolean} If the point is over the component
 */

RegionLine.prototype.isOver = function( x, y ) {

  if( this._visible &&
			x >= this._x -5
      && x <= this._x + this._width + 5
      && y >= this._y - 5
      && y <= this._y + this._height + 5 )
  {
    return true;
  } else {
    return false;
  }
}



/**
 * Draws a horizontal or vertical region line
 *
 * @author Rafael Molina Linares
 * @update 10/10/2011
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Context of the canvas element
 */

RegionLine.prototype.draw = function( context ) {

	if(!this._visible)
		return;

	if(this._parent.getParent()._orientation){
		JSGraphic.dashedLine( context, this.getPixelX(), this.getPixelY(), this.getPixelX(), this.getPixelY() + this.getHeight(),  10 );
	}
	else {//horizontal orientation
		JSGraphic.dashedLine( context, this.getPixelX(), this.getPixelY(), this.getPixelX() + this.getWidth(), this.getPixelY(), 10 );
	}
}


/**
 * Draws the shape of a horizontal or vertical region line
 *
 * @author Rafael Molina Linares
 * @update 10/10/2011
 *
 * @method drawShape
 * @param {CanvasRenderingContext2D} context Context of the canvas element
 */

RegionLine.prototype.drawShape = function( context ) {

	if(!this._visible)
		return;

  context.save();
  context.strokeStyle = "#aaaaaa";

  if(this._parent.getParent()._orientation)//vertical orientation
	  context.strokeRect( this.getPixelX() - 2 , this.getPixelY(), this.getWidth() + 4 , this.getHeight() );
  else//horizontal orientation
	  context.strokeRect( this.getPixelX() , this.getPixelY() - 4, this.getWidth() ,  this.getHeight() + 6 );

  context.restore();

	/*
		First red circle to remove the region that
		contains the region line
	*/
  context.save();

  context.fillStyle = '#ff0000';

  context.beginPath();

  if(this._parent.getParent()._orientation)
		context.arc( this._parent.getX() + this._parent.getWidth() - 7 , this._parent.getY() +  7, 4, 0, Math.PI*2, true );
  else
		context.arc( this._parent.getX() + 7 , this._parent.getY() + this._parent.getHeight() - 7, 4, 0, Math.PI*2, true );

  context.closePath();
  context.fill();

  context.restore();

  var nodes = this._parent.getParent()._nodeChilds;
  for(var i=0; i< nodes.length; i++)
		if(nodes[i] == this._parent)
  		break;

	/*
		Second red circle to remove the next region to
		the region that contains the region line
		(if current region isn't the last)
	*/
  context.save();

  context.fillStyle = '#ff0000';
  context.beginPath();

  if(this._parent.getParent()._orientation)
		context.arc( nodes[i+1].getX() + nodes[i+1].getWidth() - 7 , nodes[i+1].getY() +  7, 4, 0, Math.PI*2, true );
  else
		context.arc( nodes[i+1].getX() + 7 , nodes[i+1].getY() + nodes[i+1].getHeight() - 7, 4, 0, Math.PI*2, true );

  context.closePath();
  context.fill();

  context.restore();
}








/**
 * SuperNode class Constructor , creates a supernode of a diagram
 *
 * @author Rafael Molina Linares
 * @update 23/08/2011
 *
 * @class SuperNode
 * @extends Node
 * @param {Number} _orientation Represents the orientation of the regions of supernode. This orientation can be horizontal(value 0) or vertical(value 1)
 * @param {Number} _includeComponentByRegion  Represents the existence(true) or nonexistence(false) of a component to the name of the each region
 *
 */
var SuperNode = function( params ) {

  params = params || {};
  SuperNode.baseConstructor.call( this, params );


  this._orientation = params.orientation || 0;// 0: horizontal, 1:vertical
	this._includeComponentByRegion = (params.includeComponentByRegion == false) ? false : true;
  this.setContainer();
}
JSFun.extend( SuperNode, Node );



/**
 * Adding a region or child node to the supernode
 *
 * @author Rafael Molina Linares
 * @update 23/08/2011
 *
 * @method addNode
 * @param {Number} node Represents the node to add
 *
 */
SuperNode.prototype.addRegion = function( node ) {

  if(node instanceof Node){

	node.setContainer();

	this.addChild(node);

	this.notifyChange(true);
  }
}



/**
 * Delete a region or child node to the supernode
 *
 * @author Rafael Molina Linares
 * @update 23/08/2011
 *
 * @add deleteRegion
 * @param {Number} node Represents the region of supernode to be remove
 *
 */
SuperNode.prototype.deleteRegion = function( node ) {

  var i;
  var j;

  if(this._orientation)
		var mov = node.getWidth();
  else
		var mov = node.getHeight();

  for( i=0; i < this._nodeChilds.length;i++ ) {
    if( this._nodeChilds[i] == node )
      break;
  }

  node.remove();

  var index = i;


  if(index == (this._nodeChilds.length)){

		if(this._nodeChilds[index -1]._components[2])
		  this._nodeChilds[index - 1]._components[2].notifyDelete();
  }

  if(this._orientation){
		this._minWidth = this.getWidth() - mov;
		this.setWidth(this.getWidth() - mov);
  }
  else {
    this._minHeight = this.getHeight() - mov;
	  this.setHeight(this.getHeight() - mov);
  }

	this.notifyChange(true);

  this.notifyDraw();
}



/**
 * Notify to the supernode that a change has been produced by some relationed element
 * with the supernode
 *
 * @author Rafael Molina Linares
 * @update 23/08/2011
 *
 * @method notifyChange
 * @param {Boolean} recall If your value is true, the call to the same method of the parent can be done
 * @param {Boolean} resize If your value is true, this parameter tells us that the call of this
 *												 method is triggered when the supernode has been resizing
 */
SuperNode.prototype.notifyChange = function(recall,resize, movementLine) {

  recall = recall || false;
	resize = resize || false;
	movementLine = movementLine || false;

  this._resizing = true;

  this.updateRegions(resize,movementLine);

  if( this._container ) {
    var i;

    if(recall){

			var nod = this._nodeChilds;
			for(i=0; i< nod.length;i++)
	   	  if(nod.length -1 != i)
	       nod[i].updateContainer(false);
			  else
	       nod[i].updateContainer();
		} else {
    	this.updateContainer();
    }

    if( this._parent ) {

			var superNode = this._parent.getParent();
			while(superNode){
				if( superNode instanceof SuperNode){
					superNode.notifyChange(true);
					superNode = null;
				} else {
					superNode = superNode._parent;
				}
			}
		}

  } else {

    this.updateComponents();
    if( this._parent ) {
      this._parent.updateContainer();
    }
  }

  this.updateRegions(resize,movementLine);

  for(var i=0 ; i<this._nodeChilds.length;i++)
	 	this._nodeChilds[i].setDiagram(this._diagram);

  this._resizing = false;
}


/**
 * If the node that call to this method, is container, check your minimal size
 * according to the contained elements within it and your components
 *
 * @author Rafael Molina Linares
 * @update 18/07/2011
 *
 * @method updateContainer
 * @param {Boolean} recall If your value is true, the call to the same method of the parent can be done
 *
 */
SuperNode.prototype.updateContainer = function(recall) {

  if(!(recall == false || recall == true))
	  recall = true;

  if( this._container ) {
    var i;

    var lx = this._x;
    var ly = this._y;

    var rx = this._x;
    var ry = this._y;

    var elem;
    var elemRigthX, elemRigthY, elemLeftX, elemeLeftY;
    var len = this._nodeChilds.length;

    for( i=0; i<len;i++ ) {

      elem = this._nodeChilds[i];

			if(elem._visible){

		    if(this._orientation){//vertical orientation

					elemLeftX = elem._x;
					elemLeftY = elem._y;

					if(i == (len -1))
						elemRigthX = elem._x + elem._minWidth;
					else
						 elemRigthX = elem._x + elem._width;

					elemRigthY = elem._y + elem._minHeight;
				}
				else {//horizontal orientation

					elemLeftX = elem._x;
					elemLeftY = elem._y;
					elemRigthX = elem._x + elem._minWidth;


					if(i == (len -1))
						elemRigthY = elem._y + elem._minHeight;
					else
						 elemRigthY = elem._y + elem._height;

					elemRigthX = elem._x + elem._minWidth;
		    }

		    if( elemRigthX > rx )
		      rx = elemRigthX;
		    if( elemRigthY > ry )
		      ry = elemRigthY;

		    if( elemLeftX < lx )
		      lx = elemLeftX;
		    if( elemLeftY < ly )
		      ly =elemLeftY;
			}
    }

    if( lx < this._x || ly < this._y ) {

      this.setWidth( this._x - lx + this._width );
      this.setHeight( this._y - ly + this._height );

      this._x = lx;
      this._y = ly;

      this.setMinWidth( rx - lx );
      this.setMinHeight( ry - ly );


    } else {

      this.setMinWidth( rx - this._x );
      this.setMinHeight( ry - this._y );
    }

    this._prex = this._x;
    this._prey = this._y;

    this.updateComponents();

    if( this._parent && recall) {
      this._parent.updateContainer();
		}
	}
}



/**
 * Update width and height of all regions of the supernode.
 * This method works differently depending on whether the
 * supernode uses horizontal or vertical regions.
 *
 * @author Rafael Molina Linares
 * @update 23/08/2011
 *
 * @method updateRegions
 * @param {Boolean} resize If your value is true, this parameter tells us that the
 *												 call of this method is triggered when the supernode has been resizing
 *
 */
SuperNode.prototype.updateRegions = function( resize, movementLine ) {

	resize = resize || false;
	movementLine = movementLine || false;

	var len = this._nodeChilds.length;

	if(this._orientation){//vertical orientation
		var width = 0;
		var x = this.getX();


		for(var j=0 ; j< len; j++){

			var nod = this._nodeChilds[j];

			nod.setMinHeight(this._minHeight - this._components[0].getHeight() - this._components[1].getHeight());
			nod.setHeight(this.getHeight() - this._components[0].getHeight() - this._components[1].getHeight());
			if(nod._components[2] instanceof RegionLine)
				nod._components[2].setHeight(this.getHeight() - this._components[0].getHeight() - this._components[1].getHeight());
		}

		for(j = 0; j<len ; j++){

			this._nodeChilds[j]._x = x;
			this._nodeChilds[j]._y = this.getY() + this._components[0].getHeight() + this._components[1].getHeight();

			if(j == len - 1) {
				if( resize || (x + this._nodeChilds[j]._width) < (this.getWidth() + this.getX()))
					this._nodeChilds[j].setWidth(this.getWidth() + this.getX() - x);
				else
					this.setWidth(x + this._nodeChilds[j]._width - this.getX());
			}

			x += this._nodeChilds[j].getWidth();

		}

		for(j = 0; j<len ; j++){
			var mov = this._nodeChilds[j]._x - this._nodeChilds[j]._prex;

			if(mov > 0 || (mov < 0 && !movementLine)){
				for(var i=0;i<this._nodeChilds[j]._nodeChilds.length;i++)
					this._nodeChilds[j]._nodeChilds[i].updatePosition(mov,0,true);
			}
			this._nodeChilds[j].resetMovement();
		}

	} else {//horizontal orientation

		var height = 0;
		var y = this.getY() + this._components[0].getHeight() + this._components[1].getHeight();



		for(var j=0 ; j< len; j++){

			var nod = this._nodeChilds[j];

			nod.setMinWidth(this._minWidth);
			nod.setWidth(this.getWidth());
			if(nod._components[2] instanceof RegionLine)
				nod._components[2].setWidth(this.getWidth());
		}

		for(j = 0; j<len ; j++){

			this._nodeChilds[j]._x = this.getX();
			this._nodeChilds[j]._y = y;

			if(j == len - 1) {
				if( resize || (y + this._nodeChilds[j]._height) < (this.getHeight() + this.getY()))
					this._nodeChilds[j].setHeight(this.getHeight() + this.getY() - y);
				else
					this.setHeight(y + this._nodeChilds[j]._height - this.getY());
			}

			y += this._nodeChilds[j].getHeight();
		}


		for(j = 0; j<len ; j++){
			var mov = this._nodeChilds[j]._y - this._nodeChilds[j]._prey;


			if(mov > 0 || (mov < 0 && !movementLine)){
				for(var i=0;i<this._nodeChilds[j]._nodeChilds.length;i++)
					this._nodeChilds[j]._nodeChilds[i].updatePosition(0,mov,true);
			}
			this._nodeChilds[j].resetMovement();
		}


	}


  this.updateComponents();

  for(j=0 ; j<this._nodeChilds.length; j++)
     this._nodeChilds[j].updateComponents();
}



/**
 * Check if the supernode, your regions or some components of them has been pressed,
 * and in affirmative case, is activated different flags
 *
 * @author Rafael Molina Linares
 * @update 09/09/2011
 *
 * @method select
 * @param {Number} x coordinate x
 * @param {Number} y coordinate y
 * @return {Boolean} If the point is on the supernode, your regions or some of your components
 */
SuperNode.prototype.select = function( x, y ) {

	if(!this._visible)
		return;

	var i;
	var selectedNode = -1;
	var that = this;


	this.deselectComponent();

	for(i=0;i<this._nodeChilds.length;i++){
		if( this._nodeChilds[i]._selected )
			selectedNode = i;
		this._nodeChilds[i].deselect();
	}

	if(this._diagram._activeMenu){
		this.removeContextualMenu();
	}

  if(this._diagram._pressMouse == true){

	  if( this._selected ) {
	    if( this._moveable
	        && Math.abs( x - ( this._x + this._width + 2.5 ) ) <= 5
	        && Math.abs( y - ( this._y + this._height + 2.5 ) ) <= 5 )
	    {
	      this._resizing = true;
	      return true;
	    }
	  }



		if( this._selected ) {

	    var nodes = this._nodeChilds;

	    for(i=0;i < nodes.length - 1;i++){

				if( i == selectedNode ){

					if(this._orientation){
						var compX1 = nodes[i].getX() + nodes[i].getWidth() - 7;
						var compY1 = nodes[i].getY() +  7;
						var compX2 = nodes[i+1].getX() + nodes[i+1].getWidth() - 7;
						var compY2 = nodes[i+1].getY() +  7;
					} else  {
						var compX1 = nodes[i].getX() + 7;
						var compY1 = nodes[i].getY() + nodes[i].getHeight() - 7;
						var compX2 = nodes[i+1].getX() + 7;
						var compY2 = nodes[i+1].getY() + nodes[i+1].getHeight() - 7;
					}

					var confirmDialog = new Dialog({ text: 'Do you want to delete the region?',cancelable: true});
					if( Math.abs( x - ( compX1 ) ) <= 8 &&
						  Math.abs( y - ( compY1 ) ) <= 8 ) {

						this._diagram._pressMouse = false;
						confirmDialog.show(function(){ that.deleteRegion( nodes[i] );});
						return true;
					}

					if( Math.abs( x - ( compX2 ) ) <= 8 &&
						  Math.abs( y - ( compY2 ) ) <= 8 ){

						this._diagram._pressMouse = false;
						confirmDialog.show(function(){ that.deleteRegion( nodes[i+1] );});
						return true;
					}
				}
			}


	    for(i=0; i<this._nodeChilds.length; i++){

				var nod = this._nodeChilds[i];

				if(nod.isOverComponent(x, y)){

					if(nod.isOverRegionLine(x, y)){
			      nod.selectComponent(x,y);
					} else {
				    this._relx = x - this._x;
				    this._rely = y - this._y;
						this._selectedBefore = true;
					}
		      return true;
				}
	    }

	    if( this.isOverComponent( x, y ) ) {

	      this._relx = x - this._x;
	      this._rely = y - this._y;
	      this._selectedBefore = true;

	      return true;
	    }
	  }

	  if( this.isOver( x, y ) ) {

	    this._relx = x - this._x;
	    this._rely = y - this._y;

	    this._selectedBefore = this._selected;
	    this._selected = true;

	    return true;
	  } else {
	    return false;
	  }
  }
  else if(this._diagram._pressMouseRight == true){

		if( this.isOver( x, y ) ) {

		  document.oncontextmenu = function (){return false;};

			var scroll = document.documentElement.scrollTop || document.body.scrollTop;

	    x = x + this._diagram._div.offsetLeft;
	    y = (scroll) ? (y - scroll + this._diagram._div.offsetTop) : (y + this._diagram._div.offsetTop) ;

	    this.showContextualMenu(x,y);

		  return true;
	  } else {

	    return false;
	  }
  }
}



/**
 * Performs the necessary actions when the user release
 * the button of the mouse that had pressed
 *
 * @author Rafael Molina Linares
 * @update 22/08/2011
 *
 * @method drop
 * @param {Number} x Coordinate x of the position
 * @param {Number} y Coordinate y of the position
 */
SuperNode.prototype.drop = function( x, y ) {

  if ( this._moved ) {
    if( !this._alone ) {
      this._diagram.checkForParent( this );
    }

    this.updatePosition();

    if( this._parent ) {

  		this._parent.updateContainer();

			var superNode = this._parent.getParent();
			while(superNode){
				if( superNode instanceof SuperNode){
					superNode.notifyChange(true);
					superNode = null;
				} else {
					superNode = superNode._parent;
				}
			}
    }

  } else if( this._resizing ) {

		if(this instanceof SuperNode){
			var recall = true;
			var resize = true;
	    this.notifyChange(recall, resize);
		}
		else
	    this.notifyChange();


    if( this._parent ) {
  		this._parent.updateContainer();

			var superNode = this._parent.getParent();
			while(superNode){
				if( superNode instanceof SuperNode){
					superNode.notifyChange(true,true);
					superNode = null;
				} else {
					superNode = superNode._parent;
				}
			}
    }

  } else if( this._selectedBefore ) {
    this.selectComponent( x, y );
  }

  this._moved = false;
  this._resizing = false;
}



/**
 * Checks if the given point is over a component of the node and,
 * in affirmative case, selects it
 *
 * @author Rafael Molina Linares
 * @update 23/08/2011
 *
 * @method selectComponent
 * @private
 * @param {Number} x Coordinate x of point to check
 * @param {Number} y Coordinate y of point to check
 */
SuperNode.prototype.selectComponent = function( x, y ) {
  var i;

  for( i = 0; i < this._components.length; i += 1 ) {

    if( this._components[i].select( x, y ) ) {
      this._activeComponent = this._components[i];
      return;
    }
  }

	for(i=0; i<this._nodeChilds.length; i++){

		var nod = this._nodeChilds[i];

		if(nod.isOverComponent(x, y)){

      nod.selectComponent(x,y);
		  nod._selectedBefore = true;
		  return true;
		}
	}
}



/**
 * Draws totally the supernode on the canvas element,
 * call to the sub-methods of draw to draw all regions,
 * components and shapes of supernode
 *
 * @author Rafael Molina Linares
 * @update 23/08/2011
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Context of canvas element
 */
SuperNode.prototype.draw = function( context ) {

	if(!this._visible)
		return;

  context.save();
  context.fillStyle = NodeStyle.shape_color;

  if( this._moveable && this._selected ) {
    context.fillRect( parseInt( this._x + this._width ), parseInt( this._y + this._height ), 5, 5 );
  }
  context.restore();

  this.drawFigures( context );

  this.drawComponents( context );

  if( this._selected ) {
    this.drawComponentsShape( context );
  }

  for(var i=0;i<this._nodeChilds.length;i++)
		this._nodeChilds[i].draw(context);

	if(this._selected){
		for(var i=0; i<this._nodeChilds.length;i++){
			if(this._nodeChilds[i]._components[0])
			  this._nodeChilds[i]._components[0].drawShape( context );
			if(this._nodeChilds[i]._components[1])
		  this._nodeChilds[i]._components[1].drawShape( context );
		}
	}
}



/**
 * Get a Xml node with the information of supernode
 *
 * @author Rafael Molina Linares
 * @update 23/8/2011
 *
 * @method getElementXML
 * @param {DOMNode} parent Node parent of the xml tree that is generated
 * @return {DOMNode} Xml node with the information of the object
 */
SuperNode.prototype.getElementXML = function( parent ) {

  var xmlnode = parent.createElement( this.getType() );

	if(this._selectedFigure){
	 	this.setSelectedFigure( 0 );
	}
  xmlnode.setAttribute( 'id', this.getId() );
  xmlnode.setAttribute( 'x', this.getX() );
  xmlnode.setAttribute( 'y', this.getY() );
  xmlnode.setAttribute( 'width', this.getWidth() );
  xmlnode.setAttribute( 'height', this.getHeight() );
  xmlnode.setAttribute( 'backgroundColor', this.getBackgroundColor() );
  xmlnode.setAttribute( 'orientation', this._orientation );
  xmlnode.setAttribute( 'includeComponentByRegion', this._includeComponentByRegion );

  var i;
  for( i in this._components ) {
    if( this._components[i].getId() ) {
      xmlnode.appendChild( this._components[i].getComponentXML( parent ) );
    }
  }

  for( i in this._nodeChilds ) {
    xmlnode.appendChild( this._nodeChilds[i].getElementXML( parent ) );
  }
  for( i in this._relationChilds ) {
    xmlnode.appendChild( this._relationChilds[i].getElementXML( parent ) );
  }

  return xmlnode;
}



/**
 * Receives a XML node with information of supernode and get this information back
 *
 * @author Rafael Molina Linares
 * @update 23/8/2011
 *
 * @method setElementXML
 * @param {DOMNode} xmlnode XML node with the node's information
 */
SuperNode.prototype.setElementXML = function( xmlnode ) {

  this.setPosition( parseInt( xmlnode.getAttribute( 'x' ) ),
                    parseInt( xmlnode.getAttribute( 'y' ) )
                  );
  this.resetMovement();

  this.setWidth( parseInt( xmlnode.getAttribute( 'width' ) ) );
  this.setHeight( parseInt( xmlnode.getAttribute( 'height' ) ) );
  this.setBackgroundColor( xmlnode.getAttribute( 'backgroundColor' )  );
  this._orientation = parseInt(xmlnode.getAttribute( 'orientation' ));
  this._includeComponentByRegion = xmlnode.getAttribute( 'includeComponentByRegion' );
  this._includeComponentByRegion = (this._includeComponentByRegion == 'true') ? true : false;

  var i;
  var childs = xmlnode.childNodes;

  for( i = 0; i < childs.length; i++ ) {
    if( childs[i].nodeName == 'item' ) {

      this.setValue( childs[i].getAttribute( 'id' ), childs[i].getAttribute( 'value' ) );
    } else if( childs[i].nodeName == 'superitem' ) {

      var j;
      for( j in this._components ) {
        if( this._components[j].getId() == childs[i].getAttribute( 'id' ) ) {
          this._components[j].setComponentXML( childs[i] );
        }
      }
    }
  }
}







/**
 * RegionItem Class Constructor. Create a component
 * that when is clicked creates a region
 *
 * @author Rafael Molina Linares
 * @update 19/9/2011
 *
 * @class RegionItem
 * @extends TextBox
 */
var RegionItem = function( params ) {
  params = params || {};
  RegionItem.baseConstructor.call( this, params );
}
JSFun.extend( RegionItem, TextBox );




/**
 * Check if a part of attribute has been clicked and run
 * the corresponding actions.
 *
 * @author Rafael Molina Linares
 * @update 19/9/2011
 *
 * @method select
 * @param {Number} x Represents the x coordinate of the pulsation
 * @param {Number} y Represents the y coordinate of the pulsation
 * @return {Boolean} If the point is over the component
 */

RegionItem.prototype.select = function( x, y ) {
  if( !this.selected && this.isOver( x, y ) ) {
    this.createRegion();
    return true;
  } else {
    return false;
  }
}


/**
 * Create a node or region to the parent
 *
 * @author Rafael Molina Linares
 * @update 19/9/2011
 *
 * @method createRegion
 *
 */
RegionItem.prototype.createRegion = function( ) {

	var lenComponents = this.getParent()._components.length;


	if(this.getParent()._orientation) {//vertical orientation
		this.getParent().addRegion(new Region({parent: this.getParent()}));
	} else {
		this.getParent().addRegion(new Region({parent: this.getParent()}));
	}

}










/**
 * Constructor de la clase Rhombus
 * Define un nodo con el comportamiento y la forma de un rombo
 *
 * @author Martín Vega-leal Ordóñez
 * @update 30/11/2010
 *
 * @class Rhombus
 * @extends Node
 */

var Rhombus = function( params ) {

  params = params || {};
  Rhombus.baseConstructor.call( this, params );
}

JSFun.extend( Rhombus, Node );



/**
 * Devuelve el punto de intersección entre el indicado por parámetros
 * y la silueta del rombo
 *
 * @author Martín Vega-leal Ordóñez
 * @update 30/11/2010
 *
 * @method getLinkCentered
 * @param {Number} x Coordenada x del punto
 * @param {Number} y Coordenada y del punto
 * @return {Point} Punto de intersección con los bordes del rombo
 */


Rhombus.prototype.getLinkCentered = function( x, y ) {
  if( x instanceof Point ) {
    y = x.getY();
    x = x.getX();
  }

  var cp = this.getCentralPoint();
  var cpx = cp.getX();
  var cpy = cp.getY();

  var ax, ay, bx, by;

  ax = this.getX();
  ay = cp.getY();
  bx = cp.getX();
  by = this.getY();

  if( x < cpx ) {
    if( y < cpy ) {

    } else {
      by = this.getY() + this.getHeight();
    }
  } else {
    if( y < cpy ) {
      ax = this.getX() + this.getWidth();
    }else {
      ax = this.getX() + this.getWidth();
      by = this.getY() + this.getHeight();
    }
  }

  return JSGraphic.lineIntersection( ax, ay, bx, by, x, y, cp.getX(), cp.getY() );

}



/**
 * Calcula el tamaño mínimo del rombo en función de sus componentes
 * no permitiendo reducir el tamaño más allá de lo que ocupan
 *
 * @author Martín Vega-leal Ordóñez
 * @update 30/11/2010
 *
 * @method calculateSize
 * @protected
 */



Rhombus.prototype.calculateSize = function() {
  var comp;
  var maxWidth = 0;
  var maxHeight = 0;
  var i;

  for( i = 0; i < this._components.length; i += 1 ) {
    comp = this._components[i];

    if( comp.getPosition() == Component.Float ) {
      maxHeight += comp.getHeight();

      if( comp.getWidth() > maxWidth )
        maxWidth = comp.getWidth();
    }
  }


  if( maxHeight > 0 )
    this.setMinHeight( maxHeight * 2 );

  if( maxWidth > 0 )
    this.setMinWidth( maxWidth * 2 );
}



/**
 * Actualiza la posición de los componentes del nodo rombo
 *
 * @author Martín Vega-leal Ordóñez
 * @update 30/11/2010
 *
 * @method updateComponents
 * @private
 */


Rhombus.prototype.updateComponents = function() {
  if( this._components.length > 0 ) {
    this.calculateSize();

    var ax = this.getX();
    var ay = this.getY();
    var a = this.getWidth() / 2;
    var b = this.getHeight() / 2;
    var cx = ax + a;
    var cy = ay + b;

    var cp = this.getCentralPoint();

    var p = JSGraphic.lineIntersection( ax, ay + b, ax + a, ay, this.getX(), this.getY(), cp.getX(), cp.getY() );

    this.insertComponents( p.getX(),
                           p.getY(),
                           this.getWidth() - 2*( p.getX() - this.getX() ),
                           this.getHeight() - 2*( p.getY() - this.getHeight() )
                         );

    var i;
    for( i in this._relations ) {
      this._relations[i].notifyChange();
    }

  }

}









/**
 * Constructor de la clase RoleItem
 * Crea un 'item' que controla un texto de tipo rol restringiendo
 * sus valores a los permitidos para el rol de una relación
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @class RoleItem
 * @extends TextBox
 */
var RoleItem = function( params ) {
  params = params || {};
  RoleItem.baseConstructor.call( this, params );

  this._parse = /^([#|+|\-|~])?([\/])?(.*)?$/;
}
JSFun.extend( RoleItem, TextBox );



/**
 * Codifica el texto del rol resultante a partir de sus elementos
 * separados y devuelve el rol codificado para poder ser mostrado
 * al usuario
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method encode
 * @protected
 * @param {Array} values Elementos que componen el rol
 * @return {String} Rol que contiene
 */
RoleItem.prototype.encode = function( values ) {

  var string = '';

  if( values[0] ) {
    string += values[0];
  }
  if( values[1] ) {
    string += values[1];
  }
  if( values[2] ) {
    string += values[2];
  }


  if( this._parse.exec( string ) ) {
    return string;
  } else {
    return 'wrong_role';
  }
}



/**
 * Separa una cadena que contiene un rol en sus diferentes elementos
 * separados para mostrarlos en un dialogo al usuario, se devuelven
 * en un Array
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method decode
 * @protected
 * @param {String} role Rol que se va a separar
 * @return {Array} Elementos que componen el rol separados
 */
RoleItem.prototype.decode = function( role ) {
  var result = this._parse.exec( role );

  if( result ) {
    result.shift();
    return result;
  } else {
    return [];
  }

}



/**
 * Muestra una ventana para modificar los elementos del rol por
 * parte del usuario
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @method showDialog
 */
RoleItem.prototype.showDialog = function() {
  if( this.active ) {
    return;
  }

  var that = this;
  this.active = true;

  var div = document.createElement("div");
  var form = document.createElement("form");
  var fields = [];


  /* Create form */
  var i;
  for( i = 0; i < 3; i++ ){
    fields.push( document.createElement("input") );
  }

  fields[0] = document.createElement('select');
  var sel = document.createElement('option');
  sel.setAttribute( 'value', '' );
  sel.appendChild( document.createTextNode('(none)') );
  fields[0].appendChild( sel );
  sel = document.createElement('option');
  sel.setAttribute( 'value', '+' );
  sel.appendChild( document.createTextNode('+ (public)') );
  fields[0].appendChild( sel );
  sel = document.createElement('option');
  sel.setAttribute( 'value', '-' );
  sel.appendChild( document.createTextNode('- (private)') );
  fields[0].appendChild( sel );
  sel = document.createElement('option');
  sel.setAttribute( 'value', '#' );
  sel.appendChild( document.createTextNode('# (protected)') );
  fields[0].appendChild( sel );
  sel = document.createElement('option');
  sel.setAttribute( 'value', '~' );
  sel.appendChild( document.createTextNode('~ (package)') );
  fields[0].appendChild( sel );

  fields[1] = document.createElement('select');
  sel = document.createElement('option');
  sel.setAttribute( 'value', '' );
  sel.appendChild( document.createTextNode('no') );
  fields[1].appendChild( sel );
  sel = document.createElement('option');
  sel.setAttribute( 'value', '/' );
  sel.appendChild( document.createTextNode('yes') );
  fields[1].appendChild( sel );


  var ok = document.createElement("input");
  div.className = "ud_popup";

  var values = this.decode( this.getValue() );

  for( i = 0; i < fields.length; i++ ) {
    fields[i].setAttribute( 'type', 'text' );
    fields[i].setAttribute( 'value', values[i] || '' );
  }


  if( values[0] ) {
    var childs = fields[0].childNodes;
    for( i in childs ) {
      if( childs[i].value == values[0] ) {
        childs[i].setAttribute( 'selected', 'selected' );
      }
    }
  }
  if( values[1] ) {
    var childs = fields[1].childNodes;
    for( i in childs ) {
      if( childs[i].value == values[1] ) {
        childs[i].setAttribute( 'selected', 'selected' );
      }
    }
  }


  ok.setAttribute( "type" , "submit" );
  ok.setAttribute( "value", "ok" );



  this.changeText = function ( event ) {
    if( that.active ) {

      var values = [];

      var i;
      for( i = 0; i < fields.length; i++) {
        values.push( fields[i].value );
      }

      that.setText(  that.encode( values ) );

      document.body.removeChild( div );
      that.active = false;
      that.notifyChange();
    }
  }




  this.closeDialog = function ( event ) {
    if( that.active ) {
      document.body.removeChild( div );
      that.active = false;
      that.notifyChange();
    }
  }

  form.onsubmit = function() { return false; }

  ok.addEventListener("click", this.changeText, false);


  var labels = [ 'visibility', 'derived', 'role' ];

  var label;
  var divaux;

  for( i = 0; i < fields.length; i++ ) {
    divaux = document.createElement( 'div' );
    label = document.createElement( 'label' );
    label.appendChild( document.createTextNode( labels[i] ) );

    divaux.appendChild( label );
    divaux.appendChild( fields[i] );

    form.appendChild( divaux );
  }

  form.appendChild( ok );

  if( this.deletable ) {
    var no = document.createElement("input");
    no.setAttribute( "type", "submit" );
    no.setAttribute( "value", "delete" );

    this.deleteDialog = function ( event ) {
      if( that.active ) {
        document.body.removeChild( div );
        that.active = false;
        that.notifyDelete();
        that.notifyChange();
      }
    }

    no.addEventListener("click", this.deleteDialog, false);
    form.appendChild( no );
  }

  div.appendChild( form );
  document.body.appendChild( div );


  div.style.top = (window.innerHeight - form.offsetHeight ) / 2 + "px";
  div.style.left = (window.innerWidth - form.offsetWidth) / 2 + "px";

}










/**
 * Constructor de la clase Space
 * Componente que ocupa un vacio vertical en blanco dentro de un nodo
 *
 * @author Martín Vega-leal Ordóñez
 * @update 29/11/2010
 *
 * @class Space
 * @extends Component
 * @param {Number} height Altura que ocupa el componente
 */
var Space = function( params ) {
  params = params || {};
  Space.baseConstructor.call( this, params );

  if( params.height ) {
    this.setHeight( params.height || 0 );
  }
}

JSFun.extend( Space, Component );





/**
 * SpecificationItem Class Constructor.
 * Create a component that represent the specifications of the state UML 2
 *
 * @author Rafael Molina Linares
 * @update 19/8/2011
 *
 * @class SpecificationItem
 * @extends TextBox
 *
 */
var SpecificationItem = function( params ) {

  params = params || {};
  SpecificationItem.baseConstructor.call( this, params );

  var expression = '^(entry/)?' //behavior type
	  + '([a-zA-Z]*)?'            //name
	  + '(;do/)?'              		//behavior type
	  + '([a-zA-Z]*)?'            //name
	  + '(;exit/)?'		        		//behavior type
	  + '([a-zA-Z]*)?$';          //name

  this._parse = new RegExp( expression );

  this._behaviors = new Array();

  this._visible = params.visible || false;

  this.setMinWidth( 100 );

	this.setDeletable();
}
JSFun.extend( SpecificationItem, TextBox );



/**
 * Encodes the component's text from its separate items
 * and returns the resulting text of the component
 *
 * @author Rafael Molina Linares
 * @update 19/8/2011
 *
 * @method encode
 * @protected
 * @param {Array} values Elements that compounds the component
 * @return {String} Operation resulting
 */
SpecificationItem.prototype.encode = function( values ) {

	var string = '';

	if( values[0] ) {
		this._behaviors[0] = values[0];
		string += 'entry/';
	}
	if( values[1] ) {
		string += values[1];
	}

	if( values[2] ) {
		this._behaviors[1] = values[2];
		string += ';do/';
	}

	if( values[3] ) {
		string += values[3];
	}

	if( values[4] ) {
		this._behaviors[2] = values[4];
		string += ';exit/';
	}

	if( values[5] ) {
		string += values[5];
	}

	if( this._parse.exec( string ) ) {
		return string;
	} else {
		return 'wrong_attribute';
	}
}



/**
 * Split a char string that contains the different parts of the component
 * according to the regular expression that controls and returns the
 * array's parts
 *
 * @author Rafael Molina Linares
 * @update 19/8/2011
 *
 * @method decode
 * @param {String} specification Full text of the component in a chain
 * @param {Array}  differents elements that compounds the full text of the component
 */
SpecificationItem.prototype.decode = function( specification ) {

	var result = this._parse.exec( specification );

	if( result ) {
		result.shift();

		return result;
	} else {
		return [];
	}
}



/**
 * Generates a xml node with information of component
 *
 * @author Rafael Molina Linares / Alejandro Arrabal Hidalgo
 * @update 19/8/2011 / 30/08/2012
 *
 * @method getComponentXML
 * @param {DOMNode} parent Parent node of xml tree that is generated
 * @return {DOMNode Node with the information of component
 */
SpecificationItem.prototype.getComponentXML = function( parent ) {
  var xmlcomp = parent.createElement( 'item' );

  if( this._id ) {
    xmlcomp.setAttribute( 'id', this._id );
  }
  if(this.getFontColor()!='#000000')xmlcomp.setAttribute( 'fontColor', this.getFontColor() );
  if(this.getFontSize()!='12') xmlcomp.setAttribute( 'fontSize', this.getFontSize() );
  if(this.getFontStyle()!='normal')xmlcomp.setAttribute( 'fontStyle', this.getFontStyle() );
  if(this.getFontFamily()!='monospace')xmlcomp.setAttribute( 'fontFamily', this.getFontFamily() );
  if(this.getFontWeight()!='normal')xmlcomp.setAttribute( 'fontWeight', this.getFontWeight() );
  xmlcomp.setAttribute( 'value', this.getValue() );
  xmlcomp.setAttribute( 'behaviors', this._behaviors );
  xmlcomp.setAttribute( 'visible', this._visible );
  return xmlcomp;
}



/**
 * Modify the component's value
 *
 * @author Rafael Molina Linares
 * @update 19/8/2011
 *
 * @method setValue
 * @param {String} value Text that will be asigned to object
 */
SpecificationItem.prototype.setValue = function( value, behaviors, visible) {

	if(behaviors){
		this._behaviors[0] = behaviors[0];
		this._behaviors[1] = behaviors[2];
		this._behaviors[2] = behaviors[4];
	}

	this._visible = (visible == "true") ? true : false ;

  this.setText( value );
}



/**
 * Modify the text that contains the component
 *
 * @author Rafael Molina Linares / Alejandro Arrabal Hidalgo
 * @update 19/8/2011 / 02/08/2012
 *
 * @method setText
 * @protected
 * @param {String} newText String that contains the new text
 */
SpecificationItem.prototype.setText = function( newText ) {

  if( JSFun.isString( newText ) ) {

    var i, width = 0;

    var aux = newText.split(';');

    for( i = 0; i < aux.length; i++ ) {

      if( aux[i].length > width )
        width = aux[i].length;
    }

    this._text = aux;

    if( newText == '' ) {
      this.setWidth( 40 );
    } else {
      this.setWidth( width * this._font_width );
    }

    this.setHeight( this._text.length * this._line_height );
  }
}


/**
 * Returns the text that contains the component
 *
 * @author Rafael Molina Linares
 * @update 19/8/2011
 *
 * @method getValue
 * @return {String} Text contained in the component
 */
SpecificationItem.prototype.getValue = function() {
 if(!this._text) return "";
  return this._text.join(';');
}



/**
 * Checks if the given point is over the component
 *
 * @author Rafael Molina Linares
 * @update 19/8/2011
 *
 * @method isOver
 * @param {Number} x Coordinate x of point to check
 * @param {Number} y Coordinate y of point to check
 * @return {Boolean} If the point is over the component
 */
SpecificationItem.prototype.isOver = function( x, y ) {

  if( x >= this._x
      && x <= this._x + this._width
      && y >= this._y
      && y <= this._y + this._height
			&& this._visible )
  {
    return true;
  } else {
    return false;
  }
}


/**
 * Show a dialog for that the elements of attribute can be modified
 * by users
 *
 * @author Rafael Molina Linares
 * @update 19/8/2011
 *
 * @method showDialog
 */
SpecificationItem.prototype.showDialog = function() {

	if( this.active || !this._visible) {
		return;
	}

	var that = this;

	this.active = true;

	var div = document.createElement("div");
	div.className = "ud_popup";

	var form = document.createElement("form");
	var fields = [];


	var i;
	for( i = 0; i < 6; i++ ){
		fields.push( document.createElement("input") );
	}

	var ok = document.createElement("input");
	ok.setAttribute( "type" , "submit" );
	ok.setAttribute( "value", "ok" );

	var sel;

	/*
		Creates the options of the element
		select that store the behavior
	*/
	for(i=0; i< 6; i += 2){

		fields[i] = document.createElement('select');

		sel = document.createElement('option');
		sel.setAttribute( 'value', '0' );
		sel.appendChild( document.createTextNode('<UNSPECIFIED>') );
		fields[i].appendChild( sel );

		sel = document.createElement('option');
		sel.setAttribute( 'value', '1' );
		sel.appendChild( document.createTextNode('Activity') );
		fields[i].appendChild( sel );

		sel = document.createElement('option');
		sel.setAttribute( 'value', '2' );
		sel.appendChild( document.createTextNode('FunctionBehavior') );
		fields[i].appendChild( sel );

		sel = document.createElement('option');
		sel.setAttribute( 'value', '3' );
		sel.appendChild( document.createTextNode('Interaction') );
		fields[i].appendChild( sel );

		sel = document.createElement('option');
		sel.setAttribute( 'value', '4' );
		sel.appendChild( document.createTextNode('OpaqueBehavior') );
		fields[i].appendChild( sel );

		sel = document.createElement('option');
		sel.setAttribute( 'value', '5' );
		sel.appendChild( document.createTextNode('ProtocolStateMachine') );
		fields[i].appendChild( sel );

		sel = document.createElement('option');
		sel.setAttribute( 'value', '6' );
		sel.appendChild( document.createTextNode('StateMachine') );
		fields[i].appendChild( sel );
	}

	var values = that.decode( that.getValue() );

	for( i = 0; i < fields.length; i++ ) {
		fields[i].setAttribute( 'type', 'text' );
		fields[i].setAttribute( 'value', values[i] || '' );
	}

	if( values[0] ) {
		var childs = fields[0].childNodes;
		for( i=0;i< childs.length;i++ ) {
		  if( childs[i].value ==  that._behaviors[0]) {
		    childs[i].setAttribute( 'selected', 'selected' );
		  }
		}
	}

	if( values[2] ) {
		var childs = fields[2].childNodes;
		for( i=0;i< childs.length;i++ ) {
		  if( childs[i].value ==  that._behaviors[1]) {
		    childs[i].setAttribute( 'selected', 'selected' );
		  }
		}
	}

	if( values[4] ) {
			  var childs = fields[4].childNodes;
				for( i=0;i< childs.length;i++ ) {
			    if( childs[i].value ==  that._behaviors[2]) {
			      childs[i].setAttribute( 'selected', 'selected' );
			    }
			  }
			}

	that.changeText = function ( event ) {
		if( that.active ) {

		  var values = [];
		  for( i = 0; i < fields.length; i++) {
		    values.push( fields[i].value );
		  }

		  that.setText(  that.encode( values ) );

		  document.body.removeChild( div );
		  that.active = false;
		  that.notifyChange();
		  that._parent.updateComponents();
		  that._parent.notifyDraw();

		}
	}

	that.closeDialog = function ( event ) {
		if( that.active ) {
		  document.body.removeChild( div );
		  that.active = false;
		  that.notifyChange();

		  that.notifyDraw();

		}
	}

	form.onsubmit = function() { return false; }

	ok.addEventListener("click", that.changeText, false);

	var labels = [ 'Behavior', 'name', 'Behavior', 'name', 'Behavior', 'name', 'restrictions' ];

	var label;
	var divaux;
	var titles = ['Entry', 'Do Activity', 'Exit'];
	var j= -1;

	for( i = 0; i < fields.length; i++ ) {
		if(i%2 == 0){
			divaux = document.createElement( 'div' );
			divaux.appendChild( document.createTextNode(titles[++j]));
			divaux.style.background = "#ccccff";
			divaux.style.textAlign = "center";
			divaux.style.fontWeight= "bold";
			divaux.style.marginLeft = "-10px";
			divaux.style.marginRight = "-10px";
			divaux.style.font = "14px";
			divaux.style.paddingTop = "3px";
			divaux.style.paddingBottom = "3px";
			form.appendChild( divaux);
		}
		divaux = document.createElement( 'div' );
		label = document.createElement( 'label' );
		label.appendChild( document.createTextNode( labels[i] ) );

		divaux.appendChild( label );
		divaux.style.clear = "both";
		divaux.appendChild( fields[i] );

		form.appendChild( divaux );
	}

	form.appendChild( ok );

	if( that.deletable ) {

		var no = document.createElement("input");
		no.setAttribute( "type", "submit" );
		no.setAttribute( "value", "delete" );

		that.deleteDialog = function ( event ) {

			if( that.active ) {

				document.body.removeChild( div );
				that.active = false;

				that._visible = false;

				that.setText( "" );

				that.notifyChange();
				that.notifyDraw();
			}
		}

		no.addEventListener("click", that.deleteDialog, false);

		form.appendChild( no );

		form.appendChild( no );
	}

	div.appendChild( form );
	document.body.appendChild( div );

  ok.focus();

	div.style.top = (window.innerHeight - form.offsetHeight ) / 2 + "px";
	div.style.left = (window.innerWidth - form.offsetWidth) / 2 + "px";
}



/**
 * Draw the shape and the elements of component that can interact with the user.
 *
 * @author Rafael Molina Linares
 * @update 19/8/2011
 *
 * @method drawShape
 * @param {CanvasRenderingContext2D} context Context of the canvas element
 */
SpecificationItem.prototype.drawShape = function( context ) {

 	if(this._visible){

		context.save();
		context.strokeStyle = "#aaaaaa";

		context.strokeRect( this.getPixelX(), this.getPixelY(), this.getWidth(), this.getHeight() );
		context.restore();
 }
}



/**
 * Draw the component text and your background if interaction is produced with it
 *
 * @author Rafael Molina Linares / Alejandro Arrabal Hidalgo
 * @update 19/8/2011 / 02/08/2012
 *
 * @method draw
 * @param {CanvasRenderingContext2D} context Context of the canvas element
 */
SpecificationItem.prototype.draw = function( context ) {

 	if(!this._visible)
		return;

  context.save();

  context.font =this.getFontStyle() + " " + this.getFontWeight() + " "+ this.getFontSize() + "px " + this.getFontFamily();
  context.textBaseline = "middle";
  context.fillStyle = this.getFontColor();

  var x = this._getMX();
  var y = this._getMY() + this._line_height / 2;
  var w = this.getWidth() - 2 * this._getMargin();
  var ax = 0;

  var i;

  for( i = 0; i < this._text.length; i++ ) {
    ax = x + w / 2 - ( this._text[i].length * this._font_width ) / 2;
    context.fillText( this._text[i], ax, y );
    y += this._line_height;
  }

  context.restore();
}




/**
 * Re-size the component depending on his text and font-size
 *
 * @author 	Alejandro Arrabal Hidalgo
 * @update 03/08/2012
 *
 * @method resize
 */
SpecificationItem.prototype.resize = function() {
	this._line_height=parseInt(this.getFontSize(),10)+1;
	this._font_width=this.getFontSize()/1.5;
    var i, width = 0;

    var aux = this.getValue().split(';') || "";

    for( i = 0; i < aux.length; i++ ) {

      if( aux[i].length > width )
        width = aux[i].length;
    }


    if( aux == '' ) {
      this.setWidth( 40 );
    } else {
      this.setWidth( width * this._font_width );
    }

    this.setHeight( aux.length * this._line_height );
}







/**
 * TransitionItem Constructor Class
 * Createa a 'item' that controls a text of the relation of transition
 *
 * @author Rafael Molina linares
 * @update 19/8/2011
 *
 * @class TransitionItem
 * @extends TextBox
 */
var TransitionItem = function( params ) {

  params = params || {};

  TransitionItem.baseConstructor.call( this, params );

  this._parse = /^([a-zA-Z]*)(?:\[([^\[\]]*)\])?(?:\/([a-zA-Z]*))?$/;
}
JSFun.extend( TransitionItem, TextBox );



/**
 * Encodes the text from its separate elements
 * and returns the encoded text with
 * the symbols corresponding
 *
 * @author Rafael Molina linares
 * @update 19/8/2011
 *
 * @method encode
 * @protected
 * @param {Array} values Elements that form the text
 * @return {String} Text resulting
 */
TransitionItem.prototype.encode = function( values ) {

  var string = '';

  if( values[0] ) {
    string += values[0] ;
  }

  if( values[1] ) {
    string += '[' + values[1] + ']';
  }

  if( values[2] ) {
    string += '/' + values[2];
  }

  if( this._parse.exec( string ) ) {
    return string;
  } else {
    return 'wrong_operation';
  }
}



/**
 * Separates a chain in its differents elements
 * according to the regular expresion that
 * controls it and returns the separated parts
 * in an array
 *
 * @author Rafael Molina Linares
 * @update 19/8/2011
 *
 * @method decode
 * @protected
 * @param {String} transition Operation in text's string
 * @param {Array} Elements that form the 'transition' operation
 *
 */
TransitionItem.prototype.decode = function( transition ) {
  var result = this._parse.exec( transition );

  if( result ) {
    result.shift();
    return result;
  } else {
    return [];
  }
}



/**
 * Shows a dialog to modify the elements of
 * the component by user
 *
 * @author Rafael Molina Linares
 * @update 19/8/2011
 *
 * @method showDialog
 */
TransitionItem.prototype.showDialog = function() {

  if( this.active ) {
    return;
  }

  var that = this;

  this.active = true;

  var div = document.createElement("div");
  div.className = "ud_popup";

  var form = document.createElement("form");
  var fields = [];


  var i;
  for( i = 0; i < 3; i++ ){
    fields.push( document.createElement("input") );
  }

  var ok = document.createElement("input");
  ok.setAttribute( "type" , "submit" );
  ok.setAttribute( "value", "ok" );

  var values = this.decode( this.getValue() );

  for( i = 0; i < fields.length; i++ ) {
    fields[i].setAttribute( 'type', 'text' );
    fields[i].setAttribute( 'value', values[i] || '' );
  }

  this.changeText = function ( event ) {
    if( that.active ) {

      var values = [];

      var i;
      for( i = 0; i < fields.length; i++) {
        values.push( fields[i].value );
      }

      that.setText(  that.encode( values ) );

      document.body.removeChild( div );

      that.active = false;
      that.notifyChange();
    }
  }

  this.closeDialog = function ( event ) {
    if( that.active ) {
      document.body.removeChild( div );
      that.active = false;
      that.notifyChange();
    }
  }

  form.onsubmit = function() { return false; }

  ok.addEventListener("click", this.changeText, false);

  var labels = [ 'trigger', 'guard', 'behavior'];

  var label;
  var divaux;

  for( i = 0; i < fields.length; i++ ) {
    divaux = document.createElement( 'div' );
    label = document.createElement( 'label' );
    label.appendChild( document.createTextNode( labels[i] ) );

    divaux.appendChild( label );
    divaux.appendChild( fields[i] );

    form.appendChild( divaux );
  }

  form.appendChild( ok );

  if( this.deletable ) {
    var no = document.createElement("input");
    no.setAttribute( "type", "submit" );
    no.setAttribute( "value", "delete" );

    this.deleteDialog = function ( event ) {
      if( that.active ) {
        document.body.removeChild( div );
        that.active = false;
        that.notifyDelete();
        that.notifyChange();
      }
    }

    no.addEventListener("click", this.deleteDialog, false);
    form.appendChild( no );
  }

  div.appendChild( form );
  document.body.appendChild( div );

  ok.focus();

  div.style.top = (window.innerHeight - form.offsetHeight ) / 2 + "px";
  div.style.left = (window.innerWidth - form.offsetWidth) / 2 + "px";
}



