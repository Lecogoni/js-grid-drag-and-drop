window.onload = function(){
  
  let dragEl;
  let gridBoard = []

  /* events fired on the draggable target */
  document.addEventListener("drag", function( ev ) {
  }, false);


  document.addEventListener("dragstart", function( ev ) {
    // store a ref. on the dragged elem
    dragEl = ev.target;

    // dragElInfo = {
    //   id: ev.id,
    //   RowStart: ev.target.style.gridRowStart,
    //   RowEnd: ev.target.style.gridRowEnd,
    //   columnStart: ev.target.style.gridColumnStart,
    //   columnEnd: ev.target.style.gridColumnEnd,
    //   length: ev.target.style.gridRowEnd - ev.target.style.gridRowStart,
    //   whith: ev.target.style.gridColumnEnd - ev.target.style.gridColumnStart
    // }

    // make it half transparent
    ev.target.style.opacity = .5;

  }, false);

  document.addEventListener("dragend", function(ev) {
    // reset the transparency
    ev.target.style.opacity = "";

  }, false);

  document.addEventListener("dragenter", function( ev ) {
    let dropZoneEl = ev.target
    // dropZoneElInfo = {
    //   id: ev.id,
    //   RowStart: ev.target.style.gridRowStart,
    //   RowEnd: ev.target.style.gridRowEnd,
    //   columnStart: ev.target.style.gridColumnStart,
    //   columnEnd: ev.target.style.gridColumnEnd,
    //   length: ev.target.style.gridRowEnd - ev.target.style.gridRowStart,
    //   whith: ev.target.style.gridColumnEnd - ev.target.gridColumnStart
    // }
    // highlight potential drop target when the draggable element enters it
    if ( dropZoneEl.className == "dropzone" ) {

      dropZoneEl.style.background = "purple";
    }

  }, false);

  /* events fired on the drop targets */
  document.addEventListener("dragover", function(ev) {
    // prevent default to allow drop
    ev.preventDefault();
  }, false);


  document.addEventListener("dragleave", function( ev ) {
    // reset background of potential drop target when the draggable element leaves it
    if ( ev.target.className == "dropzone" ) {
        ev.target.style.background = "";
    }
  }, false);

  document.addEventListener("drop", function(ev) {
    // prevent default action (open as link for some elements)
    ev.preventDefault();


    // store all the grid item in the Array gridItems sort on ...
    gridItems = Array.from(dragEl.parentNode.children).sort((a, b) => a.style.gridRowStart.localeCompare(b.style.gridRowStart) || a.style.gridColumnStart > b.style.gridColumnStart); 
    

    // store in the array gridBoard an object representing each grid items and its specs
    // gridItems.forEach(addObjectIteminArray)
    // function addObjectIteminArray(item){
    //   gridBoard.push({
    //     id: item.id,
    //     RowStart: item.style.gridRowStart,
    //     RowEnd: item.style.gridRowEnd,
    //     columnStart: item.style.gridColumnStart,
    //     columnEnd: item.style.gridColumnEnd,
    //     length: item.style.gridRowEnd - item.style.gridRowStart,
    //     whith: item.style.gridColumnEnd - item.style.gridColumnStart
    //   })
    // }

    let dropEl = ev.target;

    // move dragged elem to the selected drop target
    if (ev.target.className == "dropzone") {

      // store gridItems[index] of dragEl and dropEl
      let dragElIndex = gridItems.indexOf(dragEl);
      let dropElIndex = gridItems.indexOf(dropEl);

      for (i = dragElIndex; i <= dropElIndex; i++ ){

        if (gridItems[i] != dragEl){

          if(gridItems[i].style.gridColumnStart == 1){
            gridItems[i].style.gridColumnStart = 3;
            gridItems[i].style.gridColumnEnd = 4;
            gridItems[i].style.gridRowStart -= 1; 
            gridItems[i].style.gridRowEnd -= 1; 
          } else {
            gridItems[i].style.gridColumnStart -= 1; 
            gridItems[i].style.gridColumnEnd -= 1; 
          }
          
        } else {
          gridItems[i].style.gridRowStart = dropEl.style.gridRowStart; 
          gridItems[i].style.gridRowEnd = dropEl.style.gridRowEnd; 
          gridItems[i].style.gridColumnStart = dropEl.style.gridColumnStart; 
          gridItems[i].style.gridColumnEnd = dropEl.style.gridColumnEnd; 
        }
      }
    }

    gridItemsPost = Array.from(dragEl.parentNode.children).sort((a, b) => a.style.gridRowStart.localeCompare(b.style.gridRowStart) || a.style.gridColumnStart > b.style.gridColumnStart);
    console.log(gridItemsPost);

  }, false)


}


/* INVERSION ENTRE DEUX GRID ITEM  SWAP DE VALEUR */

// [dragEl.style.gridColumnStart, ev.target.style.gridColumnStart] = [ev.target.style.gridColumnStart, dragEl.style.gridColumnStart];
// [dragEl.style.gridRowStart, ev.target.style.gridRowStart] = [ev.target.style.gridRowStart, dragEl.style.gridRowStart];

