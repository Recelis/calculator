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
        output: resumts 

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
    updateMemory:function(){

    }
};

var keypad = {
    numberPressed: function(number){
        data.input.push(number);
        data.updateView();
    },
}

var view = {
    update: function(){
        var myDisplay = document.getElementById('display');
        var myMemory = document.getElementById('memory');
        myDisplay.innerHTML = data.input[data.input.length - 1];
    }
};


