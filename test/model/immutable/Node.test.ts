import 'mocha';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);
import uuid from 'uuid/v4';
import {
  Node,
  defaultNode,
  Color, Fill,
  LayoutConstraints,
  Vector,
  Size,
  NodeType,
  Constraint,
  VectorPath,
  VectorPoint,
  StrokeAlign,
  Sizeable
} from '../../../src';
import { EditorState as DraftJSEditorState, convertToRaw } from 'draft-js';
import { List } from 'immutable';

describe('Node immutable', () => {
  const ID = uuid();
  const TYPE = NodeType.RECT;
  const NAME = 'Name';
  const X_POS = 10;
  const Y_POS = 10;
  const WIDTH = 100;
  const HEIGHT = 100;
  const POSITION = new Vector({ x: X_POS, y: Y_POS });
  const SIZE = new Size({ width: WIDTH, height: HEIGHT });
  const VISIBLE = true;
  const OPACITY = 0.9;
  const CONSTRAINTS = new LayoutConstraints({ horizontal: Constraint.LEFT, vertical: Constraint.TOP });
  const STROKE = new Fill({
    color: new Color({ red: 255, green: 0, blue: 0, alpha: 1 })
  });
  const FILL = new Fill({
    color: new Color({ red: 0, green: 0, blue: 255, alpha: 1 })
  });
  const STROKE_WEIGHT = 1;
  const STROKE_ALIGN = StrokeAlign.CENTER;
  const EDITOR_STATE = DraftJSEditorState.createEmpty();
  const CORNER_RADIUS = 5;
  const CORNER_RADII = List([0, 0, 8, 2]);
  const ROTATION = 0;
  describe('constructor()', () => {
    it('constructs a new Node with the given properties', () => {
      const NODES = List([]);
      const PATHS = List([]);
      const node = new Node({
        id: ID,
        type: TYPE,
        name: NAME,
        position: POSITION,
        size: SIZE,
        visible: VISIBLE,
        opacity: OPACITY,
        constraints: CONSTRAINTS,
        paths: PATHS,
        nodes: NODES,
        stroke: STROKE,
        fill: FILL,
        strokeWeight: STROKE_WEIGHT,
        strokeAlign: STROKE_ALIGN,
        editorState: EDITOR_STATE,
        cornerRadius: CORNER_RADIUS,
        cornerRadii: CORNER_RADII,
        rotation: ROTATION
      });
      expect(node.id).to.equal(ID);
      expect(node.type).to.equal(TYPE);
      expect(node.name).to.equal(NAME);
      expect(node.position).to.equal(POSITION);
      expect(node.size).to.equal(SIZE);
      expect(node.visible).to.equal(VISIBLE);
      expect(node.opacity).to.equal(OPACITY);
      expect(node.constraints).to.equal(CONSTRAINTS);
      expect(node.paths).to.equal(PATHS);
      expect(node.nodes).to.equal(NODES);
      expect(node.stroke).to.equal(STROKE);
      expect(node.fill).to.equal(FILL);
      expect(node.strokeWeight).to.equal(STROKE_WEIGHT);
      expect(node.strokeAlign).to.equal(STROKE_ALIGN);
      expect(node.editorState).to.equal(EDITOR_STATE);
      expect(node.cornerRadius).to.equal(CORNER_RADIUS);
      expect(node.cornerRadii).to.equal(CORNER_RADII);
      expect(node.rotation).to.equal(ROTATION);
    });
    it('constructs a default Node when no properties are given', () => {
      const node = new Node();
      expect(node.id).to.not.equal('');
      expect(node.type).to.equal(defaultNode.type);
      expect(node.name).to.equal(defaultNode.name);
      expect(node.position).to.equal(defaultNode.position);
      expect(node.size).to.equal(defaultNode.size);
      expect(node.visible).to.equal(defaultNode.visible);
      expect(node.opacity).to.equal(defaultNode.opacity);
      expect(node.constraints).to.equal(defaultNode.constraints);
      expect(node.paths).to.equal(defaultNode.paths);
      expect(node.nodes).to.equal(defaultNode.nodes);
      expect(node.stroke).to.equal(defaultNode.stroke);
      expect(node.fill).to.equal(defaultNode.fill);
      expect(node.strokeWeight).to.equal(defaultNode.strokeWeight);
      expect(node.strokeAlign).to.equal(defaultNode.strokeAlign);
      expect(node.editorState).to.equal(defaultNode.editorState);
      expect(node.cornerRadius).to.equal(defaultNode.cornerRadius);
      expect(node.cornerRadii).to.equal(defaultNode.cornerRadii);
      expect(node.rotation).to.equal(defaultNode.rotation);
    });
  });
  describe('toRaw()', () => {
    it('returns a RawNode object', () => {
      const NODES = List([]);
      const PATHS = List([]);
      const node1 = new Node();
      expect(node1.toRaw()).to.deep.equal({
        id: node1.id,
        type: node1.type,
        name: node1.name,
        position: node1.position ? node1.position.toRaw() : null,
        size: node1.size ? node1.size.toRaw() : null,
        visible: node1.visible,
        opacity: node1.opacity,
        constraints: node1.constraints ? node1.constraints.toRaw() : null,
        paths: node1.paths ? node1.paths.map(path => path.toRaw()).toArray() : null,
        nodes: node1.nodes ? node1.nodes.map(node => node.toRaw()).toArray() : null,
        stroke: node1.stroke ? node1.stroke.toRaw() : null,
        fill: node1.fill ? node1.fill.toRaw() : null,
        strokeWeight: node1.strokeWeight,
        strokeAlign: node1.strokeAlign,
        content: node1.editorState ? convertToRaw(node1.editorState.getCurrentContent()) : null,
        cornerRadius: node1.cornerRadius,
        cornerRadii: node1.cornerRadii ? node1.cornerRadii.toArray() : null,
        rotation: node1.rotation
      });
      const node2 = new Node({
        id: ID,
        type: TYPE,
        name: NAME,
        position: POSITION,
        size: SIZE,
        visible: VISIBLE,
        opacity: OPACITY,
        constraints: CONSTRAINTS,
        paths: PATHS,
        nodes: NODES,
        stroke: STROKE,
        fill: FILL,
        strokeWeight: STROKE_WEIGHT,
        strokeAlign: STROKE_ALIGN,
        editorState: EDITOR_STATE,
        cornerRadius: CORNER_RADIUS,
        cornerRadii: CORNER_RADII,
        rotation: ROTATION
      });
      expect(node2.toRaw()).to.deep.equal({
        id: node2.id,
        type: node2.type,
        name: node2.name,
        position: node2.position ? node2.position.toRaw() : null,
        size: node2.size ? node2.size.toRaw() : null,
        visible: node2.visible,
        opacity: node2.opacity,
        constraints: node2.constraints ? node2.constraints.toRaw() : null,
        paths: node2.paths ? node2.paths.map(path => path.toRaw()).toArray() : null,
        nodes: node2.nodes ? node2.nodes.map(node => node.toRaw()).toArray() : null,
        stroke: node2.stroke ? node2.stroke.toRaw() : null,
        fill: node2.fill ? node2.fill.toRaw() : null,
        strokeWeight: node2.strokeWeight,
        strokeAlign: node2.strokeAlign,
        content: node2.editorState ? convertToRaw(node2.editorState.getCurrentContent()) : null,
        cornerRadius: node2.cornerRadius,
        cornerRadii: node2.cornerRadii ? node2.cornerRadii.toArray() : null,
        rotation: node2.rotation
      });
      const node3 = new Node({
        name: null,
        position: null,
        size: null,
        constraints: null,
        paths: null,
        nodes: null,
        stroke: null,
        fill: null,
        strokeWeight: null,
        strokeAlign: null,
        editorState: null,
        cornerRadius: null,
        cornerRadii: null
      });
      expect(node3.toRaw()).to.deep.equal({
        id: node3.id,
        opacity: node3.opacity,
        rotation: node3.rotation,
        type: node3.type,
        visible: node3.visible,
        name: null,
        position: null,
        size: null,
        constraints: null,
        paths: null,
        nodes: null,
        stroke: null,
        fill: null,
        strokeWeight: null,
        strokeAlign: null,
        content: null,
        cornerRadius: null,
        cornerRadii: null
      });
    });
  });
  describe('static fromRaw()', () => {
    it('instantiates a new Node immutable from a RawNode', () => {
      const node = Node.fromRaw({
        id: ID,
        type: TYPE,
        name: NAME,
        position: POSITION.toRaw(),
        size: SIZE.toRaw(),
        visible: VISIBLE,
        opacity: OPACITY,
        constraints: CONSTRAINTS.toRaw(),
        paths: [],
        nodes: [],
        stroke: STROKE.toRaw(),
        fill: FILL.toRaw(),
        strokeWeight: STROKE_WEIGHT,
        strokeAlign: STROKE_ALIGN,
        content: convertToRaw(EDITOR_STATE.getCurrentContent()),
        cornerRadius: CORNER_RADIUS,
        cornerRadii: CORNER_RADII.toArray(),
        rotation: ROTATION
      });
      expect(node.id).to.equal(ID);
      expect(node.type).to.equal(TYPE);
      expect(node.name).to.equal(NAME);
      expect(node.position).to.deep.equal(POSITION);
      expect(node.size).to.deep.equal(SIZE);
      expect(node.visible).to.equal(VISIBLE);
      expect(node.opacity).to.equal(OPACITY);
      expect(node.constraints).to.deep.equal(CONSTRAINTS);
      expect(node.paths).to.deep.equal(List([]));
      expect(node.nodes).to.deep.equal(List([]));
      expect(node.stroke).to.deep.equal(STROKE);
      expect(node.fill).to.deep.equal(FILL);
      expect(node.strokeWeight).to.equal(STROKE_WEIGHT);
      expect(node.strokeAlign).to.equal(STROKE_ALIGN);
      expect(node.editorState).to.be.instanceOf(DraftJSEditorState);
      expect(node.cornerRadius).to.equal(CORNER_RADIUS);
      expect(node.cornerRadii).to.deep.equal(CORNER_RADII);
      expect(node.rotation).to.equal(ROTATION);
    });
  });
  let node: Node;
  const NODE_1_POS = new Vector({ x: 2, y: 2 });
  const NODE_1_SIZE = new Size({ width: 100, height: 100 });
  const NODE_2_POS = new Vector({ x: 10, y: 10 });
  const NODE_2_SIZE = new Size({ width: 200, height: 200 });
  const NODE_1 = new Node({
    position: NODE_1_POS,
    size: NODE_1_SIZE
  });
  const NODE_2 = new Node({
    position: NODE_2_POS,
    size: NODE_2_SIZE
  });
  const NODES = List([
    NODE_1,
    NODE_2
  ]);
  const POINT_1_POS = new Vector({
    x: 2,
    y: 2
  });
  const POINT_1 = new VectorPoint({
    position: POINT_1_POS
  });
  const POINT_2_POS = new Vector({
    x: 10,
    y: 10
  });
  const POINT_2 = new VectorPoint({
    position: POINT_2_POS
  });
  const PATH_1 = new VectorPath({
    id: uuid(),
    open: false,
    points: List([
      POINT_1,
      POINT_2
    ])
  });
  const PATHS = List([
    PATH_1
  ]);
  // Create a sinon sandbox
  const sandbox = sinon.createSandbox();
  beforeEach(() => {
    // Construct a new node
    node = new Node({
      id: ID,
      type: TYPE,
      name: NAME,
      position: POSITION,
      size: SIZE,
      visible: VISIBLE,
      opacity: OPACITY,
      constraints: CONSTRAINTS,
      paths: PATHS,
      nodes: NODES,
      stroke: STROKE,
      fill: FILL,
      strokeWeight: STROKE_WEIGHT,
      strokeAlign: STROKE_ALIGN,
      editorState: EDITOR_STATE,
      cornerRadius: CORNER_RADIUS,
      cornerRadii: CORNER_RADII,
      rotation: ROTATION
    });
    // Mock the Sizeable class's methods
    sandbox.stub(Sizeable, 'calculatePosition');
    sandbox.stub(Sizeable, 'calculateSize');
    sandbox.stub(Sizeable, 'setSizeablePositions');
    sandbox.stub(Sizeable, 'setSizeableSizes');
    // Mock the Fill class's methods
    sandbox.stub(Fill.prototype, 'toFillCSS');
    sandbox.stub(Fill.prototype, 'toStrokeCSS');
  });
  afterEach(() => {
    sandbox.restore();
  });
  describe('getBoundingBox()', () => {
    it('returns the BoundingBox of the Node', () => {
      const boundingBox = node.getBoundingBox();
      expect(boundingBox.getMinX()).to.equal(node.position!.x);
      expect(boundingBox.getMinY()).to.equal(node.position!.y);
      expect(boundingBox.getMaxX()).to.equal(node.position!.x + node.size!.width);
      expect(boundingBox.getMaxY()).to.equal(node.position!.y + node.size!.height);
    });
  });
  describe('getTransformedBoundingBox()', () => {
    it('returns the BoundingBox of the Node after transformations', () => {
      // TODO: Add actual tests for the actually implemented function
      const boundingBox = node.getTransformedBoundingBox();
      expect(boundingBox.getMinX()).to.equal(node.position!.x);
      expect(boundingBox.getMinY()).to.equal(node.position!.y);
      expect(boundingBox.getMaxX()).to.equal(node.position!.x + node.size!.width);
      expect(boundingBox.getMaxY()).to.equal(node.position!.y + node.size!.height);
    });
  });
  describe('getPosition()', () => {
    it('returns the position if its not null', () => {
      const newNode = node.set('position', POSITION);
      expect(newNode.getPosition().toObject()).to.deep.equal(POSITION.toObject());
    });
    it('calculates the position based on the child Nodes', () => {
      const newNode = node.set('nodes', NODES).set('paths', null).set('position', null).set('type', NodeType.GROUP);
      newNode.getPosition();
      expect(Sizeable.calculatePosition).to.have.been.calledWith(node.nodes);
    });
    it('calculates the position based on the child VectorPaths', () => {
      const newNode = node.set('paths', PATHS).set('nodes', null).set('position', null).set('type', NodeType.VECTOR);
      newNode.getPosition();
      expect(Sizeable.calculatePosition).to.have.been.calledWith(node.paths);
    });
    it('returns an empty Vector if the position, nodes, and paths are null', () => {
      const newNode = node.set('paths', null).set('nodes', null).set('position', null).set('type', NodeType.RECT);
      expect(newNode.getPosition().toObject()).to.deep.equal(new Vector().toObject());
    });
  });
  describe('getSize()', () => {
    it('returns the size if its not null', () => {
      const newNode = node.set('size', SIZE);
      expect(newNode.getSize().toObject()).to.deep.equal(SIZE.toObject());
    });
    it('calculates the size based on the child Nodes', () => {
      const newNode = node.set('nodes', NODES).set('paths', null).set('size', null).set('type', NodeType.GROUP);
      newNode.getSize();
      expect(Sizeable.calculateSize).to.have.been.calledWith(node.nodes);
    });
    it('calculates the size based on the child VectorPaths', () => {
      const newNode = node.set('paths', PATHS).set('nodes', null).set('size', null).set('type', NodeType.VECTOR);
      newNode.getSize();
      expect(Sizeable.calculateSize).to.have.been.calledWith(node.paths);
    });
    it('returns an empty Size if the size, nodes, and paths are null', () => {
      const newNode = node.set('paths', null).set('nodes', null).set('size', null).set('type', NodeType.RECT);
      expect(newNode.getSize().toObject()).to.deep.equal(new Size().toObject());
    });
  });
  describe('setPosition()', () => {
    it('sets the position of the Node', () => {
      const POSITION = new Vector({ x: 0, y: 0 });
      const newNode = node.set('nodes', null).set('paths', null).setPosition(POSITION);
      expect(newNode.getPosition().toObject()).to.deep.equal(POSITION.toObject());
    });
    it('calls the setPosition() method with the child Nodes', () => {
      const newNode = node.set('nodes', NODES).set('paths', null).set('position', null).set('type', NodeType.GROUP);
      const POSITION = new Vector({ x: 0, y: 0 });
      newNode.setPosition(POSITION);
      expect(Sizeable.setSizeablePositions).to.have.have.been.calledOnceWith(NODES, POSITION);
    });
    it('calls the setPosition() method with the child VectorPaths', () => {
      const newNode = node.set('nodes', null).set('paths', PATHS).set('position', null).set('type', NodeType.VECTOR);
      const POSITION = new Vector({ x: 0, y: 0 });
      newNode.setPosition(POSITION);
      expect(Sizeable.setSizeablePositions).to.have.have.been.calledOnceWith(PATHS, POSITION);
    });
    it('does nothing if the node position, nodes, and paths are null', () => {
      const newNode = node.set('nodes', null).set('paths', null).set('position', null);
      expect(newNode.setPosition(POSITION).toObject()).to.deep.equal(newNode.toObject());
    });
  });
  describe('setSize()', () => {
    it('sets the size of the Node', () => {
      const SIZE = new Size({ width: 500, height: 500 });
      const newNode = node.set('nodes', null).set('paths', null).setSize(SIZE);
      expect(newNode.getSize().toObject()).to.deep.equal(SIZE.toObject());
    });
    it('calls the setPosition() method with the child Nodes', () => {
      const newNode = node.set('nodes', NODES).set('paths', null).set('size', null).set('type', NodeType.GROUP);
      const SIZE = new Size({ width: 500, height: 500 });
      newNode.setSize(SIZE);
      expect(Sizeable.setSizeableSizes).to.have.have.been.calledOnceWith(NODES, SIZE);
    });
    it('calls the setPosition() method with the child VectorPaths', () => {
      const newNode = node.set('nodes', null).set('paths', PATHS).set('size', null).set('type', NodeType.VECTOR);
      const SIZE = new Size({ width: 500, height: 500 });
      newNode.setSize(SIZE);
      expect(Sizeable.setSizeableSizes).to.have.have.been.calledOnceWith(PATHS, SIZE);
    });
    it('does nothing if the node size, nodes, and paths are null', () => {
      const newNode = node.set('nodes', null).set('paths', null).set('size', null);
      expect(newNode.setSize(SIZE).toObject()).to.deep.equal(newNode.toObject());
    });
  });
  describe('getBorderRadiusCSS()', () => {
    it('returns the correct CSS styles for a rounded rectangle with a single corner radius', () => {
      const CORNER_RADIUS = 8;
      const newNode = node.set('type', NodeType.RECT).set('cornerRadii', null).set('cornerRadius', CORNER_RADIUS);
      const borderRadiusCSS = newNode.getBorderRadiusCSS();
      expect(borderRadiusCSS).to.have.property('borderRadius');
      expect(borderRadiusCSS.borderRadius).to.equal(CORNER_RADIUS + 'px');
    });
    it('returns the correct CSS styles for a rounded rectangle with multiple corner radii', () => {
      const CORNER_RADII = List([
        5,
        10,
        15,
        20
      ]);
      const newNode = node.set('type', NodeType.RECT).set('cornerRadii', CORNER_RADII).set('cornerRadius', null);
      const borderRadiusCSS = newNode.getBorderRadiusCSS();
      expect(borderRadiusCSS).to.have.property('borderRadius');
      expect(borderRadiusCSS.borderRadius).to.equal(`${CORNER_RADII.get(0)}px ${CORNER_RADII.get(1)}px ${CORNER_RADII.get(2)}px ${CORNER_RADII.get(3)}px`);
    });
    it('returns the correct CSS styles for a rounded rectangle with an empty cornerRadii list', () => {
      const CORNER_RADII = List([]);
      const newNode = node.set('type', NodeType.RECT).set('cornerRadii', CORNER_RADII).set('cornerRadius', null);
      const borderRadiusCSS = newNode.getBorderRadiusCSS();
      expect(borderRadiusCSS).to.have.property('borderRadius');
      expect(borderRadiusCSS.borderRadius).to.equal('0px 0px 0px 0px');
    });
    it('returns the correct CSS styles for an ellipse', () => {
      const newNode = node.set('type', NodeType.ELLIPSE);
      const borderRadiusCSS = newNode.getBorderRadiusCSS();
      expect(borderRadiusCSS).to.have.property('borderRadius');
      expect(borderRadiusCSS.borderRadius).to.equal('50%');
    });
    it('returns an empty stylesheet if the node is neither a rectangle nor an ellipse', () => {
      const newNode = node.set('type', NodeType.GROUP);
      const borderRadiusCSS = newNode.getBorderRadiusCSS();
      expect(borderRadiusCSS).to.be.empty;
    });
  });
  describe('toCSS()', () => {
    before(() => {
      // Spy on the getBorderRadiusCSS method
      sandbox.spy(Node.prototype, 'getBorderRadiusCSS');
    });
    it('returns the correct CSS styles', () => {
      const stylesheet = node.toCSS();
      expect(Node.prototype.getBorderRadiusCSS).to.have.been.calledOnce;
      expect(Fill.prototype.toFillCSS).to.have.been.calledOnce;
      expect(Fill.prototype.toStrokeCSS).to.have.been.calledOnce;
      expect(stylesheet).to.have.property('width');
      expect(stylesheet).to.have.property('height');
      expect(stylesheet.width).to.equal(WIDTH);
      expect(stylesheet.height).to.equal(HEIGHT);
    });
  });
});
