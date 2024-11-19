export interface ColorOption {
    name: string;
    hexValue: string;
    active: boolean;
}

export interface Palette {
    originalColor: string;
    colorOptions: ColorOption[];
}

export interface ColorPaletteResponse {
    color_palette: string[];
    color_palette_details: string;
}

export const parsePaletteDetails = (paletteDetails: string) => {

    console.log(paletteDetails)
    const parsedDetails = JSON.parse(paletteDetails);

    const palettes: Palette[] = parsedDetails.map((item: any) => ({
        originalColor: item.original_color,
        colorOptions: item.color_options.map((option: any) => ({
            name: option.name,
            hexValue: option.hex_value,
        })),
    }));

    console.log(palettes)

    return palettes;
}