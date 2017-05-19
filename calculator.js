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
    updateView():
        input: NA
        do: calls to update the screen
        output: NA
    updateMemory():
        input: keystrokes, position of mouse
        do: updates the data in memory and input
        output: NA


view
    purpose(ABSTRACTS SCREEN): displays data onto screen
    memory string
    input string
    edit()
    convertDataToString()
        input: Data
        output: data as string

keypad
    purpose(ABSTRACTS keys on calculator):
    keysListener()
        input: data 
        do: updates data
        output: data
        DO:

writing with as much Vanilla JS as possible
*/

/* data object*/ 
var data = {
    memory: [],
    input: [],
    results: [],
    updateView: function(){
        view.update();
    },
    updateMemory:function(keyPressed, buttonObject){
        switch (buttonObject.className){
            case "numbers":
                data.input=data.numberInput(data.input, keyPressed);
                break;
        };
        return data.memory.length+1;
    },
    numberInput:function(inputRow, numberPressed){
        if (inputRow.length == 1 && inputRow[0] == 0) inputRow[0] = numberPressed;
        else inputRow.push(numberPressed);
        return inputRow;
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
        data.updateView();
        return keyPressed;
    },
}

/* view object*/ 
var view = {
    update: function(){
        var myDisplay = document.getElementById('display');
        var myMemory = document.getElementById('memory');
        myDisplay.innerHTML = view.convertDataToString(data.input);
        myMemory.innerHTML = view.convertDataToString(data.memory);
        
    },
    convertDataToString: function(screenData){
        var screenDisplay = '';
        for (var ii =0; ii < screenData.length; ii++){
             screenDisplay += screenData[ii].toString();
        }
        console.log(screenData);
        return screenDisplay;
    }
};


