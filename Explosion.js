var Eia2Endabgabe;
(function (Eia2Endabgabe) {
    class Explosion extends Eia2Endabgabe.Creation {
        color;
        length;
        range;
        strength;
        position;
        counter = 0;
        constructor(_color, _length, _range, _strength, _name) {
            super(_name);
            if (_name) {
                this.name = _name;
            }
            this.color = _color;
            this.length = _length;
            this.range = _range;
            this.strength = _strength;
        }
        triggerExplosion() {
            let start = Eia2Endabgabe.crc2.getTransform();
            let explosion = new Path2D();
            let gradient = Eia2Endabgabe.crc2.createRadialGradient(0, 0, 0, 0, 0, 10);
            explosion.arc(0, 0, this.range, 0, 2 * Math.PI);
            gradient.addColorStop(1, this.color);
            Eia2Endabgabe.crc2.fillStyle = gradient;
            Eia2Endabgabe.crc2.save();
            Eia2Endabgabe.crc2.translate(this.position.x, this.position.y);
            Eia2Endabgabe.crc2.fill(explosion);
            Eia2Endabgabe.crc2.restore();
            Eia2Endabgabe.crc2.setTransform(start);
        }
        move(_step) {
            let radius = Eia2Endabgabe.crc2.canvas.width / 2;
            let angle = Math.random() * 2 * Math.PI;
            let offset = new Eia2Endabgabe.Vector((radius * Math.cos(angle) / 8), (radius * Math.sin(angle) / 8));
            offset.scale(_step);
            this.position.add(offset);
            this.triggerExplosion();
        }
    }
    Eia2Endabgabe.Explosion = Explosion;
})(Eia2Endabgabe || (Eia2Endabgabe = {}));
//# sourceMappingURL=Explosion.js.map