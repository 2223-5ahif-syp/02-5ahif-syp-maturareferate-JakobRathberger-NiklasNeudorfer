import {makeScene2D} from "@motion-canvas/2d";
import {Circle, CircleProps, Layout, Line, Node, Rect, RectProps, Txt} from "@motion-canvas/2d/lib/components";
import {beginSlide, createRef, range} from "@motion-canvas/core/lib/utils";
import {easeInCubic} from "@motion-canvas/core/lib/tweening";
import {all, chain} from "@motion-canvas/core/lib/flow";
import {createSignal} from "@motion-canvas/core/lib/signals";
import {slideTransition} from "@motion-canvas/core/lib/transitions";
import {Direction} from "@motion-canvas/core/lib/types";
import "@motion-canvas/core/lib/types/Color"

const boxWidth = 500;
const boxHeight = 120;
const boxRadius = 20;
const spacingFactor = 1.4
const moveToTop = -200;

const circleRadius = 30;
const smallerCircleRadius = circleRadius - 10;


const headerRectStyle: RectProps = {
    y: moveToTop,
    fill: '#0A69DB',
    zIndex: 10,
    width: boxWidth,
    height: boxHeight,
    radius: boxRadius
};

const contentRectStyle: RectProps = {
    fill: '#FFFFFF',
    zIndex: 10,
    width: boxWidth,
    radius: [0, 0, boxRadius, boxRadius]
};

const blueCircleStyle: CircleProps = {
    width: circleRadius,
    height: circleRadius,
    fill: '#0A69DB',
    zIndex: 10
};

const smallerCircleStyle: CircleProps = {
    width: smallerCircleRadius,
    height: smallerCircleRadius,
    fill: '#FFFFFF'
}


export default makeScene2D(function* (view) {
    const event = createRef<Rect>()
    const runner1 = createRef<Rect>()
    const runner2 = createRef<Rect>()

    const eventCircleBlue = createRef<Circle>()
    const eventCircleWhite = createRef<Circle>()
    const eventText = createRef<Txt>()
    const eventContent = createRef<Rect>()
    const eventTriggerText = createRef<Txt>()

    const runner1CircleBlueLeft = createRef<Circle>()
    const runner1CircleWhiteLeft = createRef<Circle>()
    const runner1CircleBlueRight = createRef<Circle>()
    const runner1CircleWhiteRight = createRef<Circle>()
    const runner1Text = createRef<Txt>()
    const runner1Content = createRef<Rect>()
    const runner1ContentText = createRef<Node>()

    const connectorLine = createRef<Line>()

    const runner2CircleBlueLeft = createRef<Circle>()
    const runner2CircleWhiteLeft = createRef<Circle>()
    const runner2Text = createRef<Txt>()
    const runner2Content = createRef<Rect>()
    const runner2ContentText = createRef<Node>()

    const job1Text = createRef<Txt>()
    const job2Text = createRef<Txt>()

    const runner1Step1Text = createRef<Txt>()
    const runner1Step2Text = createRef<Txt>()
    const runner1Step3Text = createRef<Txt>()
    const runner1Step4Text = createRef<Txt>()

    const expandedContent = createSignal(false)

    const connectorLength = createSignal(0);


    yield* slideTransition(Direction.Bottom, 2)
    //yield* beginSlide('first slide');

    // region DRAWING
    view.add(
        <Node x={boxWidth * -spacingFactor} y={moveToTop}>
            <Line ref={connectorLine}
                  stroke="#AEB1B9"
                  lineWidth={7}
                  points={range(340).map(i => () => [connectorLength() * i / 340, 0])}
                  zIndex={-1}
            />
        </Node>
    )

    view.add(
        <Rect ref={event}
              x={boxWidth * -spacingFactor}
              {...headerRectStyle}
        >
            <Txt ref={eventText} fill="#FFFFFF"/>

            <Circle ref={eventCircleBlue} {...blueCircleStyle} x={() => event().width() / 2}>
                <Circle ref={eventCircleWhite} {...smallerCircleStyle}/>
            </Circle>


            <Rect ref={eventContent} y={boxHeight} height={boxHeight} {...contentRectStyle}>
                <Layout direction={'column'} width={() => runner2().width()} gap={30} padding={20} layout>
                    <Txt ref={eventTriggerText}/>
                </Layout>
            </Rect>
        </Rect>
    )

    view.add(
        <Rect ref={runner1} x={0} {...headerRectStyle}>
            <Txt ref={runner1Text} fill="#FFFFFF"/>

            <Circle ref={runner1CircleBlueLeft} {...blueCircleStyle} x={() => runner1().width() / -2}>
                <Circle ref={runner1CircleWhiteLeft} {...smallerCircleStyle}/>
            </Circle>

            <Circle ref={runner1CircleBlueRight} {...blueCircleStyle} x={() => runner1().width() / 2}>
                <Circle ref={runner1CircleWhiteRight} {...smallerCircleStyle}/>
            </Circle>


            <Rect ref={runner1Content} y={boxHeight * 2} height={boxHeight * 3} {...contentRectStyle}>
                <Layout direction={'column'} width={() => runner2().width()} gap={30} padding={20} layout>
                    <Txt ref={job1Text}/>

                    <Node opacity={0} ref={runner1ContentText}>
                        <Rect height={60} radius={10} fontSize={40} fill={"rgba(221,221,221,0.3)"}>
                            <Txt height={60} text={"Step 1: "}/>
                            <Txt ref={runner1Step1Text} paddingLeft={20} fill={"#4d4d4d"} text={"Run action"}/>
                        </Rect>
                        <Rect height={60} radius={10} fontSize={40} fill={"rgba(221,221,221,0.3)"}>
                            <Txt height={60} text={"Step 2: "}/>
                            <Txt ref={runner1Step2Text} paddingLeft={20} fill={"#4d4d4d"} text={"Run script"}/>
                        </Rect>
                        <Rect height={60} radius={10} fontSize={40} fill={"rgba(221,221,221,0.3)"}>
                            <Txt height={60} text={"Step 3: "}/>
                            <Txt ref={runner1Step3Text} paddingLeft={20} fill={"#4d4d4d"} text={"Run script"}/>
                        </Rect>
                        <Rect height={60} radius={10} fontSize={40} fill={"rgba(221,221,221,0.3)"}>
                            <Txt height={60} text={"Step 4: "}/>
                            <Txt ref={runner1Step4Text} paddingLeft={20} fill={"#4d4d4d"} text={"Run action"}/>
                        </Rect>
                    </Node>
                </Layout>
            </Rect>
        </Rect>
    )

    const runner2Step1 = createRef<Txt>()
    const runner2Step2 = createRef<Txt>()
    const runner2Step3 = createRef<Txt>()
    const runner2Step4 = createRef<Txt>()
    const runner2Step5 = createRef<Txt>()
    const runner2Step6 = createRef<Txt>()

    view.add(
        <Rect ref={runner2} x={boxWidth * spacingFactor} {...headerRectStyle}>
            <Txt ref={runner2Text} fill="#FFFFFF"/>

            <Circle ref={runner2CircleBlueLeft} {...blueCircleStyle} x={() => runner2().width() / -2}>
                <Circle ref={runner2CircleWhiteLeft} {...smallerCircleStyle}/>
            </Circle>

            <Rect ref={runner2Content} y={boxHeight} height={boxHeight} {...contentRectStyle}>
                <Layout direction={'column'} width={() => runner2().width()} gap={30} padding={[40, 20, 0, 20]} layout>
                    <Txt ref={job2Text}/>

                    <Node opacity={0} ref={runner2ContentText}>
                        <Rect height={60} radius={10} fontSize={40} fill={"rgba(221,221,221,0.3)"}>
                            <Txt height={60} text={"Step 1: "}/>
                            <Txt ref={runner2Step1} paddingLeft={20} fill={"#4d4d4d"} text={"Run action"}/>
                        </Rect>
                        <Rect height={60} radius={10} fontSize={40} fill={"rgba(221,221,221,0.3)"}>
                            <Txt height={60} text={"Step 2: "}/>
                            <Txt ref={runner2Step2} paddingLeft={20} fill={"#4d4d4d"} text={"Run script"}/>
                        </Rect>
                        <Rect height={60} radius={10} fontSize={40} fill={"rgba(221,221,221,0.3)"}>
                            <Txt height={60} text={"Step 3: "}/>
                            <Txt ref={runner2Step3} paddingLeft={20} fill={"#4d4d4d"} text={"Run action"}/>
                        </Rect>
                    </Node>
                </Layout>
            </Rect>
        </Rect>
    )

    const runner2ContentExpandRect = createRef<Rect>()

    view.add(
        <Rect ref={runner2ContentExpandRect} opacity={0} x={boxWidth * spacingFactor} y={boxHeight} height={boxHeight} {...contentRectStyle}>
            <Layout direction={'column'} width={() => runner2().width()} gap={30}
                    padding={[30, 20, 0, 20]} layout>
                <Rect height={60} radius={10} fontSize={40} fill={"rgba(221,221,221,0.3)"}>
                    <Txt height={60} text={"Step 4: "}/>
                    <Txt ref={runner2Step4} paddingLeft={20} fill={"#4d4d4d"} text={"Run action"}/>
                </Rect>
                <Rect height={60} radius={10} fontSize={40} fill={"rgba(221,221,221,0.3)"}>
                    <Txt height={60} text={"Step 5: "}/>
                    <Txt ref={runner2Step5} paddingLeft={20} fill={"#4d4d4d"} text={"Run script"}/>
                </Rect>
                <Rect height={60} radius={10} fontSize={40} fill={"rgba(221,221,221,0.3)"}>
                    <Txt height={60} text={"Step 6: "}/>
                    <Txt ref={runner2Step6} paddingLeft={20} fill={"#4d4d4d"} text={"Run action"}/>
                </Rect>
            </Layout>
        </Rect>
    )


    // endregion

    //------------------//
    // ANIMATIONS
    //------------------//

    // region SAVE POSITIONS
    event().save();
    eventCircleBlue().save();
    eventCircleWhite().save();
    eventContent().save();

    runner1().save();
    runner1CircleWhiteRight().save();
    runner1CircleBlueRight().save();
    runner1CircleWhiteLeft().save();
    runner1CircleBlueLeft().save();
    runner1Content().save();

    runner2().save();
    runner2CircleWhiteLeft().save();
    runner2CircleBlueLeft().save();
    runner2Content().save();

    //endregion

    // region REMOVE CONTENT
    yield* all(
        event().width(0, 0),
        event().height(0, 0),
        eventContent().height(0, 0),
        eventContent().position.y(boxHeight / 2, 0),
        eventCircleBlue().width(0, 0),
        eventCircleBlue().height(0, 0),
        eventCircleWhite().width(0, 0),
        eventCircleWhite().height(0, 0),

        runner1().width(0, 0),
        runner1().height(0, 0),
        runner1CircleWhiteRight().width(0, 0),
        runner1CircleWhiteRight().height(0, 0),
        runner1CircleBlueRight().width(0, 0),
        runner1CircleBlueRight().height(0, 0),
        runner1CircleWhiteLeft().width(0, 0),
        runner1CircleWhiteLeft().height(0, 0),
        runner1CircleBlueLeft().height(0, 0),
        runner1CircleBlueLeft().width(0, 0),
        runner1Content().position.y(boxHeight / 2, 0),
        runner1Content().height(0, 0),

        runner2().width(0, 0),
        runner2().height(0, 0),
        runner2CircleWhiteLeft().width(0, 0),
        runner2CircleWhiteLeft().height(0, 0),
        runner2CircleBlueLeft().height(0, 0),
        runner2CircleBlueLeft().width(0, 0),
        runner2Content().position.y(boxHeight / 2, 0),
        runner2Content().height(0, 0),
    )

    // endregion


    yield* all(
        chain(
            all(
                event().restore(1, easeInCubic),
                eventCircleBlue().restore(1, easeInCubic),
                eventCircleWhite().restore(1, easeInCubic)
            ),
            eventText().text("Event", 1, easeInCubic),
        ),
        chain(
            all(
                runner1().restore(1, easeInCubic),
                runner1CircleBlueRight().restore(1, easeInCubic),
                runner1CircleBlueLeft().restore(1, easeInCubic),
                runner1CircleWhiteRight().restore(1, easeInCubic),
                runner1CircleWhiteLeft().restore(1, easeInCubic)
            ),
            runner1Text().text("Runner 1", 1, easeInCubic),
        ),
        chain(
            all(
                runner2().restore(1, easeInCubic),
                runner2CircleBlueLeft().restore(1, easeInCubic),
                runner2CircleWhiteLeft().restore(1, easeInCubic)
            ),
            runner2Text().text("Runner 2", 1, easeInCubic),
        ),
        connectorLength(boxWidth * 3, 1.5, easeInCubic)
    )

    yield* beginSlide('Expand');
    yield* all(
        // BOX 1
        runner1().radius([boxRadius, boxRadius, 0, 0], 0.5, easeInCubic),
        all(
            chain(
                all(
                    runner1Content().position.y(boxHeight * 2.5, 1),
                    runner1Content().height(boxHeight * 4, 1),
                ),
                job1Text().text("Job 1", 1),
                runner1ContentText().opacity(1, 2)
            )
        ),
        // BOX 2
        runner2().radius([boxRadius, boxRadius, 0, 0], 0.5, easeInCubic),
        all(
            chain(
                all(
                    runner2Content().position.y(boxHeight * 2, 1),
                    runner2Content().height(boxHeight * 3, 1),
                ),
                job2Text().text("Job 2", 1),
                runner2ContentText().opacity(1, 1.9)
            )
        )
    )


    yield* beginSlide("Fill with data")


    yield* chain(
        // Expand event box
        event().radius([boxRadius, boxRadius, 0, 0], 0.5, easeInCubic),
        all(
            eventContent().restore(1, easeInCubic),
            all(
                runner2Content().radius(0,1),
                runner2ContentExpandRect().opacity(1,1),
                runner2ContentExpandRect().zIndex(-1,1),
                runner2ContentExpandRect().position.y((boxHeight * 1.5) *2, 1),
                runner2ContentExpandRect().height(boxHeight * 2.5, 1),
            ),
        ),
        all(
            eventTriggerText().fontSize(40, 1),
            job1Text().fontSize(40, 1),
            job2Text().fontSize(40, 1),
            eventTriggerText().text("Push on Main", 1),
            job1Text().text("Run Tests:", 1),
            job2Text().text("Build and Publish:", 1)
        ),
        all(
            runner1Step1Text().text("Start DB Service", 1),
            runner1Step2Text().text("Checkout Repo", 1),
            runner1Step3Text().text("Setup JDK 17", 1),
            runner1Step4Text().text("Run Tests", 1),


            runner2Step1().text("Checkout Repo", 2),
            runner2Step2().text("Setup Docker Buildx", 2),
            runner2Step2().fontSize(36, 2),
            runner2Step3().text("Login to GHCR", 2),

            runner2Step4().text("Setup JDK 17", 2),
            runner2Step5().text("Package", 2),
            //runner2Step6().fontSize(36, 2),
            runner2Step6().text("🛠️ & 🚀 Images", 2),
        )
    )

    yield* beginSlide("End Componentes")
});
