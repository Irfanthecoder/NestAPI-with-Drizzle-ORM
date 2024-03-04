import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";


export const products = pgTable('products', {
    id: serial('id').primaryKey(),
    title: text('title'),
    description: text('description'),
    price: integer('price')
  });