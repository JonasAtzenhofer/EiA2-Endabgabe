namespace Eia2Endabgabe {

    window.addEventListener("load", handleLoad);

    export let crc2: CanvasRenderingContext2D;

    const url: string = "https://webuser.hs-furtwangen.de/~atzenhof/Database/index.php/";

    let fireworks: Creation[] = [];


    interface Data {
        [id: number]: CreationData[]; 
    }

    interface CreationData {
        name: string;
        color: number;
        length: number; 
        range: number; 
        strength: number; 
    }

    interface ReturnedJSON {
        status: string;
        data: Data; 
    }

    function handleLoad(): void {
        getSavedCreations();

        let saveButton = document.getElementById("save"); 
        saveButton.addEventListener("click", saveIt); 

        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

        canvas.addEventListener("click", canvasClick); 
    }

    async function getSavedCreations(): Promise<void> {
        let response: Response = await fetch(url + "?command=find&collection=Creations"); 
        let item: string = await response.text();
        let data: ReturnedJSON = JSON.parse(item);

        generateContent(data); 


    };

    function generateContent(_data: ReturnedJSON): void {
        let keys: string[] = Object.keys(_data.data);

        for (let index: number = 0; index < keys.length; index++) {

            let item: Explosion = _data.data[keys[index]];  
            fireworks.push(item);
            console.log(fireworks);  

            let object: Creation = fireworks[index];
            let list: HTMLElement = document.getElementById("list");
            let listObject: HTMLElement = document.createElement("li");
            listObject.innerHTML = object.name; 

            list.appendChild(listObject);
            listObject.addEventListener("click", generatePresets);
            console.log(object);
        }

            

    }

    async function saveIt(): Promise<void> {
        let formData: FormData = new FormData(document.querySelector("form")); 
        // let name: string = (formData.get("name")).toString();
        // let color: string = (formData.get("color")).toString();
        // let length: number = parseInt((formData.get("length")).toString());
        // let range: number = parseInt((formData.get("range")).toString());
        // let strength: number = parseInt((formData.get("strength")).toString()); 

        
        interface FormDataJSON {
            [key: string]: FormDataEntryValue | FormDataEntryValue[];
          }
        let json: FormDataJSON = {};
        for (let key of formData.keys())
            if (!json[key]) {
              let values: FormDataEntryValue[] = formData.getAll(key);
              json[key] = values.length > 1 ? values : values[0];
            } 

        let query: URLSearchParams = new URLSearchParams(); 
        query.set("command", "insert");
        query.set("collection", "Creations");
        query.set("data", JSON.stringify(json));
        let response: Response = await fetch(url + "?" + query.toString());
        let responseText: string = await response.text();
        console.log()
        if (responseText.includes("success")) {
            alert("Item added!"); 
        }
        else {
            alert("Error! Try again!");
                }
    }

    function saveCreation(_save: Creation): void {

    }

    function canvasClick(): void {

    };

    function generatePresets(): void {

    }
}