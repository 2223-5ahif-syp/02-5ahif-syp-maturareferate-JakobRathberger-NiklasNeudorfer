import {makeScene2D} from "@motion-canvas/2d";
import "@motion-canvas/core/lib/types/Color"
import {all, chain, waitFor} from "@motion-canvas/core/lib/flow";
import {beginSlide, createRef} from "@motion-canvas/core/lib/utils";
import {slideTransition} from "@motion-canvas/core/lib/transitions";
import {Direction} from "@motion-canvas/core/lib/types";
import {CodeBlock, insert, lines} from "@motion-canvas/2d/lib/components/CodeBlock";
import {Icon, Rect, Txt, Node, CubicBezier, QuadBezier} from "@motion-canvas/2d/lib/components";

export default makeScene2D(function* (view) {

    view.fill("black");

    const lineColor = "limegreen";

    const ymlCode = createRef<CodeBlock>()
    const diagramRect = createRef<Rect>()

    const line1 = createRef<QuadBezier>()
    const line1Text = createRef<Txt>()
    const line2 = createRef<QuadBezier>()
    const line2Text = createRef<Txt>()
    const line3 = createRef<QuadBezier>()
    const line3Text = createRef<Txt>()

    const ghPagesNode = createRef<Node>()
    const oraVMNode = createRef<Node>()
    const oraVMText = createRef<Txt>()

    view.add(
        <>
            <CodeBlock
                width={() => view.width()} height={() => view.height()}
                ref={ymlCode}
                language={"yml"}
                y={40} x={-100}
                fontSize={45}
                code={`
              deploy:
                name: deploy
                needs: [ build, tests ]
                runs-on: ubuntu-latest

                steps:
                  - uses: actions/checkout@v3
            
                  - name: install ssh key
                    uses: webfactory/ssh-agent@v0.4.1
                    with:
                      ssh-private-key: \${{ secrets.SSH_SERVER_PRIVATE_KEY }}
            `}/>

            <Rect ref={diagramRect} height={400} width={() => view.width()} zIndex={100} fill={"white"}
                  radius={40}
                  y={() => view.height() / 2 - diagramRect().height() / 2}>

                <Node x={-600} zIndex={2}>
                    <Icon icon={"mdi:github-box"} height={100} width={100} color={"black"} fill={"white"}/>
                    <Txt fontFamily={"Fira Code"} text={"GitHub Repo"} y={100}/>
                </Node>

                <Node ref={ghPagesNode} x={600} y={() => diagramRect().height() / 2 - 150} scale={0.8}>
                    <Icon icon={"simple-icons:githubpages"} size={350} y={20} color={"black"}/>
                    <Txt fontFamily={"Fira Code"} text={"Docs & Presentation"} y={100}/>
                </Node>

                <Node x={0}>
                    <Icon icon={"heroicons:server"} size={100} y={20} color={"black"}/>
                    <Txt fontFamily={"Fira Code"} text={"GH-Runner"} y={100}/>
                </Node>

                <Node ref={oraVMNode} x={600} y={() => diagramRect().height() / -2 + 150}>
                    <Icon icon={"heroicons:server"} size={100} y={20} color={"black"}/>
                    <Txt fontFamily={"Fira Code"} text={"OracleVM"} y={100}/>
                    <Txt ref={oraVMText} fontFamily={"Fira Code"} text={""} y={-100} fontSize={30}/>
                </Node>


                <>
                    <QuadBezier ref={line1} stroke={lineColor} lineWidth={10} zIndex={1}
                                endArrow lineDash={[20, 20]} end={0}
                                p0={[-600, 0]} p1={[-300, -200]} p2={[0, -20]}/>
                    <Node y={-30}>
                        <Txt ref={line1Text} text={""} fontFamily={"Fira Code"} fontSize={30}
                             position={line1().getPointAtPercentage(0.5).position}/>
                    </Node>
                </>

                <>
                    <QuadBezier ref={line2} stroke={lineColor} lineWidth={10} zIndex={1}
                                endArrow lineDash={[20, 20]} end={0}
                                p0={[-600, 0]} p1={[-300, 200]} p2={[0, 20]}/>
                    <Node y={30}>
                        <Txt ref={line2Text} text={""} fontFamily={"Fira Code"} fontSize={30}
                             position={line2().getPointAtPercentage(0.5).position}/>
                    </Node>
                </>

                <>
                    <QuadBezier ref={line3} stroke={lineColor} lineWidth={10} zIndex={1}
                                endArrow lineDash={[20, 20]} end={0}
                                p0={[0, -20]} p1={[300, -200]} p2={[600, -20]}/>
                    <Node y={-30}>
                        <Txt ref={line3Text} text={""} fontFamily={"Fira Code"} fontSize={30}
                             position={line3().getPointAtPercentage(0.5).position}/>
                    </Node>
                </>


            </Rect>
        </>
    )

    oraVMNode().save()
    ghPagesNode().save()

    yield* all(
        oraVMNode().position.y(0, 0),
        ghPagesNode().position.y(view.height(), 0)
    )


    yield* slideTransition(Direction.Bottom, 1)

    yield* beginSlide("Explain Basic")
    yield* all(
        ymlCode().selection(lines(0, 4), 1)
    )

    yield* beginSlide("Checkout Repo")
    yield* all(
        ymlCode().selection(lines(4, 6), 1),
        // Line 1 -- Checkout Repo
        all(
            line1().end(1, 1),
            line1Text().text("Checkout Repo", 1.2)
        ),
    )

    yield* beginSlide("Install SSH Key")
    yield* all(
        // Remove Line1 + Text
        all(
            line1().start(1, 1),
            line1Text().text("", 1)
        ),

        ymlCode().selection(lines(8, 11), 1),
        // Line 2 -- Install SSH Key
        all(
            line2().end(1, 1),
            line2Text().text("Install SSH Key", 1.2)
        ),
    )


    yield* beginSlide("Create Hosts")
    yield* all(
        // Remove Line2 + Text
        all(
            line2().start(1, 1),
            line2Text().text("", 1)
        ),

        ymlCode().selection(lines(8, 11), 1),
        // Line 2 -- Install SSH Key
        all(
            line1().start(0, 0),
            line1().end(0, 0),
            line1().end(1, 1),
            line1Text().text("Save Server IP to known_hosts", 1.2)
        ),

        all(
            ymlCode().fontSize(35, 1),
            ymlCode().edit(1.2)`
              deploy:
                name: deploy
                needs: [ build, tests ]
                runs-on: ubuntu-latest

                steps:
                  - uses: actions/checkout@v3
            
                  - name: install ssh key
                    uses: webfactory/ssh-agent@v0.4.1
                    with:
                      ssh-private-key: \${{ secrets.SSH_SERVER_PRIVATE_KEY }}
            
                ${insert(`
                  - name: create .ssh/known_hosts
                    run: ssh-keyscan -H -t rsa -v \${{ secrets.SERVER }}  >> ~/.ssh/known_hosts
                
                `)}
            `,
            ymlCode().selection(lines(12, 15), 1)
        )
    )


    yield* beginSlide("Copy Docker Compose")
    yield* all(
        // Remove Line1 + Text
        all(
            line1().start(1, 1),
            line1Text().text("", 1)
        ),

        // Line 3 -- Copy docker-compose.yaml
        all(
            line3().end(1, 1),
            line3Text().text("Copy docker-compose.yaml", 1.2)
        ),
        all(
            ymlCode().fontSize(25, 1),
            ymlCode().edit(1.2)`
              deploy:
                name: deploy
                needs: [ build, tests ]
                runs-on: ubuntu-latest

                steps:
                  - uses: actions/checkout@v3
            
                  - name: install ssh key
                    uses: webfactory/ssh-agent@v0.4.1
                    with:
                      ssh-private-key: \${{ secrets.SSH_SERVER_PRIVATE_KEY }}
            
                  - name: create .ssh/known_hosts
                    run: ssh-keyscan -H -t rsa -v \${{ secrets.SERVER }}  >> ~/.ssh/known_hosts
                
                ${insert(`
                  - name: Copy required files
                    run: |
                      scp -r docker-compose.yaml \${{ secrets.SERVER_USER }}@\${{ secrets.SERVER }}:
                        /home/\${{ secrets.SERVER_USER }}/gh-actions-demo
                `)}`)
    )

    yield* beginSlide("Start docker compose")
    yield* all(
        // Remove old Line + Text
        all(
            line3().start(1, 1),
            line3Text().text("", 1)
        ),
        all(
            ymlCode().position.y(-700, 2),
            ymlCode().position.x(-200, 2),
            ymlCode().fontSize(33, 2),
        ),
        oraVMText().text("docker compose up -d", 1),
        ymlCode().edit(1.2)`
              deploy:
                name: deploy
                needs: [ build, tests ]
                runs-on: ubuntu-latest

                steps:
                  - uses: actions/checkout@v3
            
                  - name: install ssh key
                    uses: webfactory/ssh-agent@v0.4.1
                    with:
                      ssh-private-key: \${{ secrets.SSH_SERVER_PRIVATE_KEY }}
            
                  - name: create .ssh/known_hosts
                    run: ssh-keyscan -H -t rsa -v \${{ secrets.SERVER }}  >> ~/.ssh/known_hosts
                
                  - name: Copy required files
                    run: |
                      scp -r docker-compose.yaml \${{ secrets.SERVER_USER }}@\${{ secrets.SERVER }}:
                        /home/\${{ secrets.SERVER_USER }}/gh-actions-demo

                ${insert(`
                  - name: Run Docker Container
                    run: |
                      ssh \${{ secrets.SERVER_USER }}@\${{ secrets.SERVER }} "
                      cd /home/\${{ secrets.SERVER_USER }}/gh-actions-demo
                      echo \${{ github.token }} | sudo docker login ghcr.io -u \${{ github.actor }} --password-stdin
                      sudo docker compose pull
                      sudo docker compose stop
                      sudo docker compose rm -f
                      sudo docker compose up -d
                      "
                `)}   
            `
    )


    yield* beginSlide("END")
})