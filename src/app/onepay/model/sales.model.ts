import { Module } from "quill";

export interface ISales {
    id?: number,
    ref?: string,
    name: string,
    address: string,
    type: Module
}