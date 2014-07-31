

qx.Theme.define("Cats.theme.Appearance",
{
  extend : qx.theme.simple.Appearance,

  appearances :
  {
     "tabview-page/button" :
    {
      style : function(states)
      {
        var decorator;

        // default padding
        if (states.barTop || states.barBottom) {
          var padding = [6, 6, 6, 6];
        } else {
          var padding = [8, 4, 8, 4];
        }

        // decorator
        if (states.checked) {
          if (states.barTop) {
            decorator = "tabview-page-button-top";
          } else if (states.barBottom) {
            decorator = "tabview-page-button-bottom"
          } else if (states.barRight) {
            decorator = "tabview-page-button-right";
          } else if (states.barLeft) {
            decorator = "tabview-page-button-left";
          }
        } else {
          for (var i=0; i < padding.length; i++) {
            padding[i] += 1;
          }
          // reduce the size by 1 because we have different decorator border width
          if (states.barTop) {
            padding[2] -= 1;
          } else if (states.barBottom) {
            padding[0] -= 1;
          } else if (states.barRight) {
                       padding[3] -= 1;
          } else if (states.barLeft) {
            padding[1] -= 1;
          }
        }

        return {
          zIndex : states.checked ? 10 : 5,
          decorator : decorator,
          textColor : states.disabled ? "text-disabled" : states.checked ? null : "link",
          padding : padding,
          cursor: "pointer"
        };
      }
    }

      
  }
});
