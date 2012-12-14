var Parallax;
(function (Parallax) {
    var ParallaxContainer = (function () {
        function ParallaxContainer(scrollableContent, perspective) {
            var _this = this;
            this.perspective = perspective;
            this.surface = [];
            this.content = scrollableContent;
            $(scrollableContent).scroll(function (event) {
                _this.onContainerScroll(event);
            });
        }
        ParallaxContainer.prototype.onContainerScroll = function (e) {
            var currentScrollPos = $(this.content).scrollTop();
            var currentParallax = 1;
            for(var i = 0; i < this.surface.length; i++) {
                var surface = this.surface[i];
                var offset = -(currentScrollPos * currentParallax);
                surface.currentY = offset;
                currentParallax *= this.perspective;
            }
        };
        ParallaxContainer.prototype.addSurface = function (surface) {
            this.surface.push(surface);
        };
        return ParallaxContainer;
    })();
    Parallax.ParallaxContainer = ParallaxContainer;    
    var ParallaxSurface = (function () {
        function ParallaxSurface(surfaceContents) {
            this.content = surfaceContents;
        }
        Object.defineProperty(ParallaxSurface.prototype, "currentY", {
            get: function () {
                return -$(this.content).css('margin-top');
            },
            set: function (value) {
                $(this.content).css({
                    marginTop: value
                });
            },
            enumerable: true,
            configurable: true
        });
        return ParallaxSurface;
    })();
    Parallax.ParallaxSurface = ParallaxSurface;    
})(Parallax || (Parallax = {}));
