import { useEffect } from "react";

const SuperFlowScriptLoader = () => {
  useEffect(() => {
    // Remove if already present
    const existing = document.querySelector('script[src="https://super-flow.uiinitiative.com/assets/index-CMw-PO0X.js"]');
    if (existing) existing.remove();

    const script = document.createElement("script");
    script.type = "module";
    script.crossOrigin = true;
    script.src = "https://super-flow.uiinitiative.com/assets/index-CMw-PO0X.js";
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return null;
};

export default SuperFlowScriptLoader;
