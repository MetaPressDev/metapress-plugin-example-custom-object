//
// My MetaPress Plugin

import packageJson from '../package.json'
import { CustomCubeRenderer } from './CustomCubeRenderer'

export default class MyMetaPressPlugin {

    // Plugin information
    id              = packageJson.metapress?.id || packageJson.name
    name            = packageJson.metapress?.name || packageJson.name
    description     = packageJson.metapress?.description || packageJson.description
    version         = packageJson.version

    // Provide our custom object renderer. This is our own renderer ID with the 'render:' prefix.
    provides        = [ 'render:custom-cube' ]

    // We use features from the 'renderer' core plugin, so ensure our plugin loads after that one.
    requires        = [ 'renderer' ]

    /** Create our renderer class when MetaPress requests it */
    createRenderer(type) {
        if (type == 'custom-cube') return new CustomCubeRenderer()
    }

    /** Add option to the Add Entity editor panel for creating the custom cube. */
    $editor_getAddableEntities = () => [{

        // Our unique ID for this entity type
        id: 'custom-cube',

        // Name displayed in the Add Entity panel
        name: 'Custom Cube',

        // Icon displayed in the Add Entity panel
        icon: require('./cube.svg'),

        // Description displayed in the Add Entity panel
        description: 'Adds a custom floating cube.',

        // Code to run when the user selects this option in the Add Entity panel. MetaPress provides us some default
        // position and size fields in `editorFields` we can use so that the object appears in front of the user 
        // when they add it.
        action: editorFields => {
            
            // Create the new the entity
            let newEntity = metapress.entities.add({

                // Include MetaPress default position fields
                ...editorFields,

                // Our renderer ID without the 'render:' prefix. This is passed to createRenderer() above when
                // MetaPress wants to render this entity.
                type: 'custom-cube',

                // A default name for the entity, shown in the entity list once it's been created. The user can
                // change this name from the Editor panel.
                name: 'Custom Cube',

            })

            // Select it in the editor immediately after creating it.
            metapress.editor.selectionManager.select(newEntity.id)

        }

    }]

}