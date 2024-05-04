function moveUp(item) {
    let prevItem = item.previousElementSibling;

    if (prevItem) {
        item.parentNode.insertBefore(item, prevItem);
    }
}

function initialize() {
    document.body.innerHTML = `
   <div>
     <span>Read emails</span>
   </div>
   <div>
     <span>Prepare presentation</span><button type="button" onclick="moveUp(this.parentElement)">&uarr;</button>
   </div>
   <div>
     <span>Monthly report</span><button type="button" onclick="moveUp(this.parentElement)">&uarr;</button>
   </div>`;
}

initialize();