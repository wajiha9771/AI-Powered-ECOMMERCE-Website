import { GoogleGenAI } from "@google/genai";
import Product from "../models/Product.js";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const aiChat = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please provide a message.",
      });
    }
    const prompt = `
You are Nex AI, an AI shopping assistant for Nex-Style fashion e-commerce website.
Understand the user's shopping request and extract useful product search filters.
Return ONLY valid JSON in this exact format:
{
  "category": "",
  "color": "",
  "maxPrice": null,
  "minPrice": null,
  "keywords": []
}
Rules:
1. category:
- Extract the specific product type if mentioned.
- Examples:
  shirt
  jeans
  shoes
  dress
  bag
  watch
  hoodie
  pants
- Do NOT use broad categories like "men", "women", "kids" unless the user specifically asks for that category.

2. color:
- Extract the requested color.
- Examples:
  black
  white
  red
  blue
  green

3. maxPrice:
- Extract the maximum price as a number.
- Example:
  "under $50" -> 50
  "below 100" -> 100
  "under 3000" -> 3000
- Do not convert currencies.

4. minPrice:
- Extract minimum price if mentioned.
- Otherwise null.

5. keywords:
- Extract useful shopping/style words.
- Examples:
  casual
  formal
  party
  birthday
  summer
  sporty
  elegant

6. Do not invent information.

User request:
${message}
`;
    const aiResponse = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            category: {
              type: "string",
            },
            color: {
              type: "string",
            },
            maxPrice: {
              type: ["number", "null"],
            },
            minPrice: {
              type: ["number", "null"],
            },
            keywords: {
              type: "array",
              items: {
                type: "string",
              },
            },
          },
          required: ["category", "color", "maxPrice", "minPrice", "keywords"],
        },
      },
    });
    let filters;

    try {
      filters = JSON.parse(aiResponse.text);
    } catch (error) {
      console.error("AI JSON Parse Error:", error);
      return res.status(500).json({
        success: false,
        message: "AI response could not be processed.",
        error: aiResponse.text,
      });
    }
    const query = {
      stock: { $gt: 0 },
    };
    if (filters.maxPrice !== null && filters.maxPrice !== undefined) {
      query.price = {
        ...(query.price || {}),
        $lte: Number(filters.maxPrice),
      };
    }

    if (filters.minPrice !== null && filters.minPrice !== undefined) {
      query.price = {
        ...(query.price || {}),
        $gte: Number(filters.minPrice),
      };
    }
    const andConditions = [];
    if (filters.category) {
      const categoryRegex = new RegExp(filters.category, "i");

      andConditions.push({
        $or: [
          { name: categoryRegex },
          { description: categoryRegex },
          { tags: categoryRegex },
        ],
      });
    }
    if (filters.color) {
      const colorRegex = new RegExp(filters.color, "i");

      andConditions.push({
        $or: [
          { name: colorRegex },
          { description: colorRegex },
          { tags: colorRegex },
        ],
      });
    }

    if (Array.isArray(filters.keywords) && filters.keywords.length > 0) {
      filters.keywords.forEach((keyword) => {
        if (!keyword) return;

        const keywordRegex = new RegExp(keyword, "i");

        andConditions.push({
          $or: [
            { name: keywordRegex },
            { description: keywordRegex },
            { tags: keywordRegex },
          ],
        });
      });
    }
    if (andConditions.length > 0) {
      query.$and = andConditions;
    }
    const products = await Product.find(query)
      .sort({
        isFeatured: -1,
        isTrending: -1,
        createdAt: -1,
      })
      .limit(12);
    res.status(200).json({
      success: true,
      message,
      filters,
      products,
      count: products.length,
    });
  } catch (error) {
    console.error("AI Chat Error:", error);

    res.status(500).json({
      success: false,
      message: "Error in AI assistant ",
      error: error.message,
    });
  }
};
