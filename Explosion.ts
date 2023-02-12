namespace Eia2Endabgabe {

    export class Explosion extends Creation {
        color: string; 
        length: number;
        range: number;
        strength: number;
        position: Vector; 

        constructor( _color: string, _length: number, _range: number, _strength: number, _name?: string) {  
            if (_name) {
                super(_name);  
            }
            else {
                super(Creation.name);
            }
  
            this.color = _color;
            this.length = _length;
            this.range = _range;
            this.strength = _strength;  
        }

        triggerExplosion() {

        }
    }
}