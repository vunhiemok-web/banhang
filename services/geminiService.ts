import { GoogleGenAI } from "@google/genai";
import { GenerationOptions, ProductType } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateSalesPost = async (
  selectedProducts: ProductType[],
  options: GenerationOptions
): Promise<string> => {
  try {
    const productListString = selectedProducts.join(", ");
    
    const systemInstruction = `
      Bạn là một chuyên gia Content Marketing (AI Copywriter) chuyên nghiệp trong lĩnh vực F&B (đồ ăn uống), đặc biệt là các món ăn vặt đường phố Việt Nam như bánh tráng.
      Nhiệm vụ của bạn là viết nội dung bài đăng bán hàng hấp dẫn, kích thích vị giác và thúc đẩy hành động mua hàng.
      
      Yêu cầu chung:
      - Sử dụng ngôn ngữ tự nhiên, gần gũi, phù hợp với người Việt.
      - Sử dụng nhiều biểu tượng cảm xúc (emoji) phù hợp để bài viết sinh động 🍕🌮🔥.
      - Tự động thêm các hashtag phổ biến liên quan (ví dụ: #banhtrang #anvat #saigon #hanoi).
      - Bố cục rõ ràng, dễ đọc (dùng gạch đầu dòng).
      
      Các Tone giọng:
      - Hài hước: Dùng slang Gen Z, meme, vui vẻ.
      - Chuyên nghiệp: Tập trung vào chất lượng, nguồn gốc, cam kết.
      - Gấp gáp: Nhấn mạnh sự khan hiếm, khuyến mãi giới hạn.
      - Tâm tình: Kể chuyện, chia sẻ cảm xúc khi ăn.
      - Foodie: Mô tả kỹ hương vị (chua, cay, mặn, ngọt, dai, giòn).
    `;

    const userPrompt = `
      Hãy viết một bài đăng bán hàng cho nền tảng: ${options.platform}.
      
      Sản phẩm cần bán: ${productListString}.
      
      Phong cách (Tone): ${options.tone}.
      
      ${options.customOffer ? `Thông tin khuyến mãi/ghi chú thêm: "${options.customOffer}"` : ''}
      
      Cấu trúc bài viết mong muốn:
      1. Headline (Tiêu đề) cực cuốn hút (Catchy Hook).
      2. Body (Thân bài): Mô tả sự hấp dẫn của từng món: ${productListString}. Nhấn mạnh vị ngon khó cưỡng.
      3. Call to Action (Kêu gọi hành động): Mời chốt đơn, để lại comment hoặc inbox.
      4. Footer: Hashtag liên quan.
      
      Lưu ý: Không cần viết phần mở đầu kiểu "Đây là bài viết của bạn", hãy đưa ra nội dung bài đăng trực tiếp.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.8, // Creative and varied
        topP: 0.9,
      }
    });

    return response.text || "Xin lỗi, tôi chưa thể tạo nội dung lúc này. Vui lòng thử lại.";
  } catch (error) {
    console.error("Lỗi khi gọi Gemini:", error);
    return "Đã xảy ra lỗi kết nối. Vui lòng kiểm tra API Key hoặc thử lại sau.";
  }
};