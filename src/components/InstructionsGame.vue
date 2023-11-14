<template>
  <v-timeline>


    <v-timeline-item dot-color="purple-lighten-2" fill-dot>
      <v-card>
        <v-card-title class="bg-purple-lighten-2">
          <v-icon size="large" class="me-4">fas fa-1</v-icon>
        </v-card-title>
        <v-card-text>Have a Look at all the Puzzle pieces Provided below</v-card-text>
      </v-card>
    </v-timeline-item>

    
    <v-timeline-item dot-color="amber-lighten-1" fill-dot size="x-small">
      <v-card>
        <v-card-title class="bg-amber-lighten-1 ">
            <v-icon size="large">fas fa-2</v-icon>
        </v-card-title>
        <v-card-text> Procceed to click on the grid to draw a piece and submit it! You can also Undo by clicking on the cell again.</v-card-text>
      </v-card>
    </v-timeline-item>

    
    <v-timeline-item dot-color="cyan-lighten-1" fill-dot>
      <v-card>
        <v-card-title class="bg-cyan-lighten-1">
          <v-icon  size="large">fas fa-3</v-icon>
        </v-card-title>
        <v-card-text>You can Test Yourself by trying to fill the entire grid and we'll let you know if you are on track</v-card-text>
      </v-card>
    </v-timeline-item>

    
    <v-timeline-item dot-color="red-lighten-1" fill-dot size="x-small" >
      <v-card>
        <v-card-title class="bg-red-lighten-1 justify-end">
            <v-icon size="large" >fas fa-4</v-icon>
        </v-card-title>
        <v-card-text>After Submitting a Piece you can press "Generate Solution" to see how the grid can fil up with your initial configuration </v-card-text>
      </v-card>
    </v-timeline-item>

    
    <v-timeline-item dot-color="green-lighten-1" fill-dot>
      <v-card>
        <v-card-title class="bg-green-lighten-1">
          <v-icon class="me-4" size="large" >fas fa-5</v-icon>
        </v-card-title>
        <v-card-text> ENJOY & PLAY AGAIN </v-card-text>
      </v-card>
    </v-timeline-item>

  </v-timeline>
</template>