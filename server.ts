import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleAuth } from "google-auth-library";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON Body Parser for API routes
  app.use(express.json());

  // Implement requested headers
  app.use((req, res, next) => {
    // Default headers for dynamic routes
    res.set("Cache-Control", "public, no-cache, must-revalidate");
    next();
  });

  // PINKIE AUDITOR PROXY
  app.post("/api/audit", async (req, res) => {
    const targetProjectId = "dollhouse-deviants";
    const location = "us-east1";
    const engineId = "7333900886940319744";

    const auth = new GoogleAuth({
      scopes: "https://www.googleapis.com/auth/cloud-platform",
    });

    try {
      const { input } = req.body;
      if (!input) {
        return res.status(400).json({ error: "Input is required" });
      }

      const client = await auth.getClient();
      const userProject = await auth.getProjectId();
      
      // Reverting to :query but specifying the class_method.
      // The error message indicated that 'query' is not the default method,
      // and 'async_search_memory' is one of the available methods.
      const url = `https://${location}-aiplatform.googleapis.com/v1/projects/${targetProjectId}/locations/${location}/reasoningEngines/${engineId}:query`;
      
      const response = await client.request({
        url,
        method: "POST",
        data: { 
          input: { 
            class_method: "async_search_memory",
            input: input 
          } 
        },
      }) as any;

      console.log("[Pinkie Audit] Success ✅");
      
      // Agent Platform/Reasoning Engine response mapping
      const resultData = response.data;
      let outputText = "Incorrect ❌ Sanctuary response truncated.";
      
      if (resultData.output) {
        // Reasoning Engine style
        outputText = typeof resultData.output === 'string' ? resultData.output : JSON.stringify(resultData.output);
      } else if (resultData.queryResult) {
        // Dialogflow CX / Vertex AI Search style
        outputText = resultData.queryResult?.responseMessages?.find((m: any) => m.text)?.text?.text?.[0] 
                  || resultData.queryResult?.fulfillmentText 
                  || outputText;
      }
                      
      res.json({ output: outputText, ...resultData });
    } catch (error: any) {
      console.error("[Pinkie Audit] Request Failed ❌");

      if (error.response) {
        const errorData = error.response.data;
        const status = error.response.status;
        console.error(`[Pinkie Audit] Status ${status}:`, JSON.stringify(errorData, null, 2));

        if (status === 403) {
          let serviceAccount = "unknown-identity";
          try {
            const credentials = await auth.getCredentials();
            serviceAccount = credentials.client_email || serviceAccount;
          } catch (e) {}

          return res.status(403).json({
            error: "Identity Permission Denied",
            message: "The Sanctuary connection requires elevated IAM permissions.",
            troubleshooting: {
              identity: serviceAccount,
              requiredRole: "roles/aiplatform.user (Agent Platform User)",
              consoleLink: `https://console.cloud.google.com/iam-admin/iam?project=${targetProjectId}`,
              instruction: `Please grant the 'Agent Platform User' role to ${serviceAccount} in project ${targetProjectId}. Also verify the Agent/Reasoning Engine exists and is shared.`,
              apiCheck: "Vertex AI API must be enabled in the target project."
            },
            details: errorData
          });
        }
        
        // Ensure we send a structured error even for reasoning engine runtime errors
        const errorMsg = errorData.message || (errorData.error?.message) || "An error occurred during execution.";
        return res.status(status).json({
          error: errorData.error || "Agent Engine Error",
          message: errorMsg,
          details: errorData
        });
      }

      console.error("[Pinkie Audit] Unexpected Error:", error.message || error);
      res.status(500).json({
        error: "Internal Server Error",
        message: error instanceof Error ? error.message : String(error)
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    
    // Serve static assets with long-term caching
    app.use('/assets', express.static(path.join(distPath, 'assets'), {
      maxAge: '1y',
      immutable: true,
      setHeaders: (res) => {
         res.set("Cache-Control", "public, max-age=31536000, immutable");
      }
    }));

    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
