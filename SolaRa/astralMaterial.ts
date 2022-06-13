import { MeshStandardMaterial } from 'three';
import { TextureLoader } from 'three/src/loaders/TextureLoader';

export default class AstralMaterial extends MeshStandardMaterial {
    constructor(texDir: string) {
        const diffuse = new TextureLoader().load(texDir + '\\diffuse.png');
        const normal = new TextureLoader().load(texDir + '\\normal.png');
        const specular = new TextureLoader().load(texDir + '\\specular.png');
        const bump = new TextureLoader().load(texDir + '\\bump.png');
        super({
            map: diffuse,
            normalMap: normal,
            lightMap: specular,
            bumpMap: bump
        });
    }
}
