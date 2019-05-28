import { RawColor } from './RawColor';
import { RawColorStop } from './RawColorStop';
/**
 * Defines image scale modes.
 */
export declare enum ImageScaleMode {
    FILL = "FILL",
    FIT = "FIT",
    REPEAT = "REPEAT",
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
 * A fill for a shape or line.
 */
export interface RawFill {
    /**
     * Whether the fill is visible.
     */
    visible: boolean;
    /**
     * Opacity of the fill.
     */
    opacity: number;
    /**
     * Color of the fill.
     */
    color: RawColor;
    /**
     * Gradient type.
     * Only used if there are one or more gradient stops.
     */
    gradientType?: GradientType | null;
    /**
     * Angle of the gradient in degrees.
     * Only used if there are one or more gradient stops.
     */
    gradientAngle?: number | null;
    /**
     * The graident stops of the fill.
     */
    gradientStops?: RawColorStop[] | null;
    /**
     * Image scale mode.
     * Only used if the image URL is not null.
     */
    scaleMode?: ImageScaleMode | null;
    /**
     * Repeat image mode.
     * Only used if the image URL is not null and the scale mode is REPEAT.
     */
    repeatMode?: ImageRepeatMode | null;
    /**
     * Image url.
     */
    imageUrl?: string | null;
}
