namespace Eia2Endabgabe {

    window.addEventListener("load", handleLoad);

    export let crc2: CanvasRenderingContext2D;




    function handleLoad(_event: Event): void {
        let canvas: HTMLCanvasElement | null = <HTMLCanvasElement>document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");
        canvas.addEventListener("click", drawCircle);
    
        function drawCircle(_event: MouseEvent): void {
            console.log("click");
            let x: number = _event.clientX - canvas.getBoundingClientRect().left;
            let y: number = _event.clientY - canvas.getBoundingClientRect().top;
            console.log("x: " + x, "y: " + y);
    
            crc2.beginPath();
            crc2.arc(x, y, 30, 0, 2 * Math.PI);
            crc2.fillStyle = "red";
            crc2.fill();
            crc2.closePath();
        }
    }
}    