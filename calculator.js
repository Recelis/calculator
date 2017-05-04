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

var data = {
    memory: [],
    input: [],
    results: [],
    updateView: function(){
        view.update();
    },
    updateMemory:function(value, buttonObject){
        switch (buttonObject.className){
            case "operations":
                if (data.memory.length == 0){
                    data.input[0] = 0;
                    data.memory.push(0);
                    data.memory.push(value.toString(value));
                } else {
                    data.memory.push(value);
                    data.input = [0];
                }
                break;
            case "special":

                break;
            case "numbers":
                if (data.input.length == 1 && data.input[0] == 0) data.input[0] = value;
                else data.input.push(value);
                data.memory.push(value);
                break;
            case "control":
                break;
        };
        return data.memory.length+1;
        //  if (data.input.length == 0 || data.memory.length == 0){ // if no values in memory or input
        //     if (buttonObject.className == "operations"){
        //         data.memory.push(0);
        //         data.memory.push(value.toString(value));
        //     }
        // }
    },

    // updateMemory:function(value, buttonObject){
    //     else{

    //     }
    //     if (value.toString().match(/\d+/g)){ // if value is a number
    //         data.input.push(value);
    //         data.memory.push(value);
    //     } 
        
    //     // if (value.) // if value is an operation
    //     // if (value) // if value is a control 
    // },
    calculation:function(a,b){
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

var keypad = {
    keyPosition: 0,
    buttonPressed: function(number,buttonObject){
        keypad.keyPosition = data.updateMemory(number, buttonObject);
        data.updateView();
    },
}

var view = {
    update: function(){
        var myDisplay = document.getElementById('display');
        var myMemory = document.getElementById('memory');
        myDisplay.innerHTML = data.input.toString();
        myMemory.innerHTML = data.memory;
        console.log(keypad.keyPosition);
    }
};


