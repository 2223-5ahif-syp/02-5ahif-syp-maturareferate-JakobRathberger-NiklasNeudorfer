import bitBucketImg from "../../images/bitbucket-pipelines-3125267748.png";
import gitLabImg from "../../images/gitLabCICD.png";
import jenkinsImg from "../../images/jenkins.png";
import ghActionsImg from "../../images/githubActions.png";
import "@motion-canvas/core/lib/types/Color"
import {makeScene2D} from "@motion-canvas/2d";
import {Img, Line, Rect, Txt} from "@motion-canvas/2d/lib/components";
import {all} from "@motion-canvas/core/lib/flow";
import {slideTransition} from "@motion-canvas/core/lib/transitions";
import {Direction} from "@motion-canvas/core/lib/types";
import {beginSlide, createRef} from "@motion-canvas/core/lib/utils";


export default makeScene2D(function* (view) {

    const gitLab = createRef<Img>()
    const jenkins = createRef<Img>()
    const bitBucket = createRef<Img>()
    const ghActions = createRef<Img>()

    yield view.add(
        <Rect fill={"white"} height={() => view.height()} width={() => view.width()} radius={40}>
            <Txt fontStyle={"bold"} fontFamily={"Fira Code"} text={"Solutions"} fill={"black"} fontSize={120}
                 y={() => view.height() / -2 + 100}/>
            <Line stroke={"black"} zIndex={100} lineWidth={10} points={[
                {x: view.width() / -4 + 120, y: view.height() / -2 + 160},
                {x: view.width() / 4 - 120, y: view.height() / -2 + 160},
            ]}></Line>


            <Img
                ref={bitBucket}
                src={bitBucketImg}
                scale={0.7}
                x={() => view.width() / -4}
                y={() => view.height() / 4 + 100}
                radius={40}
                smoothCorners
                clip/>

            <Img
                ref={ghActions}
                src={ghActionsImg}
                scale={0.7}
                x={100}
                y={0}
                radius={40}
                smoothCorners
                clip
            />

            <Img
                ref={jenkins}
                src={jenkinsImg}
                scale={0.5}
                x={() => view.width() / 4 + 200}
                y={() => view.height() / 4 - 100}
                radius={40}
                smoothCorners
                clip
            />

            <Img
                ref={gitLab}
                src={gitLabImg}
                scale={0.75}
                x={() => view.width() / -4 - 200}
                y={() => view.height() / 4 - 300}
                radius={40}
                smoothCorners
                clip
            />
        </Rect>
    )


    // save states
    gitLab().save()
    jenkins().save()
    bitBucket().save()
    ghActions().save()

    yield* all(
        gitLab().scale(0, 0),
        jenkins().scale(0, 0),
        bitBucket().scale(0, 0),
        ghActions().scale(0, 0),
    )
    yield* all(
        slideTransition(Direction.Bottom, 1.5),
        gitLab().restore(1.3),
        jenkins().restore(1.3),
        bitBucket().restore(1.3),
        ghActions().restore(1.3)
    )

    yield* beginSlide("Focus GH Actions")

    yield* all(
        gitLab().opacity(0.3, 1),
        jenkins().opacity(0.3, 1),
        bitBucket().opacity(0.3, 1),
        ghActions().scale(1, 1),
    )


    yield* beginSlide("End Solution")
})
