var Eia2Endabgabe;
(function (Eia2Endabgabe) {
    class Explosion extends Eia2Endabgabe.Creation {
        color;
        length;
        range;
        strength;
        position;
        constructor(_color, _length, _range, _strength, _name) {
            if (_name) {
                super(_name);
            }
            else {
                super(Eia2Endabgabe.Creation.name);
            }
            this.color = _color;
            this.length = _length;
            this.range = _range;
            this.strength = _strength;
        }
        triggerExplosion() {
        }
    }
    Eia2Endabgabe.Explosion = Explosion;
})(Eia2Endabgabe || (Eia2Endabgabe = {}));
//# sourceMappingURL=Explosion.js.map