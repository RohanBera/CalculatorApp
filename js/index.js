function inp(buttonObj) {
    document.getElementById("out").value += buttonObj.value ;
};

function inpOp(buttonObj) {
    document.getElementById("out").value += " "+buttonObj.value+" " ;
};

function clr() {
    document.getElementById("out").value = "";
    document.getElementById("inp").value = "";
};

function del() {
    var temp = document.getElementById("out").value;
    document.getElementById("out").value = temp.substring(0, temp.length -1);
};

function calculate() {
    var temp   = document.getElementById("out").value;
    document.getElementById("inp").value = temp+" =";

    var infix  = temp.split(" ");

    var values = new Array();
    var ops    = new Array();

    var i = 0;

    while (i < infix.length) {
        if (infix[i] != '/' && infix[i] != '*' && infix[i] != '-' && infix[i] != '+') {
            values.push(parseFloat(infix[i]));
        } 
        else {
            while (ops.length != 0 && precedence(ops[ops.length - 1]) >= precedence(infix[i])) {
                var b  = values.pop();
                var a  = values.pop();
                var op = ops.pop();

                values.push(operation(a, b, op));
            }
            ops.push(infix[i]);
        }
        i++;
    }

    while (ops.length != 0) {
        var b  = values.pop();
        var a  = values.pop();
        var op = ops.pop();

        values.push(operation(a, b, op));
    }

    document.getElementById("out").value = values[values.length -1];
};

function precedence(op) {
    if (op == '+' || op == '-') {
        return 1;
    }
    if (op == '*' || op == '/') {
        return 2;
    }
    return 0;
}

function operation(a, b, op) {
    a = parseFloat(a);
    b = parseFloat(b);
    var ans = 0;
    switch(op){
        case "*" : ans = a * b;
            break;
        case "/" : ans = a / b;
            break;
        case "+" : ans = a + b;
            break;
        case "-" : ans = a - b;
            break;
    }

    return ans ;
};