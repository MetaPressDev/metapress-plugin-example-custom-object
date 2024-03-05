/**
 * Renders the custom cube. We subclass the built-in class `Object3DRenderer` which handles object positioning
 * and synchronising with the editor. We only need to implement the `onLoad` method to create our object and 
 * assign it to `this.object`.
 * 
 * MetaPress exposes it's version of THREE as a global variable, so we don't need to import it in our plugin.
 * 
 * Note that since we are extending a class provided by MetaPress, this class
 * must be _imported_ only after MetaPress has been loaded. The simplest way is to import the entire plugin
 * asynchronously from `window.metapressPluginLoaders`. Our loader.js handles this automatically for us.
 */
export class CustomCubeRenderer extends metapress.builtinObjects.Object3DRenderer {

    /** Called on load */
    async onLoad() {

        // Create cube
        let geometry = new THREE.BoxGeometry()
        let material = new THREE.MeshNormalMaterial()
        this.object = new THREE.Mesh(geometry, material)

        // Make it rotate
        this.object.onBeforeRender = () => {
            this.object.rotation.x += 0.005
            this.object.rotation.y += 0.01
        }

    }

}