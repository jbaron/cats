if(!this.document) {
    var game = new Mankala.Game();
    game.test();
}
var Mankala;
(function (Mankala) {
    var Features = (function () {
        function Features() {
            this.turnContinues = false;
            this.seedStoredCount = 0;
            this.capturedCount = 0;
            this.spaceCaptured = Mankala.NoSpace;
        }
        Features.prototype.clear = function () {
            this.turnContinues = false;
            this.seedStoredCount = 0;
            this.capturedCount = 0;
            this.spaceCaptured = Mankala.NoSpace;
        };
        Features.prototype.toString = function () {
            var stringBuilder = "";
            if(this.turnContinues) {
                stringBuilder += " turn continues,";
            }
            stringBuilder += " stores " + this.seedStoredCount;
            if(this.capturedCount > 0) {
                stringBuilder += " captures " + this.capturedCount + " from space " + this.spaceCaptured;
            }
            return stringBuilder;
        };
        return Features;
    })();
    Mankala.Features = Features;    
})(Mankala || (Mankala = {}));
var Mankala;
(function (Mankala) {
    Mankala.NoSpace = -1;
    Mankala.homeSpaces = [
        [
            0, 
            1, 
            2, 
            3, 
            4, 
            5
        ], 
        [
            7, 
            8, 
            9, 
            10, 
            11, 
            12
        ]
    ];
    Mankala.firstHomeSpace = [
        0, 
        7
    ];
    Mankala.lastHomeSpace = [
        5, 
        12
    ];
    Mankala.capturedSpaces = [
        12, 
        11, 
        10, 
        9, 
        8, 
        7, 
        Mankala.NoSpace, 
        5, 
        4, 
        3, 
        2, 
        1, 
        0, 
        Mankala.NoSpace
    ];
    Mankala.NoScore = 31;
    Mankala.NoMove = -1;
    function pushPosition(pos, l) {
        l.insertAfter(Base.listMakeEntry(pos));
    }
    function popPosition(l) {
        var entry = Base.listRemove(l.next);
        if(entry != null) {
            return entry.data;
        } else {
            return null;
        }
    }
    function testBrowser() {
        var game = new Game();
        game.interactive();
        var bod = document.getElementById("bod");
        bod.onresize = function () {
            game.resize();
        };
    }
    Mankala.testBrowser = testBrowser;
    var Game = (function () {
        function Game() {
            this.position = new Mankala.DisplayPosition([
                3, 
                3, 
                3, 
                3, 
                3, 
                3, 
                0, 
                3, 
                3, 
                3, 
                3, 
                3, 
                3, 
                0
            ], Mankala.NoMove, 0);
            this.q = null;
            this.scores = null;
            this.positionCount = 0;
            this.moveCount = 0;
            this.isInteractive = false;
            this.features = new Mankala.Features();
            this.nextSeedCounts = new Array(14);
            this.boardElm = null;
        }
        Game.prototype.resize = function () {
            if(this.boardElm != null) {
                this.bod.removeChild(this.boardElm);
            }
            this.showMove();
        };
        Game.prototype.step = function () {
            var move = this.findMove();
            if(move != Mankala.NoMove) {
                this.position.move(move, this.nextSeedCounts, this.features);
                this.position = new Mankala.DisplayPosition(this.nextSeedCounts.slice(0), Mankala.NoMove, this.features.turnContinues ? this.position.turn : 1 - this.position.turn);
                this.position.config = this.prevConfig;
                if((!this.isInteractive) || (this.position.turn == 1)) {
                    this.setStep();
                }
                return true;
            }
            return false;
        };
        Game.prototype.setStep = function () {
            var _this = this;
            setTimeout(function () {
                if(!_this.step()) {
                    _this.finish();
                }
                _this.bod.removeChild(_this.boardElm);
                _this.showMove();
            }, 1000);
        };
        Game.prototype.finish = function () {
            var sum = 0;
            var otherSpaces = Mankala.homeSpaces[1 - this.position.turn];
            for(var k = 0, len = otherSpaces.length; k < len; k++) {
                sum += this.position.seedCounts[otherSpaces[k]];
                this.position.seedCounts[otherSpaces[k]] = 0;
            }
            this.position.seedCounts[Mankala.storeHouses[this.position.turn]] += sum;
        };
        Game.prototype.auto = function () {
            this.bod = document.getElementById("bod");
            this.showMove();
            this.setStep();
        };
        Game.prototype.showMove = function () {
            var hsc = document.getElementById("humscore");
            var csc = document.getElementById("compscore");
            var g = this;
            if(!this.isInteractive) {
                g = null;
            }
            this.boardElm = this.position.toCircleSVG(g);
            this.prevConfig = this.position.config;
            hsc.innerText = this.position.seedCounts[Mankala.storeHouses[0]] + ((this.position.turn == 0) ? "  <-Turn" : "");
            csc.innerText = this.position.seedCounts[Mankala.storeHouses[1]] + ((this.position.turn == 1) ? "  <-Turn" : "");
            this.bod.appendChild(this.boardElm);
        };
        Game.prototype.humanMove = function (seed) {
            if(this.position.turn == 0) {
                this.position.move(seed, this.nextSeedCounts, this.features);
                this.position = new Mankala.DisplayPosition(this.nextSeedCounts.slice(0), Mankala.NoMove, this.features.turnContinues ? this.position.turn : 1 - this.position.turn);
                this.position.config = this.prevConfig;
                this.bod.removeChild(this.boardElm);
                this.showMove();
                if(this.position.turn == 1) {
                    this.setStep();
                }
            }
        };
        Game.prototype.interactive = function () {
            this.isInteractive = true;
            this.bod = document.getElementById("bod");
            this.showMove();
        };
        Game.prototype.expand = function (curPos, move, startMove, nextSeedCounts) {
            var features = new Mankala.Features();
            if(curPos.move(move, nextSeedCounts, features)) {
                var pos = new Mankala.Position(nextSeedCounts.slice(0), startMove, curPos.turn);
                this.positionCount++;
                if(!features.turnContinues) {
                    pos.turn = 1 - pos.turn;
                }
                var score = pos.score();
                if(this.scores[startMove] == Mankala.NoScore) {
                    this.scores[startMove] = score;
                } else {
                    this.scores[startMove] += score;
                }
                pushPosition(pos, this.q);
                return true;
            }
            return false;
        };
        Game.prototype.findMove = function () {
            var timeStart = new Date().getTime();
            this.q = Base.listMakeHead();
            this.scores = [
                Mankala.NoScore, 
                Mankala.NoScore, 
                Mankala.NoScore, 
                Mankala.NoScore, 
                Mankala.NoScore, 
                Mankala.NoScore
            ];
            pushPosition(this.position, this.q);
            var deltaTime = 0;
            var moves = Mankala.homeSpaces[this.position.turn];
            var nextSeedCounts = new Array(14);
            var movePossible = false;
            while((!this.q.empty()) && (deltaTime < 500)) {
                var firstPos = popPosition(this.q);
                for(var i = 0, len = moves.length; i < len; i++) {
                    var startMove = firstPos.startMove;
                    if(startMove == Mankala.NoMove) {
                        startMove = i;
                    }
                    if(this.expand(firstPos, moves[i], startMove, nextSeedCounts)) {
                        movePossible = true;
                    }
                }
                deltaTime = new Date().getTime() - timeStart;
            }
            if(movePossible) {
                var bestScore = -100;
                var bestMove = Mankala.NoMove;
                for(var j = 0, scoresLen = this.scores.length; j < scoresLen; j++) {
                    if((this.scores[j] != Mankala.NoScore) && ((this.scores[j] > bestScore) || (bestMove == Mankala.NoMove))) {
                        bestScore = this.scores[j];
                        bestMove = j;
                    }
                }
                if(bestMove != Mankala.NoMove) {
                    return moves[bestMove];
                } else {
                    return Mankala.NoMove;
                }
            }
            return Mankala.NoMove;
        };
        Game.prototype.test = function () {
            var features = new Mankala.Features();
            var nextSeedCounts = new Array(14);
            WScript.Echo("position: ");
            WScript.Echo(this.position.seedCounts.slice(0, 7));
            WScript.Echo(this.position.seedCounts.slice(7));
            do {
                var move = this.findMove();
                if(move == Mankala.NoMove) {
                } else {
                    this.moveCount++;
                    WScript.Echo(this.position.turn + " moves seeds in space " + move);
                    this.position.move(move, nextSeedCounts, features);
                    WScript.Echo(features.toString());
                    this.position = new Mankala.DisplayPosition(nextSeedCounts.slice(0), Mankala.NoMove, features.turnContinues ? this.position.turn : 1 - this.position.turn);
                    WScript.Echo("position: ");
                    WScript.Echo(this.position.seedCounts.slice(0, 7));
                    WScript.Echo(this.position.seedCounts.slice(7));
                }
            }while(move != Mankala.NoMove)
            var sum = 0;
            var otherSpaces = Mankala.homeSpaces[1 - this.position.turn];
            for(var k = 0, len = otherSpaces.length; k < len; k++) {
                sum += this.position.seedCounts[otherSpaces[k]];
                this.position.seedCounts[otherSpaces[k]] = 0;
            }
            this.position.seedCounts[Mankala.storeHouses[this.position.turn]] += sum;
            WScript.Echo("final position: ");
            WScript.Echo(this.position.seedCounts.slice(0, 7));
            WScript.Echo(this.position.seedCounts.slice(7));
            var player1Count = this.position.seedCounts[Mankala.storeHouses[0]];
            var player2Count = this.position.seedCounts[Mankala.storeHouses[1]];
            WScript.Echo("storehouse 1 has " + player1Count);
            WScript.Echo("storehouse 2 has " + player2Count);
            WScript.Echo("average positions explored per move " + (this.positionCount / this.moveCount).toFixed(2));
        };
        return Game;
    })();
    Mankala.Game = Game;    
})(Mankala || (Mankala = {}));
var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Mankala;
(function (Mankala) {
    Mankala.storeHouses = [
        6, 
        13
    ];
    var svgNS = "http://www.w3.org/2000/svg";
    function createSVGRect(r) {
        var rect = document.createElementNS(svgNS, "rect");
        rect.setAttribute("x", r.x.toString());
        rect.setAttribute("y", r.y.toString());
        rect.setAttribute("width", r.width.toString());
        rect.setAttribute("height", r.height.toString());
        return rect;
    }
    function createSVGEllipse(r) {
        var ell = document.createElementNS(svgNS, "ellipse");
        ell.setAttribute("rx", (r.width / 2).toString());
        ell.setAttribute("ry", (r.height / 2).toString());
        ell.setAttribute("cx", (r.x + r.width / 2).toString());
        ell.setAttribute("cy", (r.y + r.height / 2).toString());
        return ell;
    }
    function createSVGEllipsePolar(angle, radius, tx, ty, cxo, cyo) {
        var ell = document.createElementNS(svgNS, "ellipse");
        ell.setAttribute("rx", radius.toString());
        ell.setAttribute("ry", (radius / 3).toString());
        ell.setAttribute("cx", cxo.toString());
        ell.setAttribute("cy", cyo.toString());
        var dangle = angle * (180 / Math.PI);
        ell.setAttribute("transform", "rotate(" + dangle + "," + cxo + "," + cyo + ") translate(" + tx + "," + ty + ")");
        return ell;
    }
    function createSVGInscribedCircle(sq) {
        var circle = document.createElementNS(svgNS, "circle");
        circle.setAttribute("r", (sq.len / 2).toString());
        circle.setAttribute("cx", (sq.x + (sq.len / 2)).toString());
        circle.setAttribute("cy", (sq.y + (sq.len / 2)).toString());
        return circle;
    }
    var Position = (function () {
        function Position(seedCounts, startMove, turn) {
            this.seedCounts = seedCounts;
            this.startMove = startMove;
            this.turn = turn;
        }
        Position.prototype.score = function () {
            var baseScore = this.seedCounts[Mankala.storeHouses[1 - this.turn]] - this.seedCounts[Mankala.storeHouses[this.turn]];
            var otherSpaces = Mankala.homeSpaces[this.turn];
            var sum = 0;
            for(var k = 0, len = otherSpaces.length; k < len; k++) {
                sum += this.seedCounts[otherSpaces[k]];
            }
            if(sum == 0) {
                var mySpaces = Mankala.homeSpaces[1 - this.turn];
                var mySum = 0;
                for(var j = 0, len = mySpaces.length; j < len; j++) {
                    mySum += this.seedCounts[mySpaces[j]];
                }
                baseScore -= mySum;
            }
            return baseScore;
        };
        Position.prototype.move = function (space, nextSeedCounts, features) {
            if((space == Mankala.storeHouses[0]) || (space == Mankala.storeHouses[1])) {
                return false;
            }
            if(this.seedCounts[space] > 0) {
                features.clear();
                var len = this.seedCounts.length;
                for(var i = 0; i < len; i++) {
                    nextSeedCounts[i] = this.seedCounts[i];
                }
                var seedCount = this.seedCounts[space];
                nextSeedCounts[space] = 0;
                var nextSpace = (space + 1) % 14;
                while(seedCount > 0) {
                    if(nextSpace == Mankala.storeHouses[this.turn]) {
                        features.seedStoredCount++;
                    }
                    if((nextSpace != Mankala.storeHouses[1 - this.turn])) {
                        nextSeedCounts[nextSpace]++;
                        seedCount--;
                    }
                    if(seedCount == 0) {
                        if(nextSpace == Mankala.storeHouses[this.turn]) {
                            features.turnContinues = true;
                        } else {
                            if((nextSeedCounts[nextSpace] == 1) && (nextSpace >= Mankala.firstHomeSpace[this.turn]) && (nextSpace <= Mankala.lastHomeSpace[this.turn])) {
                                var capturedSpace = Mankala.capturedSpaces[nextSpace];
                                if(capturedSpace >= 0) {
                                    features.spaceCaptured = capturedSpace;
                                    features.capturedCount = nextSeedCounts[capturedSpace];
                                    nextSeedCounts[capturedSpace] = 0;
                                    nextSeedCounts[Mankala.storeHouses[this.turn]] += features.capturedCount;
                                    features.seedStoredCount += nextSeedCounts[capturedSpace];
                                }
                            }
                        }
                    }
                    nextSpace = (nextSpace + 1) % 14;
                }
                return true;
            } else {
                return false;
            }
        };
        return Position;
    })();
    Mankala.Position = Position;    
    var SeedCoords = (function () {
        function SeedCoords(tx, ty, angle) {
            this.tx = tx;
            this.ty = ty;
            this.angle = angle;
        }
        return SeedCoords;
    })();
    Mankala.SeedCoords = SeedCoords;    
    var DisplayPosition = (function (_super) {
        __extends(DisplayPosition, _super);
        function DisplayPosition(seedCounts, startMove, turn) {
                _super.call(this, seedCounts, startMove, turn);
            this.config = [];
            for(var i = 0; i < seedCounts.length; i++) {
                this.config[i] = [];
            }
        }
        DisplayPosition.prototype.seedCircleRect = function (rect, seedCount, board, seed, circleClick) {
            var coords = this.config[seed];
            var sq = rect.inner(0.95).square();
            var cxo = (sq.width / 2) + sq.x;
            var cyo = (sq.height / 2) + sq.y;
            var seedNumbers = [
                5, 
                7, 
                9, 
                11
            ];
            var ringIndex = 0;
            var ringRem = seedNumbers[ringIndex];
            var angleDelta = (2 * Math.PI) / ringRem;
            var angle = angleDelta;
            var seedLength = sq.width / (seedNumbers.length << 1);
            var crMax = sq.width / 2 - (seedLength / 2);
            var pit = createSVGInscribedCircle(sq);
            if(seed < 7) {
                pit.setAttribute("fill", "brown");
                if(circleClick != null) {
                    pit.addEventListener('click', circleClick);
                }
            } else {
                pit.setAttribute("fill", "saddlebrown");
            }
            board.appendChild(pit);
            var seedsSeen = 0;
            while(seedCount > 0) {
                if(ringRem == 0) {
                    ringIndex++;
                    ringRem = seedNumbers[ringIndex];
                    angleDelta = (2 * Math.PI) / ringRem;
                    angle = angleDelta;
                }
                var tx;
                var ty;
                var tangle = angle;
                if(coords.length > seedsSeen) {
                    tx = coords[seedsSeen].tx;
                    ty = coords[seedsSeen].ty;
                    tangle = coords[seedsSeen].angle;
                } else {
                    tx = (Math.random() * crMax) - (crMax / 3);
                    ty = (Math.random() * crMax) - (crMax / 3);
                    coords[seedsSeen] = new SeedCoords(tx, ty, angle);
                }
                var ell = createSVGEllipsePolar(tangle, seedLength, tx, ty, cxo, cyo);
                board.appendChild(ell);
                angle += angleDelta;
                ringRem--;
                seedCount--;
                seedsSeen++;
            }
        };
        DisplayPosition.prototype.toCircleSVG = function (game) {
            var seedDivisions = 14;
            var bod = document.getElementById("bod");
            var board = document.createElementNS(svgNS, "svg");
            var w = window.innerWidth - 40;
            var h = window.innerHeight - 40;
            var boardRect = new Mankala.Rectangle(0, 0, w, h);
            board.setAttribute("width", w.toString());
            board.setAttribute("height", h.toString());
            var whole = createSVGRect(boardRect);
            whole.setAttribute("fill", "tan");
            board.appendChild(whole);
            var playSurface = boardRect;
            var storeMainStore = playSurface.proportionalSplitHoriz(8, 48, 8);
            var mainPair = storeMainStore[1].subDivideVert(2);
            var playerRects = [
                mainPair[0].subDivideHoriz(6), 
                mainPair[1].subDivideHoriz(6)
            ];
            for(var k = 0; k < 3; k++) {
                var temp = playerRects[0][k];
                playerRects[0][k] = playerRects[0][5 - k];
                playerRects[0][5 - k] = temp;
            }
            var storehouses = [
                storeMainStore[0], 
                storeMainStore[2]
            ];
            var playerSeeds = this.seedCounts.length >> 1;
            for(var i = 0; i < 2; i++) {
                var player = playerRects[i];
                var storehouse = storehouses[i];
                var r;
                for(var j = 0; j < playerSeeds; j++) {
                    var seed = (i * playerSeeds) + j;
                    var seedCount = this.seedCounts[seed];
                    if(j == (playerSeeds - 1)) {
                        r = storehouse;
                    } else {
                        r = player[j];
                    }
                    if(game != null) {
                        this.seedCircleRect(r, seedCount, board, seed, (function (seed) {
                            return function (evt) {
                                game.humanMove(seed);
                            }
                        })(seed));
                    } else {
                        this.seedCircleRect(r, seedCount, board, seed, null);
                    }
                    if(seedCount == 0) {
                        this.config[seed] = [];
                    }
                }
            }
            return board;
        };
        return DisplayPosition;
    })(Position);
    Mankala.DisplayPosition = DisplayPosition;    
})(Mankala || (Mankala = {}));
var Base;
(function (Base) {
    var List = (function () {
        function List(isHead, data) {
            this.isHead = isHead;
            this.data = data;
        }
        List.prototype.item = function () {
            return this.data;
        };
        List.prototype.empty = function () {
            return this.next == this;
        };
        List.prototype.insertAfter = function (entry) {
            entry.next = this.next;
            entry.prev = this;
            this.next = entry;
            entry.next.prev = entry;
            return (entry);
        };
        List.prototype.insertBefore = function (entry) {
            this.prev.next = entry;
            entry.next = this;
            entry.prev = this.prev;
            this.prev = entry;
            return entry;
        };
        return List;
    })();
    Base.List = List;    
    function listMakeEntry(data) {
        var entry = new List(false, data);
        entry.prev = entry;
        entry.next = entry;
        return entry;
    }
    Base.listMakeEntry = listMakeEntry;
    function listMakeHead() {
        var entry = new List(true, null);
        entry.prev = entry;
        entry.next = entry;
        return entry;
    }
    Base.listMakeHead = listMakeHead;
    function listRemove(entry) {
        if(entry == null) {
            return null;
        } else {
            if(entry.isHead) {
                return null;
            } else {
                entry.next.prev = entry.prev;
                entry.prev.next = entry.next;
            }
        }
        return (entry);
    }
    Base.listRemove = listRemove;
})(Base || (Base = {}));
var Mankala;
(function (Mankala) {
    var Rectangle = (function () {
        function Rectangle(x, y, width, height) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        }
        Rectangle.prototype.square = function () {
            var len = this.width;
            var adj = 0;
            if(len > this.height) {
                len = this.height;
                adj = (this.width - len) / 2;
                return new Square(this.x + adj, this.y, len);
            } else {
                adj = (this.height - len) / 2;
                return new Square(this.x, this.y + adj, len);
            }
        };
        Rectangle.prototype.inner = function (factor) {
            var iw = factor * this.width;
            var ih = factor * this.height;
            var ix = this.x + ((this.width - iw) / 2);
            var iy = this.y + ((this.height - ih) / 2);
            return (new Rectangle(ix, iy, iw, ih));
        };
        Rectangle.prototype.proportionalSplitHoriz = function () {
            var proportionalWidths = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                proportionalWidths[_i] = arguments[_i + 0];
            }
            var totalPropWidth = 0;
            var i;
            for(i = 0; i < proportionalWidths.length; i++) {
                totalPropWidth += proportionalWidths[i];
            }
            var totalWidth = 0;
            var widths = [];
            for(i = 0; i < proportionalWidths.length; i++) {
                widths[i] = (proportionalWidths[i] / totalPropWidth) * this.width;
                totalWidth += widths[i];
            }
            var extraWidth = this.width - totalWidth;
            i = 0;
            while(extraWidth > 0) {
                widths[i]++;
                extraWidth--;
                if((++i) == widths.length) {
                    i = 0;
                }
            }
            var rects = [];
            var curX = this.x;
            for(i = 0; i < widths.length; i++) {
                rects[i] = new Rectangle(curX, this.y, widths[i], this.height);
                curX += widths[i];
            }
            return rects;
        };
        Rectangle.prototype.proportionalSplitVert = function () {
            var proportionalHeights = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                proportionalHeights[_i] = arguments[_i + 0];
            }
            var totalPropHeight = 0;
            var i;
            for(i = 0; i < proportionalHeights.length; i++) {
                totalPropHeight += proportionalHeights[i];
            }
            var totalHeight = 0;
            var heights = [];
            for(i = 0; i < proportionalHeights.length; i++) {
                heights[i] = (proportionalHeights[i] / totalPropHeight) * this.height;
                totalHeight += heights[i];
            }
            var extraHeight = this.height - totalHeight;
            i = 0;
            while(extraHeight > 0) {
                heights[i]++;
                extraHeight--;
                if((++i) == heights.length) {
                    i = 0;
                }
            }
            var rects = [];
            var curY = this.y;
            for(i = 0; i < heights.length; i++) {
                rects[i] = new Rectangle(this.x, curY, this.width, heights[i]);
                curY += heights[i];
            }
            return rects;
        };
        Rectangle.prototype.subDivideHoriz = function (n) {
            var rects = [];
            var tileWidth = this.width / n;
            var rem = this.width % n;
            var tileX = this.x;
            for(var i = 0; i < n; i++) {
                rects[i] = new Rectangle(tileX, this.y, tileWidth, this.height);
                if(rem > 0) {
                    rects[i].width++;
                    rem--;
                }
                tileX += rects[i].width;
            }
            return rects;
        };
        Rectangle.prototype.subDivideVert = function (n) {
            var rects = [];
            var tileHeight = this.height / n;
            var rem = this.height % n;
            var tileY = this.y;
            for(var i = 0; i < n; i++) {
                rects[i] = new Rectangle(this.x, tileY, this.width, tileHeight);
                if(rem > 0) {
                    rects[i].height++;
                    rem--;
                }
                tileY += rects[i].height;
            }
            return rects;
        };
        return Rectangle;
    })();
    Mankala.Rectangle = Rectangle;    
    var Square = (function (_super) {
        __extends(Square, _super);
        function Square(x, y, len) {
                _super.call(this, x, y, len, len);
            this.len = len;
        }
        return Square;
    })(Rectangle);
    Mankala.Square = Square;    
})(Mankala || (Mankala = {}));
