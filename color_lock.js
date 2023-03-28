const random = (min, max) => 
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

class ColorLock
{
    constructor(position = [])
    {
        if (position.length === 0)
        {
            this.grid = [[-1, -1, -1, -1], [-1, -1, -1, -1]];

            let colors = [0, 1, 2, 2, 3, 3, 4, 4];

            for (let i = 0; i < colors.length; i++)
            {
                let color = colors[i];
                let radialCoord, angularCoord;

                if (color === 0)
                {
                    radialCoord = 1;
                }
                else
                {
                    radialCoord = this.randomRadial(this.grid);
                }

                angularCoord = this.randomAngular(this.grid[radialCoord]);
                this.grid[radialCoord][angularCoord] = color;
            }
        }
        else
        {
            this.grid = position
        }

        this.startingPosition = JSON.parse(JSON.stringify(this.grid));
        this.totalMoves = 0;

    }

    restartGrid()
    {
        this.grid = JSON.parse(JSON.stringify(this.startingPosition));
        this.totalMoves = 0;
    }

    isWinCondition()
    {
        const winGrid = [[0, 2, 3, 4], [1, 2, 3, 4]];

        for (let radialCoord = 0; radialCoord < 2; radialCoord++)
        {
            for (let angularCoord = 0; angularCoord < 4; angularCoord++)
            {
                if (winGrid[radialCoord][angularCoord] !== this.grid[radialCoord][angularCoord])
                {
                    return false;
                }
            }
        }
        
        return true;
    }

    findAdjacentSlots(radialCoord, angularCoord)
    {
        let otherRadialCoord = 0;
        if (radialCoord === 0)
        {
            otherRadialCoord = 1;
        }

        let higherAngularCoord = angularCoord + 1;
        let lowerAngularCoord = angularCoord - 1;
        if (higherAngularCoord === 4)
        {
            higherAngularCoord = 0;
        }
        if (lowerAngularCoord === -1)
        {
            lowerAngularCoord = 3;
        }

        return [[otherRadialCoord, angularCoord], [radialCoord, lowerAngularCoord], [radialCoord, higherAngularCoord]];
    }

    findEmptySlot()
    {
        for (let radialCoord = 0; radialCoord < 2; radialCoord++)
        {
            for (let angularCoord = 0; angularCoord < 4; angularCoord++)
            {
                if (this.grid[radialCoord][angularCoord] === 0)
                {
                    return [radialCoord, angularCoord];
                }
            }
        }
    }

    getColor(radialCoord, angularCoord)
    {
        return this.grid[radialCoord][angularCoord];
    }

    clickColor(radialCoord, angularCoord)
    {
        const adjacentCoordinates = this.findAdjacentSlots(radialCoord, angularCoord);

        for (let i = 0; i < adjacentCoordinates.length; i++)
        {
            let adjacentRadialCoord = adjacentCoordinates[i][0];
            let adjacentAngularCoord = adjacentCoordinates[i][1];

            if (this.grid[adjacentRadialCoord][adjacentAngularCoord] === 0)
            {
                this.totalMoves++;
                this.grid[adjacentRadialCoord][adjacentAngularCoord] = this.grid[radialCoord][angularCoord];
                this.grid[radialCoord][angularCoord] = 0;
                return;
            }
        }
    }

    isValidMove(radialCoord, angularCoord)
    {
        const adjacentCoordinates = this.findAdjacentSlots(radialCoord, angularCoord);
        for (let i = 0; i < adjacentCoordinates.length; i++)
        {
            const coord = adjacentCoordinates[i];
            if (this.grid[coord[0]][coord[1]] === 0)
            {
                return true;
            }
        }

        return false;
    }

    randomRadial(grid)
    {
        let randomNumber = random(0, 1);


        for (let angularCoord = 0; angularCoord < 4; angularCoord++)
        {
            if (grid[randomNumber][angularCoord] === -1)
            {
                return randomNumber;
            }
        }
        
        grid.forEach(function(color)
        {
            if (color === -1)
            {
                return randomNumber;
            }
        });


        if (randomNumber === 0)
        {
            return 1;
        }
        else
        {
            return 0;
        }
    }

    randomAngular(axis)
    {

        let possibleIndexes = [];
        for (let i = 0; i < axis.length; i++)
        {
            if (axis[i] === -1)
            {
                possibleIndexes.push(i)
            }
        }

        // Need to remove 1 from the length because of indexing
        let randomIndex = random(0, possibleIndexes.length - 1);
        return possibleIndexes[randomIndex];
    }


}