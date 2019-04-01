import { Record, List } from 'immutable';
import { Color } from './Color';
import { CSSProperties } from 'react';
import { StrokeAlign } from './Node';
import { ColorStop } from './ColorStop';
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
 * A fill for a shape or line.
 */
export interface IFill {
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
    color: Color;
    /**
     * Gradient type.
     * Only used if there are one or more gradient stops.
     */
    gradientType: GradientType | null;
    /**
     * Angle of the gradient in degrees.
     * Only used if there are one or more gradient stops.
     */
    gradientAngle: number | null;
    /**
     * The graident stops of the fill.
     */
    gradientStops: List<ColorStop> | null;
    /**
     * Image scale mode.
     * Only used if the image URL is not null.
     */
    scaleMode: ImageScaleMode | null;
    /**
     * Repeat image mode.
     * Only used if the image URL is not null and the scale mode is REPEAT.
     */
    repeatMode: ImageRepeatMode | null;
    /**
     * Image url.
     */
    imageUrl: string | null;
}
declare const Fill_base: Record.Factory<IFill>;
export declare class Fill extends Fill_base {
    private getGradientTypeCSSString;
    private getGradientCSSString;
    private getScaleModeCSSString;
    private getRepeatModeString;
    toStrokeCSS(strokeWeight: number | null, strokeAlign: StrokeAlign | null): CSSProperties;
    toFillCSS(): CSSProperties;
}
export {};
