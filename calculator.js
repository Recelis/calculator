/*
calculator.js
Jacky Lui

User Story: I can add, subtract, multiply and divide two numbers.
User Story: I can clear the input field with a clear button.
User Story: I can keep chaining mathematical operations together until I hit the equal button, and the calculator will tell me the correct output.


objects:
data 
    purpose(HOLDS DATA): stores data and calculates results from memory and input
    memory: an array of strings
    input: an array
    results: an array
    calculation():
        input: memory
        do: convert to a formula 
        output: results
    updateMemory():
        input: keystrokes, position of mouse
        do: updates the data in memory and input
        output: NA
    removeDotFromInput():
        input: data.input
        do: called in operations, if memory ends with dot, remove dot from memory
        output:NA
    

view
    purpose(ABSTRACTS SCREEN): displays data onto screen
    memory string
    input string
    edit()
    convertDataToColumns()
        input: Data
        output: data as string

keypad
    purpose(ABSTRACTS keys on calculator):
    keysListener()
        input: data 
        do: updates data
        output: data
        DO:
operation
    purpose(parse data memory equation and finds results)
    parse()
        input: data.memory
        do: finds BOMDAS terms, finds order of operations
        output: calculation terms in sequences
    calculate()
        input: 
        do: does parsing and calcalations, calls other operation functions
        out: result
    priority()
        do: returns priority scores based on input operation string
    highestPriority():
        input: 
        do: gets the highest priority operation
        out: evalutated terms
    evaluateTerms():
        input: two terms, and an operator
        do: sum, divide, multiply. minus them
        out: result
    updateTerms():
        input: terms, highestpriorityindex, result 
        do: take terms one below to one above highestpriorityindex, replace with result
        out: new terms
writing with as much Vanilla JS as possible
*/
const bracks = 0;
const multiDivide = 1;
const addSub = 2;
const equals = 3;
/* Operation Object*/
var operation = {
    terms:[],
    operatorIndices:[],
    brackets:[],
    calculate:function(){
        operation.operatorIndices = [];
        operation.terms = [];
        operation.parse();
        console.log(data.input);
        console.log(data.memory);
        var alphaPriority = 0; // arbitrary placeholder value
        for (var ii =0; ii < 10; ii++){
            console.log('**********************************');
            console.log(operation.operatorIndices);
            console.log(operation.terms);
            var alphaPriority = operation.highestPriority();
            if (operation.operatorIndices[alphaPriority][0] == equals) break;
            var result = operation.evaluateTerms(alphaPriority);
            operation.updateTerms(alphaPriority,result);
        }
        var answer = [operation.terms[0]];
        answer = operation.splitAnswerArray(answer);
        return answer;
    },
    parse:function(){
        var equation = data.memory.join('');
        var newTerm = '';
        var termNumber = 0;
        if (equation[0] == '-'){
            operation.terms.push(-1);
            operation.terms.push('x');
            equation = equation.slice(1);
        }
        for (var ii =0; ii < equation.length; ii++){
            var nextCharacter = equation[ii];
            if (Number.isInteger(Number(nextCharacter)) || nextCharacter == '.'){
                newTerm+=equation[ii];
            } else{
                if (newTerm != '') operation.terms.push(newTerm);
                newTerm = '';
                operation.terms.push(equation[ii]);
            }
        }
        // add to operation.operatorIndices, refactor with updateTerms
        operation.updateIndices();
    },
    priority:function(operator){
        if (operator == '('){
            operation.brackets.push(1);
            return bracks;
        }
        if (operator ==')'){
            operation.brackets.pop();
            return bracks;
        }  
        if (operator == '/' || operator== 'x') return multiDivide;
        if (operator == '+' || operator == '-') return addSub;
        if (operator == '=') return equals;
    },
    highestPriority:function(){
        // find lowest priority index
        var smallest = 0;
        for (var ii =0; ii < operation.operatorIndices.length; ii++){
            if (operation.operatorIndices[ii][0] < operation.operatorIndices[smallest][0]){
                smallest = ii;
            }
        }
        return smallest;
    },
    evaluateTerms:function(alphaPriority){
        if (operation.terms[operation.operatorIndices[alphaPriority][1]-1] == '(') { // negative sign (-x)
             operation.terms.splice(operation.operatorIndices[alphaPriority][1],0,'1','x');
        }
        var operand1 = Number(operation.terms[operation.operatorIndices[alphaPriority][1]-1]);
        var operand2 = Number(operation.terms[operation.operatorIndices[alphaPriority][1]+1]);
        var operator = operation.terms[operation.operatorIndices[alphaPriority][1]];
        
        var result = 0;
        switch (operator){
            case '+':
                result = operand1+operand2;
                break;
            case '-':
                result = operand1 - operand2;
                break;
            case 'x':
                result = operand1 * operand2;
                break;
            case '/':
                result = operand1/operand2;
                break;
        }
        return String(result);
    },
    updateTerms:function(alphaPriority, result){
        var operatorIndex = operation.operatorIndices[alphaPriority][1];
        // remove evaluatedTerms + replace with result, assume no brackets
        if (operation.terms[operatorIndex -2] == '(' && operation.terms[operatorIndex+2] == ')'){
            var removed = operation.terms.splice(operatorIndex-2, 5,result); 
        } else{
            var removed = operation.terms.splice(operatorIndex-1, 3,result);
        }
        operation.updateIndices();
        
    },
    updateIndices:function(){
       // update indices
        operation.operatorIndices = [];
        for (var ii =0; ii < operation.terms.length; ii ++){
            // if (!Number.isInteger(Number(operation.terms[ii]))){
            if(isNaN(operation.terms[ii])){ 
                var operationPriority = operation.priority(operation.terms[ii]);
                if (operationPriority == 0) continue;
                // check within number of brackets
                operationPriority = operation.brackets.length *-3+operationPriority;
                operation.operatorIndices.push([operationPriority,ii]);
            }
        }
    },
    splitAnswerArray:function(answer){
        //give it 5 decimal points at most
        answer = [String(Math.floor(answer[0]*10000000) / 10000000)];
        return answer[0].split('');
    }
}








/* data object*/ 
var data = {
    memory: [],
    input: [],
    results: [],
    updateMemory:function(keyPressed, buttonObject){
        switch (buttonObject.className.split(' ')[0]){
            case "numbers":
                data.input=data.numberInput(data.input, keyPressed);
                break;
            case "operations":
                data.removeDotFromInput();
                if (data.memory.length == 0 && (data.input.length == 0 && data.input[0] == '-')){
                    data.input = [0];
                    data.memory.push(0);
                    data.memory.push(keyPressed);
                } else {
                    data.memory = data.memory.concat(data.input);
                    data.memory.push(keyPressed);
                    data.input = [0];
                }
                break;
            case "control":
                switch (keyPressed){
                    case 'DEL':
                        if (data.input.length > 1){
                            data.input.pop();
                            data.memory.pop();
                        } else {
                            data.input = [];
                            if (data.memory.length > 0) data.memory.pop();
                        }
                        break;
                    case '=':
                        data.removeDotFromInput();
                        // if contains negative sign
                        if (data.input[0] == '-'){
                            if (data.input.length == 1) data.input.push(0);
                            data.input.unshift('(');
                            data.input.push(')');
                        }
                        data.memory = data.memory.concat(data.input);
                        data.memory.push(keyPressed);
                        data.results = operation.calculate();
                        data.input = data.results;
                        break;
                    case 'AC':
                        data.input = [];
                        data.memory = [];
                        operation.operatorIndices = [];
                        operation.terms = [];
                        operation.brackets = [];
                        break;
                    }
                    break;
            case "special":
                data.removeDotFromInput();
                switch(keyPressed){
                    case '(':
                        data.memory = data.memory.concat(data.input);
                        data.memory.push('(');
                        data.input = [];
                        break;
                    case ')':
                        data.memory = data.memory.concat(data.input);
                        data.memory.push(')');
                        data.input = [];
                        break;
                    case 'sign':
                        // toggle between states
                        if (data.input[0] == '-'){
                            data.input.shift();   
                        } else{
                            data.input.unshift('-');
                        }
                        break;
                    case '.':
                        data.input.push('.');
                        break;
                }
                break;
        };
        return data.memory.length+1;
    },
    numberInput:function(inputRow, numberPressed){
        if (inputRow.length == 1 && inputRow[0] == 0) inputRow[0] = numberPressed;
        else if(inputRow[0] == '-' && inputRow[1] == 0) inputRow[1] = numberPressed;
        else inputRow.push(numberPressed);
        
        return inputRow;
    },
    removeDotFromInput:function(){
        if (data.input[data.input.length-1] =='.'){
            data.input.pop();
        }
    },
};







/* keypad object*/
var keypad = {
    keyPosition: 0,
    buttonPressed: function(keyPressed,buttonObject){
        keypad.keyPosition = data.updateMemory(keyPressed, buttonObject);
        view.clearScreen();
        view.update();
        return keyPressed;
    },
}










/* view object*/ 
var view = {
    update: function(){
        view.convertDataToColumns(data.input, "InputPos", 0);
        view.convertDataToColumns(data.memory, "memoryPos",0);
        if (data.input.length == 0){
            document.getElementById("InputPos0").innerHTML = 0;
        }
    },
    clearScreen:function(){
        for (var ii =0; ii < 12; ii++){
            var inputCell = document.getElementById("InputPos"+ii);
            var memoryCell = document.getElementById("memoryPos"+ii);
            inputCell.innerHTML = '';
            memoryCell.innerHTML = '';
        }
    },
    convertDataToColumns: function(screenData, screenRow, startValue){
        var maxScreenValue = Math.min(screenData.length, 12);
        for (var ii =startValue; ii < maxScreenValue; ii++){
            var cell = document.getElementById(screenRow + ii);
            cell.innerHTML = screenData[maxScreenValue-ii-1];
        }
    }
};


