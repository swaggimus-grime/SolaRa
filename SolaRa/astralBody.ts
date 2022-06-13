import { Mesh } from 'three'
import { SphereGeometry } from 'three';
import AstralMaterial from './astralMaterial'

export default class AstralBody extends Mesh {
    constructor(scale: number, matDir: string) {
        const sphere = new SphereGeometry(scale, 128, 128);
        const material = new AstralMaterial(matDir);
        super(sphere, material);
    }
}