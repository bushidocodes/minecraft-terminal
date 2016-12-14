var Drone = require('drone');
// var world = require('world');
var blocks = require('blocks');
var http = require('http');

exports.helloHackathon = function () {
    console.log('Hello Hackathon');
    return "Hello Hackathon";
};

exports.drawWithBlocks = function (text) {
    console.log(text);
    // var drone = new Drone("{name="+player+"}");
    var world = server.worlds.get(0);
    var location = {
        world: world,
        x: 291,
        y: 56,
        z: -391,
        yaw: 78,
        pitch: 11
    };
    // server.

    var drone = new Drone(location);
    drone.up();
    // drone.box(blocks.glowstone);
    // var drone = new Drone(self);
    drone.blocktype(text, blocks.glowstone, blocks.wool.black);
    return text;
};


//45 by 45//
exports.renderPanel = function (text) {
    var textArr = text.split("");
    console.log(textArr);
    var widthCounter = 45;
    var heightCounter = 45;
    var panel = "";
    while (heightCounter > 0) {
        while (widthCounter > 0) {
            if (textArr.length === 0) {
                // panel = panel + " ";
                // widthCounter -= 2;
                // continue;
                textArr.unshift(" ");
            }
            if (widthCounter === 45) widthCounter--; //first char has gutter of 1 block to left
            var currentLetter = textArr[0];
            var currentLetterWidth = (currentLetter === " ") ? 2 : 4;
            if (widthCounter - currentLetterWidth > 0) {
                var char = textArr.shift();
                // console.log(char);
                // text = textArr.join();
                panel = panel + char;
                widthCounter -= currentLetterWidth;
            }
            else {
                while (widthCounter >= 2) {
                    panel = panel + " ";
                    widthCounter -= 2;
                }
                panel += "\n";
                break;
            }
        } //end of line
        heightCounter -= 6;
        if (heightCounter >= 12) {// if there is room to render line
            widthCounter = 45;
        } else {
            widthCounter = 45;
            if (textArr.length > 0) {
                var controlChars = "+ " + textArr.length;
            } else {
                var controlChars = "DONE";
            }
            var controlCharsArr = controlChars.split("");
            var currentLetter = controlCharsArr[0];
            var currentLetterWidth = (currentLetter === " ") ? 2 : 4;
            // var char = textArr.shift();
            // panel = panel + char;
            widthCounter -= currentLetterWidth;

            // panel += "+ " + textArr.length;
            // widthCounter -= controlChars.length;
            while (widthCounter >= 2) {
                panel = panel + " ";
                widthCounter -= 2;
            }
            console.log(panel.charAt(panel.length - 2));
            return panel;
        }
    }
}

// console.log(renderPanel("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."));

exports.drawHttp = function (url) {
    url = url || 'http://localhost:3000';
    http.request({
        url: url,
        method: 'GET'
    },
        function (responseCode, responseBody) {
            var result = (responseBody) ? responseBody : responseCode;
            var resultPanel = renderPanel(result);
            drawWithBlocks(resultPanel);
        }
    );
}


//js refresh()


// this.chkpt('hello')