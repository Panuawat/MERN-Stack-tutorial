import { create } from "zustand";

// สร้าง store สำหรับการจัดการสินค้า
export const useProductStore = create((set) => ({
  // state ที่เก็บรายการสินค้าทั้งหมด
  products: [],

  // ฟังก์ชันเพื่ออัปเดตรายการสินค้าทั้งหมด
  setProducts: (products) => set({ products }),

  // ฟังก์ชันเพื่อสร้างสินค้าใหม่
  createProduct: async (newProduct) => {
    // ตรวจสอบว่าสินค้ามีข้อมูลครบทุกฟิลด์หรือไม่
    if (
      !newProduct.name ||
      !newProduct.price ||
      !newProduct.description ||
      !newProduct.image
    ) {
      return { success: false, message: "Please fill in all fields" };
    }

    // ตรวจสอบว่าราคาที่กรอกเป็นตัวเลขหรือไม่
    if (isNaN(newProduct.price)) {
      return { success: false, message: "Price must be a number" };
    }

    try {
      // ส่งคำขอ HTTP POST ไปยังเซิร์ฟเวอร์เพื่อบันทึกสินค้าชิ้นใหม่
      const res = await fetch("/api/products", {
        method: "POST", // ระบุว่าเป็นการส่งคำขอแบบ POST
        headers: {
          "Content-Type": "application/json", // แจ้งให้เซิร์ฟเวอร์รู้ว่าข้อมูลที่ส่งเป็น JSON
        },
        body: JSON.stringify(newProduct), // แปลงข้อมูลสินค้าใหม่ให้เป็น JSON string ก่อนส่ง
      });

      // แปลงค่าตอบสนองจากเซิร์ฟเวอร์เป็น JSON object
      const data = await res.json();

      // ตรวจสอบว่าเซิร์ฟเวอร์ตอบกลับด้วยสถานะสำเร็จหรือไม่
      if (!res.ok) {
        return {
          success: false,
          message: data.message || "Failed to create product",
        };
      }

      // อัปเดต state โดยเพิ่มสินค้าใหม่เข้าไปในรายการสินค้าปัจจุบัน
      set((state) => ({ products: [...state.products, data.data] }));
      return { success: true, message: "Product created successfully" };
    } catch (error) {
      return {
        success: false,
        message: "An error occurred while creating the product",
      };
    }
  },
  fetchProducts: async () => {
    try {
      // ดึงข้อมูลผลิตภัณฑ์จาก API ที่มี endpoint "/api/products"
      const res = await fetch("/api/products");

      // แปลงผลลัพธ์ที่ได้เป็น JSON
      const data = await res.json();

      // อัปเดต Zustand state ด้วยข้อมูลผลิตภัณฑ์ที่ดึงมาได้
      set({ products: data.data });
    } catch (error) {
      // แสดงข้อผิดพลาดในกรณีที่เกิดปัญหาในการดึงข้อมูลผลิตภัณฑ์
      console.error("Error fetching products:", error);
    }
  },

  deleteProduct: async (productId) => {
    try {
      // ส่งคำขอลบ (DELETE) ไปยัง API endpoint เพื่อทำการลบผลิตภัณฑ์ที่ระบุ
      const res = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      });

      // แปลงผลลัพธ์ที่ได้เป็น JSON
      const data = await res.json();

      // หากการลบไม่สำเร็จ ให้คืนค่าข้อความแสดงข้อผิดพลาด
      if (!data.success) {
        return { success: false, message: data.message };
      }

      // อัปเดต Zustand state โดยกรองผลิตภัณฑ์ที่ถูกลบออกจากรายการ
      set((state) => ({
        products: state.products.filter((p) => p._id !== productId),
      }));
      return { success: true, message: "Product deleted successfully" };
    } catch (error) {
      // แสดงข้อผิดพลาดในกรณีที่เกิดปัญหาในการลบผลิตภัณฑ์
      console.error("Error deleting product:", error);
    }
  },

  updateProduct: async (pid, updatedProduct) => {
    // ส่งคำขออัปเดต (PUT) ไปยัง API endpoint เพื่อทำการอัปเดตข้อมูลผลิตภัณฑ์
    const res = await fetch(`/api/products/${pid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json", // ระบุว่าเนื้อหาของคำขอถูกส่งในรูปแบบ JSON
      },
      body: JSON.stringify(updatedProduct), // ส่งข้อมูลผลิตภัณฑ์ที่อัปเดตไปใน body ของคำขอ
    });

    // แปลงผลลัพธ์ที่ได้เป็น JSON
    const data = await res.json();

    // หากการอัปเดตไม่สำเร็จ ให้คืนค่าข้อความแสดงข้อผิดพลาด
    if (!data.success) return { success: false, message: data.message };

    // อัปเดต Zustand state โดยแทนที่ผลิตภัณฑ์เดิมด้วยผลิตภัณฑ์ที่อัปเดตแล้ว
    set((state) => ({
      products: state.products.map(
        (product) => (product._id === pid ? data.data : product) // แทนที่ผลิตภัณฑ์ที่ถูกอัปเดตในรายการ
      ),
    }));

    // คืนค่าความสำเร็จพร้อมกับข้อความหลังจากการอัปเดตผลิตภัณฑ์เสร็จสิ้น
    return { success: true, message: data.message };
  },
}));
