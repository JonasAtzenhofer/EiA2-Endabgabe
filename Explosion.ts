namespace Eia2Endabgabe {
    export class Explosion extends Creation {
        color: string; 
        length: number;
        range: number;
        strength: number;
        position: Vector; 
        declare name: string;

        constructor( _color: string, _length: number, _range: number, _strength: number, _name?: string) {  
            super(_name);  
            if (_name) {
                this.name = _name; 
            }
            this.color = _color;
            this.length = _length;
            this.range = _range;
            this.strength = _strength;  
        }

        triggerExplosion(): void {
        let start: DOMMatrix = crc2.getTransform();

        let explosion: Path2D = new Path2D();
        let gradient: CanvasGradient = crc2.createRadialGradient(0, 0, 0, 0, 0, 10);

        explosion.arc(0, 0, this.range, 0, 2 * Math.PI);
        gradient.addColorStop(1, this.color); 
        crc2.fillStyle = gradient; 

        crc2.save();
        crc2.translate(this.position.x, this.position.y);
        crc2.fill(explosion);
        crc2.restore();
        crc2.setTransform(start);
        }

        move(_step: number): void {
            let radius: number = crc2.canvas.width / 2;
            let angle: number = Math.random() * 2 * Math.PI; 

            let offset: Vector = new Vector((radius * Math.cos(angle) / 8), (radius * Math.sin(angle) / 8));
            offset.scale(_step);
            this.position.add(offset);
            this.triggerExplosion();
    }
}
}