import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {createRef} from '@motion-canvas/core/lib/utils';
import {all} from '@motion-canvas/core/lib/flow';
import {Rect} from "@motion-canvas/2d/lib/components";
import {Direction} from "@motion-canvas/core/lib/types";
import {slideTransition} from "@motion-canvas/core/lib/transitions";
import {CodeBlock, lines} from "@motion-canvas/2d/lib/components/CodeBlock";
import "@motion-canvas/core/lib/types/Color"

export default makeScene2D(function* (view) {

    const container = createRef<Rect>()
    const codeGhAction = createRef<CodeBlock>()

    view.add(
        <Rect ref={container}
              radius={10}
              height={700}
              width={1000}
              fill={'rgba(36,36,36,0.68)'}
              shadowColor={() => '#000'}
              x={() => view.width() / -2 + container().width()}
        >
            <CodeBlock
                ref={codeGhAction}
                x={() => container().width() / -2 + codeGhAction().width()/1.8}
                y={0}
                fontSize={28}
                width={660}
                height={660}
                code={`
name: learn-github-actions
run-name: \${{ github.actor }} is learning GitHub Actions
on: [push]
jobs:
  check-bats-version:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '14'
      - run: npm install -g bats
      - run: bats -v
                `}
                language={'yaml'}
            />

        </Rect>
    );

    yield* slideTransition(Direction.Right,1)


    yield* all(
        container().position.x(0,1),
        container().position.y(0,1),

        codeGhAction().position.x(100,1),
        codeGhAction().position.y(100,1),

        container().radius([0,0,0,0],1),

        container().width(view.width(), 1),
        container().height(view.height(), 1),
        codeGhAction().width(view.width(), 1),
        codeGhAction().height(view.height(), 1),
    )


    yield* codeGhAction().selection(lines(1,1), 1)
});
