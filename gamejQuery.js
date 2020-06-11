/*function clickArrow(columnNumber) {
    if (!gameOver) {
        dropColumn(columnNumber);
    } else {
        console.log("Game is over, press reset to start again")
    }
}*/

$(".arrow--holder").on("click", function() {
    if(!gameOver) {
        var column = $(this).attr("column");
        dropColumn(column);
    } else {
        console.log("Game over, press reset to start again");
    }

})