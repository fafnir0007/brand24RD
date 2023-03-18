import { Window } from "happy-dom";

export const getDocumentDomElement = (html: string) => {
  const window = new Window({
    innerWidth: 1024,
    innerHeight: 768,
    url: "http://localhost:8080",
    settings: {
      disableJavaScriptFileLoading: true,
      disableJavaScriptEvaluation: true,
      disableCSSFileLoading: true,
      disableIframePageLoading: true,
      enableFileSystemHttpRequests: false,
    },
  });

  const document = window.document;
  document.write(html);

  return document;
};
