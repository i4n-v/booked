import { RenderPageProps } from "@react-pdf-viewer/core"

const RenderPage = (props: RenderPageProps) => {
    return (
        <>
            {props.canvasLayer.children}
            <div style={{ userSelect: 'none' }}>
                {props.textLayer.children}
            </div>
            {props.annotationLayer.children}
        </>
    );
};

export default RenderPage