import QRCode from "qrcode";

export const generateQRCode = async (text) => {
  try {
    const dataUrl = await QRCode.toDataURL(text);
    return dataUrl;
  } catch (err) {
    console.error("QR Code Generation Error:", err);
    throw err;
  }
};
