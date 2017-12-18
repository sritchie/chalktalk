function() {
   this.label = "ptrtest";

   function TestPointee(sketchCtx, pIn, pOut) {
      VisualPointer.Pointee.call(this, sketchCtx, pIn, pOut);
      this.child = VisualPointer.createPtr(sketchCtx, this, null);
   }
   TestPointee.prototype = Object.create(VisualPointer.Pointee.prototype);

   this.setup = function() {
      this.pointees = [
         new TestPointee(this, [-1, 1, 0], [-1, 1, 0]),
         new TestPointee(this, [1, -1, 0], [1, -1, 0]),
         new TestPointee(this, [1, 1, 0], [1, 1, 0])
      ];

      this.testState = 0;


      this.circle1 = Container.Circle({x : 2, y : 2, z : 0, radius : 0.25})();
      this.circle2 = Container.Circle({x : -2, y : -2, z : 0, radius : 0.25})();
      this.circle3 = Container.Circle({x : -1, y : 1, z : 0, radius : 1})();

      this.circles = [this.circle1, this.circle2, this.circle3];
   };


   const numCases = 6;

   const case2Visits = [2, 0, 1];
   const case2VisitsIdx = 0;

   this.render = function(elapsedTime) {

      this.duringSketch(function() {
         // TEMP
         mLine([-1, 0], [1, 0]);
         mCurve([[0.75, -0.25], [1, 0], [0.75, 0.25]]);
      });


      this.afterSketch(function() {
         const i = this.pointees[1].getPtrInPos();
         const n = [sin(time), i[1] , i[2]];

         this.pointees[1].setPtrInPos(n);
         this.pointees[1].setPtrOutPos(n);

         this.circles[0].point[0] = 2 * sin(2 + time);
         this.circles[0].point[1] = 2 * sin(2 + time + 0.067);
         this.circles[1].point[0] = 2 * -sin(time);
         this.circles[1].point[1] = 2 * -cos(time - 0.067);
         this.circles[2].point[1] = 2 * cos(1 + time - 0.8);
         for (let i = 0; i < this.circles.length; i++) {
            this.circles[i].draw();
         }
         mCurve(this.circles[0].getLineSegment(this.circles[1]));
         mCurve(this.circles[1].getLineSegment(this.circles[2]));
         mCurve(this.circles[2].getLineSegment(this.circles[0]));

         switch (this.testState) {
         case 0:
            break;
         case 1:
            break;
         case 2:
            break;
         case 3:
            break;
         case 4:
            break;
         case 5:
            if (this.caseTwo) {
               this.caseTwo.next();
            }
            break;
         }
         for (let i = 0; i < this.pointees.length; i++) {
            this.pointees[i].draw();
         }
      });
   };

   this.onSwipe = [

   ];

   let that = this;

   this.caseTwo = null;
   function* c2() {
      const p1 = that.pointees[2];
      const p2 = that.pointees[0];
      const p3 = that.pointees[1];
      p1.child.resetTemporaryGraphics();
      p2.child.resetTemporaryGraphics();
      p3.child.resetTemporaryGraphics();
      
      p1.child.traverse();
      while (p1.child.drawMemory.active) { yield; }
      
      p2.child.traverse();
      while (p2.child.drawMemory.active) { yield; }
      
      p3.child.traverse();
      while (p3.child.drawMemory.active) { yield; }

      that.caseTwo = null;
   }

   this.onPress = function(p) {
      switch (this.testState) {
      case 0:
         for (let i = 0; i < this.pointees.length; i++) {
            this.pointees[i].child.resetTemporaryGraphics();
         }
         this.pointees[0].child.pointTo(this.pointees[1]);
         break;
      case 1:
         this.pointees[1].child.pointTo(this.pointees[2]);
         break;
      case 2:
         this.pointees[2].child.pointTo(this.pointees[0]);
         this.pointees[0].child.pointTo(this.pointees[2]);
         break;
      case 3:
         this.pointees[0].child.pointTo(this.pointees[1]);
         break;
      case 4:
         this.caseTwo = c2();       
         break;
      case 5:
         for (let i = 0; i < this.pointees.length; i++) {
            this.pointees[i].child.pointToNoAnimation(this.pointees[i]);
         } 
      }
      this.testState = (this.testState + 1) % numCases;


   };
   this.onDrag = function(p) {

   };
   this.onRelease = function(p) {

   };
   this.onMove = function(p) {
   };

   this.onCmdPress = function(p) {

   };
   this.onCmdDrag = function(p) {

   };
   this.onCmdRelease = function(p) {

   };

   this.mouseDown = function(x, y, z) {

   };
   this.mouseDrag = function(x, y, z) {

   };
   this.mouseUp = function(x, y, z) {

   };
   this.mouseMove = function(x, y, z) {
      
   };

   this.under = function(otherSketch) {

   };
   this.over = function(otherSketch) {

   };
   this.onIntersect = function(otherSketch) {

   };
}
