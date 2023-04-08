import pushImg from "../../images/push.svg";
import deployProductionImg from "../../images/deployToProduction.svg";
import buildImg from "../../images/build.png";
import deployStagingImg from "../../images/deployStaging.svg";
import testImg from "../../images/test.png";
import "@motion-canvas/core/lib/types/Color"
import {makeScene2D} from "@motion-canvas/2d";
import {Circle, Img, Line, Rect, Txt, Node} from "@motion-canvas/2d/lib/components";
import {all, chain, sequence, waitFor} from "@motion-canvas/core/lib/flow";
import {slideTransition} from "@motion-canvas/core/lib/transitions";
import {Direction} from "@motion-canvas/core/lib/types";
import {beginSlide, createRef} from "@motion-canvas/core/lib/utils";
import {Brace, SurroundingRectangle} from '@ksassnowski/motion-canvas-components';
import {createSignal} from "@motion-canvas/core/lib/signals";
import "../global.css"

export const ColorPalette = {
    yellow: "#ffbe0b",
    orange: "#fb5607",
    pink: "#ff006e",
    purple: "#8338ec",
    blue: "#3a86ff",
}


export default makeScene2D(function* (view) {

    view.fill("white")

    const fullDiagram = createRef<Node>()

    // -----------------------------------------------
    // Heading Text
    // -----------------------------------------------
    const headingText = createRef<Txt>();

    view.add(
        <>
            <Rect fill={"black"} height={()=> view.height()} width={() => view.width()} radius={70}>

            </Rect>

            <Txt ref={headingText} fontSize={120} fontFamily={"Fira Code"}
                 y={() => view.height() / -2 + 200} zIndex={100} fill={"white"}/>
        </>
    )

    // -----------------------------------------------
    // Squares with the Icons inside them
    // -----------------------------------------------
    const commitSquare = createRef<Rect>()
    const buildSquare = createRef<Rect>()
    const testSquare = createRef<Rect>()
    const deployStagingSquare = createRef<Rect>()
    const deployProductionSquare = createRef<Rect>()

    const square = 250;
    const borderRadius = 60;

    // Lil Dots:
    const circle = 50;
    const moveBelow = 250;

    // -----------------------------------------------
    // Text
    // -----------------------------------------------
    const moveBelowText = moveBelow + 100;
    const textWidth = square * 0.75;
    const commitText = createRef<Txt>()
    const buildText = createRef<Txt>()
    const testText = createRef<Txt>()
    const stageText = createRef<Txt>()
    const productionText = createRef<Txt>()

    view.add(
        <Node ref={fullDiagram}>
            {/* RECTS WITH IMAGES INSIDE */}
            <>
                <Rect ref={commitSquare} radius={borderRadius} smoothCorners height={square} width={square}
                      fill={"white"}
                      x={() => view.width() / 5 * -2}
                      shadowColor={"grey"}
                      shadowBlur={100}>
                    <Img src={pushImg}/>
                </Rect>

                <Rect ref={buildSquare} radius={borderRadius} smoothCorners height={square} width={square}
                      fill={"white"}
                      x={() => view.width() / 5 * -1}
                      shadowColor={"grey"}
                      shadowBlur={100}>
                    <Img src={buildImg} scale={0.145}/>
                </Rect>

                <Rect ref={testSquare} radius={borderRadius} smoothCorners height={square} width={square} fill={"white"}
                      x={0}
                      shadowColor={"grey"}
                      shadowBlur={100}>
                    <Img src={testImg} scale={0.125}/>
                </Rect>

                <Rect ref={deployStagingSquare} radius={borderRadius} smoothCorners height={square} width={square}
                      fill={"white"}
                      x={() => view.width() / 5}
                      shadowColor={"grey"}
                      shadowBlur={100}>
                    <Img src={deployStagingImg}/>
                </Rect>

                <Rect ref={deployProductionSquare} radius={borderRadius} smoothCorners height={square} width={square}
                      fill={"white"}
                      x={() => view.width() / 5 * 2}
                      shadowColor={"grey"}
                      shadowBlur={100}>
                    <Img src={deployProductionImg}/>
                </Rect>
            </>

            {/* Lil Dots */}
            <>
                <Circle height={circle} width={circle} fill={"white"}
                        x={() => view.width() / 5 * -2}
                        y={moveBelow}>
                </Circle>

                <Circle height={circle} width={circle} fill={"white"}
                        x={() => view.width() / 5 * -1}
                        y={moveBelow}>
                </Circle>

                <Circle height={circle} width={circle} fill={"white"}
                        x={0}
                        y={moveBelow}>
                </Circle>

                <Circle height={circle} width={circle} fill={"white"}
                        x={() => view.width() / 5}
                        y={moveBelow}>
                </Circle>

                <Circle height={circle} width={circle} fill={"white"}
                        x={() => view.width() / 5 * 2}
                        y={moveBelow}>
                </Circle>
            </>

            {/* Text */}
            <>
                <Txt ref={commitText} text={"Commit"} height={circle} width={textWidth} fill={"white"}
                     x={() => view.width() / 5 * -2 + 10}
                     y={moveBelowText}/>

                <Txt ref={buildText} text={"Build"} height={circle} width={textWidth} fill={"white"}
                     x={() => view.width() / 5 * -1 + 40}
                     y={moveBelowText}/>

                <Txt ref={testText} text={"Test"} height={circle} width={textWidth} fill={"white"}
                     x={50}
                     y={moveBelowText}/>

                <Txt ref={stageText} text={"Stage"} height={circle} width={textWidth} fill={"white"}
                     x={() => view.width() / 5 + 30}
                     y={moveBelowText}/>

                <Txt ref={productionText} text={"Production"} height={circle} width={textWidth + 60} fill={"white"}
                     x={() => view.width() / 5 * 2}
                     y={moveBelowText}/>
            </>

            {/* Line which connects the dots */}
            <>
                <Line
                    stroke={"white"}
                    lineWidth={5}
                    lineDash={[10, 10]}
                    points={[
                        {x: view.width() / 5 * -2, y: moveBelow},
                        {x: view.width() / 5 * 2, y: moveBelow}
                    ]}/>
            </>

        </Node>
    )


    const boundingBoxIntegration = createRef<SurroundingRectangle>()

    view.add(
        <SurroundingRectangle
            ref={boundingBoxIntegration}
            zIndex={100}
            lineWidth={17}
            stroke={ColorPalette.yellow}
            smoothCorners={true}
            radius={16}
            nodes={buildSquare()}
            opacity={0}
            buffer={40}
        />
    )

    yield* all(
        slideTransition(Direction.Right, 2),
        headingText().text("Concepts", 2)
    )


    yield* beginSlide("Continuous Integration")
    yield* chain(
        headingText().text("", 1),
        all(
            boundingBoxIntegration().opacity(1, 0.5),
            boundingBoxIntegration().nodes([buildSquare(), testText()], 2),
            headingText().fill(ColorPalette.yellow, 1),
            headingText().text("Continuous Integration", 1.5),
        )
    )

    yield* beginSlide("Continuous Delivery")
    yield* all(
        boundingBoxIntegration().stroke(ColorPalette.pink, 1),
        boundingBoxIntegration().nodes([buildSquare(), stageText()], 2),
        headingText().fill(ColorPalette.pink, 1),
        headingText().text("Continuous Delivery", 1.5),
    )

    yield* beginSlide("Continuous Deployment")
    yield* all(
        boundingBoxIntegration().stroke(ColorPalette.blue, 1),
        boundingBoxIntegration().nodes([buildSquare(), productionText()], 2),
        headingText().fill(ColorPalette.blue, 1),
        headingText().text("Continuous Deployment", 1.5),
    )


    // -----------------------------------------------
    // Show all Types all at once
    // -----------------------------------------------
    yield* beginSlide("Combined")

    yield* all(
        headingText().text("", 1),
        boundingBoxIntegration().opacity(0, 1),
        fullDiagram().position.y(-350, 2),
        fullDiagram().scale(0.9, 2)
    )

    const boundingBox1 = createRef<Brace>()
    const boundingBox2 = createRef<Brace>()
    const boundingBox3 = createRef<Brace>()

    const integText = createRef<Txt>()
    const delivText = createRef<Txt>()
    const deployText = createRef<Txt>()

    view.add(
        <>
            <>
                <Txt text={""}
                     fontSize={55} fontFamily={"Fira Code"}
                     y={140} x={-145} ref={integText}
                     fill={ColorPalette.yellow}/>

                <Brace
                    stroke={ColorPalette.yellow}
                    ref={boundingBox1}
                    lineWidth={17}
                    nodes={buildText()}
                    opacity={0}
                    buffer={20}
                />
            </>

            <>
                <Txt text={""}
                     fontSize={55} fontFamily={"Fira Code"}
                     y={320} x={-30} ref={delivText}
                     fill={ColorPalette.pink}/>

                <Brace
                    stroke={ColorPalette.pink}
                    ref={boundingBox2}
                    sharpness={0}
                    lineWidth={17}
                    nodes={buildText()}
                    opacity={0}
                    buffer={190}
                />
            </>
            <>
                <Txt text={""}
                     fontSize={55} fontFamily={"Fira Code"}
                     y={500} x={180} ref={deployText}
                     fill={ColorPalette.blue}/>

                <Brace
                    stroke={ColorPalette.blue}
                    ref={boundingBox3}
                    sharpness={0}
                    zIndex={100}
                    lineWidth={17}
                    nodes={buildText()}
                    opacity={0}
                    buffer={350}
                />
            </>
        </>
    )


    yield* all(
        sequence(
            1.5,
            all(
                boundingBox1().opacity(1, 1),
                boundingBox1().sharpness(2, 1),
                boundingBox1().nodes([buildSquare(), testText()], 2),
                integText().text("Continuous Integration", 2)
            ),
            all(
                boundingBox2().opacity(1, 1),
                boundingBox2().sharpness(2.5, 1),
                boundingBox2().nodes([buildSquare(), stageText()], 2),
                delivText().text("Continuous Delivery",2)
            ),
            all(
                boundingBox3().opacity(1, 1),
                boundingBox3().sharpness(3, 1),
                boundingBox3().nodes([buildSquare(), productionText()], 2),
                deployText().text("Continuous Deployment",2)
            )
        )
    )
    yield* waitFor(3)

    yield* beginSlide("End Pipeline")
})
