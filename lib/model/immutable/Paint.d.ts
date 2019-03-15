import { Color } from './Color';
export interface PaintConfig {
    visible?: boolean;
    opacity?: number;
    color?: Color | null;
    gradientType?: GradientType | null;
    gradientAngle?: number | null;
    gradientStops?: ColorStop[];
    scaleMode?: ImageScaleMode | null;
    repeatMode?: ImageRepeatMode | null;
    imageUrl?: string | null;
}
/**
 * A color stop in a gradient.
 */
export interface ColorStop {
    /**
     * Position of the stop from 0 to 1.
     */
    position: number;
    /**
     * RGBA color at the stop.
     */
    color: Color;
}
/**
 * Defines image scale modes.
 */
export declare enum ImageScaleMode {
    FILL = "FILL",
    FIT = "FIT",
    REPEAT = "REPEAR",
    STRETCH = "STRETCH"
}
/**
 * Defines image repeat modes.
 */
export declare enum ImageRepeatMode {
    REPEAT = "REPEAT",
    REPEAT_X = "REPEAT_X",
    REPEAT_Y = "REPEAT_Y"
}
/**
 * Defines gradient types.
 */
export declare enum GradientType {
    LINEAR = "LINEAR",
    RADIAL = "RADIAL"
}
/**
 * A paint fill for a shape or line.
 */
export declare class Paint {
    /**
     * Whether the paint is visible.
     */
    private visible;
    /**
     * Opacity of the paint.
     */
    private opacity;
    /**
     * Color of the paint.
     */
    private color;
    /**
     * Gradient type.
     * Only used if there are one or more gradient stops.
     */
    private gradientType;
    /**
     * Angle of the gradient in degrees.
     * Only used if there are one or more gradient stops.
     */
    private gradientAngle;
    /**
     * The graident stops of the paint.
     */
    private gradientStops;
    /**
     * Image scale mode.
     * Only used if the image URL is not null.
     */
    private scaleMode;
    /**
     * Repeat image mode.
     * Only used if the image URL is not null and the scale mode is REPEAT.
     */
    private repeatMode;
    /**
     * Image url.
     */
    private imageUrl;
    constructor(config: PaintConfig);
    isVisible(): boolean;
    show(): Paint;
    hide(): Paint;
    getOpacity(): number;
    setOpacity(opacity: number): Paint;
    getColor(): Color | null;
    setColor(color: Color | null): Paint;
    getGradientType(): GradientType | null;
    setGradientType(gradientType: GradientType | null): Paint;
    getGradientAngle(): number | null;
    setGradientAngle(gradientAngle: number | null): Paint;
    getGradientStops(): ColorStop[];
    setGradientStops(gradientStops: ColorStop[]): Paint;
    getScaleMode(): ImageScaleMode | null;
    setScaleMode(scaleMode: ImageScaleMode | null): Paint;
    getRepeatMode(): ImageRepeatMode | null;
    setRepeatMode(repeatMode: ImageRepeatMode | null): Paint;
    getImageURL(): string | null;
    setImageURL(imageUrl: string | null): Paint;
    toJS(): PaintConfig;
}
