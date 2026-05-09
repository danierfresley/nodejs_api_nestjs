import { Type } from "class-transformer";
import { IsNumber, IsString, Min } from "class-validator";

export class CreateProductDto {
    
    @IsString()
    public name: string;
    
    @IsNumber(
        { maxDecimalPlaces: 2 },
        { message: 'Price must be a number with up to 2 decimal places' }
    )
    @Min(0, { message: 'Price must be a positive number' })
    @Type(() => Number)
    public price: number;

    constructor(name: string, price: number) {
        this.name = name;
        this.price = price;
    }

}
