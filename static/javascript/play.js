var pmArray = [];
var selectArray = [];

function createArray() {
    for (var i = 0; i < 81; i++) {
        pmArray[i] = [];
        selectArray[i] = false;
    }
}

var isNormal = true;
var isSelectMultiple = false;
var cur_id;

$(document).keydown(
    function (e) {
        var keypressed = false;

        if (isNormal && document.getElementById(document.activeElement.id) != null) {
            document.getElementById(document.activeElement.id).select();

        }

        if (e.keyCode == 8) {
            document.getElementById(document.activeElement.id).select();
        }

        if (e.keyCode == 39) {
            currentId = document.activeElement.id;
            if (currentId != 80) {
                nextId = parseInt(currentId) + 1;
            }
            keypressed = true;
        }
        else if (e.keyCode == 37) {
            currentId = document.activeElement.id;
            if (currentId != 0) {
                nextId = parseInt(currentId) - 1;
            }
            keypressed = true;
        }
        else if (e.keyCode == 40) {
            currentId = document.activeElement.id;
            if (currentId < 72) {
                nextId = parseInt(currentId) + 9;
            }
            else if (currentId != 80) {
                nextId = parseInt(currentId) - 71;
            }
            keypressed = true;
        }
        else if (e.keyCode == 38) {
            currentId = document.activeElement.id;
            if (currentId > 8) {
                nextId = parseInt(currentId) - 9;
            }
            else if (currentId != 0) {
                nextId = parseInt(currentId) + 71;
            }
            keypressed = true;
        }
        else if (e.keyCode == 32) {
            if (isNormal) {
                changeMode("pencilmarks");
            }
            else {
                changeMode("normal");
            }
        }
        else if (e.keyCode == 16) {
            isSelectMultiple = true;
            selectArray[document.activeElement.id] = true;
            document.getElementById(document.activeElement.id).style.backgroundColor = "rgba(254, 215, 0, 0.6)";
        }
        else if (e.keyCode == 27) {
            isSelectMultiple = false;
            for (var i = 0; i < 81; i++) {
                if (selectArray[i]) {
                    document.getElementById(i).style.backgroundColor = "transparent";
                    selectArray[i] = false;
                }
            }
        }
        if (keypressed === true) {
            document.getElementById(nextId).focus();
            // document.getElementById(document.activeElement.id).select();

        }

    }
);

$(document).keyup(
    function (e) {
        if (e.keyCode == 16) {
            isSelectMultiple = false;
        }
    }
);

var solved = $('#my-data').data().name;

function checkAlert() {
    if (solved == "True") {
        window.alert("You successfully finished the sudoku!");
    }
    else {
        window.alert("Your answer is incorrect. The errors have been highlighted red.")
    }
}

function changeMode(id) {
    // console.log(cur_id);
    // document.getElementById(cur_id).focus();
    if (id == "pencilmarks") {
        isNormal = false;
        document.getElementById("pencilmarks").className = "modefocus";
        document.getElementById("normal").className = "buttons";
    }
    else {
        isNormal = true;
        document.getElementById("pencilmarks").className = "buttons";
        document.getElementById("normal").className = "modefocus";
    }

    for (i = 0; i < 9; i++) {
        for (j = 0; j < 9; j++) {
            if (((document.getElementById(i * 9 + j)).className != "txt-input readonly")
                && (document.getElementById(i * 9 + j).value == "")) {
                if (isNormal) {
                    document.getElementById(i * 9 + j).className = "txt-input";
                    if (document.getElementById(i * 9 + j).className != "pm-input") {
                        document.getElementById(i * 9 + j).maxLength = 1;
                    }
                }
                else {
                    document.getElementById(i * 9 + j).className = "pm-input";
                    if (document.getElementById(i * 9 + j).className != "txt-input") {
                        document.getElementById(i * 9 + j).maxLength = 9;
                    }
                }
            }
        }
    }
    if (document.getElementById(cur_id) !== null){
        document.getElementById(cur_id).focus();
    }
}

function arr_diff(a1, a2) {

    var a = [], diff = [];

    for (var i = 0; i < a1.length; i++) {
        a[a1[i]] = true;
    }

    for (var i = 0; i < a2.length; i++) {
        if (a[a2[i]]) {
            delete a[a2[i]];
        } else {
            a[a2[i]] = true;
        }
    }

    for (var k in a) {
        diff.push(k);
    }

    return diff;
}

function arrEquals(a1, a2) {
    if (a1.length != a2.length) {
        return false;
    }
    for (var i = 0; i < a1.length; i++) {
        if (a1[i] != a2[i]) {
            return false;
        }
    }
    return true;
}

function addToArray(id, value) {
    if (isNormal === false && document.getElementById(id).className != "txt-input") {
        var prevPmCellArray = pmArray[id];
        var pmCellArray = [];
        var nums = value.split("");

        for (i = 0; i < nums.length; i++) {
            pmCellArray.push(nums[i]);
        }
        var diff = arr_diff(prevPmCellArray, pmCellArray);
        pmCellArray = prevPmCellArray.concat(diff);
        var firstIndex = pmCellArray.indexOf(pmCellArray[pmCellArray.length - 1]);
        if (arrEquals(diff, prevPmCellArray)) {
            pmCellArray = [];
        }
        else if ((prevPmCellArray.length != pmCellArray.length)
            && (prevPmCellArray.includes(diff[0]))) {
            pmCellArray.pop();
            pmCellArray.splice(firstIndex, 1);
        }
        pmCellArray.sort();
        pmArray[id] = pmCellArray;
        idValue = "";
        for (i = 0; i < pmCellArray.length; i++) {
            idValue += pmCellArray[i];
        }
        document.getElementById(id).value = idValue;
        for (var i = 0; i < 81; i++) {
            if (selectArray[i] && document.getElementById(i).className.includes("readonly") == false) {
                document.getElementById(i).value = idValue;
            }
        }
    }
    else {
        pmArray[id] = [];
        document.getElementById(id).className = "txt-input";
        document.getElementById(id).maxLength = 1;
        idValue = document.getElementById(id).value;
        for (var i = 0; i < 81; i++) {
            if (selectArray[i] && document.getElementById(i).className.includes("readonly") == false) {
                document.getElementById(i).value = idValue;
            }
        }
    }
}

function validateForm() {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (document.getElementById(i * 9 + j).className.includes("pm-input")) {
                alert("You cannot check since there are still pencilmarks on the board.");
                return false;
            }
            else if (document.getElementById(i * 9 + j).value == "") {
                alert("You cannot check since there are still empty spaces on the board.");
                return false;
            }
        }
    }
    return true;
}

function selectFocus(id) {  
    if (isSelectMultiple) {
        selectArray[id] = true;
        
        document.getElementById(id).style.backgroundColor = "rgba(254, 215, 0, 0.6)";
    }
}

function selectClick(id) {  
    if (isSelectMultiple) {
        selectArray[id] = true;
        document.getElementById(id).style.backgroundColor = "rgba(254, 215, 0, 0.6)";
    }
    else {
        for (var i = 0; i < 81; i++) {
            if (selectArray[i]) {
                document.getElementById(i).style.backgroundColor = "rgba(254, 215, 0, 0.6)";
                selectArray[i] = false;
            }
        }
    }
}

function setId(id) {
    cur_id = id;
}
