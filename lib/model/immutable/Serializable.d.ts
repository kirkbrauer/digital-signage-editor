export interface Serializable {
    toJS(): any;
    toRaw(): any;
}
