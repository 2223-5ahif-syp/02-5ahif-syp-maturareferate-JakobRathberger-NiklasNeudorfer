import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {createRef, range} from '@motion-canvas/core/lib/utils';
import {all} from '@motion-canvas/core/lib/flow';
import {Circle, Line, Node, Rect, Txt} from "@motion-canvas/2d/lib/components";
import {easeInCubic} from "@motion-canvas/core/lib/tweening";
import {createSignal} from "@motion-canvas/core/lib/signals";
import {slideTransition} from "@motion-canvas/core/lib/transitions";
import {Direction} from "@motion-canvas/core/lib/types";
import "@motion-canvas/core/lib/types/Color"

export default makeScene2D(function* (view) {
    const windowMain = createRef<Rect>()
    const windowTop = createRef<Rect>()
    const codeBlockReference = createRef<Txt>()

    view.add(
        <Node>
            <Rect
                ref={windowTop}
                radius={[10, 10, 0, 0]}
                fill="#3F3F3F"
                width={() => windowMain().width()}
                height={50}
                y={() => windowMain().height() / -2}
                zIndex={10}
            >
                <Circle
                    fill="#F41000"
                    width={() => windowTop().height() / 2}
                    height={() => windowTop().height() / 2}
                    zIndex={1000}
                    x={() => windowTop().width() / -2 + (windowTop().height() / 2) * 1.8}
                />
                <Circle
                    fill="#F4C917"
                    width={() => windowTop().height() / 2}
                    height={() => windowTop().height() / 2}
                    zIndex={1000}
                    x={() => windowTop().width() / -2 + ((windowTop().height() / 2) * 1.8) * 2}
                />
                <Circle
                    fill="#00F419"
                    width={() => windowTop().height() / 2}
                    height={() => windowTop().height() / 2}
                    zIndex={1000}
                    x={() => windowTop().width() / -2 + ((windowTop().height() / 2) * 1.8) * 3}
                />
            </Rect>
            <Rect
                ref={windowMain}
                radius={[0, 0, 10, 10]}
                fill="#7E7E7E"
                width={1000}
                height={500}
                y={() => windowTop().height() / 2}
                opacity={0.75}
            >
                <Txt
                    ref={codeBlockReference}
                    height={() => codeBlockReference().fontSize()}
                    alignContent={"start"}
                    width={() => windowMain().width() - 25}
                    y={() => windowMain().height() / -2 + codeBlockReference().fontSize() + 25}
                    x={10}
                    fontSize={40}
                    fontFamily={"Roboto"}
                    fontStyle={"bold"}
                    text={""}
                />
            </Rect>
        </Node>
    )


    windowMain().save();
    windowTop().save();

    yield* all(
        windowMain().height(0, 0),
        windowMain().width(0, 0),

        windowTop().width(0, 0),
        windowTop().height(0, 0),
    );

    // spawn Terminal
    yield* all(
        windowMain().restore(1),
        windowTop().restore(1),
    )

    // add CodeBlock Text
    yield* codeBlockReference().text('$ git push origin master', 1.5, easeInCubic);


    // ARROW LINE
    const lineRef = createRef<Line>()
    const length = createSignal(0);

    view.add(
        <Line
            ref={lineRef}
            points={range(340).map(i => () => [
                length() * i / 340, 0,
            ])}
            x={() => windowMain().width() / 2}
            y={0}
            lineDash={[20, 20]}
            endArrow
            lineWidth={8}
            radius={0}
            stroke={'#242424'}
        />
    );


    // Make the Line move
    yield* length(view.width() / 2, 2)
});
