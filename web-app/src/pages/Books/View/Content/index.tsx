// Import the main component
import { MinimalButton, PageLayout, Position, SpecialZoomLevel, Tooltip, ViewMode, Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';

import RenderPage from './RenderPage';
import Content from '../../../../components/Layout/Content/styles';
import DisableScrollPlugin from './DisableScrollPlugin';
import { fullScreenPlugin } from '@react-pdf-viewer/full-screen';
import { IconButton } from '@mui/material';
import { RenderEnterFullScreenProps } from '@react-pdf-viewer/full-screen';
import { FullscreenOutlined, NavigateBefore, NavigateNext } from '@mui/icons-material';
import { scrollModePlugin } from '@react-pdf-viewer/scroll-mode';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import useBook from '../../../../services/useBook';
import { RenderGoToPageProps, pageNavigationPlugin } from '@react-pdf-viewer/page-navigation';
export default function BookViewContent() {
    const { bookId } = useParams()
    const { getBook } = useBook()


    const { data: book } = useQuery(['getBook', [bookId]], () => getBook(bookId as string))
    const pageNavigationPluginInstance = pageNavigationPlugin({ enableShortcuts: true });
    const scrollModePluginInstance = scrollModePlugin();
    const { GoToPreviousPage, GoToNextPage } = pageNavigationPluginInstance;
    const fullScreenPluginInstance = fullScreenPlugin({
        onEnterFullScreen: () => {

        }
    });

    const { EnterFullScreen } = fullScreenPluginInstance;
    const pageLayout: PageLayout = {
        buildPageStyles({ numPages, pageIndex, scrollMode, viewMode, }) {
            return {
                height: "fit-content",
            }
        },
        transformSize({ numPages, pageIndex, size }) {
            console.log(numPages)
            if (pageIndex < 1) {
                return size
            } else {
                return {
                    height: 0,
                    width: 0
                }
            }
        },
    }
    const disableScrollPlugin = DisableScrollPlugin()

    return (
        <Content headerheight='0'>
            <div></div>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                <div
                    style={{
                        border: '1px solid rgba(0, 0, 0, 0.3)',
                        height: '1000px',
                        maxWidth: '100%',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                >
                    <EnterFullScreen>
                        {
                            (props: RenderEnterFullScreenProps) => (
                                <IconButton
                                    style={{
                                        left: 0,
                                        position: 'absolute',
                                        top: '5%',
                                        transform: 'translate(24px, -50%)',
                                        zIndex: 1,
                                    }}
                                    onClick={props.onClick}
                                >
                                    <FullscreenOutlined />
                                </IconButton>
                            )
                        }
                    </EnterFullScreen>
                    <div
                        style={{
                            left: 0,
                            position: 'absolute',
                            top: '50%',
                            transform: 'translate(24px, -50%)',
                            zIndex: 1,
                        }}
                    >
                        <GoToPreviousPage>
                            {(props: RenderGoToPageProps) => (
                                <Tooltip
                                    position={Position.BottomCenter}
                                    target={
                                        <MinimalButton onClick={props.onClick}>
                                            <NavigateBefore />
                                        </MinimalButton>
                                    }
                                    content={() => 'Previous page'}
                                    offset={{ left: 0, top: 8 }}
                                />
                            )}
                        </GoToPreviousPage>
                    </div>
                    <div
                        style={{
                            position: 'absolute',
                            right: 0,
                            top: '50%',
                            transform: 'translate(-24px, -50%)',
                            zIndex: 1,
                        }}
                    >
                        <GoToNextPage>
                            {(props: RenderGoToPageProps) => (
                                <Tooltip
                                    position={Position.BottomCenter}
                                    target={
                                        <MinimalButton onClick={() => props.onClick()}>
                                            <NavigateNext />
                                        </MinimalButton>
                                    }
                                    content={() => 'Next page'}
                                    offset={{ left: 0, top: 8 }}
                                />
                            )}
                        </GoToNextPage>
                    </div>
                    <Viewer
                        setRenderRange={() => ({ startPage: 0, endPage: 1 })}
                        pageLayout={pageLayout}
                        enableSmoothScroll={true}
                        defaultScale={SpecialZoomLevel.PageFit}
                        viewMode={ViewMode.SinglePage}
                        renderPage={RenderPage}
                        plugins={[disableScrollPlugin, pageNavigationPluginInstance, fullScreenPluginInstance, scrollModePluginInstance]}
                        fileUrl={book?.file_url as string}
                    />
                </div>
            </Worker>
        </Content>
    )
}