import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form webhook endpoint
  app.post("/api/webhook", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      
      // Store the contact in our database
      const contact = await storage.createContact(contactData);
      
      // Here you could also forward to the external webhook
      try {
        const webhookUrl = process.env.WEBHOOK_URL || "https://automacao.meusuper.app/webhook";
        await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contactData),
        });
      } catch (webhookError) {
        console.error("External webhook failed:", webhookError);
        // Continue anyway - we still saved locally
      }
      
      res.json({ success: true, contact });
    } catch (error) {
      console.error("Contact form error:", error);
      res.status(400).json({ error: "Failed to process contact form" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
