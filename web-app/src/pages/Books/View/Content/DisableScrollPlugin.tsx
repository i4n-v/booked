import { Plugin, RenderViewer } from '@react-pdf-viewer/core';

const DisableScrollPlugin = (disable: boolean): Plugin => {
    const renderViewer = (props: RenderViewer) => {
        const { slot } = props;

        if (slot.subSlot && slot.subSlot.attrs && slot.subSlot.attrs.style) {
            slot.subSlot.attrs.style = Object.assign({}, slot.subSlot.attrs.style, {
                // Disable scrolling in the pages container
                overflow: disable ? 'hidden' : 'auto',
            });
        }

        return slot;
    };

    return {
        renderViewer,
    };
};

export default DisableScrollPlugin