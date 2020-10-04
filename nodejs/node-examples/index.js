const rect = require('./rectangle');

function solveRect(l,b) {
    console.log("solving for rectangle with l = " + l + " and b = " +b);
    rect(l,b, (err, rectangle) => {
        if (err) {
            console.log("error: " + err.message);
        } else {
            console.log("perimeter: " + rectangle.perimeter(l,b));
            console.log("area: " + rectangle.area(l,b));
        }
    });
    console.log("Called after");
}

solveRect(3,4);
solveRect(3,5);
solveRect(0,4);
solveRect( -3,4);