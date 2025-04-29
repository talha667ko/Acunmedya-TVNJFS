import mongoose, { Document, Model, Schema } from "mongoose";

// TANIM => Kodda product ne alanları içeriyor?
export interface IProduct extends Document
{
    name: string;
    brand: string;
    color: string;
    price: number;
    description: string;
    stock: number;
    imageURL: string;
}

// DB seviyesinde Product'ın şeması?
const ProductSchema: Schema<IProduct> = new Schema(
    {
        name: {type:String,required:true, minlength:2},
        brand: {type:String,required:true, minlength:2},
        color: {type:String,required:true, minlength:2},
        price: {type:Number, required:true, min:0},
        description: {type:String, required:false},
        stock: {type:Number, required:true, min:0},
        imageURL: {type:String, required:true},
    },
    {timestamps:true} //TODO: Üzerine konuşulacak
);

// Tüm sistemde bu şema-tanım bağlantısının kullanılacağı değişken.
export const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema)