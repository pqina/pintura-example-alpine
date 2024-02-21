import {
    appendDefaultEditor,
    dispatchEditorEvents,
} from '../node_modules/@pqina/pintura/pintura.js';

document.addEventListener('alpine:init', () => {
    Alpine.directive('pintura', (el, { expression }, { evaluateLater, effect, cleanup }) => {
        // create editor
        const editor = appendDefaultEditor(el);

        // route editor events to element
        const unsubs = dispatchEditorEvents(editor, el);

        // handle prop updates
        const getUpdatedProps = evaluateLater(expression);
        effect(() => {
            getUpdatedProps((props) => {
                Object.assign(editor, props);
            });
        });

        // clean up editor
        cleanup(() => {
            // destroy editor instance
            editor.destroy();

            // unsub all routed events
            unsubs.forEach((unsub) => unsub());
        });
    });
});
