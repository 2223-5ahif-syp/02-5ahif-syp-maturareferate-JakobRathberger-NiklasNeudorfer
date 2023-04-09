import withCICDImage from "../../images/withCICD.png";
import withoutCICDImage from "../../images/withoutCICD.png";
import "@motion-canvas/core/lib/types/Color"
import {makeScene2D} from "@motion-canvas/2d";
import {Img} from "@motion-canvas/2d/lib/components";
import {all} from "@motion-canvas/core/lib/flow";
import {slideTransition} from "@motion-canvas/core/lib/transitions";
import {Direction} from "@motion-canvas/core/lib/types";
import {beginSlide, createRef} from "@motion-canvas/core/lib/utils";


export default makeScene2D(function* (view) {

    const withCICD = createRef<Img>()
    const withoutCICD = createRef<Img>()

    yield view.add(
        <>
            <Img
                ref={withCICD}
                src={withCICDImage}
                x={() => view.width() / -4}
                y={() => view.height() / -4 + 100}
                radius={40}
                smoothCorners
                clip
            />

            <Img
                ref={withoutCICD}
                src={withoutCICDImage}
                x={() => view.width() / 4}
                y={() => view.height() / 4 - 100}
                radius={40}
                smoothCorners
                clip
            />
        </>
    )

    // save states
    withCICD().save()
    withoutCICD().save()

    // reset positions
    yield* all(
        withoutCICD().position.x(0,0),
        withoutCICD().position.y(0,0),
        withCICD().position.x(0,0),
        withCICD().position.y(0,0),
    )

    yield* all(
        slideTransition(Direction.Bottom, 1),
        withoutCICD().restore(1.25),
        withCICD().restore(1.25)
    )


    yield* beginSlide("End Problem Memes")
})
