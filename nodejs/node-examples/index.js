const rect = require('./rectangle');

function solveRect(l,b) {
    console.log("solving for rectangle with l = " + l + " and b = " +b);
    if ( l<=0 || b <=0) {
        console.log("error");
    } else {
        console.log("perimeter: " + rect.perimeter(l,b));
        console.log("area: " + rect.area(l,b));
    }
};

solveRect(3,4);
solveRect(3,5);
solveRect(0,4);
solveRect( -3,4);