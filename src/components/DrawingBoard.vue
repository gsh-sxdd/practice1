<template>
  <div class="drawing-app">
    <br>
    
    <!-- 工具栏 -->
    <div class="toolbar">
      <button @click="tool = 'brush'" :class="{ active: tool === 'brush' }">🖌️</button>
      <button @click="tool = 'eraser'" :class="{ active: tool === 'eraser' }">🧽</button>
      <button @click="changeBackgroundColor" class="change-bg" :class="{ active: isChangingBackground }">🪣</button>
      <button @click="resetGrid">🔄</button>
    </div>

    <!-- 颜色选择器 -->
    <div class="color-palette">
      <div 
        v-for="color in colors" 
        :key="color"
        :style="{ backgroundColor: color }"
        class="color-option"
        :class="{ selected: selectedColor === color }"
        @click="selectedColor = color">
      </div>
    </div>

    <!-- 画布区域 -->
    <div 
      class="grid-container"
      @mousedown="startDrawing"
      @mousemove="draw"
      @mouseup="stopDrawing"
      @mouseleave="stopDrawing">
      <div class="grid">
        <div 
          v-for="(row, rowIndex) in grid" 
          :key="'row-' + rowIndex" 
          class="row" 
          style="display: contents;">
          <div 
            v-for="(color, colIndex) in row" 
            :key="'cell-' + rowIndex + '-' + colIndex"
            class="cell"
            :style="{ backgroundColor: color }"
            @mousedown="setPixel(rowIndex, colIndex)">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DrawingBoard',
  data() {
    return {
      gridSize: { rows: 50, cols: 50 },
      grid: [],
      colors: [
        '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', 
        '#FF00FF', '#00FFFF', '#C0C0C0', '#808080', '#800000', '#008000',
        '#000080', '#808000', '#800080', '#008080', '#FFA500', '#FFC0CB', 
        '#A52A2A', '#D2691E', '#4B0082', '#FFD700', '#708090', '#2F4F4F'
      ],
      selectedColor: '#000000',
      tool: 'brush',
      isDrawing: false,
      isChangingBackground: false
    }
  },
  created() {
    this.resetGrid()
  },
  methods: {
    resetGrid() {
      if (confirm('确定要重置画板信息吗？')) {
        this.grid = Array.from({ length: this.gridSize.rows }, () => 
          Array(this.gridSize.cols).fill('#FFFFFF')
        )
      }
    },
    
    changeBackgroundColor() {
      this.isChangingBackground = true
      this.tool = ''
      alert('🎨 请先选择颜色，然后点击画布应用背景色填充。')
    },
    
    setPixel(row, col) {
      if (row < 0 || row >= this.gridSize.rows || col < 0 || col >= this.gridSize.cols) {
        return
      }
      
      if (this.isChangingBackground) {
        // 填充整个画布为选中颜色
        for (let i = 0; i < this.gridSize.rows; i++) {
          for (let j = 0; j < this.gridSize.cols; j++) {
            this.$set(this.grid[i], j, this.selectedColor)
          }
        }
        this.isChangingBackground = false
        return
      }
      
      if (this.tool === 'brush') {
        this.$set(this.grid[row], col, this.selectedColor)
      } else if (this.tool === 'eraser') {
        this.$set(this.grid[row], col, '#FFFFFF')
      }
    },
    
    getGridPosition(event) {
      const gridElement = event.currentTarget
      const rect = gridElement.getBoundingClientRect()
      
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      
      const boundedX = Math.max(0, Math.min(x, rect.width - 1))
      const boundedY = Math.max(0, Math.min(y, rect.height - 1))
      
      const cellWidth = rect.width / this.gridSize.cols
      const cellHeight = rect.height / this.gridSize.rows
      
      const col = Math.floor(boundedX / cellWidth)
      const row = Math.floor(boundedY / cellHeight)
      
      return { 
        row: Math.max(0, Math.min(row, this.gridSize.rows - 1)),
        col: Math.max(0, Math.min(col, this.gridSize.cols - 1))
      }
    },
    
    startDrawing(event) {
      this.isDrawing = true
      const { row, col } = this.getGridPosition(event)
      this.setPixel(row, col)
    },
    
    draw(event) {
      if (!this.isDrawing) return
      const { row, col } = this.getGridPosition(event)
      this.setPixel(row, col)
    },
    
    stopDrawing() {
      this.isDrawing = false
    }
  }
}
</script>

<style scoped>
.drawing-app {
  background-color: #c5c5c5d0;
  text-align: center;
  background-image: url('/514bc9e301dc29ba363a0e2be85fbf4d_720.png');
  background-size: cover;
  background-position: 50% 50%;
  width: 100vw;
  height: 100vh;
  position: relative;
}

.toolbar button {
  border-radius: 5px;
  padding: 10px 20px;
  margin: 0 15px;
  background: #333;
  color: white;
  cursor: pointer;
}

.toolbar button:hover {
  box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
}

.toolbar button.active {
  background: #007bff;
}

.grid-container {
  width: 550px;
  height: 550px;
  border: 2px solid #b4afaf; 
  background: white;
  position: relative;
  margin: 0 auto;
}

.grid { 
  display: grid;
  grid-template-columns: repeat(50, 1fr);
  grid-template-rows: repeat(50, 1fr);
  width: 100%;
  height: 100%;
}

.cell {
  border: 0.5px solid #f0f0f0;
}

.color-palette {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 20px 0;
}

.color-option {
  width: 27px;
  height: 27px;
  cursor: pointer;
  border-radius: 3px;
}

.color-option.selected {
  width: 30px;
  height: 30px;
  box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.319);
}
</style>