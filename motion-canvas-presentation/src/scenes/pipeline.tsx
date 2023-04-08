import pushImg from "../../images/push.svg";
import deployProductionImg from "../../images/deployToProduction.svg";
import buildImg from "../../images/build.png";
import deployStagingImg from "../../images/deployStaging.svg";
import testImg from "../../images/test.png";
import "@motion-canvas/core/lib/types/Color"
import {makeScene2D} from "@motion-canvas/2d";
import {Circle, Img, Line, Rect, Txt} from "@motion-canvas/2d/lib/components";
import {all, chain} from "@motion-canvas/core/lib/flow";
import {slideTransition} from "@motion-canvas/core/lib/transitions";
import {Direction} from "@motion-canvas/core/lib/types";
import {beginSlide, createRef} from "@motion-canvas/core/lib/utils";
import {SurroundingRectangle} from '@ksassnowski/motion-canvas-components';


export default makeScene2D(function* (view) {
    // -----------------------------------------------
    // Heading Text
    // -----------------------------------------------
    const headingText = createRef<Txt>();

    view.add(
        <Txt ref={headingText} fontSize={120} fontFamily={"Fira Code"}
             y={() => view.height() / -2 + 200} zIndex={100} fill={"white"}/>
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


    view.add(
        <>
            <Rect ref={commitSquare} radius={borderRadius} smoothCorners height={square} width={square} fill={"white"}
                  x={() => view.width() / 5 * -2}
                  shadowColor={"grey"}
                  shadowBlur={100}>
                <Img src={pushImg}/>
            </Rect>


            <Rect ref={buildSquare} radius={borderRadius} smoothCorners height={square} width={square} fill={"white"}
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
    )

    // -----------------------------------------------
    // Lil Dots
    // -----------------------------------------------
    const circle = 50;
    const moveBelow = 250;

    view.add(
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
    )

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
                 x={() => view.width() / 5 * 2 }
                 y={moveBelowText}/>
        </>
    )


    // -----------------------------------------------
    // Line which connects the dots
    // -----------------------------------------------
    view.add(
        <Line
            stroke={"white"}
            lineWidth={5}
            lineDash={[10, 10]}
            points={[
                {x: view.width() / 5 * -2, y: moveBelow},
                {x: view.width() / 5 * 2, y: moveBelow}
            ]}
        ></Line>
    )


    const boundingBoxIntegration = createRef<SurroundingRectangle>()

    view.add(
        <SurroundingRectangle
            ref={boundingBoxIntegration}
            zIndex={100}
            lineWidth={17}
            stroke={"limegreen"}
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
            headingText().fill("limegreen", 1),
            headingText().text("Continuous Integration", 1.5),
        )
    )

    yield* beginSlide("Continuous Delivery")
    yield* all(
        boundingBoxIntegration().stroke("cyan", 1),
        boundingBoxIntegration().nodes([buildSquare(), stageText()], 2),
        headingText().fill("cyan", 1),
        headingText().text("Continuous Delivery", 1.5),
    )

    yield* beginSlide("Continuous Deployment")
    yield* all(
        boundingBoxIntegration().stroke("red", 1),
        boundingBoxIntegration().nodes([buildSquare(), productionText()], 2),
        headingText().fill("red", 1),
        headingText().text("Continuous Deployment", 1.5),
    )

    yield* beginSlide("End Pipeline")
})
