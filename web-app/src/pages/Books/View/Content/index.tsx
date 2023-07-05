// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/full-screen/lib/styles/index.css";
import "@react-pdf-viewer/zoom/lib/styles/index.css";

//Import Plugins
import DisableScrollPlugin from "./DisableScrollPlugin";
import {
  RenderCurrentScaleProps,
  RenderZoomInProps,
  zoomPlugin,
} from "@react-pdf-viewer/zoom";
import { fullScreenPlugin } from "@react-pdf-viewer/full-screen";
import { scrollModePlugin } from "@react-pdf-viewer/scroll-mode";

// Import the main component
import {
  PageLayout,
  SpecialZoomLevel,
  ViewMode,
  Worker,
} from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import RenderPage from "./RenderPage";
import Content from "../../../../components/Layout/Content/styles";
import { Box, IconButton, Typography } from "@mui/material";
import { RenderEnterFullScreenProps } from "@react-pdf-viewer/full-screen";
import {
  Bookmark,
  FullscreenExitOutlined,
  FullscreenOutlined,
  NavigateBefore,
  NavigateNext,
  Visibility,
  ZoomInOutlined,
  ZoomOutOutlined,
} from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import useBook from "../../../../services/useBook";
import {
  RenderCurrentPageLabelProps,
  RenderGoToPageProps,
  pageNavigationPlugin,
} from "@react-pdf-viewer/page-navigation";
import { useState } from "react";
import useAcquisitions from "../../../../services/useAcquisition";
import useNotifier from "../../../../helpers/Notify";

export default function BookViewContent() {
  const notify = useNotifier();
  const { bookId } = useParams();
  const { getBook } = useBook();
  const { updateAcquisition } = useAcquisitions();
  const createUserMutation = useMutation({
    mutationFn: updateAcquisition,
    mutationKey: "UpdateAcquisition",
  });
  const { data: book } = useQuery(["getBook", [bookId]], () =>
    getBook(bookId as string)
  );
  const [disableScroll, setDisableScroll] = useState(true);
  const freePages = 9;

  const pageNavigationPluginInstance = pageNavigationPlugin({
    enableShortcuts: true,
  });
  const scrollModePluginInstance = scrollModePlugin();
  const disableScrollPlugin = DisableScrollPlugin(disableScroll);
  const zoonPluginInstance = zoomPlugin({
    enableShortcuts: true,
  });
  const fullScreenPluginInstance = fullScreenPlugin({
    enableShortcuts: true,
    getFullScreenTarget: (pagesContainer) =>
      pagesContainer.closest('[data-testid="view_container"]') as HTMLElement,
    onEnterFullScreen: (zoom) => {
      // zoom(SpecialZoomLevel.PageFit);
      setDisableScroll(false);
    },
    onExitFullScreen: (zoom) => {
      // zoom(SpecialZoomLevel.PageFit);
      setDisableScroll(true);
    },
    renderExitFullScreenButton: (props) => (
      <IconButton
        style={{
          position: "fixed",
          right: "3%",
          top: "5%",
          zIndex: 1,
        }}
        onClick={props.onClick}
      >
        <FullscreenExitOutlined color="primary" />
      </IconButton>
    ),
  });

  const { EnterFullScreen } = fullScreenPluginInstance;
  const {
    GoToPreviousPage,
    GoToNextPage,
    CurrentPageInput,
    NumberOfPages,
    CurrentPageLabel,
  } = pageNavigationPluginInstance;
  const { ZoomIn, ZoomOut, CurrentScale, zoomTo } = zoonPluginInstance;
  const pageLayout: PageLayout = {
    buildPageStyles() {
      return {
        height: "fit-content",
      };
    },
    transformSize({ numPages, pageIndex, size }) {
      if (pageIndex < freePages || !!book?.acquisition_id) {
        return size;
      } else {
        return {
          height: 0,
          width: 0,
        };
      }
    },
  };

  function markPage(page: number) {
    createUserMutation.mutate(
      {
        id: book?.acquisition_id as string,
        data: { marked_page: page },
      },
      {
        onSuccess() {
          notify(`Esta pagina agora está com o marcador.`);
          if (book) book.marked_page = page;
        },
        onError() {
          notify("Não foi possivel colocar o marcador na pagina.", "error");
        },
      }
    );
  }
  return (
    <Content headerheight="fit-content">
      <Typography component={"span"} sx={{ font: (t) => t.font.lg }}>
        {book?.name}
      </Typography>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <Box
          sx={{
            border: "1px solid rgba(0, 0, 0, 0.3)",
            height: "fit-content",
            maxWidth: "100%",
            position: "relative",
            overflow: "hidden",
            "& .rpv-full-screen__overlay": {
              display: "none",
            },
          }}
        >
          <EnterFullScreen>
            {(props: RenderEnterFullScreenProps) => (
              <IconButton
                style={{
                  right: "3%",
                  position: "absolute",
                  top: "5%",
                  transform: "translate(24px, -50%)",
                  zIndex: 1,
                }}
                className="full_screen_button"
                title="Entrar em tela cheia"
                onClick={props.onClick}
              >
                <FullscreenOutlined color="primary" />
              </IconButton>
            )}
          </EnterFullScreen>
          <Box
            data-testid={"view_container"}
            sx={{
              height: "1000px",
            }}
          >
            <Box
              sx={{
                width: "100%",

                position: "absolute",
                display: "flex",
                justifyContent: "center",

                zIndex: 1,
                "&:hover": {
                  "& > :first-of-type": {
                    opacity: 1,
                    backgroundColor: (t) => t.palette.primary[700],
                  },
                },
              }}
            >
              <Box
                sx={{
                  alignItems: "center",
                  zIndex: 1,
                  opacity: 0.25,
                  width: "100px",
                  transition: "opacity 0.3s ease-in-out",
                  backgroundColor: (t) => t.palette.secondary[700],
                  display: "flex",
                  justifyContent: "center",
                  padding: "4px",
                }}
              >
                <Box sx={{ padding: "0px 2px", flex: 1, textAlign: "center" }}>
                  <CurrentPageInput />
                </Box>
                <Box
                  sx={{
                    padding: "0px 2px",
                    flex: 1,
                    textAlign: "center",
                    color: (t) => t.palette.secondary.light,
                  }}
                >
                  <NumberOfPages />
                </Box>
              </Box>
            </Box>
            <ZoomIn>
              {(props: RenderZoomInProps) => (
                <IconButton
                  style={{
                    left: 0,
                    position: "absolute",
                    top: "5%",
                    transform: "translate(24px, -50%)",
                    zIndex: 1,
                  }}
                  title="Adicionar zoom"
                  onClick={props.onClick}
                >
                  <ZoomInOutlined color="primary" />
                </IconButton>
              )}
            </ZoomIn>
            <ZoomOut>
              {(props: RenderZoomInProps) => (
                <IconButton
                  style={{
                    left: 0,
                    position: "absolute",
                    top: "10%",
                    transform: "translate(24px, -50%)",
                    zIndex: 1,
                  }}
                  title="Remover zoom"
                  onClick={props.onClick}
                >
                  <ZoomOutOutlined color="primary" />
                </IconButton>
              )}
            </ZoomOut>
            <CurrentScale>
              {(props: RenderCurrentScaleProps) => (
                <IconButton
                  sx={{
                    left: 0,
                    position: "absolute",
                    top: "15%",
                    transform: "translate(24px, -50%)",
                    zIndex: 1,
                  }}
                  title="Trocar modo de visualização"
                  onClick={() => {
                    if (props.scale >= 2) {
                      zoomTo(SpecialZoomLevel.PageFit);
                      setDisableScroll(true);
                    } else {
                      setDisableScroll(false);
                      zoomTo(SpecialZoomLevel.PageWidth);
                    }
                  }}
                >
                  <Visibility color="primary" />
                </IconButton>
              )}
            </CurrentScale>
            <Box
              style={{
                left: 0,
                position: "absolute",
                top: "20%",
                transform: "translate(24px, -50%)",
                zIndex: 1,
              }}
            >
              <CurrentPageLabel>
                {(props: RenderCurrentPageLabelProps) => (
                  <IconButton
                    onClick={() => markPage(props.currentPage)}
                    title="Adicionar marcador a página"
                  >
                    <Bookmark
                      color={
                        props.currentPage === book?.marked_page
                          ? "primary"
                          : "disabled"
                      }
                    />
                  </IconButton>
                )}
              </CurrentPageLabel>
            </Box>
            <Box
              style={{
                left: 0,
                position: "absolute",
                top: "50%",
                transform: "translate(24px, -50%)",
                zIndex: 1,
              }}
            >
              <GoToPreviousPage>
                {(props: RenderGoToPageProps) => (
                  <IconButton onClick={props.onClick} title="Página anterior">
                    <NavigateBefore color="primary" />
                  </IconButton>
                )}
              </GoToPreviousPage>
            </Box>
            <Box
              style={{
                position: "absolute",
                right: 0,
                top: "50%",
                transform: "translate(-24px, -50%)",
                zIndex: 1,
              }}
            >
              <GoToNextPage>
                {(props: RenderGoToPageProps) => (
                  <IconButton onClick={props.onClick} title="Página seguinte">
                    <NavigateNext color="primary" />
                  </IconButton>
                )}
              </GoToNextPage>
            </Box>
            <Viewer
              setRenderRange={(props) => ({
                startPage: 0,
                endPage: book?.acquisition_id ? props.numPages : freePages,
              })}
              pageLayout={pageLayout}
              enableSmoothScroll={true}
              defaultScale={SpecialZoomLevel.PageFit}
              viewMode={ViewMode.SinglePage}
              renderPage={RenderPage}
              initialPage={book?.marked_page}
              plugins={[
                disableScrollPlugin,
                zoonPluginInstance,
                pageNavigationPluginInstance,
                fullScreenPluginInstance,
                scrollModePluginInstance,
              ]}
              fileUrl={book?.file_url as string}
            />
          </Box>
        </Box>
      </Worker>
    </Content>
  );
}
