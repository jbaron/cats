var Cell = (function () {
    function Cell(row, column) {
        this.row = row;
        this.column = column;
        this.element = $("<div class='cell notBombed'></div>")[0];
    }
    Cell.parseCellLocation = function parseCellLocation(pos) {
        var indices = pos.split(",");
        return {
            'row': parseInt(indices[0]),
            'column': parseInt(indices[1])
        };
    }
    Cell.prototype.cellLocation = function () {
        return "" + this.row + "," + this.column;
    };
    return Cell;
})();
var Ship = (function () {
    function Ship(size) {
        this.size = size;
        this.column = 0;
        this.row = 0;
        this.isVertical = true;
        this.hits = 0;
        this.element = $("<div class='ship'></div>")[0];
    }
    Ship.prototype.updatePosition = function (row, column, vertical) {
        this.row = row;
        this.column = column;
        this.isVertical = vertical;
        this.updateLayout();
    };
    Ship.prototype.updateLayout = function () {
        var width = "9.9%";
        var height = "" + (this.size * 9.9) + "%";
        this.element.style.left = "" + (this.column * 10) + "%";
        this.element.style.top = "" + (this.row * 10) + "%";
        this.element.style.width = this.isVertical ? width : height;
        this.element.style.height = this.isVertical ? height : width;
    };
    Ship.prototype.flipShip = function () {
        this.isVertical = !this.isVertical;
        if(this.isVertical) {
            if(this.row + this.size > 10) {
                this.row = 10 - this.size;
            }
        } else {
            if(this.column + this.size > 10) {
                this.column = 10 - this.size;
            }
        }
        this.updateLayout();
    };
    Ship.prototype.getCellsCovered = function () {
        var cells = [];
        var row = this.row;
        var col = this.column;
        for(var i = 0; i < this.size; i++) {
            cells.push(row.toString() + "," + col.toString());
            if(this.isVertical) {
                row++;
            } else {
                col++;
            }
        }
        return cells;
    };
    Ship.prototype.isSunk = function () {
        return this.hits === this.size;
    };
    return Ship;
})();
var Board = (function () {
    function Board(element, playerBoard) {
        if (typeof playerBoard === "undefined") { playerBoard = true; }
        this.element = element;
        var _this = this;
        this.playerTurn = false;
        this.shipSizes = [
            5, 
            4, 
            3, 
            3, 
            2
        ];
        this.positioningEnabled = playerBoard;
        this.cells = [];
        this.ships = [];
        var cell = null;
        for(var row = 0; row < 10; row++) {
            this.cells[row] = [];
            for(var column = 0; column < 10; column++) {
                cell = new Cell(row, column);
                this.cells[row][column] = cell;
                element.appendChild(cell.element);
                $(cell.element).data("cellLocation", cell.cellLocation());
                if(playerBoard) {
                    $(cell.element).droppable({
                        disabled: false,
                        drop: function (event, ui) {
                            var shipElement = ui.draggable[0];
                            var shipIndex = $(shipElement).data("shipIndex");
                            var ship = _this.ships[shipIndex];
                            var shipX = Math.round(shipElement.offsetLeft / cell.element.offsetWidth);
                            var shipY = Math.round(shipElement.offsetTop / cell.element.offsetHeight);
                            ship.updatePosition(shipY, shipX, ship.isVertical);
                        }
                    });
                }
            }
        }
        var referenceCell = $(cell.element);
        for(var i = 0; i < this.shipSizes.length; i++) {
            var ship = new Ship(this.shipSizes[i]);
            this.ships[i] = ship;
            ship.updatePosition(i, 0, false);
            if(playerBoard) {
                this.element.appendChild(ship.element);
                ship.updateLayout();
                $(ship.element).data("shipIndex", i).draggable({
                    disabled: false,
                    containment: 'parent',
                    grid: [
                        referenceCell.width() * 0.99 + 2, 
                        referenceCell.height() * 0.99 + 2
                    ],
                    cursor: 'crosshair'
                }).click(function (evt) {
                    if(_this.positioningEnabled) {
                        var shipIndex = $(evt.target).data("shipIndex");
                        _this.ships[shipIndex].flipShip();
                    }
                });
            }
        }
        $(window).resize(function (evt) {
            $(_this.element).children(".ship").draggable("option", "grid", [
                referenceCell.width() * 0.99 + 2, 
                referenceCell.height() * 0.99 + 2
            ]);
        });
        if(!playerBoard) {
            $(element).click(function (evt) {
                return _this.onCellClick(evt);
            });
        }
    }
    Object.defineProperty(Board.prototype, "dragAndDropEnabled", {
        set: function (val) {
            var cells = $(this.element).children(".cell");
            var ships = $(this.element).children(".ship");
            this.positioningEnabled = val;
            ships.draggable("option", "disabled", !val);
            cells.droppable("option", "disabled", !val);
        },
        enumerable: true,
        configurable: true
    });
    Board.getRandomPosition = function getRandomPosition() {
        return {
            "row": Math.floor(Math.random() * 10),
            "column": Math.floor(Math.random() * 10),
            "vertical": (Math.floor(Math.random() * 2) === 1)
        };
    }
    Board.prototype.onCellClick = function (evt) {
        var x = evt.target;
        if($(x).hasClass("cell") === false) {
            return;
        }
        if(!this.playerTurn) {
            this.onEvent.call(this, 'click');
        }
        if(this.playerTurn) {
            this.bombCell(x);
        }
    };
    Board.prototype.bombCell = function (cellElem) {
        var cellPos = Cell.parseCellLocation($(cellElem).data("cellLocation"));
        var cell = this.cells[cellPos.row][cellPos.column];
        if(cell.hasHit) {
            return;
        }
        cell.hasHit = true;
        if(cell.shipIndex >= 0) {
            $(cellElem).removeClass("notBombed");
            $(cellElem).addClass("cellHit");
            var ship = this.ships[cell.shipIndex];
            ship.hits++;
            if(ship.isSunk()) {
                if(this.allShipsSunk()) {
                    this.onEvent.call(this, 'allSunk');
                } else {
                    this.onEvent.call(this, 'shipSunk');
                }
            } else {
                this.onEvent.call(this, 'hit');
            }
        } else {
            $(cellElem).removeClass("notBombed");
            $(cellElem).addClass("cellMiss");
            this.onEvent.call(this, 'playerMissed');
        }
    };
    Board.prototype.randomize = function () {
        var shipCount = this.ships.length;
        do {
            for(var shipIndex = 0; shipIndex < shipCount; shipIndex++) {
                var pos = Board.getRandomPosition();
                this.ships[shipIndex].updatePosition(pos.row, pos.column, pos.vertical);
            }
        }while(!this.boardIsValid())
    };
    Board.prototype.boardIsValid = function () {
        var allCells = [];
        for(var i = 0; i < this.ships.length; i++) {
            allCells = allCells.concat(this.ships[i].getCellsCovered());
        }
        allCells.sort();
        var dups = allCells.some(function (val, idx, arr) {
            return val === arr[idx + 1];
        });
        var outOfRange = allCells.some(function (val) {
            var pos = Cell.parseCellLocation(val);
            return !(pos.column >= 0 && pos.column <= 9 && pos.row >= 0 && pos.row <= 9);
        });
        if(dups || outOfRange) {
            return false;
        } else {
            this.updateCellData();
            return true;
        }
    };
    Board.prototype.chooseMove = function () {
        do {
            var pos = Board.getRandomPosition();
            var cell = this.cells[pos.row][pos.column];
        }while(cell.hasHit)
        this.bombCell(cell.element);
    };
    Board.prototype.updateCellData = function () {
        for(var i = 0; i < 100; i++) {
            var x = this.cells[Math.floor(i / 10)][i % 10];
            x.hasHit = false;
            x.shipIndex = -1;
        }
        for(var index = 0; index < this.ships.length; index++) {
            var ship = this.ships[index];
            ship.hits = 0;
            var cells = ship.getCellsCovered();
            for(var cell = 0; cell < cells.length; cell++) {
                var cellPos = Cell.parseCellLocation(cells[cell]);
                var targetCell = this.cells[cellPos.row][cellPos.column];
                targetCell.shipIndex = index;
            }
        }
        $(this.element).children(".cell").removeClass("cellHit cellMiss").addClass("notBombed");
    };
    Board.prototype.allShipsSunk = function () {
        return this.ships.every(function (val) {
            return val.isSunk();
        });
    };
    return Board;
})();
var Game = (function () {
    function Game() {
        var _this = this;
        this.state = Game.gameState.begin;
        this.updateStatus(Game.msgs.gameStart);
        this.playerBoard = new Board($("#playerBoard")[0]);
        this.computerBoard = new Board($("#computerBoard")[0], false);
        this.computerBoard.randomize();
        this.playerBoard.randomize();
        this.playerBoard.dragAndDropEnabled = true;
        this.computerBoard.onEvent = function (evt) {
            switch(evt) {
                case 'click': {
                    switch(_this.state) {
                        case Game.gameState.begin: {
                            _this.startGame();
                            break;

                        }
                        case Game.gameState.computerTurn: {
                            _this.updateStatus(Game.msgs.wait);
                            break;

                        }
                        case Game.gameState.finished: {
                            _this.computerBoard.randomize();
                            _this.playerBoard.randomize();
                            _this.playerBoard.dragAndDropEnabled = true;
                            _this.updateStatus(Game.msgs.gameStart);
                            _this.state = Game.gameState.begin;
                            break;

                        }
                    }
                    break;

                }
                case 'playerMissed': {
                    _this.computersTurn();
                    break;

                }
                case 'hit': {
                    _this.updateStatus(Game.msgs.hit);
                    _this.computersTurn();
                    break;

                }
                case 'shipSunk': {
                    _this.updateStatus(Game.msgs.shipSunk);
                    _this.computersTurn();
                    break;

                }
                case 'allSunk': {
                    _this.state = Game.gameState.finished;
                    _this.computerBoard.playerTurn = false;
                    _this.updateStatus(Game.msgs.allSunk);
                    break;

                }
            }
        };
        this.playerBoard.onEvent = function (evt) {
            switch(evt) {
                case 'playerMissed':
                case 'hit': {
                    _this.computerBoard.playerTurn = true;
                    break;

                }
                case 'shipSunk': {
                    _this.updateStatus(Game.msgs.lostShip);
                    _this.computerBoard.playerTurn = true;
                    break;

                }
                case 'allSunk': {
                    _this.updateStatus(Game.msgs.lostGame);
                    _this.computerBoard.playerTurn = false;
                    _this.state = Game.gameState.finished;
                    break;

                }
            }
        };
    }
    Game.gameState = {
        begin: 0,
        computerTurn: 1,
        playerTurn: 2,
        finished: 3
    };
    Game.msgs = {
        gameStart: "Drag your ships to the desired location on your board (on the right), then bomb a square on the left board to start the game!",
        invalidPositions: "All ships must be in valid positions before the game can begin.",
        wait: "Wait your turn!",
        gameOn: "Game on!",
        hit: "Good hit!",
        shipSunk: "You sunk a ship!",
        lostShip: "You lost a ship :-(",
        lostGame: "You lost this time. Click anywhere on the left board to play again.",
        allSunk: "Congratulations!  You won!  Click anywhere on the left board to play again."
    };
    Game.prototype.computersTurn = function () {
        var _this = this;
        this.computerBoard.playerTurn = false;
        this.state = Game.gameState.computerTurn;
        setTimeout(function () {
            _this.playerBoard.chooseMove();
        }, 250);
    };
    Game.prototype.startGame = function () {
        if(this.playerBoard.boardIsValid()) {
            this.state = Game.gameState.playerTurn;
            this.playerBoard.dragAndDropEnabled = false;
            this.computerBoard.playerTurn = true;
            this.updateStatus(Game.msgs.gameOn);
        } else {
            this.updateStatus(Game.msgs.invalidPositions);
        }
    };
    Game.prototype.updateStatus = function (msg) {
        $("#status").slideUp('fast', function () {
            $(this).text(msg).slideDown('fast');
        });
    };
    return Game;
})();
$(new Function("var game = new Game();"));
