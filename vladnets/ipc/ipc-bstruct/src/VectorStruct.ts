export class VectorStruct {
    private reader: any;

    get x() {
        return this.reader.getX();
    }

    get y() {
        return this.reader.getX();
    }
}

/*
[x][x][x][x][x][x][4][4][4][4][4][4][9][9][9][9][9][9][0][0][0][0][0][0][0][0][0][0][0][0][0][0][0][0][0][0][0][0]
*/

/*

[ 1 ][ 1 ][ 0 ][ 0 ] - [ 2 ][ 2 ][ 2 ][ 2 ]

[ 0 ][ 0 ][ 0 ][ 0 ] - [ 0 ][ 0 ][ 4 ][ 4 ]

*/
