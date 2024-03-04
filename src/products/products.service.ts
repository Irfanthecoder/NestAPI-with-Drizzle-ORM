import { Injectable } from '@nestjs/common';
import { products } from '../drizzle/schema'
import { Pool } from 'pg';
import { db } from '../drizzle/migrate';
import { eq } from "drizzle-orm";

@Injectable()
export class ProductsService {
  private readonly pool: Pool;

  constructor() {
    this.pool = new Pool({
      user: 'postgres',
      host: 'localhost',
      database: 'productsdb',
      password: '0000',
      port: 5432,
    });
  }

  // CREATE Product
  async createProduct(title: string, description: string, price: number): Promise<any> {
    const client = await this.pool.connect();
    try {
      if (!title || !description || !price) {
        return "Enter All fields";
      }
      const result = await db.insert(products).values({title: title, description: description, price: price });;
      return "Product Added Successfully";
    } finally {
      client.release();
    }
  }

  // GET All Products
  async getAllProducts(): Promise<any[]> {
    const client = await this.pool.connect();
    try {
      const result = await db.select().from(products);;
      return result;
    } finally {
      client.release();
    }
  }

  // GET one Product
  async getProduct(id: number): Promise<any> {
    const client = await this.pool.connect();
    try {
      const result = await db.select().from(products).where(eq(products.id,Number(id)));
      if (result && result.length) {
        return result[0];
      } else {
        return "Product Not found";
      }
    } finally {
      client.release();
    }
  }

  // UPDATE Product
  async updateProduct(id: number, newData: any): Promise<any> {
    const { title, description, price } = newData;
    const client = await this.pool.connect();
    try {
      if (!title || !description || !price) {
        return "Enter All fields to update";
      }

      const exisitingproduct = await db.select().from(products).where(eq(products.id,Number(id)));
      if (exisitingproduct && exisitingproduct.length) {
        const result = await db.update(products).set({ title, description, price }).where(eq(products.id, Number(id)));
        return {message: "Updated successfully for this details", Old_Product: exisitingproduct[0]};
      } else {
        return "Product Not found";
      }

    } finally {
      client.release();
    }
  }

  // DELETE Product
  async deleteProduct(id: number): Promise<any> {
    const client = await this.pool.connect();
    try {
      const exisitingproduct = await db.select().from(products).where(eq(products.id,Number(id)));
      if (exisitingproduct && exisitingproduct.length) {
        const result = await db.delete(products).where(eq(products.id, Number(id)));
        return "Product Deleted Successfully";
      } else {
        return "Product Not found";
      }
      
    } finally {
      client.release();
    }
  }
}
