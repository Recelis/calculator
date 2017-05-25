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
    inputLocation: where pointer hand points to.
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
    calculates()
    sum()
    minus()
    divide()
    multiply()
writing with as much Vanilla JS as possible
*/

/* Operation Object*/
var operation = {

}

/* data object*/ 
var data = {
    memory: [],
    input: [],
    inputLocation:0,
    results: [],
    updateMemory:function(keyPressed, buttonObject){
        switch (buttonObject.className.split(' ')[0]){
            case "numbers":
                data.input=data.numberInput(data.input, keyPressed);
                break;
            case "operations":
                data.removeDotFromInput();
                if (data.memory.length == 0 && data.input.length == 0){
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
                            data.input[0] = 0;
                            if (data.memory.length > 0) data.memory.pop();
                        }
                    break;
                    case '=': // room for refactoring here, same as operations, except for overwriting data.input
                        data.removeDotFromInput();
                        data.memory = data.memory.concat(data.input);
                        data.memory.push(keyPressed);
                        data.calculation();
                        data.input = data.results;
                    break;
                    case 'AC':
                        data.input = [0];
                        data.memory = [];
                    break;
                }
                break;
            case "special":
                data.removeDotFromInput();
                switch(keyPressed){
                    // case '(':
                    //     data.memory.push('(');
                    //     break;
                    // case ')':
                    //     data.memory.push(')');
                    //     break;
                    // case 'sign':
                    //     data.input[0] = -data.input[0];
                    //         break;
                    case '.':
                        data.input.push('.');
                        break;
                    // case '<':

                    //     break;
                    // case '>':

                        // break;
                }
                break;
        };
        return data.memory.length+1;
    },
    numberInput:function(inputRow, numberPressed){
        if (inputRow.length == 1 && inputRow[0] == 0) inputRow[0] = numberPressed;
        else inputRow.push(numberPressed);
        return inputRow;
    },
    removeDotFromInput:function(){
        if (data.input[data.input.length-1] =='.'){
            data.input.pop();
        }
    },
    


    calculation:function(){
        var value = ''; // change later
        switch(value){
            case '+':
            break;
            case '-':
            break;
            case 'x':
            break;
            case '/':
            break;
        }
    }
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
            console.log(screenRow + ii);
            var cell = document.getElementById(screenRow + ii);
            cell.innerHTML = screenData[maxScreenValue-ii-1];
        }
    }
};


