var Eia2Endabgabe;
(function (Eia2Endabgabe) {
    window.addEventListener("load", handleLoad);
    const url = "https://webuser.hs-furtwangen.de/~atzenhof/Database/index.php/";
    let fireworks = [];
    function handleLoad() {
        getSavedCreations();
        let saveButton = document.getElementById("save");
        saveButton.addEventListener("click", saveIt);
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        Eia2Endabgabe.crc2 = canvas.getContext("2d");
        canvas.addEventListener("click", canvasClick);
    }
    async function getSavedCreations() {
        let response = await fetch(url + "?command=find&collection=Creations");
        let item = await response.text();
        let data = JSON.parse(item);
        generateContent(data);
    }
    ;
    function generateContent(_data) {
        let keys = Object.keys(_data.data);
        for (let index = 0; index < keys.length; index++) {
            let item = _data.data[keys[index]];
            fireworks.push(item);
            console.log(fireworks);
            let object = fireworks[index];
            let list = document.getElementById("list");
            let listObject = document.createElement("li");
            listObject.innerHTML = object.name;
            list.appendChild(listObject);
            listObject.addEventListener("click", generatePresets);
            console.log(object);
        }
    }
    async function saveIt() {
        let formData = new FormData(document.querySelector("form"));
        let json = {};
        for (let key of formData.keys())
            if (!json[key]) {
                let values = formData.getAll(key);
                json[key] = values.length > 1 ? values : values[0];
            }
        let query = new URLSearchParams();
        query.set("command", "insert");
        query.set("collection", "Creations");
        query.set("data", JSON.stringify(json));
        let response = await fetch(url + "?" + query.toString());
        let responseText = await response.text();
        console.log();
        if (responseText.includes("success")) {
            alert("Item added!");
        }
        else {
            alert("Error! Try again!");
        }
    }
    function saveCreation(_save) {
    }
    function canvasClick() {
    }
    ;
    function generatePresets() {
    }
})(Eia2Endabgabe || (Eia2Endabgabe = {}));
//# sourceMappingURL=Main.js.map