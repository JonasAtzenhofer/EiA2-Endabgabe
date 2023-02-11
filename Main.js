var Eia2Endabgabe;
(function (Eia2Endabgabe) {
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        Eia2Endabgabe.crc2 = canvas.getContext("2d");
        canvas.addEventListener("click", drawCircle);
        function drawCircle(_event) {
            console.log("click");
            let x = _event.clientX - canvas.getBoundingClientRect().left;
            let y = _event.clientY - canvas.getBoundingClientRect().top;
            console.log("x: " + x, "y: " + y);
            Eia2Endabgabe.crc2.beginPath();
            Eia2Endabgabe.crc2.arc(x, y, 30, 0, 2 * Math.PI);
            Eia2Endabgabe.crc2.fillStyle = "red";
            Eia2Endabgabe.crc2.fill();
            Eia2Endabgabe.crc2.closePath();
        }
    }
})(Eia2Endabgabe || (Eia2Endabgabe = {}));
//# sourceMappingURL=Main.js.map