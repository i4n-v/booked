// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/full-screen/lib/styles/index.css';
import '@react-pdf-viewer/zoom/lib/styles/index.css';

//Import Plugins
import DisableScrollPlugin from './DisableScrollPlugin';
import { RenderCurrentScaleProps, RenderZoomInProps, zoomPlugin } from '@react-pdf-viewer/zoom';
import { fullScreenPlugin } from '@react-pdf-viewer/full-screen';
import { scrollModePlugin } from '@react-pdf-viewer/scroll-mode';

// Import the main component
import { MinimalButton, PageLayout, Position, SpecialZoomLevel, Tooltip, ViewMode, Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import RenderPage from './RenderPage';
import Content from '../../../../components/Layout/Content/styles';
import { Box, IconButton, Typography } from '@mui/material';
import { RenderEnterFullScreenProps } from '@react-pdf-viewer/full-screen';
import { FullscreenExitOutlined, FullscreenOutlined, NavigateBefore, NavigateNext, Visibility, ZoomInOutlined, ZoomOutOutlined } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import useBook from '../../../../services/useBook';
import { RenderGoToPageProps, pageNavigationPlugin } from '@react-pdf-viewer/page-navigation';
import { useState } from 'react';

export default function BookViewContent() {
    const { bookId } = useParams()
    const { getBook } = useBook()
    const { data: book } = useQuery(['getBook', [bookId]], () => getBook(bookId as string))
    const [disableScroll, setDisableScroll] = useState(true)

    const pageNavigationPluginInstance = pageNavigationPlugin({ enableShortcuts: true });
    const scrollModePluginInstance = scrollModePlugin();
    const disableScrollPlugin = DisableScrollPlugin(disableScroll)
    const zoonPluginInstance = zoomPlugin({
        enableShortcuts: true
    })
    const fullScreenPluginInstance = fullScreenPlugin({
        enableShortcuts: true,
        getFullScreenTarget: (pagesContainer) => pagesContainer.closest('[data-testid="view_container"]') as HTMLElement,
        onEnterFullScreen: (zoom) => {
            // zoom(SpecialZoomLevel.PageFit);
            setDisableScroll(false)
        },
        onExitFullScreen: (zoom) => {
            // zoom(SpecialZoomLevel.PageFit);
            setDisableScroll(true)
        },
        renderExitFullScreenButton: (props) => (

            <IconButton
                style={{
                    position: 'fixed',
                    right: '3%',
                    top: '5%',
                    zIndex: 1,
                }}
                onClick={props.onClick}
            >
                <FullscreenExitOutlined />
            </IconButton>
        )

    });

    const { EnterFullScreen } = fullScreenPluginInstance;
    const { GoToPreviousPage, GoToNextPage } = pageNavigationPluginInstance;
    const { ZoomIn, ZoomOut, CurrentScale, zoomTo } = zoonPluginInstance
    const pageLayout: PageLayout = {
        buildPageStyles({ numPages, pageIndex, scrollMode, viewMode, }) {
            return {
                height: "fit-content",
            }
        },
        transformSize({ numPages, pageIndex, size }) {
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

    return (
        <Content headerheight='fit-content'>
            <Typography component={'span'} sx={{ font: t => t.font.lg }} >{book?.name}</Typography>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                <Box
                    sx={{
                        border: '1px solid rgba(0, 0, 0, 0.3)',
                        height: 'fit-content',
                        maxWidth: '100%',
                        position: 'relative',
                        overflow: 'hidden',
                        "& .rpv-full-screen__overlay": {
                            display: "none"
                        },
                    }}
                >
                    <EnterFullScreen>
                        {
                            (props: RenderEnterFullScreenProps) => (
                                <IconButton
                                    style={{
                                        right: '3%',
                                        position: 'absolute',
                                        top: '5%',
                                        transform: 'translate(24px, -50%)',
                                        zIndex: 1,
                                    }}
                                    className='full_screen_button'
                                    onClick={props.onClick}
                                >
                                    <FullscreenOutlined />
                                </IconButton>
                            )
                        }
                    </EnterFullScreen>
                    <Box data-testid={'view_container'}
                        sx={{
                            height: '1000px',
                        }}
                    >
                        <ZoomIn>
                            {(props: RenderZoomInProps) => (
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
                                    <ZoomInOutlined />
                                </IconButton>
                            )}
                        </ZoomIn>
                        <ZoomOut>
                            {(props: RenderZoomInProps) => (
                                <IconButton
                                    style={{
                                        left: 0,
                                        position: 'absolute',
                                        top: '10%',
                                        transform: 'translate(24px, -50%)',
                                        zIndex: 1,
                                    }}
                                    onClick={props.onClick}
                                >
                                    <ZoomOutOutlined />
                                </IconButton>
                            )}
                        </ZoomOut>
                        <CurrentScale>
                            {(props: RenderCurrentScaleProps) => (
                                <IconButton
                                    sx={{
                                        left: 0,
                                        position: 'absolute',
                                        top: '15%',
                                        transform: 'translate(24px, -50%)',
                                        zIndex: 1,
                                    }}
                                    onClick={() => {
                                        if (props.scale >= 2) {
                                            zoomTo(SpecialZoomLevel.PageFit)
                                            setDisableScroll(true)
                                        } else {
                                            setDisableScroll(false)
                                            zoomTo(SpecialZoomLevel.PageWidth)
                                        }
                                    }}
                                >

                                    <Visibility />
                                </IconButton>

                            )}
                        </CurrentScale>
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
                            setRenderRange={(props) => ({ startPage: 0, endPage: 1 })}
                            pageLayout={pageLayout}
                            enableSmoothScroll={true}
                            defaultScale={SpecialZoomLevel.PageFit}
                            viewMode={ViewMode.SinglePage}
                            renderPage={RenderPage}
                            plugins={[disableScrollPlugin, zoonPluginInstance, pageNavigationPluginInstance, fullScreenPluginInstance, scrollModePluginInstance]}
                            fileUrl={book?.file_url as string}
                        />
                    </Box>
                </Box>
            </Worker>
        </Content>
    )
}