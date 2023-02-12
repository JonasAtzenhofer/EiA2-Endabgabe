//EiA2 Endabgabe
//Name: Jonas Atzenhofer
//Matrikel: 271026
//Datum: 12.02.2023
// In Zusammenarbeit mit: Yannik König



namespace Eia2Endabgabe {

    window.addEventListener("load", handleLoad);

    export let crc2: CanvasRenderingContext2D;

    const url: string = "https://webuser.hs-furtwangen.de/~atzenhof/Database/index.php/";
    let fireworks: Creation[] = []; 
    let particles: Explosion[] = []; 
    let interval: number; 
    let startTime: number; 
    let length: number; 
    
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

        let saveButton: HTMLElement = document.getElementById("save"); 
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
    }

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
            listObject.setAttribute("id", index.toString()); 

            let deleteButton: HTMLElement = document.createElement("button"); 
            deleteButton.setAttribute("type", "button");
            let id: string = "delete" + index;
            deleteButton.setAttribute("id", id);
            deleteButton.addEventListener("click", deleteObject);
            deleteButton.innerHTML = "Löschen"; 
            listObject.appendChild(deleteButton); 
        }          
    }

    async function deleteObject(_event: Event): Promise<void> {
        let trigger: string = (_event.target as HTMLButtonElement).id; 
        let triggerNum: string = trigger.replace(/\D/g, "");
        let identifyer: number = parseInt(triggerNum);

        let response0: Response = await fetch(url + "?command=find&collection=Creations"); 
        let item: string = await response0.text();
        let data: ReturnedJSON = JSON.parse(item);

        let keys: string[] = Object.keys(data.data);
        let id: string = keys[identifyer];
        let query: URLSearchParams = new URLSearchParams(); 
        query.set("command", "delete");
        query.set("collection", "Creations");
        query.set("id", id); 
        let response1: Response = await fetch(url + "?" + query.toString());
        let responseText: string = await response1.text();

        if (responseText.includes("success")) {
            alert("Deine Kreation wurde gelöscht!"); 
            window.location.reload(); 
        }
        else {
            alert("Error! Try again!");
                }
    
    }

    async function saveIt(): Promise<void> {
        let formData: FormData = new FormData(document.querySelector("form")); 
        
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
        if (responseText.includes("success")) {
            alert("Deine Kreation wurde gespeichert!"); 
            window.location.reload(); 
        }
        else {
            alert("Error! Try again!");
                }
    }

    function generatePresets(_event: MouseEvent): void {
        let target: HTMLElement = (_event.target as HTMLElement); 
        if (target.tagName != "BUTTON") {
        let id: number = parseInt((_event.target as HTMLButtonElement).id); 
        let object: Explosion = <Explosion>fireworks[id]; 
        
        let input1: HTMLElement = document.getElementById("color");
        input1.setAttribute("value", object.color); 

        let input2: HTMLElement = document.getElementById("length");
        input2.setAttribute("value", (object.length).toString()); 

        let input3: HTMLElement = document.getElementById("range");
        input3.setAttribute("value", (object.range).toString()); 

        let input4: HTMLElement = document.getElementById("strength"); 
        input4.setAttribute("value", (object.strength).toString()); 

        let input5: HTMLElement = document.getElementById("name"); 
        input5.setAttribute("value", object.name); 
        }
    }

    function canvasClick(_event: MouseEvent): void {
        let formData: FormData = new FormData(document.querySelector("form")); 
        let color: string = (formData.get("color")).toString();
        length = parseInt((formData.get("length")).toString());
        let range: number = parseInt((formData.get("range")).toString());
        let strength: number = parseInt((formData.get("strength")).toString()); 

        for (let index = 0; index < strength; index++) {
            let newExplosion: Explosion = new Explosion(color, length, range, strength); 
            let clickPosition: Vector = new Vector(_event.offsetX, _event.offsetY);
            newExplosion.position = clickPosition; 
            particles.push(newExplosion);        
        }
        interval = setInterval(update, 100); 
        startTime = Date.now();
    }

    function update(): void {
        crc2.fillStyle = "rgba(0, 0, 0, 0.3)"; 
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
        if (Date.now() - startTime >= length) {
            setTimeout(() => {
                clearInterval(interval);
                crc2.clearRect(0, 0, crc2.canvas.width, crc2.canvas.height); 
                particles.splice(0); 
            });
        }
        for (let newExplosion of particles) {
            newExplosion.move(1 / 2); 
        }
        }
}