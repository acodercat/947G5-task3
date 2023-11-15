/* eslint-disable */
<template>
  <v-container>
    <v-row>
      <v-col v-for="image in images" :key="image.id" cols="3">
        <v-img :src="image.src" width="60%" height="60%" />
      </v-col>
    </v-row>
  </v-container>
  <v-container class="text-center">
    <v-row>
      <v-col cols="12">
        <div class="puzzle-grid">
          <div v-for="row in 11" :key="row" class="grid-row">
            <div v-for="col in 5" :key="col" class="grid-cell" :style="{ backgroundColor: gridState[row - 1][col - 1] }"
              @click="changeCellColor(col - 1, row - 1)"></div>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-btn color="primary" class="ma-2" @click="submitChanges">Submit</v-btn>
      <v-btn color="secondary" class="ma-2" @click="solvePuzzle">Solve</v-btn>
    </v-row>
  </v-container>
  <div class="centered-table">
    <table class="st" v-for="(currentBoard, index) in boards" :key="index">
      <tr class="sr" v-for="(row, rowIndex) in currentBoard.Height" :key="rowIndex">
        <td v-for="(col, colIndex) in currentBoard.Width" :key="colIndex"
            :class="['sc', cellClass(colIndex, rowIndex, currentBoard)]">
        </td>
      </tr>
    </table>
    <!-- <div>Solutions: {{ solutions }}</div> -->
  </div>
</template>

<script>

// eslint-disable-next-line
import { toRaw } from 'vue';


export default {
  data() {
    return {
      boards: [],
      isSolutionFound: false,
      solutions: 0,
      images: [
        { id: 1, src: 'p1.png' },
        { id: 2, src: 'p2.png' },
        { id: 3, src: 'p3.png' },
        { id: 4, src: 'p4.png' },
        { id: 5, src: 'p5.png' },
        { id: 6, src: 'p6.png' },
        { id: 7, src: 'p7.png' },
        { id: 8, src: 'p8.png' },
        { id: 9, src: 'p9.png' },
        { id: 10, src: 'p10.png' },
        { id: 11, src: 'p11.png' },
        { id: 12, src: 'p12.png' },
      ],
      gridState: new Array(11).fill(null).map(() => new Array(5).fill('#FFFFFF')),
      currentLayout: [],
      shapes: [{ "Layout": [[[0, 0], [0, 1], [0, 2], [0, 3], [1, 3]], [[0, 0], [0, 1], [1, 0], [2, 0], [3, 0]], [[0, 0], [1, 0], [1, 1], [1, 2], [1, 3]], [[0, 1], [1, 1], [2, 1], [3, 0], [3, 1]], [[0, 3], [1, 0], [1, 1], [1, 2], [1, 3]], [[0, 0], [0, 1], [1, 1], [2, 1], [3, 1]], [[0, 0], [0, 1], [0, 2], [0, 3], [1, 0]], [[0, 0], [1, 0], [2, 0], [3, 0], [3, 1]]], "Name": "L" }, { "Layout": [[[0, 0], [0, 1], [0, 2], [1, 2]], [[0, 0], [0, 1], [1, 0], [2, 0]], [[0, 0], [1, 0], [1, 1], [1, 2]], [[0, 1], [1, 1], [2, 0], [2, 1]], [[0, 2], [1, 0], [1, 1], [1, 2]], [[0, 0], [0, 1], [1, 1], [2, 1]], [[0, 0], [0, 1], [0, 2], [1, 0]], [[0, 0], [1, 0], [2, 0], [2, 1]]], "Name": "l" }, { "Layout": [[[0, 0], [0, 1], [1, 1]], [[0, 0], [0, 1], [1, 0]], [[0, 0], [1, 0], [1, 1]], [[0, 1], [1, 0], [1, 1]]], "Name": "i" }, { "Layout": [[[0, 2], [0, 3], [1, 0], [1, 1], [1, 2]], [[0, 0], [1, 0], [1, 1], [2, 1], [3, 1]], [[0, 1], [0, 2], [0, 3], [1, 0], [1, 1]], [[0, 0], [1, 0], [2, 0], [2, 1], [3, 1]], [[0, 0], [0, 1], [0, 2], [1, 2], [1, 3]], [[0, 1], [1, 0], [1, 1], [2, 0], [3, 0]], [[0, 0], [0, 1], [1, 1], [1, 2], [1, 3]], [[0, 1], [1, 1], [2, 0], [2, 1], [3, 0]]], "Name": "N" }, { "Layout": [[[0, 0], [0, 1], [0, 2], [1, 2], [2, 2]], [[0, 0], [0, 1], [0, 2], [1, 0], [2, 0]], [[0, 0], [1, 0], [2, 0], [2, 1], [2, 2]], [[0, 2], [1, 2], [2, 0], [2, 1], [2, 2]]], "Name": "V" }, { "Layout": [[[0, 0], [0, 1], [0, 2], [1, 0], [1, 1]], [[0, 0], [1, 0], [1, 1], [2, 0], [2, 1]], [[0, 1], [0, 2], [1, 0], [1, 1], [1, 2]], [[0, 0], [0, 1], [1, 0], [1, 1], [2, 1]], [[0, 0], [0, 1], [1, 0], [1, 1], [1, 2]], [[0, 1], [1, 0], [1, 1], [2, 0], [2, 1]], [[0, 0], [0, 1], [0, 2], [1, 1], [1, 2]], [[0, 0], [0, 1], [1, 0], [1, 1], [2, 0]]], "Name": "P" }, { "Layout": [[[0, 0], [0, 1], [1, 0], [1, 1]]], "Name": "S" }, { "Layout": [[[0, 0], [0, 1], [1, 1], [2, 0], [2, 1]], [[0, 0], [0, 1], [0, 2], [1, 0], [1, 2]], [[0, 0], [0, 1], [1, 0], [2, 0], [2, 1]], [[0, 0], [0, 2], [1, 0], [1, 1], [1, 2]]], "Name": "U" }, { "Layout": [[[0, 0], [0, 1], [1, 1], [1, 2], [2, 2]], [[0, 1], [0, 2], [1, 0], [1, 1], [2, 0]], [[0, 0], [1, 0], [1, 1], [2, 1], [2, 2]], [[0, 2], [1, 1], [1, 2], [2, 0], [2, 1]]], "Name": "W" }, { "Layout": [[[0, 1], [1, 0], [1, 1], [1, 2], [2, 1]]], "Name": "X" }, { "Layout": [[[0, 0], [0, 1], [0, 2], [0, 3], [1, 2]], [[0, 0], [1, 0], [1, 1], [2, 0], [3, 0]], [[0, 1], [1, 0], [1, 1], [1, 2], [1, 3]], [[0, 1], [1, 1], [2, 0], [2, 1], [3, 1]], [[0, 2], [1, 0], [1, 1], [1, 2], [1, 3]], [[0, 1], [1, 0], [1, 1], [2, 1], [3, 1]], [[0, 0], [0, 1], [0, 2], [0, 3], [1, 1]], [[0, 0], [1, 0], [2, 0], [2, 1], [3, 0]]], "Name": "Y" }, { "Layout": [[[0, 0], [0, 1], [0, 2], [0, 3]], [[0, 0], [1, 0], [2, 0], [3, 0]]], "Name": "I" }],
      colors: [
        "#2196f3", // 红色
        "#ff9800", // 绿色
        "#9e9e9e", // 蓝色
        "#4caf50", // 紫色
        "#03a9f4", // 橙色
        "#f44336", // 青色
        "#8bc34a", // 黄色
        "#ffeb3b", // 深紫
        "#e91e63", // 粉红
        "#607d8b", // 亮绿
        "#ff5722", // 浅蓝
        "#9c27b0"  // 深红
      ],
      finishedLayouts: [],
      board: new Array(11).fill(null).map(() => new Array(5).fill(-1)),
      availableShapes: ["L", "l", "i", "N", "V", "P", "S", "U", "W", "X", "Y", "I"],
      indexOfAvailableShapes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      allShapes: ["L", "l", "i", "N", "V", "P", "S", "U", "W", "X", "Y", "I"],
    };
  },
  methods: {
    showMessage(message) {
      alert(message);
    },
    cloneDeep(obj) {
      var newObj = Array.isArray(obj) ? [] : {};
      for (let key in obj) {
        // eslint-disable-next-line
        if (obj.hasOwnProperty(key)) {
          newObj[key] = (typeof obj[key] === "object" && obj[key] !== null) ? this.cloneDeep(obj[key]) : obj[key];
        }
      }
      return newObj;
    },
    removeArrayElement(arr, from, to) {
      var rest = arr.slice((to || from) + 1 || arr.length);
      arr.length = from < 0 ? arr.length + from : from;
      return arr.push.apply(arr, rest);
    },
    cellClass(col, row, board) {
      let classes = [];
      const curShape = board.Layout[col][row];

      if (curShape === -2 && (row === 0 || board.Layout[col][row - 1] === -2)) {
        classes.push("btn");
      } else if (row > 0 && board.Layout[col][row - 1] === curShape) {
        classes.push("btd");
      } else {
        classes.push("bts");
      }

      if (curShape === -2 && (row === board.Height - 1 || board.Layout[col][row + 1] === -2)) {
        classes.push("bbn");
      } else if (row < board.Height - 1 && board.Layout[col][row + 1] === curShape) {
        classes.push("bbd");
      } else {
        classes.push("bbs");
      }

      if (curShape === -2 && (col === 0 || board.Layout[col - 1][row] === -2)) {
        classes.push("bln");
      } else if (col > 0 && board.Layout[col - 1][row] === curShape) {
        classes.push("bld");
      } else {
        classes.push("bls");
      }

      if (curShape === -2 && (col === board.Width - 1 || board.Layout[col + 1][row] === -2)) {
        classes.push("brn");
      } else if (col < board.Width - 1 && board.Layout[col + 1][row] === curShape) {
        classes.push("brd");
      } else {
        classes.push("brs");
      }
      if (curShape >= 0) {
        classes.push(`c${this.shapes[curShape].Name}`);
      }

      return classes;
    },
    solvePuzzle() {
      this.isSolutionFound = false;
      this.boards = [];
      this.fitShapes({ "Width": 11, "Height": 5, Layout: this.board }, 0, 0, this.indexOfAvailableShapes);
      if (!this.isSolutionFound) {
        this.showMessage('No solution found.');
      }},
    fitShapes(board, boardX, boardY, shapeList) {
      var boardLayout = board.Layout;
      do {
        if (boardLayout[boardX][boardY] === -1) {
          break;
        } else {
          if (++boardX >= board.Width) {
            boardX = 0;
            if (++boardY >= board.Height) {
              console.log("OUT OF SPACES!?");
              return;
            }
          }
        }
        // eslint-disable-next-line
      } while (true);

      for (var listItem = 0; listItem < shapeList.length; listItem++) {
        var shapeNo = shapeList[listItem];
        var shape = this.shapes[shapeNo];
        var layouts = shape.Layout;
        for (var layoutNo = 0; layoutNo < layouts.length; layoutNo++) {
          var layout = layouts[layoutNo];
          for (var ptNo = 0; ptNo < layout.length; ptNo++) {
            var offX = boardX - layout[ptNo][0];
            var offY = boardY - layout[ptNo][1];
            var fit = true;
            for (var pt = 0; pt < layout.length; pt++) {
              var ptX = offX + layout[pt][0];
              var ptY = offY + layout[pt][1];
              if (ptX < 0 || ptX >= board.Width || ptY < 0 || ptY >= board.Height) {
                fit = false;
                break;
              }
              if (boardLayout[ptX][ptY] !== -1) {
                fit = false;
                break;
              }
            }
            if (fit) {
              var newBoard = this.cloneDeep(board);
              for (let pt = 0; pt < layout.length; pt++) {
                ptX = offX + layout[pt][0];
                ptY = offY + layout[pt][1];
                newBoard.Layout[ptX][ptY] = shapeNo;
              }
              var newShapeList = this.cloneDeep(shapeList);
              this.removeArrayElement(newShapeList, listItem);

              if (newShapeList.length === 0) {
                this.boards.push(newBoard);
                this.isSolutionFound = true; // Set the flag to true when a solution is found
                this.showMessage('Good Job! Solution Found!');
                return true;
              } else {
                let result = this.fitShapes(newBoard, boardX, boardY, newShapeList);
                if (result) return true;
              }
            }
          }
        }
      }
    },
    changeCellColor(row, col) {
      // console.log(row, col);

      if (this.board[col][row] !== -1) return;
      // Check the current color of the cell
      if (this.gridState[col][row] != '#FFFFFF') {
        // If it's red, change it to white
        this.gridState[col][row] = '#FFFFFF';
        const index = this.currentLayout.findIndex(pair => pair[0] === row && pair[1] === col);
        if (index !== -1) {
          this.currentLayout.splice(index, 1);
        }
      } else {
        // Otherwise, change it to red
        this.gridState[col][row] = "#D3D3D3";
        this.currentLayout.push([row, col]);
      }
    },
    submitChanges() {

      const normalizedCurrentLayout = this.normalizeLayout(this.currentLayout);

      for (const shape of this.shapes) {
        for (const layout of shape.Layout) {
          const normalizedShapeLayout = this.normalizeLayout(layout);
          if (this.layoutsMatch(normalizedCurrentLayout, normalizedShapeLayout)) {
            let index = this.availableShapes.indexOf(shape.Name);
            let indexOfAvailableShape = this.indexOfAvailableShapes.indexOf(this.allShapes.indexOf(shape.Name));
            if (index !== -1 && indexOfAvailableShape !== -1) {
              this.availableShapes.splice(index, 1);
              this.indexOfAvailableShapes.splice(indexOfAvailableShape, 1);
              for (const position of this.currentLayout) {
                this.board[position[1]][position[0]] = this.allShapes.indexOf(shape.Name);
                this.gridState[position[1]][position[0]] = this.colors[this.allShapes.indexOf(shape.Name)];
              }
              this.showMessage('Shape added.');
              this.currentLayout = [];
            } else {
              this.showMessage('Shape already used.');
            }
            return;
          }
        }
      }
      this.showMessage('No matching shape found.');
    },

    normalizeLayout(layout) {
      if (layout.length === 0) return layout;

      const minRow = Math.min(...layout.map(point => point[0]));
      const minCol = Math.min(...layout.map(point => point[1]));

      return layout.map(point => [point[0] - minRow, point[1] - minCol]);
    },

    layoutsMatch(layout1, layout2) {
      if (layout1.length !== layout2.length) return false;

      const layout1String = JSON.stringify(layout1.sort());
      const layout2String = JSON.stringify(layout2.sort());

      return layout1String === layout2String;
    },
  },
};
</script>

<style scoped>

.centered-table {
  display: flex;
  justify-content: center;
  align-items: center;
}

.st {
  max-width: 100%;
  overflow-x: auto;
}


.puzzle-grid {
  display: grid;
  grid-template-columns: repeat(11, 60px); /* 将每列的宽度调整为 40px */
  grid-template-rows: repeat(5, 60px); /* 将每行的高度调整为 40px */
  justify-content: center;
  align-content: center;
  gap: 0px; /* 增加格子间的间隙 */
}

.grid-cell {
  width: 60px;
  height: 60px;
  border: 1px solid #e0e0e0;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.grid-cell:hover {
  transform: scale(1.1);
  background-color: rgba(255, 235, 59, 0.3);
}

.st, .wt {
  display: inline-table;
  margin: 5px;
  border-collapse: collapse;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1)
}

.sr, .wr {
  height: 50px;
}

.sc, .wc {
  width: 50px;
  padding: 0;
  border: 1px solid #e0e0e0;
  transition: background-color 0.3s ease;
}


.cI { background-color: #9c27b0; }
.cL { background-color: #2196f3; }
.cl { background-color: #ff9800; }
.ci { background-color: #9e9e9e; }
.cN { background-color: #4caf50; }
.cV { background-color: #03a9f4; }
.cP { background-color: #f44336; }
.cS { background-color: #8bc34a; }
.cU { background-color: #ffeb3b; }
.cW { background-color: #e91e63; }
.cX { background-color: #607d8b; }
.cY { background-color: #ff5722; }


.btn { border-top: none; }
.bts { border-top: 1px solid #bdbdbd; }
.btd { border-top: 1px dotted #bdbdbd; }
.bbn { border-bottom: none; }
.bbs { border-bottom: 1px solid #bdbdbd; }
.bbd { border-bottom: 1px dotted #bdbdbd; }
.bln { border-left: none; }
.bls { border-left: 1px solid #bdbdbd; }
.bld { border-left: 1px dotted #bdbdbd; }
.brn { border-right: none; }
.brs { border-right: 1px solid #bdbdbd; }
.brd { border-right: 1px dotted #bdbdbd; }


.sc:hover, .wc:hover {
  background-color: rgba(255, 235, 59, 0.5);
  cursor: pointer;
}

</style>
