import { Record, List } from 'immutable';
import { Color } from './Color';
import { CSSProperties } from 'react';
import { ColorStop } from './ColorStop';
import { StrokeAlign, RawFill, ImageScaleMode, GradientType, ImageRepeatMode } from '../raw';
import { Serializable } from './Serializable';
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
export declare const defaultFill: IFill;
declare const Fill_base: Record.Factory<IFill>;
export declare class Fill extends Fill_base implements Serializable<RawFill> {
    getGradientTypeCSSString(): string;
    getGradientCSSString(): string;
    getScaleModeCSSString(): string | undefined;
    getRepeatModeCSSString(): string;
    toStrokeCSS(strokeWeight: number | null, strokeAlign: StrokeAlign | null): CSSProperties;
    toFillCSS(): CSSProperties;
    toRaw(): RawFill;
    static fromRaw(raw: RawFill): Fill;
}
export {};
